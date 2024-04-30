"use client";
import { Keypair } from "@solana/web3.js";
import { MY_KEYPAIR, transferSOL } from "./functions";

type Props = {};

const Transaction = (props: Props) => {
  const handleClick = async () => {
    const fromAddress = MY_KEYPAIR;
    const toAddress = Keypair.generate();
    const amount = 0.1;
    await transferSOL(fromAddress, toAddress, amount);
  };
  return (
    <button onClick={handleClick} className="btn btn-primary">
      Transfer SOL
    </button>
  );
};

export default Transaction;
