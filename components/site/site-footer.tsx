import Link from "next/link";
import { type FC } from "react";
import { BRAND, INDEPENDENCE_NOTE, NAV_LINKS, POSITIONING } from "@/constants/site-constants";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/constants/social-constants";
import { CASES, WORKBENCH } from "@/constants/work-constants";
import { Wordmark } from "@/components/ui/section-heading";

export const SiteFooter: FC = () => (
  <footer className="border-t border-rule bg-graphite">
    <div className="lab-container grid gap-12 py-16 md:grid-cols-12 md:py-20">
      <div className="md:col-span-5">
        <Wordmark />
        <p className="display mt-6 max-w-md text-3xl">{POSITIONING}</p>
        <p className="mt-6 text-sm text-mute">Meet Soni · Mumbai, India</p>
      </div>

      <nav aria-label="Case studies" className="md:col-span-4">
        <p className="eyebrow">Work</p>
        <ul className="mt-5 space-y-2.5 text-sm">
          {CASES.map((item) => (
            <li key={item.slug}>
              <Link href={`/work/${item.slug}`} className="text-ivory-dim transition-colors hover:text-ivory">
                {item.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/work/${WORKBENCH.slug}`} className="text-ivory-dim transition-colors hover:text-ivory">
              {WORKBENCH.title}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="md:col-span-3">
        <p className="eyebrow">Contact</p>
        <ul className="mt-5 space-y-2.5 text-sm">
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ivory-dim transition-colors hover:text-ivory">
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <a href={CONTACT_PHONE_HREF} className="text-ivory-dim transition-colors hover:text-ivory">
              {CONTACT_PHONE}
            </a>
          </li>
          <li>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-ivory-dim transition-colors hover:text-ivory">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-ivory-dim transition-colors hover:text-ivory">
              GitHub ↗
            </a>
          </li>
        </ul>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mute">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-ivory">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-rule">
      <div className="lab-container flex flex-col gap-3 py-6 text-xs leading-relaxed text-mute md:flex-row md:items-start md:justify-between">
        <p className="max-w-3xl">{INDEPENDENCE_NOTE}</p>
        <p className="shrink-0">
          © {new Date().getFullYear()} Meet Soni · {BRAND}
        </p>
      </div>
    </div>
  </footer>
);
