"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMenu, LuX } from "react-icons/lu";

const links = [
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/payments", label: "Payment" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [closeInstantly, setCloseInstantly] = useState(true);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setCloseInstantly(true);
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-champagne bg-[#EBEAF3]"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="font-display text-2xl tracking-wide text-plum"
        >
          <Image
            src="/thick-trans-logo.png"
            alt="T-Luxe Decor"
            width={200}
            height={200}
            className="w-24 h-auto"
          />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden gap-10 text-sm uppercase tracking-widest sm:flex sm:flex-1 sm:justify-start sm:pl-10 md:pl-16">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors hover:text-bloom"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => {
            setCloseInstantly(false);
            setIsOpen((open) => !open);
          }}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="rounded-md p-2 text-plum transition-colors hover:bg-plum/5 sm:hidden"
        >
          {/* {<LuMenu size={30} />} */}
          {isOpen ? <LuX size={30} /> : <LuMenu size={30} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`absolute left-0 top-full z-50 w-full origin-top overflow-hidden bg-white/85 shadow-lg sm:hidden ${
          isOpen
            ? "mobile-menu-open visible pointer-events-auto"
            : closeInstantly
              ? "invisible pointer-events-none"
              : "mobile-menu-close pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="border-t border-plum/10 px-6 pb-4 pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-sm uppercase tracking-widest text-plum transition-colors hover:text-bloom"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
