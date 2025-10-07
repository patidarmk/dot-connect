import React from "react";
import Header from "@/components/Header";
import { MadeWithApplaa } from "@/components/made-with-applaa";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <MadeWithApplaa />
    </div>
  );
}