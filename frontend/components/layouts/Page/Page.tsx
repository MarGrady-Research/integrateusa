import React from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Page({ children, className }: Props) {
  return (
    <div className={clsx("container mx-auto p-5 lg:pt-10 flex-1", className)}>
      {children}
    </div>
  );
}
