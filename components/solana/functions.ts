import MY_WALLET from "@/marT1ewGwmvDuaz75Qmwuxc6Smmr8i6fAgEMwTGUyLU.json";
import { ResponseOKI } from "@/types/apiResponses";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
export const getConnection = () => {
  // connection to the devnet
  let connection = new Connection(clusterApiUrl("devnet"), "finalized");
  return connection;
};

// get keypair based on the my test wallet
export const MY_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(MY_WALLET));

// LAMPORTS_PER_SOL sono tipo i centesimi con gli euro
// sono i decimali del SOL
// ci sono 1 miliardo di lamports in 1 SOL
// 1 SOL = 1 miliardo di lamports

// create a transaction
// transfer SOl from un address to another
export const transferSOL = async (
  from: Keypair,
  to: Keypair,
  amount: number
) => {
  try {
    const connection = getConnection();

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // create a transaction
    const transaction = new Transaction().add(transferInstruction);
    // assing the fee to the payer
    transaction.feePayer = from.publicKey;

    // sign the transaction
    const txHash = await sendAndConfirmTransaction(
      connection,
      transaction,
      [from],
      { commitment: "confirmed" }
    );
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`
    );
  } catch (error) {
    console.log(error);
  }
};

export const initMinterAddress = async () => {
  const connection = getConnection();
  const keypair = MY_KEYPAIR;

  const mint = await createMint(
    connection,
    keypair,
    MY_KEYPAIR.publicKey,
    null,
    6
  );
  console.log(`Mint created: ${mint.toBase58()}`);
};

export const mintToken = async () => {
  const connection = getConnection();
  const keypair = MY_KEYPAIR;

  const minterAddress = new PublicKey(
    "BDp7h5vhD7j1xHKwU3Cdf2ZPsmfRT8scnN18X6wHH9pb"
  );
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    minterAddress,
    keypair.publicKey
  );

  await mintTo(
    connection,
    keypair,
    minterAddress,
    tokenAccount.address,
    keypair,
    10 * LAMPORTS_PER_SOL
  );

  console.log(`Token minted: ${tokenAccount.address.toBase58()}`);
};

export const transferToken = async () => {
  const connection = getConnection();
  const keypair = MY_KEYPAIR;

  const toKeypair = Keypair.generate();
  const to = toKeypair.publicKey;
  const minterAddress = new PublicKey(
    "BDp7h5vhD7j1xHKwU3Cdf2ZPsmfRT8scnN18X6wHH9pb"
  );

  const fromTokenAddress = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    minterAddress,
    keypair.publicKey
  );

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    minterAddress,
    to
  );

  const amount = 1 * LAMPORTS_PER_SOL;
  await transfer(
    connection,
    keypair,
    fromTokenAddress.address,
    toTokenAccount.address,
    keypair,
    amount
  );

  console.log(`Token transferred: ${toTokenAccount.address.toBase58()}`);
};
