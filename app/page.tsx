"use client";
import GridCard from "@/components/GridCard";
import Airdrop from "@/components/solana/Airdrop";
import UploadImage from "@/components/solana/metaplex/UploadImage";
import MintAddress from "@/components/solana/MintAddress";
import MintToken from "@/components/solana/MintToken";
import Transaction from "@/components/solana/Transaction";
import Transfer from "@/components/solana/Transfer";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey } = useWallet();

  const components = [
    <Airdrop />,
    <Transaction />,
    <MintAddress />,
    <MintToken />,
    <Transfer />,
    <UploadImage />,
  ];
  return (
    publicKey && (
      <main className="grid grid-cols-3	 gap-4 p-8">
        {components.map((component, index) => (
          <GridCard key={index}>{component}</GridCard>
        ))}
      </main>
    )
  );
}
