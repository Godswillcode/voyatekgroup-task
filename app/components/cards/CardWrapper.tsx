import { ICardWrapProps } from "@/app/types";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const CardWrapper = ({
  bgColor,
  icon,
  title,
  children,
  titleColor = "#fff",
  link,
  buttonTextColor = "var(--primary)",
}: ICardWrapProps) => {
  return (
    <div style={{ background: bgColor }} className={`py-6 px-3 rounded mb-5`}>
      <div className="flex justify-between items-start mb-2">
        <div
          className="flex items-center gap-2 mb-5"
          style={{ color: titleColor }}
        >
          <Icon icon={icon} height={24} width={24} />
          <h2 className="text-base font-semibold">{title}</h2>
        </div>

        <Link href={link}>
          <button
            className="bg-white w-[8rem] shadow-sm text-xs px-3 rounded py-2"
            style={{ color: buttonTextColor }}
          >
            Add {title}
          </button>
        </Link>
      </div>
      {children}
    </div>
  );
};
