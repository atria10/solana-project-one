"use client";
import { initMinterAddress } from "./functions";

type Props = {};

const MintAddress = (props: Props) => {
  return (
    <button onClick={() => initMinterAddress()} className="btn btn-primary">
      Mint Address
    </button>
  );
};

export default MintAddress;
