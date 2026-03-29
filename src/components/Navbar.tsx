"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Efek Glassmorphism saat scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Staf & Guru", href: "/staf" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Lulusan", href: "/lulusan" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-sm py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Nanti ganti dengan <Image src="/logo.png" /> */}
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-md">
            +
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg leading-tight text-slate-900">
              SMAK DITKESAD
            </span>
            <span className="text-xs font-medium text-primary tracking-wider">
              JAKARTA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-slate-600",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/elibrary">
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-primary"
            >
              e-Library
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all">
              Login Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-900 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden flex flex-col p-4 gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-50",
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-slate-100 my-2" />
          <Link href="/elibrary" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full justify-start">
              e-Library
            </Button>
          </Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full">Login Portal</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
