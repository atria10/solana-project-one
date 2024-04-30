"use client";
import { airdropSOL } from "./functions";

type Props = {};

const Airdrop = (props: Props) => {
  return (
    <button onClick={() => airdropSOL(3)} className="btn btn-primary">
      Airdrop SOL
    </button>
  );
};

export default Airdrop;
