import "../styles/SendTransaction.css";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import closeImg from "/images/close.svg";
import abi from "../abi/abiRouterUniswapV2.json";
import { useToken } from "../contexts/TokenProvider";

export function SendTransaction() {
  const { writeContract } = useWriteContract();
  const { setTxModalIsOpen, currentToken } = useToken();
  const { address } = useAccount();
  const routerAddress = import.meta.env.VITE_ROUTER_ADDRESS;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = parseEther(formData.get("value") as string);

    writeContract({
      abi,
      address: routerAddress,
      functionName: "swapExactETHForTokens",
      args: [
        0,
        [routerAddress, currentToken?.address],
        address,
        Math.floor(Date.now() / 1000) + 600,
      ],
      value,
    });
  };

  return (
    <div className="tx-modal-background">
      <div className="tx-modal-container">
        <img
          src={closeImg}
          alt="close"
          id="close-img"
          onClick={() => {
            setTxModalIsOpen(false);
          }}
          onKeyDown={() => {
            setTxModalIsOpen(false);
          }}
        />
        <div className="tx-modal-header-container">
          <img src={currentToken?.image} className="tx-modal-img" alt="token" />
          <div className="tx-modal-info-container">
            <h2>{currentToken?.name}</h2>
            <h3>{currentToken?.price}$</h3>
          </div>
        </div>
        <form onSubmit={submit}>
          <input
            name="value"
            className="tx-modal-amount"
            placeholder="Entrer votre montant"
            required
          />
          <button type="submit" className="tx-modal-buy-button">
            Acheter
          </button>
        </form>
      </div>
    </div>
  );
}
