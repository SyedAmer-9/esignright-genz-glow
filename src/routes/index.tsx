import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  FileSignature,
  Fingerprint,
  Server,
  Users,
  ArrowRight,
  Check,
  Play,
  Mail,
  MapPin,
  Phone,
  
  ChevronDown,
  FileText,
  Files,
  GitBranch,
  Type,
  LayoutTemplate,
  Bell,
  FolderOpen,
  Webhook,
  BarChart3,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
const logoAsset = { url: "/assets/esignright-logo.png" };
const videoThumbAsset = { url: "/video-thumb.png" };
const auditIllustrationAsset = { url: "/assets/audit-illustration.png" };

const VIDEO_BUCKET = "videobucket";
const VIDEO_PATH = "eSignRight_HandsON.mp4";
const YOUTUBE_FALLBACK_URL = "https://youtube.com/";
const SIGNUP_URL = "https://app.esignright.com/account/signup";
const CALENDAR_URL = "https://calendly.com/esignright/30min";

function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function handlePlay() {
    if (loading) return;
    if (!url) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from(VIDEO_BUCKET)
        .createSignedUrl(VIDEO_PATH, 60 * 60);
      setLoading(false);
      if (error || !data?.signedUrl) return;
      setUrl(data.signedUrl);
    }
    setPlaying(true);
  }

  useEffect(() => {
    if (playing && url && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [playing, url]);

  return (
    <div className="mx-auto mt-16 max-w-5xl">
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-white ring-signal">
        <img
          src={videoThumbAsset.url}
          alt="Product walkthrough preview"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            playing ? "scale-105 opacity-0" : "scale-100 opacity-100"
          }`}
          aria-hidden={playing}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        />

        {url && (
          <video
            ref={videoRef}
            src={url}
            controls
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {!playing && (
          <div className="absolute inset-0 grid place-items-center">
            <button
              type="button"
              onClick={handlePlay}
              disabled={loading}
              className="group flex flex-col items-center gap-4"
              aria-label="Play product walkthrough"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-signal text-signal-foreground shadow-[0_0_60px_-10px_var(--signal)] transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 translate-x-0.5" />
              </span>
              <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-foreground/80 shadow-sm">
                {loading ? "Loading video…" : "Watch the 2-minute walkthrough"}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Video not loading?</span>
        <a
          href={YOUTUBE_FALLBACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-signal underline-offset-4 hover:underline"
        >
          Watch on YouTube
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function IndiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="5.33" fill="currentColor" className="text-india-saffron" />
      <rect y="5.33" width="24" height="5.33" fill="white" />
      <rect y="10.67" width="24" height="5.33" fill="currentColor" className="text-india-green" />
    </svg>
  );
}

function TopBanner() {
  return (
    <div className="sticky top-0 z-50 h-8 w-full bg-surface-2/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center gap-2 px-6 text-xs font-medium text-foreground/80">
        <IndiaFlag className="h-3.5 w-auto rounded-sm" />
        <span>Made in India</span>
        <span className="text-foreground/40">·</span>
        <span>Made for India</span>
      </div>
    </div>
  );
}


export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "eSignRight | Fast, Legal, and Secure E-Signatures for India" },
      { name: "description", content: "Secure, auditable e-signatures for modern businesses in India with complete proof, identity verification, and legal audit trails." },
      { property: "og:title", content: "eSignRight | Fast, Legal, and Secure E-Signatures for India" },
      { property: "og:description", content: "Secure, auditable e-signatures for modern businesses in India with complete proof, identity verification, and legal audit trails." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", as: "image", href: videoThumbAsset.url, fetchPriority: "high" },
    ],
  }),
});


function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

function PrimaryCTA({
  children,
  href = "#demo",
  target,
  rel,
}: {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-15px_oklch(0.16_0.02_260/0.9)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_oklch(0.16_0.02_260/0.9)] active:translate-y-0"
    >
      <span>{children}</span>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-primary transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:rotate-[-8deg]">
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function GhostCTA({
  children,
  href = "#signup",
  target,
  rel,
}: {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="inline-flex items-center gap-2 rounded-full border border-primary/80 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition-all hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </a>
  );
}

function Nav() {
  return (
    <header className="sticky top-8 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2" aria-label="eSignRight home">
          <img src={logoAsset.url} alt="eSignRight" className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
          {[
            { href: "#features", label: "Features" },
            { href: "#compliance", label: "Compliance" },
            { href: "#pricing", label: "Pricing" },
            { href: "#faq", label: "FAQ" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-1 transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={SIGNUP_URL}
            className="hidden rounded-full border border-primary/80 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            Sign Up
          </a>
          <PrimaryCTA href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
            Schedule a Demo
          </PrimaryCTA>
        </div>
      </div>
    </header>
  );
}

function HeroOrbs() {
  return (
    <>
      <div
        aria-hidden
        className="glass-orb animate-float-slow pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full opacity-90"
      />
      <div
        aria-hidden
        className="glass-orb animate-float-slower pointer-events-none absolute left-24 top-64 h-16 w-16 rounded-full opacity-80"
      />
      <div
        aria-hidden
        className="glass-orb animate-float-slow pointer-events-none absolute right-[-4rem] top-24 h-72 w-72 rounded-full opacity-95"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        aria-hidden
        className="glass-orb animate-float-slower pointer-events-none absolute right-40 top-[22rem] h-24 w-24 rounded-full opacity-85"
        style={{ animationDelay: "2s" }}
      />
      <div
        aria-hidden
        className="glass-orb animate-float-slow pointer-events-none absolute right-8 bottom-24 h-32 w-32 rounded-full opacity-80"
        style={{ animationDelay: "0.6s" }}
      />
    </>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-4 top-4 bottom-0 rounded-[2.5rem] bg-hero-blue" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 text-center md:pt-32 md:pb-36">
        <HeroOrbs />
        
        <div className="relative">
          <Reveal delay={0.05}>
            <h1 className="mx-auto max-w-5xl overflow-visible text-2xl font-semibold leading-[1.22] tracking-normal text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              E-Signature Done Right:{" "}
              <span className="inline px-2 pb-1 text-signal italic [box-decoration-break:clone] [-webkit-box-decoration-break:clone] [text-wrap:balance]">
                Fast, Legal, and Secure
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-foreground/65 md:text-xl">
              Every document signed on eSignRight comes with a complete audit trail. Who signed, when,
              from where, and on what device. Built for teams who need more than "they clicked yes."
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <PrimaryCTA href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Schedule a Demo
              </PrimaryCTA>
              <GhostCTA href={SIGNUP_URL}>Sign up free</GhostCTA>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-8 text-xs uppercase tracking-[0.24em] text-foreground/55">
              Trusted by <span className="text-foreground/90">300+ teams</span>
            </p>
          </Reveal>


          <Reveal delay={0.30}>
            <HeroVideo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const clientLogos = [
  { name: "Cloudspace Tek", src: "/assets/logos/cloudspacetek.png", href: "https://www.cloudspacetek.com/", hasLogo: true },
  { name: "Xtrac IT", src: "/assets/logos/xtracit.png", href: "https://xtracit.com/", hasLogo: true },
  { name: "Unicom Tec", href: "https://unicomtec.com/", hasLogo: false },
  { name: "Techlogyx", href: "https://techlogyx.com/", hasLogo: false },
  { name: "Amzur", href: "http://www.amzur.com", hasLogo: false },
];

function LogoCloud() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <p className="text-center text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Trusted by teams like
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:gap-x-10 lg:grid-cols-5">
          {clientLogos.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.name}
              className="group flex h-full flex-col items-center justify-start gap-3"
            >
              <div className="flex h-14 w-full items-center justify-center">
                {logo.hasLogo && logo.src ? (
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    loading="lazy"
                    className="h-12 w-auto max-w-[170px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="font-display text-xl font-semibold tracking-tight text-foreground/80 transition duration-300 group-hover:text-foreground">
                    {logo.name}
                  </span>
                )}
              </div>
              <span className="text-center text-sm font-medium text-foreground/80 transition duration-300 group-hover:text-muted-foreground">
                {logo.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


function Pain() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <SectionLabel>The Problem</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
            "Did they <span className="text-signal">actually</span> sign this?"
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70">
            It's the question that comes up months later, during an audit, a dispute, or when a
            vendor claims they "never agreed to that." Email plus PDF plus "reply to confirm" gives you no
            real answer. No timestamp you can rely on. No proof of identity.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const features = [
  {
    icon: FileText,
    title: "Single Document Sign Request",
    body: "Send a single document to one or more recipients for quick, secure e-signature.",
  },
  {
    icon: Files,
    title: "Multi-Document Sign Request",
    body: "Bundle multiple documents in one request for faster, streamlined sign-offs.",
  },
  {
    icon: GitBranch,
    title: "Flexible Signer Flows",
    body: "Choose sequential or parallel signing to match your workflow.",
  },
  {
    icon: Type,
    title: "Dynamic Placeholder Support",
    body: "Easily place signature, text, date, and checkbox fields on any document.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Audit Trail",
    body: "Track every action with AES-encrypted logs for full legal compliance.",
  },
  {
    icon: Fingerprint,
    title: "Signer Identity Verification",
    body: "Capture signer geolocation and photo for an extra layer of authenticity.",
  },
  {
    icon: LayoutTemplate,
    title: "Custom Template Creation",
    body: "Save reusable templates with predefined roles and fields to save time.",
  },
  {
    icon: Bell,
    title: "Auto Reminders & Alerts",
    body: "Keep signers on track with smart reminders and instant status updates.",
  },
  {
    icon: Users,
    title: "Team Management",
    body: "Add users, assign permissions, and monitor activity across departments.",
  },
  {
    icon: FolderOpen,
    title: "Document Repository",
    body: "Access all sent, signed, or pending files in a searchable document management hub.",
  },
  {
    icon: Webhook,
    title: "API Integration & Webhooks",
    body: "Integrate e-signatures into your tools with powerful APIs and real-time sync.",
  },
  {
    icon: Server,
    title: "Self-Hosted Option",
    body: "Self-hosted deployment for full control over data and privacy.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Reports",
    body: "Use custom dashboards and automated reporting to visualize document activity and signer behavior.",
  },
];

function Features() {
  return (
    <section id="features" className="relative bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>WHAT PROOF LOOKS LIKE</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Features That Make E-Signing Effortless
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.03} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-signal/[0.04] p-6 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:border-signal/30 hover:bg-signal/[0.08] hover:shadow-[0_20px_50px_-25px_oklch(0.4_0.15_258/0.45)]">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-signal/10 text-signal transition-all duration-300 group-hover:bg-signal group-hover:text-signal-foreground group-hover:rotate-[-6deg]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compliance() {
  const items = [
    { k: "Section 4", v: "Electronic records get the same legal recognition as paper." },
    { k: "Section 5", v: "A properly authenticated electronic signature equals a handwritten one." },
    { k: "Section 10A", v: "Contracts formed electronically, NDAs, offer letters, vendor agreements, are enforceable exactly like paper." },
  ];
  return (
    <section id="compliance" className="relative overflow-hidden py-20">
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <Reveal>
            <SectionLabel>Legal framework</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              How this holds up when it matters.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-foreground/70">
              Under the Information Technology Act, 2000, courts look for three things when a signature
              is challenged: authenticity, integrity, and a reliable timestamp. eSignRight's audit
              trail, IP, device, timestamp, optional photo, is built to answer exactly those
              questions.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-1">
            {items.map((it, i) => (
              <Reveal key={it.k} delay={0.15 + i * 0.06}>
                <div className="group relative flex items-start gap-5 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-md">
                  <div className="flex shrink-0 flex-col items-center gap-2 border-r border-border/70 pr-5">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-signal/10 text-signal ring-1 ring-signal/20">
                      <Check className="h-5 w-5" />
                    </div>
                    <div className="font-display text-[11px] font-semibold uppercase tracking-wider text-signal">
                      {it.k}
                    </div>
                  </div>
                  <p className="pt-1 text-sm leading-relaxed text-foreground/75">{it.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.15} className="lg:mt-72">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <img
              src={auditIllustrationAsset.url}
              alt="Audit trail with signer location and identity verification"
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const testimonials: {
  quote: string;
  company: string;
  website: string;
  logo?: string;
}[] = [
  {
    quote:
      "eSignRight helped us to initiate documents easily and get signatures on time. It is user friendly and saves a lot of time.",
    company: "Cloudspace Tek",
    website: "https://www.cloudspacetek.com/",
    logo: "/assets/logos/cloudspacetek.png",
  },
  {
    quote:
      "We've been using eSignRight for more than a year and it is user friendly and saves time. We use it to initiate our internal documents with our employees.",
    company: "Xtrac IT",
    website: "https://xtracit.com/",
    logo: "/assets/logos/xtracit.png",
  },
  {
    quote:
      "Before, we used various other signing tools, but eSignRight is very helpful and the support team helps us if we have any questions or issues. It is easy to use.",
    company: "Unicom Tec",
    website: "https://unicomtec.com/",
  },
  {
    quote:
      "We are using eSignRight since a while. It is easy to use, user-friendly and lets us initiate documents for signatures. We can even create templates and reuse them whenever we want.",
    company: "Techlogyx",
    website: "https://techlogyx.com/",
  },
  {
    quote:
      "eSignRight has made managing global signings incredibly seamless and effortless, significantly cutting down our document turnaround time. The detailed audit trails and automated workflows provide exceptional security and control, making this an indispensable asset for our operations.",
    company: "Amzur",
    website: "http://www.amzur.com",
  },
];

function Testimonial() {
  return (
    <section id="testimonials" className="relative bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>LOVED BY TEAMS</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              What customers say
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-foreground/70">
              Real teams using eSignRight to move documents, contracts, and approvals forward.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.company} delay={i * 0.06}>
              <figure className="group flex h-full flex-col rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_oklch(0.4_0.15_258/0.35)]">
                <div className="font-display text-5xl leading-none text-signal/50">&ldquo;</div>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/85 [text-wrap:balance]">
                  {t.quote}
                </blockquote>
                <div className="mt-6 border-t border-border/70 pt-5">
                  <a
                    href={t.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-opacity hover:opacity-80"
                  >
                    {t.logo ? (
                      <img
                        src={t.logo}
                        alt={`${t.company} logo`}
                        loading="lazy"
                        className="h-7 w-auto max-w-[130px] object-contain"
                      />
                    ) : (
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-signal/10 font-display text-sm font-semibold text-signal">
                        {t.company.charAt(0)}
                      </span>
                    )}
                    <span className="font-display text-sm font-semibold text-foreground">
                      {t.company}
                    </span>
                  </a>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Free Forever",
    price: "₹0",
    per: "",
    tagline: "Full audit trail from day one.",
    features: ["1 user", "10 documents / month", "3 templates", "Geo + photo capture", "Email support"],
    cta: "Start free",
    href: SIGNUP_URL,
    external: false,
    highlight: false,
  },
  {
    name: "Starter",
    price: "₹699",
    per: "/mo",
    tagline: "For small teams starting to standardize.",
    features: ["Up to 3 users", "Unlimited documents", "5 templates", "Reminders", "Basic audit trail"],
    cta: "Starter plan",
    href: SIGNUP_URL,
    external: false,
    highlight: false,
  },
  {
    name: "Business",
    price: "₹1,499",
    per: "/mo",
    tagline: "Full audit trail, team management, API.",
    features: [
      "Up to 5 users",
      "Sequential & parallel signing",
      "Unlimited templates",
      "Team management",
      "API + webhooks",
      "Priority support",
    ],
    cta: "\u00a0Business plan",
    href: SIGNUP_URL,
    external: false,
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    tagline: "Self-hosted, SSO, custom retention.",
    features: [
      "Unlimited users",
      "Self-hosted deployment",
      "SSO & custom retention",
      "Configurable verification",
      "Dedicated onboarding",
    ],
    cta: "Schedule a call",
    href: CALENDAR_URL,
    external: true,
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Pricing</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Simple pricing. No surprises.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-foreground/70">
              Full audit trail on every plan, including Free Forever.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1 ${
                  t.highlight
                    ? "border-signal/40 bg-white ring-signal hover:shadow-[0_25px_60px_-25px_oklch(0.4_0.15_258/0.55)]"
                    : "border-border bg-white shadow-sm hover:border-signal/30 hover:shadow-[0_20px_50px_-25px_oklch(0.4_0.15_258/0.4)]"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-signal-foreground">
                    Most popular
                  </span>
                )}
                <div className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.name}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.per}</span>
                </div>
                <p className="mt-2 text-sm text-foreground/70">{t.tagline}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={t.href}
                  target={t.external ? "_blank" : undefined}
                  rel={t.external ? "noopener noreferrer" : undefined}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                    t.highlight
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-primary/70 text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Is this admissible as evidence in court?",
    a: "For standard commercial documents (NDAs, offer letters, vendor agreements), a strong audit trail is generally valid. Courts weigh authenticity, integrity, and timestamp reliability, all of which the audit trail is built to capture.",
  },
  {
    q: "Where is our data stored?",
    a: "We're happy to walk through data residency and hosting details directly with your team. Reach out before you commit if this is a requirement for your compliance sign-off.",
  },
  {
    q: "Do signers need to install anything or create an account?",
    a: "No. They receive an email with a secure link, click it, and sign directly in their browser.",
  },
  {
    q: "Can we self-host?",
    a: "Yes, on the Enterprise plan. Full control over data location and infrastructure.",
  },
  {
    q: "What's your data retention policy?",
    a: "Standard retention with export capability. Enterprise customers can configure custom retention and legal hold policies.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-surface py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            Questions, answered.
          </h2>
        </Reveal>
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-white shadow-sm">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180 text-signal" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section id="demo" className="relative py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-hero-blue p-10 text-center md:p-16">
            <HeroOrbs />
            <div className="relative">
              <h2 className="text-4xl font-semibold leading-tight text-foreground md:text-6xl">
                See the audit trail{" "}
                <span className="text-signal italic">for yourself</span>.
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/70">
                Sign a real document in the next 5 minutes. Look at exactly what gets logged. Decide
                if that's the proof your business needs.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <PrimaryCTA href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                  Schedule a Demo
                </PrimaryCTA>
                <GhostCTA href={SIGNUP_URL}>Sign up free</GhostCTA>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logoAsset.url} alt="eSignRight" className="h-9 w-auto" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-foreground/70">
              Secure, auditable e-signatures for modern businesses. Every signature logged with
              timestamp, IP, and identity verification.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Product
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-signal">Features</a></li>
              <li><a href="#pricing" className="hover:text-signal">Pricing</a></li>
              <li><a href="#compliance" className="hover:text-signal">Compliance</a></li>
              <li><a href="#faq" className="hover:text-signal">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </div>
            <ul className="mt-4 space-y-3 text-sm text-foreground/70">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <a href="mailto:hello@esignright.com" className="hover:text-foreground">hello@esignright.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <a href="tel:+19720200559" className="hover:text-foreground">+1 (972) 020-05599</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span>400 E Royal Lane, Suite 218<br />Irving, TX 75039</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© 2026 eSignRight. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="https://esignright.com" className="hover:text-foreground">esignright.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBanner />
      <Nav />
      <main>
        <Hero />
        <LogoCloud />
        <Pain />
        <Features />
        <Compliance />
        <Testimonial />
        <Pricing />
        <Faq />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
