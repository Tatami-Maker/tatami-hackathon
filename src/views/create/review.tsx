import { FC, ReactNode } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';
import Image from "next/image";
import { CreateSidebar } from "components/CreateSidebar";

type Props = {
    img: any,
    tokenName: string,
    tokenSymbol: string,
    setPage: any,
    tokenSupply: number
}

const Review: FC = ({img, tokenName, tokenSymbol, tokenSupply, setPage}: Props) => {
    return (
        <div className="flex flex-col md:flex-row w-full mt-8">
          <div className="hidden md:inline-block z-0 absolute top-[108px] -left-8 w-1/2 h-3/4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#712E4B] via-transparent to-transparent"></div>
          <div className="hidden md:block absolute top-[64px] w-full h-2/3 z-0 homepage"></div>
          <div className="create-main w-full md:w-3/4 flex flex-col items-center gap-6 z-10">
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12 md:w-7/12 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#F3BC51] to-[#936100]"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">Review</h2>
                <p className="text-sm text-[#9393A9]">Style your organization and determine token&apos;s details</p>
              </div>
            </div>
    
            {/* Branding */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Branding</h2>
                <p className="text-sm text-[#9393A9]">Name the token and add your logo</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-10 items-baseline">
                    <h5 className="mt-4 mb-1 text-md">Token Name</h5>
                    <h6 className="text-[#9393A9] text-sm">{tokenName ? tokenName : "No Name Selected"}</h6>
                </div>
                
                <div className="flex flex-row w-full gap-10 items-baseline">
                    <h5 className="mt-4 mb-1 text-sm">Token Symbol</h5>
                    <h6 className="text-[#9393A9] text-sm">{tokenSymbol ? tokenSymbol : "No Symbol Selected"}</h6>
                </div>

                <div className="flex flex-row w-full gap-10 items-baseline">
                    <h5 className="mt-4 mb-1 text-sm">Token Supply</h5>
                    <h6 className="text-[#9393A9] text-sm">{tokenSupply ? tokenSupply : "Supply not entered"}</h6>
                </div>

                <div className="flex flex-row gap-14 items-start">
                    <h5 className="mt-4 text-sm">Token Logo</h5>
                    <div><Image src={img ? URL.createObjectURL(img) : ""} width={40} height={40} alt="Image not selected" className="text-xs mt-3"/></div>
                </div>
              </div>
            </div>
            <div className="mb-16 flex flex-row items-start gap-1 text-[#9393A9]">
                <div className="border-2 border-[#2C2C5A] text-sm px-8 py-3 bg-[#1E2043] rounded-lg
                hover:cursor-pointer hover:bg-[#3b3b62]" onClick={() => setPage(2)}>
                    Save & Continue
                </div>
                <div className=" text-sm px-8 py-3 rounded-lg mb-16
                hover:cursor-pointer hover:bg-[#3b3b62]" onClick={() => setPage(0)}>
                    Back
                </div>
            </div>
          </div>
          <CreateSidebar level={2}/>
        </div>
    );
}

export default Review;