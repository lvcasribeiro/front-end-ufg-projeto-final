import { useState, type ReactNode } from "react";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import "./Layout.css";

type LayoutProps = {
  children: ReactNode; 
};

export default function Layout({ children }: LayoutProps ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="layout">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="layout-body">
        <Menu isMenuOpen={isMenuOpen} onClose={toggleMenu} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
