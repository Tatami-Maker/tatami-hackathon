import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { notify } from "../../utils/notifications";
import * as token from "@solana/spl-token";

type Props = {
    addresses: string[],
    supply: number,
    seq: number,
    paid: boolean,
    mode: "team" | "airdrop",
    disabled: boolean,
    mint: string
}

const Distribute: FC<Props> = ({addresses, supply, seq, paid, mode, disabled, mint}: Props) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [buttonDisable, setButtonDisable] = useState(false);
    const router = useRouter();

    const checkIfTokenAccountExists = async (
        connection: Connection,
        receiverTokenAccountAddress: PublicKey
      ) => {
        // Check if the receiver's token account exists
        try {
          await token.getAccount(
            connection,
            receiverTokenAccountAddress,
            "confirmed",
            token.TOKEN_PROGRAM_ID
          );
      
          return true;
        } catch (thrownObject) {
          const error = thrownObject as Error;
          if (error.name === "TokenAccountNotFoundError") {
            return false;
          }
          throw error;
        }
      };

    const onClick = useCallback(async() => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        if (!paid || disabled || buttonDisable || addresses.length === 0) {
            return;
        }
    
        setButtonDisable(true);

        let signature: TransactionSignature = '';
        try {
            const amount = Math.floor((supply / addresses.length) * Math.pow(10, 6));
            const sourceAccount = token.getAssociatedTokenAddressSync(new PublicKey(mint), publicKey);

            const instructions: TransactionInstruction[] = [];

            addresses.forEach(async(address) => {
                const destAccount = token.getAssociatedTokenAddressSync(new PublicKey(mint), new PublicKey(address));
                const isExist = await checkIfTokenAccountExists(connection, destAccount);

                if (!isExist) {
                    instructions.push(
                        token.createAssociatedTokenAccountInstruction(publicKey, destAccount,  new PublicKey(address), 
                        new PublicKey(mint))
                    )
                }
                
                instructions.push(token.createTransferInstruction(sourceAccount, destAccount, publicKey, amount))
            });

            let latestBlockhash = await connection.getLatestBlockhash()
    
            const tx = new Transaction().add(...instructions);

            signature = await sendTransaction(tx, connection);
    
            await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');
    
            console.log(signature);
            notify({ type: 'success', message: 'Transaction successful!', txid: signature });

            try {
                
            const res = await fetch('/api/token/update', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  seq,
                  type: 'distribution',
                  mode
                }),
              })
        
              if (!res.ok) {
                throw new Error(res.status.toString())
              }
        
              const {data} = await res.json();
              setButtonDisable(false);
              router.push('/token/'+data.seq)
            } catch (err) {
                setButtonDisable(false);
                notify({ type: 'error', message: 'error', description: err});
            }
        } catch (error: any) {
            setButtonDisable(false);
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, connection, sendTransaction, buttonDisable, addresses, disabled, mint, mode, paid,
    router,seq, supply]);
    
    return (
        <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
            bg-gradient-to-b from-[#F3BC51] to-[#936100]" onClick={onClick}>
                Distribute
        </div>
                  
    )
}

export default Distribute;