"use server";
import MY_WALLET from "@/marT1ewGwmvDuaz75Qmwuxc6Smmr8i6fAgEMwTGUyLU.json";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  createNft,
  DataV2Args,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createGenericFile,
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  base58,
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
  // myUri= https://ltyo76ilh5fyz7hhqcaobtroz4j4b3muuwkezzu6p43l6yk4nqrq.arweave.net/XPDv-Qs_S4z854CA4M4uzxPA7ZSllEzmnn82v2FcbCM
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

export const nftMetadata = async () => {
  const umi = createUmi(clusterApiUrl("devnet"), "finalized");
  let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(MY_WALLET));
  const myKeypairSigner = createSignerFromKeypair(umi, keypair);

  umi.use(signerIdentity(myKeypairSigner)).use(irysUploader());

  const metadata = {
    name: "Leo Messi Mario",
    symbol: "LM10",
    description: "My NFT for MasterZ x Solana bootcamp",
    image:
      "https://ltyo76ilh5fyz7hhqcaobtroz4j4b3muuwkezzu6p43l6yk4nqrq.arweave.net/XPDv-Qs_S4z854CA4M4uzxPA7ZSllEzmnn82v2FcbCM",
    attributes: [
      {
        trait_type: "Rarity",
        value: "Common",
      },
      {
        trait_type: "Author",
        value: "Mario",
      },
    ],
    properties: {
      files: [
        {
          type: "image/jpeg",
          uri: "https://ltyo76ilh5fyz7hhqcaobtroz4j4b3muuwkezzu6p43l6yk4nqrq.arweave.net/XPDv-Qs_S4z854CA4M4uzxPA7ZSllEzmnn82v2FcbCM",
        },
      ],
    },
  };

  const nftUri = await umi.uploader.uploadJson(metadata);
  console.log("Your Uri: ", nftUri);
  return nftUri;
};

export const mintNft = async () => {
  const umi = createUmi(clusterApiUrl("devnet"), "finalized");
  let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(MY_WALLET));
  const myKeypairSigner = createSignerFromKeypair(umi, keypair);
  umi.use(signerIdentity(myKeypairSigner)).use(mplTokenMetadata());

  const name = "Leo Messi Mario";
  const uri = await nftMetadata();
  const mint = generateSigner(umi); // create address totally randomic
  const sellerFeeBasisPoints = percentAmount(5, 2);

  const tx = createNft(umi, {
    mint,
    name,
    uri,
    sellerFeeBasisPoints,
  });

  let result = await tx.sendAndConfirm(umi);

  const signature = base58.deserialize(result.signature);

  console.log(signature);
  // signature=  TaNmwYfHmpLosc34QvW8qBwMZyP88XU5Yhgsr2x67rVr7y9dnyhdib1w28HP1wJBdcqAqX9zTb1WgWeSkp2YVM4

  // LEO MESSI NFT= https://explorer.solana.com/address/BqtdLoNvPSuBAB7R5K2iLtY23myjS8tsaZKQDu482FNN?cluster=devnet
};
