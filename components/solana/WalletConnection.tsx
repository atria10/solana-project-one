import {Connection,clusterApiUrl} from "@solana/web3.js";

type Props = {};

const WalletConnection = async(props: Props) => {
  let connection = new Connection(
    clusterApiUrl("devnet"),
    "confirmed"
  );
  let slot=await connection.getSlot()
  console.log(slot)
  return <button className="btn btn-primary">Connect</button>;
};

export default WalletConnection;
