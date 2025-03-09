"use client";

import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
  topPadding?: boolean;
};

function Heading({ title, subtitle, center, topPadding }: Props) {
  return (
    <div className={`${center ? "text-center" : "text-start"} ${topPadding ? "pt-10" : "pt-0"}`}>
      <div className="text-xl font-bold">{title}</div>
      {subtitle && (
        <div className="font-light text-neutral-500 mt-1">{subtitle}</div>
      )}
    </div>
  );
}

export default Heading;
