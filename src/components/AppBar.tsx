import { FC } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import NavElement from './nav-element';
import Image from 'next/image';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
);

export const AppBar: React.FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      {/* NavBar / Header */}
      <div className="navbar flex h-16 flex-row md:mb-2 shadow-lg bg-[#0F0F27] text-neutral-content border-b border-[#212139]">
        <div className="navbar-start align-items-center">
          <Image src="/logo.png" alt="logo" width={28} height={28} className="hidden sm:inline-flex lg:ml-40"/>
          <div className="hidden sm:inline w-22 h-22 md:p-2">
            <Link href="/" className="text-secondary hover:text-white flex flex-row gap-2">
              <h1 className='text-2xl font-bold text-white'>Tatami</h1>
            </Link>
          </div>
          <WalletMultiButtonDynamic className="
            btn-ghost ml-8 relative flex md:hidden px-4 bg-[#1E2043] border-[#2C2C5A] border-2 rounded-md font-normal text-[#b0b0c2] h-9" />
          <div className="hidden md:inline-flex align-items-center justify-items gap-12 ml-12">
            <NavElement
              label="Create Token"
              href="/create/?type=7"
            />
            <NavElement
              label="Shop"
              href="/"
            />
            <NavElement
              label="Learn"
              href="/"
            />
        </div>
        </div>

        {/* Nav Links */}
        {/* Wallet & Settings */}
        <div className="navbar-end">
          <div className='social hidden sm:flex flex-row gap-4 mr-4 bg-[#1E2043] py-2 px-4 border-[#2C2C5A] border-2 rounded-md'>
          <Link href="https://discord.gg/cbEm9mcZfQ" target="_blank" rel="noopener noreferrer" passHref>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5535 2.81854C12.5178 2.33396 11.4104 1.98178 10.2526 1.78125C10.1104 2.03832 9.94429 2.38409 9.82976 2.65915C8.599 2.47406 7.37956 2.47406 6.17144 2.65915C6.05693 2.38409 5.88704 2.03832 5.74357 1.78125C4.58454 1.98178 3.47584 2.33525 2.44013 2.8211C0.351095 5.97791 -0.215207 9.0563 0.0679444 12.091C1.4535 13.1257 2.79627 13.7542 4.11638 14.1655C4.44233 13.7169 4.73302 13.2401 4.98345 12.7375C4.5065 12.5563 4.04969 12.3326 3.61805 12.073C3.73256 11.9882 3.84457 11.8995 3.95279 11.8082C6.58546 13.0396 9.44593 13.0396 12.0472 11.8082C12.1566 11.8995 12.2686 11.9882 12.3819 12.073C11.949 12.3339 11.4909 12.5576 11.014 12.7388C11.2644 13.2401 11.5538 13.7182 11.881 14.1668C13.2024 13.7555 14.5464 13.127 15.932 12.091C16.2642 8.57301 15.3644 5.52289 13.5535 2.81854ZM5.34212 10.2247C4.55181 10.2247 3.9037 9.48688 3.9037 8.58843C3.9037 7.68998 4.53797 6.95091 5.34212 6.95091C6.14628 6.95091 6.79437 7.68868 6.78053 8.58843C6.78178 9.48688 6.14628 10.2247 5.34212 10.2247ZM10.6578 10.2247C9.86752 10.2247 9.21941 9.48688 9.21941 8.58843C9.21941 7.68998 9.85366 6.95091 10.6578 6.95091C11.462 6.95091 12.1101 7.68868 12.0962 8.58843C12.0962 9.48688 11.462 10.2247 10.6578 10.2247Z" fill="#9393A9"/>
          </svg></Link>
          <Link href="/" target="_blank" rel="noopener noreferrer" passHref>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99812 4.66567C5.71277 4.66567 4.66383 5.71463 4.66383 7C4.66383 8.28537 5.71277 9.33433 6.99812 9.33433C8.28346 9.33433 9.3324 8.28537 9.3324 7C9.3324 5.71463 8.28346 4.66567 6.99812 4.66567ZM13.9992 7C13.9992 6.03335 14.008 5.07545 13.9537 4.11055C13.8994 2.98979 13.6437 1.99512 12.8242 1.17556C12.0029 0.35426 11.01 0.100338 9.88927 0.0460516C8.92263 -0.00823506 7.96475 0.000520879 6.99987 0.000520879C6.03323 0.000520879 5.07536 -0.00823506 4.11047 0.0460516C2.98973 0.100338 1.99508 0.356011 1.17554 1.17556C0.354253 1.99687 0.100336 2.98979 0.0460508 4.11055C-0.00823491 5.0772 0.00052087 6.0351 0.00052087 7C0.00052087 7.9649 -0.00823491 8.92455 0.0460508 9.88945C0.100336 11.0102 0.356004 12.0049 1.17554 12.8244C1.99683 13.6457 2.98973 13.8997 4.11047 13.9539C5.07711 14.0082 6.03499 13.9995 6.99987 13.9995C7.9665 13.9995 8.92438 14.0082 9.88927 13.9539C11.01 13.8997 12.0047 13.644 12.8242 12.8244C13.6455 12.0031 13.8994 11.0102 13.9537 9.88945C14.0097 8.92455 13.9992 7.96665 13.9992 7ZM6.99812 10.5917C5.01056 10.5917 3.40651 8.98759 3.40651 7C3.40651 5.01241 5.01056 3.40832 6.99812 3.40832C8.98567 3.40832 10.5897 5.01241 10.5897 7C10.5897 8.98759 8.98567 10.5917 6.99812 10.5917ZM10.7368 4.10004C10.2728 4.10004 9.89802 3.72529 9.89802 3.26122C9.89802 2.79716 10.2728 2.42241 10.7368 2.42241C11.2009 2.42241 11.5756 2.79716 11.5756 3.26122C11.5758 3.37142 11.5542 3.48056 11.5121 3.58239C11.47 3.68422 11.4082 3.77675 11.3303 3.85467C11.2523 3.93258 11.1598 3.99437 11.058 4.03647C10.9562 4.07858 10.847 4.10018 10.7368 4.10004Z" fill="#9393A9"/>
          </svg></Link>
          <Link href="https://twitter.com/tatamimaker" target="_blank" rel="noopener noreferrer" passHref>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.33349 5.92867L13.5459 0H12.3109L7.78291 5.14671L4.16908 0H0L5.46604 7.78342L0 14H1.235L6.01369 8.56363L9.83092 14H14L8.33349 5.92867ZM6.64142 7.85175L6.08675 7.07621L1.68037 0.911025H3.57759L7.13472 5.88837L7.68705 6.66391L12.3103 13.1334H10.4131L6.64142 7.85175Z" fill="#9393A9"/>
          </svg></Link>

          </div>
          <div className="hidden md:inline-flex align-items-center justify-items gap-6">
            <WalletMultiButtonDynamic className="
            btn-ghost h-9 mr-6 px-4 bg-[#1E2043]  border-2 rounded-md font-normal text-[#b0b0c2]" />
        </div>
          <label
              htmlFor="my-drawer"
              className="btn-gh items-center justify-between md:hidden mr-6"
              onClick={() => setIsNavOpen(!isNavOpen)}>
              <div className="HAMBURGER-ICON space-y-2.5 ml-5">
              <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
              <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
              <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
            </div>
            <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
              style={{ transform: "rotate(45deg)" }}>
            </div>
            <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
              style={{ transform: "rotate(135deg)" }}>
            </div>
        </label>
      <div>
        <span className="absolute block h-0.5 w-12 bg-zinc-600 rotate-90 right-14"></span>
      </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-square btn-ghost text-right mr-4">
            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52">
            <li>
              <div className="form-control bg-opacity-100">
                <label className="cursor-pointer label">
                  <a>Autoconnect</a>
                  <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle" />
                </label>
                <NetworkSwitcher />
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};
