import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
        {children}
      <Footer/>
    </div>
  );
};

export default Layout;

