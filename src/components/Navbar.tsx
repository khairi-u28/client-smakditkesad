"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const tentangLinks = [
  { name: "Profil Sekolah", href: "/profil" },
  { name: "Profil Kepala Sekolah", href: "/kepsek" },
  { name: "Profil Lulusan", href: "/lulusan" },
  { name: "Staf & Pengajar", href: "/staf" },
];

const mainNavLinks = [
  { name: "Beranda", href: "/" },
  { name: "Kegiatan", href: "/kegiatan" },
  { name: "PPDB", href: "/ppdb" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isTentangOpen, setIsTentangOpen] = React.useState(false);
  const [isMobileTentangOpen, setIsMobileTentangOpen] = React.useState(false);
  const pathname = usePathname();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsTentangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isTentangActive = tentangLinks.some((l) => pathname === l.href);

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
          <div className="w-10 h-10 rounded-xl overflow-hidden group-hover:scale-105 transition-transform shrink-0">
            <Image
              src="/images/logoanalisfix.png"
              alt="Logo SMAK Ditkesad"
              width={40}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg leading-tight text-slate-900">
              SMK ANALIS KESEHATAN
            </span>
            <span className="text-xs font-medium text-primary tracking-wider">
              PUSKESAD
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Beranda */}
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary font-semibold" : "text-slate-600",
            )}
          >
            Beranda
          </Link>

          {/* Tentang Kami Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsTentangOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                isTentangActive ? "text-primary font-semibold" : "text-slate-600",
              )}
            >
              Tentang Kami
              <ChevronDown
                size={15}
                className={cn("transition-transform duration-200", isTentangOpen && "rotate-180")}
              />
            </button>
            {isTentangOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50">
                {tentangLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsTentangOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 hover:text-primary",
                      pathname === link.href
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-slate-600",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other links */}
          {mainNavLinks
            .filter((l) => l.href !== "/")
            .map((link) => (
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
          <Link href="/dashboard/elibrary">
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
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden flex flex-col p-4 gap-2 animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/" ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50",
            )}
          >
            Beranda
          </Link>

          {/* Tentang Kami accordion */}
          <div>
            <button
              onClick={() => setIsMobileTentangOpen((v) => !v)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isTentangActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50",
              )}
            >
              Tentang Kami
              <ChevronDown
                size={15}
                className={cn("transition-transform duration-200", isMobileTentangOpen && "rotate-180")}
              />
            </button>
            {isMobileTentangOpen && (
              <div className="flex flex-col gap-1 pl-4 mt-1">
                {tentangLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-slate-500 hover:bg-slate-50",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {mainNavLinks
            .filter((l) => l.href !== "/")
            .map((link) => (
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
          <Link href="/dashboard/elibrary" onClick={() => setIsMobileMenuOpen(false)}>
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

