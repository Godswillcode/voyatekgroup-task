"use client";

import React from "react";
import logo from "../../images/logo.png";
import Image from "next/image";
import { Icon } from "@iconify/react";
import user from "../../images/userAvatar.png";
import { Dropdown } from "antd";
import { navbarLink } from "@/app/constant";
import { SearchBox } from "./SearchBox";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white mb-5 py-3 w-full top-0 sticky z-40 Container flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="logo" className="h-8 w-8" />
        <SearchBox />
      </div>

      <div className="lg:flex hidden items-center gap-6">
        <div className="flex items-center gap-4 text-accent">
          {navbarLink
            .filter((item) => item.position === "left")
            .map((item, index) =>
              item.clickable ? (
                <Link
                  href={item.href}
                  key={index}
                  className={` ${
                    pathname === item.href ? "text-black font-medium" : ""
                  } flex items-center flex-col gap-1 cursor-pointer hover:text-black`}
                >
                  <Icon icon={item.icon} width="22" height="22" />
                  <span className="text-[12px]">{item.name}</span>
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex items-center flex-col gap-1 cursor-pointer hover:text-black"
                >
                  <Icon icon={item.icon} width="22" height="22" />
                  <span className="text-[12px]">{item.name}</span>
                </div>
              )
            )}
        </div>
        <div className="flex items-end gap-4 ">
          <div className="bg-accent rounded h-7 w-[1.5px]" />
          <button className="bg-primary px-2 py-1 rounded text-white text-[12px]">
            Subscribe
          </button>
        </div>
        <div className="flex items-center gap-4 text-accent">
          {navbarLink
            .filter((item) => item.position === "right")
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center flex-col gap-1 cursor-pointer hover:text-black"
              >
                <Icon icon={item.icon} width="22" height="22" />
                <span className="text-[12px]">{item.name}</span>
              </div>
            ))}

          <Dropdown
            menu={{
              items: [
                { label: "Profile", key: "1" },
                { label: "Settings", key: "2" },
                { label: "Logout", key: "3" },
              ],
            }}
            trigger={["click"]}
          >
            <div className="flex items-center gap-1 cursor-pointer hover:text-black">
              <Image
                src={user}
                alt="user avatar"
                className="h-8 w-8 rounded-full"
              />
              <Icon icon="iconoir:nav-arrow-down" width="24" height="24" />
            </div>
          </Dropdown>
        </div>
      </div>

      <MobileMenu />
    </div>
  );
};
