import React from "react";
import { Dropdown } from "antd";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { extraMenuLink, navbarLink, sidebarLink } from "@/app/constant";

export const MobileMenu = () => {
  const allLinks = [...extraMenuLink, ...navbarLink, ...sidebarLink];

  const menuItems = allLinks.map((item, index) => {
    const content = (
      <div className="flex items-center gap-2 px-2 py-1 hover:text-primary">
        <Icon icon={item.icon} width="18" height="18" />
        <span>{item.name}</span>
      </div>
    );

    return {
      key: index.toString(),
      label: item.clickable ? (
        <Link href={item.href} className="cursor-pointer">
          {content}
        </Link>
      ) : (
        <div className="cursor-default">{content}</div>
      ),
    };
  });

  return (
    <div className="lg:hidden flex">
      <Dropdown
        trigger={["click"]}
        menu={{ items: menuItems }}
        placement="bottomRight"
      >
        <Icon
          icon="lucide:menu"
          width="30"
          height="30"
          className="cursor-pointer text-accent hover:text-black"
        />
      </Dropdown>
    </div>
  );
};
