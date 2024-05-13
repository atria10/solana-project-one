import { useWallet } from "@solana/wallet-adapter-react";

type Props = {};

const Balance = (props: Props) => {
  const { publicKey } = useWallet();
  console.log(publicKey);
  if (!publicKey) {
    return;
  }
  // const balance = await getConnection().getBalance(publicKey);

  return <div className="badge badge-primary">{publicKey.toBase58()}</div>;
};

export default Balance;
