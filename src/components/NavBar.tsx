import { useEffect, useState } from "react";

type Props = {
  transparentUntilScroll?: number;
};

/**
 * Lightweight sticky navigation with minimal state.
 * Hydration: use client:idle in .astro to avoid blocking LCP.
 */
export default function NavBar({ transparentUntilScroll = 8 }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > transparentUntilScroll);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentUntilScroll]);

  return (
    <nav
      className={[
        "sticky top-0 z-40 transition-colors",
        scrolled ? "bg-white/90 backdrop-blur border-b border-black/10" : "bg-transparent"
      ].join(" ")}
      role="navigation"
      aria-label="Primary"
    >
      {/* Top campaign banner: smoothly collapses on scroll */}
      <div
        className={[
          "w-full overflow-hidden transition-all duration-500 ease-out",
          scrolled ? "max-h-0 opacity-0" : "max-h-[48px] opacity-100"
        ].join(" ")}
        aria-hidden={scrolled ? "true" : "false"}
      >
        <div className="w-full bg-red-600 text-white">
          <div className="container-w py-2 text-center text-xs md:text-sm">
            <span className="font-semibold">#MerdekaUntukDiriSendiri</span>
            <span className="mx-1">—</span>
            <span>CAMPAIGN BEASISWA FULL LIFETIME</span>
            <a
              href="#tally-open=nPxD60&tally-layout=modal&tally-align-left=1&tally-form-events-forwarding=1"
              className="ml-2 inline-flex items-center font-semibold underline hover:opacity-90"
              data-tally-open="nPxD60"
              data-tally-layout="modal"
              data-tally-align-left="1"
              data-tally-form-events-forwarding="1"
            >
              klik disini
            </a>
          </div>
        </div>
      </div>
      <div className="container-w flex h-14 items-center justify-between">
        <a href="/" className="inline-flex items-center" aria-label="WithLia home">
          <img
            src="/withlia-logo.svg"
            alt="WithLia"
            width={112}
            height={28}
            className="h-6 w-auto md:h-7"
            decoding="async"
          />
        </a>
        <div />
        <div className="flex items-center gap-2">
          <a
            href="https://app.withlia.id/checkout/?add-to-cart=1163&quantity=1"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--orange)] px-4 py-2 text-sm font-semibold text-white shadow-card hover:opacity-95"
            target="_blank"
            rel="noopener"
          >
            Mulai Sekarang
          </a>
          <a
            href="#tally-open=nPxD60&tally-layout=modal&tally-align-left=1&tally-emoji-text=👋&tally-emoji-animation=wave&tally-form-events-forwarding=1"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--blue)] px-4 py-2 text-sm font-semibold text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white"
            data-tally-open="nPxD60"
            data-tally-layout="modal"
            data-tally-align-left="1"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            data-tally-form-events-forwarding="1"
          >
            Coba Gratis
          </a>
        </div>
      </div>
    </nav>
  );
}