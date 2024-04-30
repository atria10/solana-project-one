import MY_WALLET from "@/marT1ewGwmvDuaz75Qmwuxc6Smmr8i6fAgEMwTGUyLU.json";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
export const getConnection = () => {
  // connection to the devnet
  let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  return connection;
};

// get keypair based on the my test wallet
export const MY_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(MY_WALLET));

// LAMPORTS_PER_SOL sono tipo i centesimi con gli euro
// sono i decimali del SOL
// ci sono 1 miliardo di lamports in 1 SOL
// 1 SOL = 1 miliardo di lamports

// create an AIRDROP -- una ricarica
export const airdropSOL = async (amount: number) => {
  const connection = getConnection();
  const myAddress = MY_KEYPAIR.publicKey;
  try {
    // request airdrop
    const signature = await connection.requestAirdrop(
      myAddress,
      amount * LAMPORTS_PER_SOL
    );
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
  } catch (error) {
    console.log(error);
  }
};

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
