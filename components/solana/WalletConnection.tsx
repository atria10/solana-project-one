import { getConnection, MY_KEYPAIR } from "./functions";
type Props = {};

const WalletConnection = async (props: Props) => {
  const slot = await getConnection().getSlot();
  const version = await getConnection().getVersion();
  const blockTime = await getConnection().getBlockTime(slot);
  // generate a wallet address for testing
  const publicKey = MY_KEYPAIR.publicKey;
  const secretKey = MY_KEYPAIR.secretKey;
  const balance = await getConnection().getBalance(publicKey);
  console.log({
    slot,
    version,
    blockTime,
    publicKey: publicKey.toBase58(),
    secretKey: secretKey.toString(),
    balance,
  });
  return <button className="btn btn-primary">Connect</button>;
};

export default WalletConnection;
