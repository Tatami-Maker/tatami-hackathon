import { FC, useState } from "react";
import TokenDetails from "./details";
import Launch from "./launch";
import Review from "./review";

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from "next/router";

export const CreateView: FC = ({ }) => {
  const [tokenName, setTokenName] = useState<string>();
  const [tokenSymbol, setTokenSymbol] = useState<string>();
  const [tokenSupply, setTokenSupply] = useState<number>();

  const [img, setImg] = useState<any>();
  const [page, setPage] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);

  const wallet = useWallet();
  const router = useRouter();

  if (!wallet.publicKey) {
    router.push('/');
  }

  const type = parseInt(router.query.type as string);

  return (
    <div className="">
      {
        page === 0 ? 
        <TokenDetails setImage={setImg} setTokenName={setTokenName} setTokenSymbol={setTokenSymbol} setPage={setPage}
        type={type} setTokenSupply={setTokenSupply} tokenSupply={tokenSupply}/>
        :
        page === 1 ?
        <Review img={img} tokenName={tokenName} tokenSymbol={tokenSymbol} 
          tokenSupply={type === 5 ? 100 : tokenSupply} setPage={setPage} type={type} />
        :
        <Launch setAddresses={setAddresses} addresses={addresses} setMembers={setMembers} members={members}
         tokenName={tokenName} tokenSymbol={tokenSymbol} setPage={setPage} tokenSupply={tokenSupply}
         publicKey={wallet.publicKey.toBase58()} type={type} />
      }
    </div>
  )
};

export const presetList = [
  "CrowdSource Token",
  "Investment DAO",
  "Early Stage DAO",
  "Classic Memecoin",
  "Common Interest DAO",
  "Custom",
  "Basic Token",
]

export const presetLink = [
  "https://github.com/Tatami-Maker/documentation/blob/main/Crowdsource%20Token.md",
  "https://github.com/Tatami-Maker/documentation/blob/main/Investment%20DAO%20Preset.md",
  "https://github.com/Tatami-Maker/documentation/blob/main/Early%20Stage%20DAO%20Preset%20-%20Documentation.md",
  "https://github.com/Tatami-Maker/documentation/blob/main/Memecoin%20Preset.md",
  "https://github.com/Tatami-Maker/documentation/blob/main/Common%20Interest%20DAO%20Preset.md",
  "",""
]