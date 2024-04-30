import Airdrop from "@/components/solana/Airdrop";
import Transaction from "@/components/solana/Transaction";

export default function Home() {
  return (
    <main className="flex gap-4 m-4 justify-center">
      <Airdrop />
      <Transaction />
    </main>
  );
}
