"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { getConnection } from "./functions";

type Props = {};

const Balance = (props: Props) => {
  const [balance, setBalance] = useState<number | null>(null);
  const { publicKey } = useWallet();

  const getBalance = async (publicKey: PublicKey) => {
    if (!publicKey) {
      return setBalance(null);
    }
    setBalance(await getConnection().getBalance(publicKey));
  };
  useEffect(() => {
    getBalance(publicKey!);
  }, [publicKey]);
  return (
    balance && (
      <div className="badge badge-primary p-2">
        <p>{balance / LAMPORTS_PER_SOL} SOL</p>
      </div>
    )
  );
};

export default Balance;
