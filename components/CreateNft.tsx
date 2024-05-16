"use client";

import { mintNft } from "./solana/metaplex/functions";

type Props = {};

const CreateNft = (props: Props) => {
  return (
    <button onClick={() => mintNft()} className="btn btn-primary">
      Mint NFT
    </button>
  );
};

export default CreateNft;
