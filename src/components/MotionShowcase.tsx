"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "./Icons";

type DayDetail = {
  title: string;
  desc: string;
  tips: string[];
};

const dayDetails: DayDetail[] = [
  {
    title: "Menemukan Niche & Audiens Ideal",
    desc:
      "Biar nggak kerja asal-asalan, mulai dari sini: cari titik temu antara minat, skill, dan peluang pasar.",
    tips: [
      "Pahami apa itu niche & kenali pasarmu.",
      "Gabungkan passion + pasar, lalu validasi sebelum mulai jalan."
    ]
  },
  {
    title: "Riset Kompetitor & Positioning",
    desc: "Biar kamu tahu medan sebelum terjun.",
    tips: [
      "Cari tahu siapa aja pesaingmu & apa yang mereka tawarkan.",
      "Lihat cara mereka jualan, konten, dan channel yang dipakai.",
      "Temukan celah yang bisa kamu ambil alih."
    ]
  },
  {
    title: "Rencana Pemasaran Terstruktur",
    desc: "Biar strategi kamu jelas dari awal sampai eksekusi.",
    tips: [
      "Mulai dari analisis pasar sampai pilih channel promosi.",
      "Tentukan target, strategi konten, dan budget.",
      "Pastikan semua selaras sama tujuan yang mau dicapai."
    ]
  },
  {
    title: "Iklan yang Menarik & Mengkonversi",
    desc: "Biar iklan kamu nggak cuma numpang lewat di timeline orang.",
    tips: [
      "Sentuh pain point dan trigger emosinya.",
      "Tunjukkan manfaat unik & bukti sosial.",
      "Kasih curiosity gap biar mereka pengen tahu lebih banyak."
    ]
  },
  {
    title: "Retargeting & Segmentasi Audiens",
    desc: "Biar calon klien yang udah tertarik nggak hilang begitu aja.",
    tips: [
      "Gunakan strategi targeting Instagram yang tepat.",
      "Retarget audiens yang paling siap ambil aksi."
    ]
  },
  {
    title: "Proposal yang Susah Ditolak",
    desc: "Biar prospek langsung bilang ‘deal!’.",
    tips: [
      "Kenali audiens dan mulai dengan cerita yang relevan.",
      "Sesuaikan bahasa, tambahkan visual, dan tutup dengan CTA yang bikin klik."
    ]
  },
  {
    title: "Analisis & Scale Up",
    desc: "Biar strategi yang berhasil bisa terus berkembang.",
    tips: [
      "Lihat data, tentukan pemenang, lalu scale.",
      "Jaga performa supaya stabil di jangka panjang."
    ]
  }
];

type Props = { autoAdvanceMs?: number };

export default function MotionShowcase({ autoAdvanceMs = 3000 }: Props): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const total = dayDetails.length;
  const [paused, setPaused] = useState<boolean>(false);
  const reducedMotion = useRef<boolean>(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Respect user preference for reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotion.current = mq.matches;
    };
    update();
    if ("addEventListener" in mq) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    return () => {};
  }, []);

  // Auto-advance when visible, not paused, and not reduced-motion
  useEffect(() => {
    if (paused) return;
    if (reducedMotion.current) return;
    if (document.visibilityState !== "visible") return;
    if (autoAdvanceMs <= 0) return;

    const id = window.setInterval(() => {
      next();
    }, autoAdvanceMs);

    const onVis = () => {
      if (document.visibilityState !== "visible") {
        clearInterval(id);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [paused, autoAdvanceMs, next]);

  const progressPct = ((index + 1) / total) * 100;

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Progress Bar */}
      <div className="mx-auto h-2 max-w-3xl overflow-hidden rounded-full bg-black/10" aria-hidden="true">
        <motion.div
          className="h-full bg-[var(--blue)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Body */}
      <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-[1fr_1.2fr]">
        {/* Left: Steps */}
        <div className="order-2 md:order-1">
          <ul className="space-y-2">
            {dayDetails.map((d, i) => {
              const selected = i === index;
              return (
                <li key={i}>
                  <button
                    onClick={() => setIndex(i)}
                    className={[
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition",
                      selected ? "bg-[var(--blue)]/10" : "hover:bg-black/5"
                    ].join(" ")}
                    aria-current={selected ? "step" : undefined}
                    aria-label={`Pilih hari ${i + 1}: ${d.title}`}
                  >
                    <span
                      className={[
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                        selected ? "bg-[var(--blue)] text-white" : "bg-black/10 text-black/70"
                      ].join(" ")}
                    >
                      {i + 1}
                    </span>
                    <span className={["font-semibold", selected ? "text-[var(--blue)]" : "text-black/80"].join(" ")}>
                      {d.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Animated detail */}
        <div className="order-1 md:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow"
              role="region"
              aria-live="polite"
              aria-label={`Detail hari ${index + 1}`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--blue)]/10 font-bold text-[var(--blue)]">
                  D{index + 1}
                </span>
                <h3 className="text-xl font-extrabold">{dayDetails[index].title}</h3>
              </div>
              <p className="mt-2 text-base leading-relaxed text-black/70">{dayDetails[index].desc}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {dayDetails[index].tips.map((t, i2) => (
                  <div key={i2} className="rounded-xl bg-[#F7FBFF] p-3 text-sm text-black/80">
                    • {t}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={prev}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 p-2 text-black/70 hover:bg-black/5"
                  aria-label="Sebelumnya"
                  title="Sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2" role="tablist" aria-label="Navigasi hari">
                  {dayDetails.map((_, i3) => {
                    const sel = i3 === index;
                    return (
                      <button
                        key={i3}
                        onClick={() => setIndex(i3)}
                        className={["h-2 w-8 rounded-full transition", sel ? "bg-[var(--blue)]" : "bg-black/10 hover:bg-black/20"].join(" ")}
                        aria-label={`Ke hari ${i3 + 1}`}
                        aria-pressed={sel}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPaused((p) => !p)}
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 p-2 text-black/70 hover:bg-black/5"
                    aria-pressed={paused}
                    aria-label={paused ? "Jalankan otomatis" : "Jeda otomatis"}
                    title={paused ? "Jalankan otomatis" : "Jeda otomatis"}
                  >
                    {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                    <span className="sr-only">{paused ? "Jalankan otomatis" : "Jeda otomatis"}</span>
                  </button>
                  <button
                    onClick={next}
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--blue)] p-2 text-white hover:opacity-95"
                    aria-label="Lanjut"
                    title="Lanjut"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}