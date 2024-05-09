"use server";
import MY_WALLET from "@/marT1ewGwmvDuaz75Qmwuxc6Smmr8i6fAgEMwTGUyLU.json";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
  MPL_TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createGenericFile,
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  publicKey as publicKeySerializer,
  string,
} from "@metaplex-foundation/umi/serializers";
import { clusterApiUrl } from "@solana/web3.js";
import { readFile } from "fs/promises";

export const uploadImage = async () => {
  // umi è la copia di connection
  // let connection = new Connection(clusterApiUrl("devnet"), "finalized");
  const umi = createUmi(clusterApiUrl("devnet"), "finalized");
  umi.use(irysUploader());
  // get keypair based on the my test wallet
  // the below two lines do the same thing
  //   const MY_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(MY_WALLET));
  let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(MY_WALLET));
  const myKeypairSigner = createSignerFromKeypair(umi, keypair);

  umi.use(signerIdentity(myKeypairSigner));

  const image = await readFile(
    "C:/Users/Mario/Projects/solana/project-one/public/Messi_NFT.jpg"
  );
  const nft_image = createGenericFile(image, "messi_nft");

  const [myUri] = await umi.uploader.upload([nft_image]);

  console.log(myUri);
};


// create NFT
export const splMetadata = async () => {
  const umi = createUmi(clusterApiUrl("devnet"), "finalized");
  let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(MY_WALLET));
  const myKeypairSigner = createSignerFromKeypair(umi, keypair);

  umi.use(signerIdentity(myKeypairSigner));

  const mint = publicKey("BDp7h5vhD7j1xHKwU3Cdf2ZPsmfRT8scnN18X6wHH9pb");
  const tokenMetadataProgramId = MPL_TOKEN_METADATA_PROGRAM_ID;

  const seeds = [
    string({ size: "variable" }).serialize("metadata"),
    publicKeySerializer().serialize(tokenMetadataProgramId),
    publicKeySerializer().serialize(mint),
  ];

  const metadata = umi.eddsa.findPda(tokenMetadataProgramId, seeds);
  const data: DataV2Args = {
    name: "Messi",
    symbol: "LM10",
    uri: "https://ltyo76ilh5fyz7hhqcaobtroz4j4b3muuwkezzu6p43l6yk4nqrq.arweave.net/XPDv-Qs_S4z854CA4M4uzxPA7ZSllEzmnn82v2FcbCM",
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: keypair.publicKey,
        verified: true,
        share: 100,
      },
    ],
    collection: null,
    uses: null,
  };

  const accounts: CreateMetadataAccountV3InstructionAccounts = {
    metadata,
    mint,
    mintAuthority: myKeypairSigner,
  };

  const args: CreateMetadataAccountV3InstructionArgs = {
    data,
    isMutable: true,
    collectionDetails: null,
  };
  let tx = createMetadataAccountV3(umi, {
    ...accounts,
    ...args,
  });

  const result = await tx.sendAndConfirm(umi);

  const signature = umi.transactions.deserialize(result.signature);

  console.log(
    `Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
};
