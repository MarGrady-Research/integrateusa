import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props) {
  return <div className="container mx-auto p-5 font-raleway">{children}</div>;
}
