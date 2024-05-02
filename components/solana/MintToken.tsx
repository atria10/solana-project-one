"use client";
import { mintToken } from "./functions";

type Props = {};

const MintToken = (props: Props) => {
  return (
    <button onClick={() => mintToken()} className="btn btn-primary">
      Mint Token
    </button>
  );
};

export default MintToken;
