import React from "react";
import Loader from "../../fragments/Loader";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Page({ children, isLoading = false }: Props) {
  return (
    <div className="container mx-auto p-5 font-sans">
      {isLoading ? (
        <div className="pt-5">
          <Loader />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
