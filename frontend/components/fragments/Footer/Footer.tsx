import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="bg-gray-300">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2022 —
            <a
              href="https://www.margrady.com"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              MarGrady Research
            </a>
          </p>
          <span className="inline-flex items-center sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a>
              <Image
                src="/ccny_logo.svg"
                alt="CCNY logo"
                width={100}
                height={50}
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
