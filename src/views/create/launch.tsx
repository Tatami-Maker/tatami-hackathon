import { FC, ReactNode, useState } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';
import Image from "next/image";
import StepUI from "components/StepUI";
import { CreateSidebar } from "components/CreateSidebar";
import { useRouter } from "next/router";
import { notify } from "utils/notifications";

type Props = {
  setAddresses: any;
  setMembers: any;
  addresses: string[];
  members: string[];
  tokenName: string;
  tokenSymbol: string;
  setPage: any;
  publicKey: string;
  tokenSupply: number
}

const Launch: FC = (
  {setAddresses, addresses, members, setMembers, tokenName, tokenSymbol, setPage, publicKey, tokenSupply}: Props
) => {
  const [currentAddress, setCurrentAddress] = useState<string>();
  const [currentMember, setCurrentMember] = useState<string>();
  const [disabledButton, setDisabledButton] = useState(false);

  const router = useRouter();
  const contentType = 'application/json'

  const insertAddress = (addressesArray: string[], method: any, current: string, setCurrent: any) => {
    if (current) {
      const newAddresses = [...addressesArray, current];

      if (newAddresses.length < 11) {
        method(newAddresses);
        setCurrent("")
      }
    }
  }

  const deleteAddress = (index: number, addressesArray: string[], method: any) => {
    const newAddresses = [...addressesArray];
    newAddresses.splice(index, 1);
    method(newAddresses);
  }

  const confirmToken = async() => {
    if (disabledButton) {
      return;
    }

    setDisabledButton(true);

    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({
          name: tokenName,
          symbol: tokenSymbol,
          creator: publicKey,
          supply: tokenSupply,
          addresses,
          members
        }),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        setDisabledButton(false);
        throw new Error(res.status.toString())
      }

      const {data} = await res.json();

      setDisabledButton(false);
      router.push('/token/'+data.seq)
    } catch (error) {
      setDisabledButton(false);
      notify({ type: 'error', message: 'error', description: error});
    }
  }

  return (
      <div className="flex flex-col md:flex-row w-full mt-8">
        <div className="hidden md:inline-block z-0 absolute top-[108px] -left-8 w-1/2 h-3/4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#712E4B] via-transparent to-transparent"></div>
        <div className="hidden md:block absolute top-[64px] w-full h-2/3 z-0 homepage"></div>
        <div className="create-main w-full md:w-3/4 flex flex-col items-center gap-6 z-10">
          <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12 md:w-7/12 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#F3BC51] to-[#936100]"></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">Launch</h2>
              <p className="text-sm text-[#9393A9]">Style your organization and determine token&apos;s details</p>
            </div>
          </div>
  
          {/* Airdrop */}
          <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
            <div className="p-4">
              <div className="flex flex-row w-full justify-between items-center">
                <h2 className="text-lg font-semibold">Airdrop Participants</h2>
                <h5 className="mr-2 text-sm py-2 px-6 rounded-lg border-[1px] border-[#2C2C5A] cursor-pointer">Upload CSV</h5>
              </div>
              <hr className='border-[#2C2C5A] border-[1px] my-4'/>
              <h5 className="mt-4 mb-2 text-sm">Wallet Address</h5>
              <div className="w-full flex flex-row justify-between items-center gap-2">
                <input placeholder="ex. kruH....gvZC" className="bg-primary-content w-9/12 rounded-md h-10
                  text-sm p-4" onChange={(e) => setCurrentAddress(e.target.value)} value={currentAddress} />
                <h5 className="mr-2 text-sm py-2 px-6 rounded-lg border-[1px] border-[#2C2C5A] cursor-pointer bg-[#1E2043]
                  hover:bg-gradient-to-b from-[#F3BC51] to-[#936100]" onClick={() => insertAddress(addresses, setAddresses, currentAddress, setCurrentAddress)}>Add Address</h5>
              </div>
              {addresses.length > 0 ?
                <hr className='border-[#2C2C5A] border-[1px] my-6'/>
                : ""
              }
              {
                addresses.map((address, index) => (
                  <div className="flex flex-col lg:flex-row justify-between items-center mb-2" key={index}>
                    <div className="ml-2 text-sm">{index+1}. {address}</div>
                    <h5 className="mr-2 text-sm py-2 px-4 rounded-lg border-[1px] border-[#2C2C5A] cursor-pointer"
                      onClick={() => deleteAddress(index, addresses, setAddresses)}>
                      Delete <Image src="/delete.png" alt="delete" width={14} height={20} className="inline-block ml-2" />
                    </h5>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-primary-focus border-2 border-primary-content rounded-lg w-11/12  md:w-7/12 overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-semibold">Team Members</h2>
              <hr className='border-[#2C2C5A] border-[1px] my-4'/>
              <h5 className="mt-4 mb-2 text-sm">Wallet Address</h5>
              <div className="w-full flex flex-row justify-between items-center gap-2">
                <input placeholder="ex. kruH....gvZC" className="bg-primary-content w-9/12 rounded-md h-10
                  text-sm p-4" onChange={(e) => setCurrentMember(e.target.value)} value={currentMember}/>
                <h5 className="mr-2 text-sm py-2 px-6 rounded-lg border-[1px] border-[#2C2C5A] cursor-pointer bg-[#1E2043]
                  hover:bg-gradient-to-b from-[#F3BC51] to-[#936100]" onClick={() => insertAddress(members, setMembers, currentMember, setCurrentMember)}>Add Member</h5>
              </div>
              {members.length > 0 ?
                <hr className='border-[#2C2C5A] border-[1px] my-6'/>
                : ""
              }
              {
                members.map((address, index) => (
                  <div className="flex flex-col lg:flex-row justify-between items-center mb-2" key={index}>
                    <div className="ml-2 text-sm">{index+1}. {address}</div>
                    <h5 className="mr-2 text-sm py-2 px-4 rounded-lg border-[1px] border-[#2C2C5A] cursor-pointer"
                      onClick={() => deleteAddress(index, members, setMembers)}>
                      Delete <Image src="/delete.png" alt="delete" width={14} height={20} className="inline-block ml-2" />
                    </h5>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="mb-16 flex flex-row items-start gap-1 text-[#9393A9]">

          <div className="border-2 border-[#2C2C5A] text-sm px-8 py-3 bg-[#1E2043] rounded-lg mb-16
          hover:cursor-pointer hover:bg-[#3b3b62] text-[#9393A9]" onClick={confirmToken}>
            Confirm
          </div>
          <div className=" text-sm px-8 py-3 rounded-lg mb-16
            hover:cursor-pointer hover:bg-[#3b3b62]" onClick={() => setPage(0)}>
                Back
            </div>
          </div>
        </div>
        <CreateSidebar level={3} />
      </div>
  );
}

export default Launch;