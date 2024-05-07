import Airdrop from "@/components/solana/Airdrop";
import MintAddress from "@/components/solana/MintAddress";
import MintToken from "@/components/solana/MintToken";
import Transaction from "@/components/solana/Transaction";
import Transfer from "@/components/solana/Transfer";

export default function Home() {
  return (
    <main className="flex gap-4 m-4 justify-center">
      <Airdrop />
      <Transaction />
      <MintAddress />
      <MintToken />
      <Transfer />
    </main>
  );
}
