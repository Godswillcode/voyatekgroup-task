import React from "react";
import { IEmptyProps } from "../types";
import { Empty, Typography } from "antd";
import Link from "next/link";

export const OnEmpty = ({ image, title, linkPath }: IEmptyProps) => {
  return (
    <div className="bg-white rounded flex items-center justify-center w-full h-[15rem]">
      <Empty
        image={image}
        imageStyle={{ height: 60 }}
        className="flex flex-col items-center justify-center"
        description={<Typography.Text>No Request yet</Typography.Text>}
      >
        <Link
          href={linkPath}
          className="bg-primary text-white pt-1 pb-2 rounded px-5"
        >
          Add {title}
        </Link>
      </Empty>
    </div>
  );
};
