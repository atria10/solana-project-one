"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { airdropSOL } from "../airdrop/actions";

type Props = {};

const Airdrop = (props: Props) => {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleClick = async (payolad: FormData) => {
    setLoading(true);
    if (!publicKey) {
      return;
    }
    const { status, message } = await airdropSOL(publicKey, payolad);
    alert(message);
    setLoading(false);
  };
  return (
    <form action={handleClick}>
      <div className="flex gap-4 items-center">
        <label className="input input-bordered flex items-center gap-2">
          Amount
          <input type="number" className="grow" placeholder="1" name="amount" />
        </label>
        <SubmitButton
          title={"Airdrop SOL"}
          buttonProps={{ disabled: !publicKey }}
          classes={`btn-accent ${loading ? "loading loading-spinner" : ""}`}
        />
      </div>
    </form>
  );
};

export default Airdrop;
