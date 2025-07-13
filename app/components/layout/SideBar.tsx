"use client";

import "./style.css";
import { sidebarLink } from "@/app/constant";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const SideBar = () => {
  const pathname = usePathname();
  return (
    <>
      <div
        className={`h-screen shadow-sm overflow-y-auto ml-7 mr-4 bg-white border-r text-[#2C445D] sidebar w-[228px]`}
      >
        {sidebarLink.map((item, index) =>
          item.clickable ? (
            <div className="navLinkWrap mt-6" key={index}>
              <Link
                href={item.href}
                className={`navLink group ${
                  pathname === item.href ? "active" : ""
                }`}
              >
                <Icon
                  icon={item.icon}
                  className={`navIcon ${
                    pathname === item.href
                      ? "active"
                      : "group-hover:text-primary"
                  }`}
                />
                <span className="group-hover:text-primary">{item.name}</span>
              </Link>
            </div>
          ) : (
            <div className="navLinkWrap mt-6" key={index}>
              <div className="navLink">
                <Icon icon={item.icon} className="navIcon" />
                <span>{item.name}</span>
              </div>
            </div>
          )
        )}

        <div className="bg-background flex gap-2 items-center px-2 py-4 mx-3 mt-10 rounded">
          <div>
            <div className="bg-primary text-white px-2 py-1 rounded text-base">
              Go
            </div>
          </div>
          <span className="text-accent text-[12px]">Personal Account</span>
          <div className="flex items-center flex-col ml-2">
            <Icon icon="iconamoon:arrow-up-2-light" className="-mb-1" />
            <Icon icon="iconamoon:arrow-down-2-light" />
          </div>
        </div>
      </div>
    </>
  );
};
