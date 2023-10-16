import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram,
    VersionedTransaction, TransactionMessage, TransactionSignature, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { notify } from "../../utils/notifications";
import * as token from "@solana/spl-token";
import {Metaplex, bundlrStorage, walletAdapterIdentity, toMetaplexFileFromBrowser} from "@metaplex-foundation/js";
import idl from "../../idls/governance.json";
import GovernanceIdl from 'idls/governance';
import { AnchorProvider, Idl, Program, BN } from '@coral-xyz/anchor';

type Props = {
    name: string,
    supply: number,
    paid: boolean,
    seq: number,
    disabled: boolean,
    mint: string
}

const Governance: FC<Props> = ({name, supply, paid, seq, disabled, mint}: Props) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [buttonDisable, setButtonDisable] = useState(false);
    const wallet = useWallet();
    const router = useRouter();

    const provider = new AnchorProvider(connection, wallet, {});
    const programId = new PublicKey(idl.metadata.address);
    const program = new Program(idl as GovernanceIdl, programId, provider);

    const onClick = useCallback(async() => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        if (!paid || disabled || buttonDisable) {
            return;
        }

        setButtonDisable(true);

        const mintAccount = new PublicKey(mint);
        const councilMint = Keypair.generate();
        const tokenAccount = token.getAssociatedTokenAddressSync(mintAccount, publicKey);

        const [realmAccount] = PublicKey.findProgramAddressSync([
            Buffer.from("governance"), 
            Buffer.from(name+" DAO")
        ], programId);
    
        const [communityTokenHoldingAccount] = PublicKey.findProgramAddressSync([
            Buffer.from("governance"), 
            realmAccount.toBytes(),
            mintAccount.toBytes()
        ], programId);
    
        const [councilTokenHoldingAccount] = PublicKey.findProgramAddressSync([
            Buffer.from("governance"), 
            realmAccount.toBytes(),
            councilMint.publicKey.toBytes()
        ], programId);
        
        const [realmConfig] = PublicKey.findProgramAddressSync([
            Buffer.from("realm-config"), 
            realmAccount.toBytes()
        ], programId);   
        
        const [tokenOwnerRecord] = PublicKey.findProgramAddressSync([
            Buffer.from("governance"),
            realmAccount.toBytes(),
            mintAccount.toBytes(),
            publicKey.toBytes()
        ], programId)

        const createMintAccountIx = SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: councilMint.publicKey,
            lamports: LAMPORTS_PER_SOL * 0.0016,
            space: 82,
            programId: token.TOKEN_PROGRAM_ID
        });
        const createMintIx = token.createInitializeMint2Instruction(councilMint.publicKey, 6, publicKey, null);

        const createRealmIx = await program.methods.createRealm(
            { createRealm: {} },
            name+" DAO", 
            {
                useCouncilMint: true,
                minCommunityWeightToCreateGovernance: new BN(1000000),
                communityTokenConfigArgs: {
                    useVoterWeightAddin: false,
                    useMaxVoterWeightAddin: false,
                    tokenType: {
                        liquid: {}
                    }
                },
                councilTokenConfigArgs: {
                    useVoterWeightAddin: false,
                    useMaxVoterWeightAddin: false,
                    tokenType: {
                        membership: {}
                    }
                },
                communityMintMaxVoterWeightSource: {
                    supplyFraction: [new BN(10000000000)]
                }
            })
        .accounts({
            realmAccount,
            realmAuthority: publicKey,
            communityTokenMint: mintAccount,
            tokenHoldingAccount: communityTokenHoldingAccount,
            payer: publicKey,
            systemProgram: SystemProgram.programId,
            splTokenProgram: token.TOKEN_PROGRAM_ID,
            sysVarRent: SYSVAR_RENT_PUBKEY,
            councilTokenMint: councilMint.publicKey,
            councilTokenHolding: councilTokenHoldingAccount,
            realmConfig,
            communityVoterWeight: null,
            councilVoterWeight: null,
            maxCommunityVoterWeight: null,
            maxCouncilVoterWeight: null,
        })
        .instruction();
        
        const depositGovernanceIx = await program.methods.depositGoverningTokens(
            {depositGoverningTokens: {}},
            new BN(supply * Math.pow(10,6))
        )
        .accounts({
            realmAccount,
            tokenHolding: communityTokenHoldingAccount,
            tokenSource: tokenAccount,
            tokenOwnerAccount: publicKey,
            tokenSourceAccount: publicKey,
            tokenRecordAccount: tokenOwnerRecord,
            payer: publicKey,
            systemProgram: SystemProgram.programId,
            splTokenProgram: token.TOKEN_PROGRAM_ID,
            realmConfig
        })
        .instruction();

        createRealmIx.data = createRealmIx.data.subarray(8);
        depositGovernanceIx.data = depositGovernanceIx.data.subarray(8);

        let signature: TransactionSignature = '';
        try {
            const instructions = [
                createMintAccountIx,
                createMintIx,
                createRealmIx,
                depositGovernanceIx
            ];
    
            let latestBlockhash = await connection.getLatestBlockhash()
    
            const messageLegacy = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions,
            }).compileToLegacyMessage();
    
            const transation = new VersionedTransaction(messageLegacy);
            transation.sign([councilMint]);
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
                        type: 'dao',
                        dao: realmAccount.toBase58()
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
    }, [publicKey, connection, sendTransaction, buttonDisable, mint, disabled, name, paid, program.methods, 
    programId, router, seq, supply]);
    
    return (
        <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
            bg-gradient-to-b from-[#F3BC51] to-[#936100]" onClick={onClick}
            >Create</div>    
                  
    )
}

export default Governance;