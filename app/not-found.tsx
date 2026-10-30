import Link from "next/link";
import { Arrow } from "@/components/ui/section-heading";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink pt-24">
      <div className="lab-container">
        <p className="eyebrow text-copper">404 · Not found</p>
        <h1 className="display mt-6 max-w-3xl text-5xl md:text-7xl">
          This path isn&apos;t part of the system <em className="text-ivory-dim">— yet.</em>
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-lime">
            Back to the homepage <Arrow />
          </Link>
          <Link href="/work" className="btn-line">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
