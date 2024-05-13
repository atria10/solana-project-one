"use server";

import { ResponseOKI } from "@/types/apiResponses";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getConnection } from "../solana/functions";

// create an AIRDROP -- una ricarica
export const airdropSOL = async (
  publicKey: PublicKey,
  payolad: FormData
): Promise<ResponseOKI> => {
  const connection = getConnection();
  const amount = Number(payolad.get("amount") as string);
  const to = new PublicKey(publicKey);
  try {
    // request airdrop
    const signature = await connection.requestAirdrop(
      to,
      amount * LAMPORTS_PER_SOL
    );
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
    return { status: 200, message: signature };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error while airdropping SOL" };
  }
};
