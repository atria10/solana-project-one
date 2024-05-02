import { useWallet } from "@solana/wallet-adapter-react";
import { getConnection } from "./functions";

type Props = {};

const Balance = async (props: Props) => {
  const { publicKey } = useWallet();

  if (!publicKey) {
    return;
  }
  const balance = await getConnection().getBalance(publicKey);

  return <div className="badge badge-primary">{balance}</div>;
};

export default Balance;
