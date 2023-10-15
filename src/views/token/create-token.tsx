import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram,
    VersionedTransaction, TransactionMessage, TransactionSignature, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { notify } from "../../utils/notifications";
import * as token from "@solana/spl-token";
import {Metaplex, bundlrStorage, walletAdapterIdentity, toMetaplexFileFromBrowser} from "@metaplex-foundation/js";
import idl from "../../idls/metadata.json";
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';

type Props = {
    symbol: string,
    name: string,
    supply: number,
    img: any,
    paid: boolean,
    seq: number,
    disabled: boolean
}

const CreateToken: FC<Props> = ({symbol, name, supply, img, paid, seq, disabled}: Props) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [buttonDisable, setButtonDisable] = useState(false);
    const wallet = useWallet();
    const router = useRouter();

    const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: connection.rpcEndpoint,
        timeout: 60000,
    }));

    const provider = new AnchorProvider(connection, wallet, {});
    const programId = new PublicKey(idl.metadata.address);
    const program = new Program(idl as Idl, programId, provider);

    const onClick = useCallback(async() => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        if (!paid || disabled || buttonDisable) {
            return;
        }

        if (!img) {
            alert("Upload an image for your token before proceeding");
            return;
        }

        setButtonDisable(true);

        const mintAccount = Keypair.generate();
        const tokenAccount = token.getAssociatedTokenAddressSync(mintAccount.publicKey, publicKey);
        const metadata = metaplex.nfts().pdas().metadata({mint: mintAccount.publicKey});
        const createMintAccountIx = SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintAccount.publicKey,
            lamports: LAMPORTS_PER_SOL * 0.0016,
            space: 82,
            programId: token.TOKEN_PROGRAM_ID
        });

        const {uri} = await metaplex.nfts().uploadMetadata({
            name,
            image: await toMetaplexFileFromBrowser(img),
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: await toMetaplexFileFromBrowser(img),
                    },
                ]
            }
        });

        const createMintIx = token.createInitializeMint2Instruction(mintAccount.publicKey, 6, publicKey, null);
        const createAccountIx = token.createAssociatedTokenAccountInstruction(publicKey, tokenAccount, publicKey, mintAccount.publicKey);
        const createSupplyIx = token.createMintToInstruction(mintAccount.publicKey, tokenAccount, publicKey, supply * Math.pow(10,6));
        
        const data = {
            name,
            symbol,
            uri,
            sellerFeeBasisPoints: 0,
            collection: null,
            creators: [
                {address: publicKey, verified: true, share: 100}
            ],
            uses: null
        }


        const createMetadataIx = await program.methods.createMetadataAccountV3(33, {
            data,
            collectionDetails: null,
            isMutable: true
        })
        .accounts({
            metadata,
            mint: mintAccount.publicKey,
            mintAuthority: publicKey,
            payer: publicKey,
            updateAuthority: publicKey,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
        }).instruction();
       
        createMetadataIx.data = createMetadataIx.data.subarray(8)
        
        let signature: TransactionSignature = '';
        try {
            const instructions = [
                createMintAccountIx,
                createMintIx,
                createAccountIx,
                createSupplyIx,
                createMetadataIx
            ];
    
            let latestBlockhash = await connection.getLatestBlockhash()
    
            const messageLegacy = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions,
            }).compileToLegacyMessage();
    
            const transation = new VersionedTransaction(messageLegacy)
            transation.sign([mintAccount]);
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
                        type: 'token',
                        mint: mintAccount.publicKey.toBase58()
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
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error}`, signature);
            setButtonDisable(false);
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);
    
    return (
        <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
            bg-gradient-to-b from-[#F3BC51] to-[#936100]" onClick={onClick}>
            Create
        </div>
                  
    )
}

export default CreateToken;