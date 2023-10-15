import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionMessage, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { notify } from "../../utils/notifications";

type Props = {
    payaddress: string,
    amount: number,
    seq: number,
    paid: boolean
}

const PayFee: FC<Props> = ({payaddress, amount, seq, paid}: Props) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const router = useRouter();

    const onClick = useCallback(async() => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        if (paid) {
            return;
        }
    
        let signature: TransactionSignature = '';
        try {
            const instructions = [
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(payaddress),
                    lamports: amount * LAMPORTS_PER_SOL,
                }),
            ];
    
            let latestBlockhash = await connection.getLatestBlockhash()
    
            const messageLegacy = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions,
            }).compileToLegacyMessage();
    
            const transation = new VersionedTransaction(messageLegacy)
    
            signature = await sendTransaction(transation, connection);
    
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
                  type: 'pay'
                }),
              })
        
              if (!res.ok) {
                throw new Error(res.status.toString())
              }
        
              const {data} = await res.json();
        
              router.push('/token/'+data.seq)
            } catch (err) {
                notify({ type: 'error', message: 'error', description: err});
            }
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);
    
    return (
        <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
            bg-gradient-to-b from-[#F3BC51] to-[#936100]" 
            onClick={onClick}>
            Pay Now
        </div>
                  
    )
}

export default PayFee;