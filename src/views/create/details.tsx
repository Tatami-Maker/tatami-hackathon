import { FC, ReactNode } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';
import Image from "next/image";
import { CreateSidebar } from "components/CreateSidebar";
import { useRouter } from "next/router";
import Link from 'next/link';
import { presetLink, presetList } from ".";

type Props = {
    setImage: any,
    setTokenName: any,
    setTokenSymbol: any,
    setPage: any,
    type: any,
    setTokenSupply: any,
    tokenSupply: number
}

const TokenDetails: FC = ({setImage, setTokenName, setTokenSymbol, setTokenSupply, setPage, type, tokenSupply}: Props) => {
  const router = useRouter();

  if (type) {
  } else {
    router.push("/");
  }

    return (
        <div className="flex flex-col md:flex-row w-full mt-8">
          <div className="hidden md:inline-block z-0 absolute top-[108px] -left-8 w-1/2 h-3/4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#712E4B] via-transparent to-transparent"></div>
          <div className="hidden md:block absolute top-[64px] w-full h-2/3 z-0 homepage"></div>
          <div className="create-main w-full md:w-3/4 flex flex-col items-center gap-6 z-10">
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12 md:w-7/12 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#F3BC51] to-[#936100]"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">Token Details</h2>
                <p className="text-sm text-[#9393A9]">Style your organization and determine token&apos;s details</p>
              </div>
            </div>
          {/* Preset */}
          {
            type === 6 ?
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">The custom preset feautre coming soon.</h2>
              </div>
            </div>
            :
            type === 7 ?
              ""
            :
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Preset Details</h2>
                <hr className='border-[#2C2C5A] border-b-2 my-2'/>
                <h5 className="mt-4 mb-1 text-sm">
                  Read more about this preset here: 
                  <Link href={presetLink[type-1]} target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white ml-2">
                    {presetList[type-1]}
                  </Link>
                </h5>

              </div>
            </div>
          }
          
          {
            type === 1 ? 
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Options are under-construction. This preset will be available soon.</h2>
              </div>
            </div>
            :
            type === 4 ?
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Liquidity Pool is under-construction. This preset will be available soon.</h2>
              </div>
            </div>
            :
            type === 6 ?
              ""
            :
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Branding</h2>
                <p className="text-sm text-[#9393A9]">Name the token and add your logo</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <h5 className="mt-4 mb-1 text-sm">Token Name</h5>
                <input type="text" placeholder="e.g. Tatami Coin" className="bg-primary-content w-11/12 rounded-md h-10
                 placeholder:text-sm p-4" onChange={(e) => setTokenName(e.target.value)} />
                <h5 className="mt-4 mb-1 text-sm">Token Symbol</h5>
                <input type="text" placeholder="e.g. TCC" className="bg-primary-content w-1/2 rounded-md h-10
                 placeholder:text-sm p-4" onChange={e => setTokenSymbol(e.target.value)} />
                 <h5 className="mt-4 mb-1 text-sm">Token Supply</h5>
                <input type="text" placeholder="e.g. 100000" className="bg-primary-content w-1/2 rounded-md h-10
                 placeholder:text-sm p-4" onChange={e => setTokenSupply(parseInt(e.target.value))} 
                 value={type === 5 ? 100 : tokenSupply}/>
                <h5 className="mt-4 text-sm">Token Logo</h5>
                <p className="text-xs text-[#9393A9] mb-2">.png or .jpg upto 320 KB in size</p>
    
                <input id="file-upload" type="file" accept=".png, .jpg" onChange={(e) => setImage(e.target.files[0])}/>
              </div>
            </div>
          }
          {
            type === 2 || type === 3 || type === 5 || type === 7 ?
            <div className="border-2 border-[#2C2C5A] text-sm px-8 py-3 bg-[#1E2043] rounded-lg mb-16
              hover:cursor-pointer hover:bg-[#3b3b62] text-[#9393A9]" onClick={() => setPage(1)}>
              Save & Continue
            </div>
            : 
            <div className="border-2 border-[#2C2C5A] text-sm px-8 py-3 bg-[#1E2043] rounded-lg mb-16
              hover:cursor-pointer hover:bg-[#3b3b62] text-[#9393A9]" onClick={() => router.push('/')}>
              Back
            </div>
          }
            {/* Token Pairing
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12 md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Token Pairing</h2>
                <p className="text-sm text-[#9393A9]">Select the pairing of the token</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <h5 className="mt-3 mb-2 text-sm">Token Pair</h5>
                <label htmlFor="USDC" className="flex flex-row items-center gap-3 font-thin ml-3">
                  <input type="radio" name="coin" id="USDC" className="bg-red"/>
                  USDC
                  <div><Image src="/usdc.png" alt="usdc" width={20} height={20}/></div>
                </label>
                <label htmlFor="SOL" className="flex flex-row items-center gap-3 mt-4 font-thin ml-3">
                  <input type="radio" name="coin" id="SOL" className=""/>
                  SOL
                  <div><Image src="/solanaSmall.png" alt="solana" width={18} height={18}/></div>
                </label>
    
                <h5 className="mt-5 mb-2 text-sm">Liquidity Pool Information</h5>
                <input type="number" placeholder="USDC or SOL amount" className="bg-primary-content w-1/2 rounded-md h-10
                 placeholder:text-sm p-4"/>
    
                <h5 className="mt-5 mb-2 text-sm">Total Token Supply</h5>
                <input type="number" placeholder="e.g. 1,000,000" className="bg-primary-content w-1/2 rounded-md h-10
                 placeholder:text-sm p-4"/>
              </div>
            </div>
    
            {/* Team Options */}
            {/* <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Team Options</h2>
                <p className="text-sm text-[#9393A9]">Select the date when the team options expire</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <h5 className="mt-3 mb-1 text-sm">Date</h5>
                <input type="date" placeholder="e.g. Tatami Coin" className="bg-primary-content w-11/12 md:w-4/12 rounded-md h-10
                  text-sm px-4 text-[#9393A9]" />
                <h5 className="mt-3 mb-1 text-sm">Time</h5>
                <input type="time" placeholder="e.g. Tatami Coin" className="bg-primary-content w-11/12 md:w-4/12 rounded-md h-10
                  text-sm px-4 text-[#9393A9]" />
              </div>
            </div> */}
    
            {/* Community Options */}
            {/* <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12 md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Community Options</h2>
                <p className="text-sm text-[#9393A9]">Select the date when the community options expire</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <h5 className="mt-3 mb-1 text-sm">Date</h5>
                <input type="date" placeholder="e.g. Tatami Coin" className="bg-primary-content w-11/12 md:w-4/12 rounded-md h-10
                  text-sm px-4 text-[#9393A9]" />
                <h5 className="mt-3 mb-1 text-sm">Time</h5>
                <input type="time" placeholder="e.g. Tatami Coin" className="bg-primary-content w-11/12 md:w-4/12 rounded-md h-10
                  text-sm px-4 text-[#9393A9]" />
              </div>
            </div> */}
          </div>
          <CreateSidebar level={1} type={type}/>
        </div>
    );
}

export default TokenDetails;