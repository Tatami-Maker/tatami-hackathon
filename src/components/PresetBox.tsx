import Image from "next/image";
import { useRouter } from "next/router";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {notify} from "../utils/notifications";
import { UsersIcon, CurrencyDollarIcon, HomeIcon, EmojiHappyIcon, ChartPieIcon, QuestionMarkCircleIcon} from '@heroicons/react/solid'

type PresetBoxProps = {
  title: string;
  desc: string[];
  price: number;
  type: number;
}

const PresetBox = ({
  title,
  desc,
  price,
  type
}: PresetBoxProps) => {
  const { publicKey } = useWallet();
  const router = useRouter();

  const handleClick = () => {
    if (!publicKey) {
      return notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
    }

    router.replace("/create/?type="+type)
    
  }

    return (
        <div className="md:w-80 w-11/12 hover:cursor-pointer bg-gradient-to-b from-[#05051C] to-[#150A40] 
        border-2 border-[#2C2C5A] rounded-xl mt-2 relative m-auto" onClick={handleClick}>
          <div className="max-w-md mx-auto items-center p-4 px-6 flex flex-col mb-6">
            <div className="icon-bg">{
              type === 1 ?
              <UsersIcon className="icon-fg" />
              : type === 2 ?
              <CurrencyDollarIcon className="icon-fg" />
              : type === 3 ?
              <HomeIcon className="icon-fg" />
              : type === 4 ?
              <EmojiHappyIcon className="icon-fg" />
              : type === 5 ?
              <ChartPieIcon className="icon-fg" />
              :
              <QuestionMarkCircleIcon className="icon-fg" />
            }</div>
            <h4 className='text-lg font-semibold mb-3'>{title}</h4>
            <div className="w-full">
            <hr className='border-[#2C2C5A] border-b-2'/>
            </div>
            <p className='specs my-3'>
              <ul className='list-disc list-outside text-[#9393A9] ml-3'>
                {desc.map((item,index) => (
                    <li key={index}>{item}</li>
                ))}
                <li key={desc.length}>Read more...</li>
              </ul>
            </p>
          
          </div>
          <div className="w-full bg-[#05051C] p-1 absolute bottom-0 rounded-b-xl">
              <p className='flex flex-row h-6 gap-2 items-center p-3 my-1'>
                <div className='border-2 border-[#2C2C5A] rounded-full w-7 h-7'>
                  <Image src="/solanaSmall.png" alt="solana icon"  width={16} height={16} className="m-1 my-1.5"/>
                </div>
                <p>{price} SOL</p>
              </p>
            </div>
        </div>
    )
}

export default PresetBox;