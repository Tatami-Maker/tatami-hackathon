import { FC, ReactNode } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';
import Image from "next/image";
import { CreateSidebar } from "components/CreateSidebar";
import Token, {Tokens} from "../../model/token";

type Props = {
    token: Tokens
}

export const TokenView: FC<Props> = ({token}: Props) => {
    const paid = token.paid;

    return (
        <div className="flex flex-col md:flex-row w-full mt-8">
          <div className="hidden md:inline-block z-0 absolute top-[108px] -left-8 w-1/2 h-3/4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#712E4B] via-transparent to-transparent"></div>
          <div className="hidden md:block absolute top-[64px] w-full h-2/3 z-0 homepage"></div>
          <div className="create-main w-full md:w-5/6 flex flex-col items-center gap-6 z-10">
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12 md:w-7/12 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#F3BC51] to-[#936100]"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">Token Dashboard</h2>
                <p className="text-sm text-[#9393A9]">Pay the platform fee and manage your token</p>
              </div>
            </div>
    
            {/* Token Info */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Token Info</h2>
                <p className="text-sm text-[#9393A9]">Name the token and logo details</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-10 items-baseline">
                  <h5 className="mt-4 mb-1 text-md">Token Name</h5>
                  <h6 className="text-[#9393A9] text-sm">{token.name}</h6>
                </div>
                <div className="flex flex-row w-full gap-7 items-baseline">
                  <h5 className="mt-4 mb-1 text-md">Token Symbol</h5>
                  <h6 className="text-[#9393A9] text-sm">{token.symbol}</h6>
                </div>
                <div className="flex flex-row gap-12 items-start">
                  <h5 className="mt-4 text-sm">Token Logo</h5>
                  <div><Image src="/usdc.png" width={40} height={40} alt="Image not selected" className="text-xs mt-3"/></div>
                </div>
              </div>
            </div>

            {/* Plaform Fee */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Platform Fee</h2>
                <p className="text-sm text-[#9393A9]">Pay the fees to initiate your token management</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-4 items-baseline">
                  <h5 className="mb-1 text-md">Classic Meme Coin Build</h5>
                  <h5 className="flex flex-row items-center gap-3 font-thin ">
                  <div><Image src="/solanaSmall.png" alt="solana" width={14} height={14}/></div>
                    2 SOL
                  </h5>
                </div>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-col md:flex-row">
                  <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
                    bg-gradient-to-b from-[#F3BC51] to-[#936100]">Pay Now</div>
                  <div className="inline-block text-sm py-3 px-4 rounded-lg cursor-pointer
                    text-[#9393A9]">Refresh</div>
                </div>
                <p className={`${paid ? "text-green-400" : "text-red-400"} text-sm pt-4 pl-1`}>
                  {paid ? "Your payment is confirmed" : "You haven't paid yet!"}
                </p>
              </div>
            </div>

            {/* Create Token */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Create Token</h2>
                <p className="text-sm text-[#9393A9]">Click the button below and confirm the transaction to create token</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-4 items-baseline">
                  <h5 className="mt-2 mb-1 text-md">Create your Token: </h5>
                  <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
                  bg-gradient-to-b from-[#F3BC51] to-[#936100]">Create</div>
                  <h5 className="border-[1px] border-[#2C2C5A] py-1 px-3 rounded-full 
                    cursor-pointer hover:bg-slate-400">?</h5>                  
                </div>
              </div>
            </div>

            {/* Distribute Tokens to Team Members */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <div className="flex flex-col md:flex-row w-full justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">Team Management</h2>
                    <p className="text-sm text-[#9393A9]">Distribute tokens to the team members</p>
                  </div>
                  <h5 className="mr-2 text-sm py-2 px-6 rounded-lg border-[1px] border-[#2C2C5A] cursor-pointer">View Team Members</h5>
                </div>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-4 items-baseline">
                  <h5 className="mt-2 mb-1 text-md">Distrubte tokens to team: </h5>
                  <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
                  bg-gradient-to-b from-[#F3BC51] to-[#936100]">Distribute</div>                  
                </div>
              </div>
            </div>

            {/* Airdrop Tokens */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <div className="flex flex-col md:flex-row w-full justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">Airdrop</h2>
                    <p className="text-sm text-[#9393A9]">Distribute tokens to the users</p>
                  </div>
                  <h5 className="mr-2 text-sm py-2 px-6 rounded-lg border-[1px] border-[#2C2C5A] cursor-pointer">View Participants</h5>
                </div>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-4 items-baseline">
                  <h5 className="mt-2 mb-1 text-md">Initiate airdrop to the participants: </h5>
                  <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
                  bg-gradient-to-b from-[#F3BC51] to-[#936100]">Start</div>                  
                </div>
              </div>
            </div>

            {/* Governance */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Governance</h2>
                <p className="text-sm text-[#9393A9]">Initiate the DAO and deposit the tokens</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-4 items-baseline">
                  <h5 className="mt-2 mb-1 text-md">Create the DAO for your token: </h5>
                  <div className="inline-block text-sm py-3 px-8 rounded-lg cursor-pointer
                  bg-gradient-to-b from-[#F3BC51] to-[#936100]">Create</div>                  
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Options</h2>
                <p className="text-sm text-[#9393A9]">Dual Option powered Options for your token</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-4 items-baseline">
                  <h5 className="mt-2 mb-1 text-md">coming soon...</h5>
                </div>
                </div>
            </div>

            {/* Liquidity Pool */}
            <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12 md:w-7/12 overflow-hidden mb-4">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Liqidity Pool</h2>
                <p className="text-sm text-[#9393A9]">Setup liquidity pool for your token</p>
                <hr className='border-[#2C2C5A] border-b-2 my-4'/>
                <div className="flex flex-row w-full gap-4 items-baseline">
                  <h5 className="mt-2 mb-1 text-md">coming soon...</h5>
                </div>
                </div>
            </div>
        </div>
        </div>
    );
}