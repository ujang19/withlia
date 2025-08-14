import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Rocket, Brain, Users, Heart, Route, ChevronRight } from "lucide-react";

// ---------------------------
// Palette & Helpers
// ---------------------------
const colors = {
  blue: "#2cb4ff",
  navy: "#0b2234",
  orange: "#FF6B35",
  pastelPink: "#FDE2E4",
  pastelYellow: "#FFF5CC",
  pastelGreen: "#DFF7E6",
  pastelBlue: "#E7F1FF",
};

const gridBG = (color = "rgba(0,0,0,0.04)") => ({
  backgroundImage:
    `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
  backgroundSize: "24px 24px, 24px 24px",
  backgroundPosition: "-1px -1px, -1px -1px",
});

const Section = ({ children, className = "", style }) => (
  <section className={`w-full py-20 ${className}`} style={style}>
    <div className="mx-auto w-full max-w-[1200px] px-6">{children}</div>
  </section>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${className}`}>{children}</div>
);

const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
);

const H2 = ({ children, className = "" }) => (
  <h2 className={`font-extrabold leading-tight tracking-tight text-3xl md:text-5xl ${className}`} style={{ fontFamily: "Montserrat, ui-sans-serif, system-ui" }}>{children}</h2>
);

const P = ({ children, className = "" }) => (
  <p className={`text-base leading-relaxed text-black/70 ${className}`} style={{ fontFamily: "Roboto, ui-sans-serif, system-ui" }}>{children}</p>
);

const CTAButtons = () => (
  <div className="mt-6 flex flex-wrap items-center gap-3">
    <a href="#start" className="inline-flex items-center gap-2 rounded-xl bg-[var(--orange)] px-5 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.99]" style={{ ["--orange"]: colors.orange }}>
      Mulai Sekarang <ChevronRight className="h-4 w-4" />
    </a>
    <a
      href="#tally-open=nPxD60&tally-layout=modal&tally-align-left=1&tally-emoji-text=👋&tally-emoji-animation=wave&tally-form-events-forwarding=1"
      className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--blue)] px-5 py-3 font-semibold text-[var(--blue)] transition-colors hover:bg-[var(--blue)] hover:text-white"
      style={{ ["--blue"]: colors.blue }}
      data-tally-open="nPxD60"
      data-tally-layout="modal"
      data-tally-align-left="1"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
      data-tally-form-events-forwarding="1"
    >
      Coba Gratis Dulu
    </a>
  </div>
);

const LogoRow = () => (
  <div className="mt-10 grid grid-cols-2 gap-8 opacity-80 md:grid-cols-4">
    {["BERT's Agency", "NYAMBEE", "B One Corp", "Meta"].map((n, i) => (
      <div key={i} className="flex h-14 items-center justify-center rounded-xl border border-black/5 bg-white/80">
        <span className="text-xs font-medium tracking-wide text-black/60">{n}</span>
      </div>
    ))}
  </div>
);

// ---------------------------
// Data (Updated Copy) + Simple Runtime Tests
// ---------------------------
const dayDetails = [
  {
    title: "Menemukan Niche & Audiens Ideal",
    desc: "Biar nggak kerja asal-asalan, mulai dari sini: cari titik temu antara minat, skill, dan peluang pasar.",
    tips: [
      "Pahami apa itu niche & kenali pasarmu.",
      "Gabungkan passion + pasar, lalu validasi sebelum mulai jalan.",
    ],
  },
  {
    title: "Riset Kompetitor & Positioning",
    desc: "Biar kamu tahu medan sebelum terjun.",
    tips: [
      "Cari tahu siapa aja pesaingmu & apa yang mereka tawarkan.",
      "Lihat cara mereka jualan, konten, dan channel yang dipakai.",
      "Temukan celah yang bisa kamu ambil alih.",
    ],
  },
  {
    title: "Rencana Pemasaran Terstruktur",
    desc: "Biar strategi kamu jelas dari awal sampai eksekusi.",
    tips: [
      "Mulai dari analisis pasar sampai pilih channel promosi.",
      "Tentukan target, strategi konten, dan budget.",
      "Pastikan semua selaras sama tujuan yang mau dicapai.",
    ],
  },
  {
    title: "Iklan yang Menarik & Mengkonversi",
    desc: "Biar iklan kamu nggak cuma numpang lewat di timeline orang.",
    tips: [
      "Sentuh pain point dan trigger emosinya.",
      "Tunjukkan manfaat unik & bukti sosial.",
      "Kasih curiosity gap biar mereka pengen tahu lebih banyak.",
    ],
  },
  {
    title: "Retargeting & Segmentasi Audiens",
    desc: "Biar calon klien yang udah tertarik nggak hilang begitu aja.",
    tips: [
      "Gunakan strategi targeting Instagram yang tepat.",
      "Retarget audiens yang paling siap ambil aksi.",
    ],
  },
  {
    title: "Proposal yang Susah Ditolak",
    desc: "Biar prospek langsung bilang ‘deal!’.",
    tips: [
      "Kenali audiens dan mulai dengan cerita yang relevan.",
      "Sesuaikan bahasa, tambahkan visual, dan tutup dengan CTA yang bikin klik.",
    ],
  },
  {
    title: "Analisis & Scale Up",
    desc: "Biar strategi yang berhasil bisa terus berkembang.",
    tips: [
      "Lihat data, tentukan pemenang, lalu scale.",
      "Jaga performa supaya stabil di jangka panjang.",
    ],
  },
];

(function validateDayDetails(data) {
  console.assert(Array.isArray(data), "dayDetails harus array");
  console.assert(data.length === 7, "dayDetails harus berisi 7 item");
  data.forEach((d, i) => {
    console.assert(typeof d.title === "string" && d.title.length > 0, `title kosong di index ${i}`);
    console.assert(typeof d.desc === "string" && d.desc.length > 0, `desc kosong di index ${i}`);
    console.assert(Array.isArray(d.tips) && d.tips.length > 0, `tips kosong di index ${i}`);
  });
})(dayDetails);

// ---------------------------
// Interactive 7-Day Flow
// ---------------------------
const InteractiveFlow = () => {
  const [index, setIndex] = React.useState(0);
  const total = dayDetails.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mt-8">
      {/* Progress Bar */}
      <div className="mx-auto h-2 max-w-3xl overflow-hidden rounded-full bg-black/10">
        <motion.div
          className="h-full bg-[var(--blue)]"
          initial={{ width: 0 }}
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ ["--blue"]: colors.blue }}
        />
      </div>

      {/* Body */}
      <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-[1fr_1.2fr]">
        {/* Left: Steps */}
        <div className="order-2 md:order-1">
          <ul className="space-y-2">
            {dayDetails.map((d, i) => (
              <li key={i}>
                <button
                  onClick={() => setIndex(i)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                    i === index ? "bg-[var(--blue)]/10" : "hover:bg-black/5"
                  }`}
                  style={{ ["--blue"]: colors.blue }}
                >
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      i === index ? "bg-[var(--blue)] text-white" : "bg-black/10 text-black/70"
                    }`}
                    style={{ ["--blue"]: colors.blue }}
                  >
                    {i + 1}
                  </span>
                  <span className={`font-semibold ${i === index ? "text-[var(--blue)]" : "text-black/80"}`} style={{ ["--blue"]: colors.blue }}>
                    {d.title}
                  </span>
                </button>
              </li>
            ))}
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
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--blue)]/10 font-bold text-[var(--blue)]" style={{ ["--blue"]: colors.blue }}>D{index + 1}</span>
                <h3 className="text-xl font-extrabold" style={{ fontFamily: "Montserrat" }}>{dayDetails[index].title}</h3>
              </div>
              <P className="mt-2">{dayDetails[index].desc}</P>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {dayDetails[index].tips.map((t, i) => (
                  <div key={i} className="rounded-xl bg-[#F7FBFF] p-3 text-sm text-black/80">• {t}</div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between">
                <button onClick={prev} className="rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5">Sebelumnya</button>
                <div className="flex items-center gap-2">
                  {dayDetails.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-2 w-8 rounded-full transition ${i === index ? "bg-[var(--blue)]" : "bg-black/10 hover:bg-black/20"}`}
                      style={{ ["--blue"]: colors.blue }}
                      aria-label={`Ke hari ${i + 1}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="rounded-xl bg-[var(--blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" style={{ ["--blue"]: colors.blue }}>Lanjut</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ---------------------------
// Page Component
// ---------------------------
export default function WithLiaLanding() {
  return (
    <main className="text-[#111]" style={{ ["--blue"]: colors.blue, ["--orange"]: colors.orange }}>
      {/* HERO */}
      <Section className="pt-24" style={{ ...gridBG("rgba(17,17,17,0.05)") }}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Pill className="bg-white/80 text-black/70 border border-black/10">🚀 Marketing Ecosystem untuk Generasi Baru</Pill>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl" style={{ fontFamily: "Montserrat, ui-sans-serif, system-ui" }}>
              Mindful AI-Powered <span className="text-[var(--blue)]">Marketing</span> Ecosystem
            </h1>
            <P className="mt-5 max-w-xl">
              AI berkembang setiap hari. Tapi tanpa arah yang jelas, marketer akan tetap tertinggal. WithLia nyatuin <strong>AI yang udah dituning khusus marketing</strong>, framework strategi, mentor, dan komunitas dalam satu ekosistem — biar kamu langsung jalan, tanpa ribet nyambungin potongan-potongan sendiri.
            </P>
            <CTAButtons />
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/70 backdrop-blur">Trusted by partners</span>
              <LogoRow />
            </div>
          </div>

          {/* Mock UI */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-black/10 bg-white p-5 shadow-2xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="rounded-xl border border-black/10 p-4" style={{ background: colors.pastelBlue }}>
                <div className="mb-3 flex items-center gap-2 font-semibold"><Brain className="h-4 w-4"/> Flow AI</div>
                <div className="rounded-lg bg-white p-3 text-sm shadow">Halo, aku Lily. Sebutkan niche dan target kamu, biar aku bantu bikinkan strategi 7 hari.</div>
                <div className="mt-3 rounded-lg bg-white p-3 text-sm shadow">Contoh: "Mahasiswa yang mau jadi content marketer freelance"</div>
              </div>
            </div>
            <div className="absolute -right-6 -top-6 rotate-2 rounded-2xl border border-black/10 bg-white p-4 shadow-xl" style={{ background: colors.pastelYellow }}>
              <div className="flex items-center gap-2 font-semibold"><Route className="h-4 w-4"/> 7-Day Plan</div>
              <ul className="mt-2 list-disc pl-4 text-xs leading-relaxed">
                <li>Niche & positioning</li>
                <li>Content + copy</li>
                <li>Launch & iterate</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* COMPARISON TRIGGER */}
      <Section className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-7">
            <Pill className="bg-[var(--orange)]/10 text-[var(--orange)]">Kalau di Luar Sana</Pill>
            <h3 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "Montserrat" }}>Bikin Capek Sebelum Mulai</h3>
            <ul className="mt-3 list-disc pl-5 text-black/70">
              <li>Harus bayar GPT Premium</li>
              <li>Beli framework konten</li>
              <li>Ikut bootcamp & cari mentor</li>
              <li>Gabung komunitas—semuanya sendiri-sendiri</li>
            </ul>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/60"><X className="h-4 w-4"/> Ribet, boros waktu, dan susah nyambungin.</div>
          </Card>

          <Card className="p-7">
            <Pill className="bg-[var(--blue)]/10 text-[var(--blue)]">Kalau di WithLia</Pill>
            <h3 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "Montserrat" }}>Sekali Start, Semua Kebuka</h3>
            <ul className="mt-3 list-disc pl-5 text-black/70">
              <li>AI udah siap</li>
              <li>Strategi udah ada</li>
              <li>Mentor siap dampingin</li>
              <li>Komunitas ready support</li>
            </ul>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/60"><Check className="h-4 w-4"/> Tinggal jalan, nggak perlu mikirin potongan-potongan lagi.</div>
          </Card>
        </div>
      </Section>

      {/* MINI URGENCY */}
      <Section className="py-8" style={{ background: colors.blue }}>
        <div className="flex flex-col items-center justify-center text-center text-[var(--navy)]" style={{ ["--navy"]: colors.navy }}>
          <div className="text-sm font-semibold uppercase">⚡ Urgency</div>
          <p className="mt-2 max-w-3xl text-lg md:text-xl" style={{ fontFamily: "Roboto" }}>
            AI berkembang setiap hari. Kalau cuma jadi penonton, kamu bakal ketinggalan. <strong>Mulai hari ini, bukan besok.</strong> Skill marketing di era AI punya expiry date.
          </p>
        </div>
      </Section>

      {/* CORE VALUES */}
      <Section style={{ ...gridBG("rgba(17,17,17,0.04)") }}>
        <H2 className="text-center">Core Value WithLia</H2>
        <div className="mt-10 grid gap-5 md:grid-cols-5">
          {[
            { icon: Route, title: "Mindful Marketing", desc: "Fokus pada arah & strategi, bukan sekadar tren.", bg: colors.pastelBlue },
            { icon: Brain, title: "AI as Partner", desc: "AI yang disekolahkan untuk bantu mikir & eksekusi.", bg: colors.pastelYellow },
            { icon: Heart, title: "Human-First", desc: "Bantu marketer bekerja tanpa burnout.", bg: colors.pastelPink },
            { icon: Rocket, title: "Purpose-Driven Growth", desc: "Capai tujuan personal & bisnis.", bg: colors.pastelGreen },
            { icon: Users, title: "Community Empowerment", desc: "Ekosistem sehat berbasis kolaborasi.", bg: "#EDE7FF" },
          ].map((v, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <div className="h-full rounded-2xl p-6" style={{ background: v.bg }}>
                <div className="flex items-center gap-2 font-semibold"><v.icon className="h-5 w-5"/> {v.title}</div>
                <P className="mt-2 text-sm">{v.desc}</P>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* HOW WITHLIA WORKS */}
      <Section>
        <H2 className="text-center">How WithLia Works</H2>
        <P className="mx-auto mt-3 max-w-2xl text-center">Dengan tiga fondasi utama untuk belajar dan eksekusi tanpa ribet.</P>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Strategic Framework", desc: "Alur belajar & eksekusi 7 hari yang aplikatif.", color: colors.pastelBlue },
            { title: "Flow AI", desc: "GPT yang dituning khusus untuk bantu berpikir & mengeksekusi strategi hasil kolaborasi strategis dengan para digital marketer.", color: colors.pastelYellow },
            { title: "Komunitas Mindful", desc: "Tempat saling dukung tanpa toxic culture.", color: colors.pastelPink },
          ].map((c, i) => (
            <Card key={i} className="p-6">
              <div className="rounded-xl p-4" style={{ background: c.color }}>
                <h3 className="text-xl font-bold" style={{ fontFamily: "Montserrat" }}>{c.title}</h3>
                <P className="mt-2 text-sm">{c.desc}</P>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7 DAYS – INTERACTIVE FLOW */}
      <Section style={{ background: "#FBFBFD" }}>
        <H2 className="text-center">7 Days to Smart Marketing</H2>
        <InteractiveFlow />
      </Section>

      {/* COMPETITOR COMPARISON TABLE */}
      <Section>
        <H2 className="text-center">Competitor Comparison</H2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-black/10">
          <table className="min-w-full divide-y divide-black/10 text-sm">
            <thead className="bg-black/5">
              <tr>
                <th className="px-4 py-3 text-left">Fitur</th>
                <th className="px-4 py-3 text-left">Platform AI Umum</th>
                <th className="px-4 py-3 text-left">Bootcamp</th>
                <th className="px-4 py-3 text-left">Mentor Freelance</th>
                <th className="px-4 py-3 text-left text-[var(--blue)]">WithLia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[
                ["Framework Strategis", false, true, false, true],
                ["AI dituning khusus marketing", false, false, false, true],
                ["Prompt siap pakai", false, false, false, true],
                ["Edukasi + Eksekusi", false, true, false, true],
                ["Komunitas Kolaboratif", false, false, true, true],
              ].map((row, i) => (
                <tr key={i} className="bg-white">
                  <td className="px-4 py-4 font-medium">{row[0]}</td>
                  {[1, 2, 3, 4].map((idx) => (
                    <td key={idx} className={`px-4 py-4 ${idx === 4 ? "bg-[var(--blue)]/5 font-semibold" : ""}`}>
                      {row[idx] ? (
                        <Check className={`h-5 w-5 ${idx === 4 ? "text-[var(--blue)]" : "text-emerald-600"}`} />
                      ) : (
                        <X className="h-5 w-5 text-rose-500" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* SUCCESS SCENARIO */}
      <Section className="relative" style={{ background: colors.pastelBlue }}>
        <div className="absolute inset-0 opacity-30" style={gridBG("rgba(17,17,17,0.06)") as any} />
        <div className="relative">
          <H2 className="text-center">Success Scenario</H2>
          <P className="mx-auto mt-4 max-w-3xl text-center">
            Bayangin 7 hari dari sekarang… Kamu udah punya strategi jelas, konten siap posting, dan AI yang ngerti gaya marketing kamu. Mentor & komunitas siap nge-support, campaign udah jalan. Dan semua ini tanpa harus bongkar tabungan buat bayar kursus terpisah, AI premium, dan mentor freelance.
          </P>
        </div>
      </Section>

      {/* USER JOURNEY FLOW */}
      <Section>
        <H2 className="text-center">User Journey Flow</H2>
        <div className="mt-10 grid gap-6 md:grid-cols-5">
          {["Discover", "Trial", "Engage", "Upgrade", "Advocate"].map((stage, i) => (
            <Card key={i} className="p-5 text-center">
              <div className="mx-auto h-10 w-10 rounded-xl bg-black/5" />
              <h4 className="mt-3 font-bold" style={{ fontFamily: "Montserrat" }}>{stage}</h4>
              <P className="mt-1 text-sm">
                {stage === "Discover" && "Kenal WithLia lewat partner/event."}
                {stage === "Trial" && "Coba produk (Playbook / GPTs)."}
                {stage === "Engage" && "Join komunitas & campaign kolaborasi."}
                {stage === "Upgrade" && "Ambil Combo Package untuk ekosistem penuh."}
                {stage === "Advocate" && "Jadi partner/affiliate & bawa pengguna baru."}
              </P>
            </Card>
          ))}
        </div>
      </Section>

      {/* PARTNER VALUE PROPOSITION */}
      <Section style={{ ...gridBG("rgba(17,17,17,0.04)") }}>
        <H2 className="text-center">Partner Value Proposition</H2>
        <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h4 className="text-xl font-bold" style={{ fontFamily: "Montserrat" }}>Benefit Partner</h4>
            <ul className="mt-3 space-y-2 text-black/80">
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Exposure & co-branding</li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Akses teknologi & komunitas</li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Pendapatan afiliasi</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h4 className="text-xl font-bold" style={{ fontFamily: "Montserrat" }}>Skema Kerja Sama</h4>
            <ul className="mt-3 space-y-2 text-black/80">
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Co-event & kampanye bersama</li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Program white-label</li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Integrasi ekosistem</li>
            </ul>
          </Card>
        </div>
        <LogoRow />
      </Section>

      {/* FINAL CTA */}
      <Section className="text-white" style={{ background: colors.navy }}>
        <div className="mx-auto max-w-3xl text-center">
          <H2>Kalau udah ada cara lebih cepat & lebih jelas untuk mulai, kenapa harus jalan sendiri?</H2>
          <CTAButtons />
          <P className="mt-4 text-white/70">Mulai 7 hari pertama kamu bareng WithLia sekarang.</P>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0A1422] py-10 text-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="text-lg font-extrabold" style={{ fontFamily: "Montserrat" }}>WithLia</div>
              <P className="mt-2 text-white/70">Mindful AI-Powered Marketing Ecosystem.</P>
            </div>
            <div>
              <div className="font-semibold">Produk</div>
              <ul className="mt-2 space-y-1 text-white/70">
                <li>Flow AI</li>
                <li>Playbook</li>
                <li>Komunitas</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Perusahaan</div>
              <ul className="mt-2 space-y-1 text-white/70">
                <li>Partner</li>
                <li>Karier</li>
                <li>Kontak</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Legal</div>
              <ul className="mt-2 space-y-1 text-white/70">
                <li>Privasi</li>
                <li>Ketentuan</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">© {new Date().getFullYear()} WithLia. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
