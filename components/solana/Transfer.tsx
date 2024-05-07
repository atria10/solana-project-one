"use client";
import { transferToken } from "./functions";

type Props = {};

const Transfer = (props: Props) => {
  return (
    <button onClick={() => transferToken()} className="btn btn-primary">
      Transfer Token
    </button>
  );
};

export default Transfer;
