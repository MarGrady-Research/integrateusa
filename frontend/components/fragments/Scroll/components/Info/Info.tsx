import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export default function Info({ children }: Props) {
  return (
    <div className="bg-white p-3 border border-solid border-black rounded-sm z-50 mb-10">
      {children}
    </div>
  );
}
