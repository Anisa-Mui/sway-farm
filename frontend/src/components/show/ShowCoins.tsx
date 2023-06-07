import { useState, useEffect } from "react";
import { useFuel } from "../../hooks/useFuel"
import { BN } from "fuels"
import { Box } from "@fuel-ui/react";
import { cssObj } from "@fuel-ui/css";
import { CONTRACT_ID } from "../../constants";
import { ContractAbi } from "../../contracts/ContractAbi";

interface ShowCoinsProps {
  updateNum: number;
  contract: ContractAbi | null;
}

export default function ShowCoins({ updateNum, contract }: ShowCoinsProps){
    const [balance, setBalance] = useState<BN>();
    const [fuel] = useFuel();

    useEffect(() => {
        async function getAccounts() {
          const currentAccount = await fuel.currentAccount();
          const wallet = await fuel.getWallet(currentAccount)
          const walletBalance = await wallet.getBalance(CONTRACT_ID);
          setBalance(walletBalance);
        }
        async function getBalance() {
          const account = contract!.account;
          let bal = await account?.getBalance(CONTRACT_ID);
          if (bal) {
            setBalance(bal);
          }
        }
        if (fuel) getAccounts();
        if(!fuel && contract) getBalance();
      }, [fuel, updateNum, contract]);

      
    return (
        <>
            {balance && <Box css={styles}>Farm Coins: {balance.format()}</Box>}
        </>
    )
}

let styles = cssObj({
  fontFamily: 'pressStart2P',
  fontSize: '$sm'
})