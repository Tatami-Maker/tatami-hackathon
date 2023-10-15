// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import PresetBox from 'components/PresetBox';

export const HomeView: FC = ({ }) => {
  return (
    <div className="w-full md:grid place-items-center row-start-1 col-start-1 mx-auto homepage-main">
      <div className="hidden md:inline-block z-0 absolute top-[108px] -left-8 w-1/2 h-3/4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#712E4B] via-transparent to-transparent"></div>
      <div className="hidden md:block absolute top-[64px] w-full h-2/3 z-0 homepage"></div>
      {/* <div className="hidden md:block w-full absolute bottom-0">
        <Image src="/background_blue.png" className='relative left-[60%] w-2/5 homepage-two'
        alt='bg' width={0} height={0}  />
      </div> */}
      <div className="md:hero-content flex flex-col presets-div">
        <div className='mt-4 flex flex-row gap-4 items-center justify-center'>
        <p className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="icon"
            width={60}
            height={60}
          />
        </p>
        <h1 className="text-center text-4xl font-bold">
          Tatami
        </h1>
        </div>
        <p className="text-center text-slate-400 mt-4 md:mt-0 mb-4">
          The Complete Token Launch Suite
        </p>
        <div className='grid grid-rows-6 md:grid-rows-3 lg:grid-rows-2 grid-flow-col md:gap-8 mb-8'>
        <PresetBox 
          title='Investment DAO'
          desc={["2% alloted to the Team", "98% allocated to DAO treasury",
          "DAO governed by investors"]}
          price={2}
          type={2}
        />
        <PresetBox 
          title='Common Interest DAO'
          desc={["The fixed supply of 100 tokens", "1 allocated to each address",
          "DAO governed by the holders"]}
          price={3}
          type={5}
        />
        <PresetBox 
          title='Early Stage DAO'
          desc={["100% allocated to the Team",
          "Team decides the DAO's direction",
          "Team issues further tokens"]}
          price={3}
          type={3}
        />
        <PresetBox 
          title='Crowdsource Token'
          desc={["1% Options allocated to Team", "99% Options allocated to AllStars",
          "DAO governed by holders"]}
          price={3}
          type={1}
        />
        <PresetBox 
          title='Memecoin'
          desc={["89% allocated to the Allstar list", "10% added in the liquidity pool",
          "1% allocated to the team"]}
          price={3}
          type={4}
        />
        <PresetBox 
          title='Your Preset?'
          desc={["Didn't find the suitable preset?", "Create your own tokenomics","coming soon on Tatami"]}
          price={3}
          type={6}
        />
        </div>
      </div>
    </div>
  );
};
