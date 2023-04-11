import React from "react";
import Header from "./Header/Header";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className={"h-screen"}>
        {children}
      </div>
    </div>
  );
};

export default Layout;

