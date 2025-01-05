import React from "react";

interface PROPS {
  name: string;
}
export const Header = (props: PROPS) => {
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 w-full h-16 px-6 z-50 bg-white drop-shadow-lg">
      <h1 className="text-2xl font-bold">Blog.</h1>
      <span>{props.name}</span>
    </header>
  );
};
