"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FC } from "react";
import { NAV_LINKS } from "@/constants/site-constants";
import { Arrow, Wordmark } from "@/components/ui/section-heading";

export const SiteHeader: FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-rule/70 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="lab-container flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" aria-label="The Growth Lab — home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm transition-colors hover:text-ivory ${
                  isActive(link.href) ? "text-ivory" : "text-ivory-dim"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="btn-lime hidden !py-2.5 md:inline-flex">
          Let&apos;s Talk <Arrow />
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-rule md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3 w-4" aria-hidden>
            <span
              className={`absolute left-0 h-px w-4 bg-ivory transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-ivory transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-64px)] border-t border-rule bg-ink md:hidden"
      >
        <ul className="lab-container flex flex-col pt-6">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="border-b border-rule/60">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5"
              >
                <span className="display text-4xl">{link.label}</span>
                <span className="font-mono text-xs text-mute">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="lab-container mt-8">
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-lime w-full justify-center">
            Let&apos;s Talk <Arrow />
          </Link>
        </div>
      </div>
    </header>
  );
};
