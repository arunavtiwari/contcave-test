"use client";
import React from "react";
import Image from "next/image";
import { useState } from 'react';
import Heading from "@/components/Heading";
import Sidebar from "@/components/Sidebar";

type Props = {};

const ProfileShareClient = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Share and Refer");

  const handleCopy = () => {
    const textToCopy = "This is the text to copy";
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy text: ", err));
  };
  return (

    <div className="flex">
      {/* Sidebar */}
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuType="profile" />

      <div className="flex flex-col sm:p-8 sm:pt-12 w-full gap-5 sm:border-l-2 border-gray-200">
        <Heading title="Share with Friends and Earn Rewards 🙌" subtitle="Refer your friends to ContCave and both of you can earn
          rewards"></Heading>
        <div className="space-y-12">
          <div className="relative">
            <div className="text-base font-semibold text-slate-950">How It Works:</div>
            <ul className="mt-2 list-decimal pl-4">
              <li>Share your unique referral link or code with friends.</li>
              <li>When someone signs up and books their first space using your referral link or code, you both earn
                rewards!</li>
            </ul>
          </div>
          <div className="relative">
            <div className="text-base font-semibold text-slate-950">Your Referral Link:</div>
            <div className="flex">
              <div className="flex items-center bg-gray-200 w-2/4 py-2.5 px-5 mt-4 rounded-full justify-between">
                <div className="text-base">[Your Unique Referral Link]</div>
                <div className="w-6 h-6 cursor-pointer hover:scale-105" onClick={handleCopy}>
                  <Image src="/assets/share.svg" alt="Share" width={40} height={40} className="w-full h-full object-contain" />
                </div>
              </div>
              {copied && <span className="font-bold flex items-center py-2.5 px-4 mt-3">Copied!</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center xl:justify-end lg:justify-end md:justify-end justify-between xl:text-right lg:text-right md:text-right text-left mt-10 xl:flex-nowrap lg:flex-nowrap md:flex-wrap flex-wrap">
          <div className="text-lg pr-4"> Copy and share it with your friends now!</div>
          <ul className="flex items-center space-x-4">
            <li className="w-7 h-7 cursor-pointer hover:scale-105">
              <Image src="/assets/messages.png" width={30} height={30} alt="" className="w-full h-full object-contain" />
            </li>
            <li className="w-7 h-7 cursor-pointer hover:scale-105">
              <Image src="assets/Instagram.svg" width={30} height={30} alt="" className="w-full h-full object-contain" />
            </li>
            <li className="w-7 h-7 cursor-pointer hover:scale-105">
              <Image src="assets/WhatsApp.svg" width={30} height={30} alt="" className="w-full h-full object-contain" />
            </li>
          </ul>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 " />

        <div className="relative mt-8">
          <div className="text-xl font-bold text-slate-950">Promote and Earn 🎉</div>
          <p className="pt-4 text-base font-normal leading-tight">If you're an influencer or content creator with a following, you can promote ContCave while shooting at our properties and earn benefits/discounts.</p>
          <div className="space-y-8 mt-8">
            <div className="relative">
              <div className="text-lg font-semibold text-slate-950 mb-2">How It Works:</div>
              <ul className="list-decimal font-normal text-slate-800 pl-6">
                <li>Shoot content at one of our featured properties and tag us in your posts or videos.</li>
                <li>Share your content with your audience and mention your experience with us.</li>
                <li>Contact us with links to your posts or videos to claim your rewards!</li>
              </ul>
            </div>
            <div className="relative">
              <div className="text-lg font-semibold text-slate-950 mb-2">Benefits for Influencers:</div>
              <ul className="list-disc font-normal text-slate-800 pl-6">
                <li>Exclusive discounts on future bookings.</li>
                <li>Featured promotion on our platform and social media channels.</li>
                <li>Potential collaboration opportunities.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center xl:justify-end lg:justify-end md:justify-end justify-between xl:text-right lg:text-right md:text-right text-left mt-16  xl:flex-nowrap lg:flex-nowrap md:flex-wrap flex-wrap">
          <div className="text-lg pr-4"> Follow and Tag Us Now!</div>
          <ul className="flex items-center space-x-2">
            <li className="w-8 h-8">
              <Image src="assets/Instagram.svg" width={30} height={40} alt="" className="w-full h-full object-contain" />
            </li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default ProfileShareClient;
