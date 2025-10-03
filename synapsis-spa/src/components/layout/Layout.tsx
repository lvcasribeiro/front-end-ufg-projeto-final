import type { ReactNode } from "react";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import "./Layout.css";

type LayoutProps = {
  children: ReactNode; // tipa o children corretamente
};

export default function Layout({ children }: LayoutProps ) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Menu />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
