import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  FileSignature,
  Fingerprint,
  Lock,
  Server,
  Users,
  ArrowRight,
  Check,
  Play,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import videoPoster from "@/assets/video-poster.jpg";
import logoAsset from "@/assets/esignright-logo.png.asset.json";

const VIDEO_BUCKET = "videobucket";
const VIDEO_PATH = "eSignRight_HandsON.mp4";
// TODO: replace with the actual unlisted YouTube URL from Marketing
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
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-surface ring-signal">
        {/* Blurred poster stays behind the video */}
        <img
          src={videoPoster}
          alt="Product walkthrough preview"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            playing ? "scale-105 opacity-0" : "scale-110 blur-xl opacity-90"
          }`}
          aria-hidden={playing}
        />
        <div
          className={`absolute inset-0 bg-background/40 transition-opacity duration-500 ${
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
              <span className="text-sm text-muted-foreground">
                {loading ? "Loading video…" : "Watch the 2-minute walkthrough"}
              </span>
            </button>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* YouTube backup link */}
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

export const Route = createFileRoute("/")({
  component: LandingPage,
});

// ---------- Small primitives ----------

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
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
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </span>
  );
}


function PrimaryCTA({ children, href = "#demo", target, rel }: { children: React.ReactNode; href?: string; target?: string; rel?: string }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group relative inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-signal-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_var(--signal)] active:scale-[0.98]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function GhostCTA({ children, href = "#signup", target, rel }: { children: React.ReactNode; href?: string; target?: string; rel?: string }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-signal/40 hover:bg-surface-2"
    >
      {children}
    </a>
  );
}


// ---------- Nav ----------

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2" aria-label="eSignRight home">
          <img
            src={logoAsset.url}
            alt="eSignRight"
            className="h-8 w-auto brightness-0 invert"
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#compliance" className="hover:text-foreground">Compliance</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={SIGNUP_URL} className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">
            Sign up
          </a>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-sm font-semibold text-signal-foreground transition-all hover:shadow-[0_0_24px_-6px_var(--signal)]"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </header>
  );
}

// ---------- Hero ----------

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="absolute inset-0 bg-glow-signal" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 text-center md:pt-28 md:pb-32">
        <Reveal>
          <SectionLabel>Trust · Security · Audit Trail</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            A signature you can{" "}
            <span className="text-gradient-signal italic">actually prove</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Every document signed on eSignRight comes with a complete audit trail — who signed, when,
            from where, and on what device. Built for teams who need more than "they clicked yes."
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryCTA href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule a Demo</PrimaryCTA>
            <GhostCTA href={SIGNUP_URL}>
              <Sparkles className="h-4 w-4 text-signal" /> Sign up free
            </GhostCTA>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by <span className="text-foreground">300+ teams</span> across North America
          </p>
        </Reveal>

        {/* Video / product frame */}
        <Reveal delay={0.25}>
          <HeroVideo />
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Logo cloud ----------

function LogoCloud() {
  const placeholders = ["ACME", "NORTHWIND", "STARK", "UMBRELLA", "MONARCH", "AXIOM"];
  return (
    <section className="border-y border-border/60 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Client logos — placeholders (CS team to provide)
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-8 opacity-70 sm:grid-cols-3 md:grid-cols-6">
          {placeholders.map((name) => (
            <div
              key={name}
              className="text-center font-display text-sm font-semibold tracking-widest text-muted-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Pain ----------

function Pain() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <SectionLabel>The Problem</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
            "Did they{" "}
            <span className="text-signal">actually</span> sign this?"
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            It's the question that comes up months later — during an audit, a dispute, or when a
            vendor claims they "never agreed to that." Email + PDF + "reply to confirm" gives you no
            real answer. No timestamp you can rely on. No proof of identity.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Features ----------

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Audit Trail",
    body: "Every action — sent, viewed, signed — is logged with a timestamp in an encrypted record. The artifact you point to if a signed document is ever disputed.",
  },
  {
    icon: Fingerprint,
    title: "Signer Identity Verification",
    body: "Captures the signer's IP-based location and an optional photo at the exact moment of signing. An extra layer of proof beyond \"whoever had the email link.\"",
  },
  {
    icon: Lock,
    title: "Encrypted Storage, Every Tier",
    body: "Documents are encrypted at rest and in transit from the Free Forever tier upward — not gated behind a premium plan.",
  },
  {
    icon: Server,
    title: "Self-Hosted Option",
    body: "For businesses that need full control over where data physically lives — relevant for security-conscious industries with strict data-residency needs.",
  },
  {
    icon: Users,
    title: "Team Roles & Permissions",
    body: "Control who in your organization can send, view, or manage documents — with activity visibility by department or individual.",
  },
  {
    icon: FileSignature,
    title: "Sequential & Parallel Signing",
    body: "Route documents in any order — employee first, then HR countersigns, or all parties at once. Automated reminders keep everything moving.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>What proof looks like</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Built to answer the questions your auditor will ask.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all hover:border-signal/40 hover:bg-surface-2">
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-background/60 text-signal ring-1 ring-border">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </div>
            </Reveal>

          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Compliance ----------

function Compliance() {
  const items = [
    { k: "Section 4", v: "Electronic records get the same legal recognition as paper." },
    { k: "Section 5", v: "A properly authenticated electronic signature equals a handwritten one." },
    { k: "Section 10A", v: "Contracts formed electronically — NDAs, offer letters, vendor agreements — are enforceable exactly like paper." },
  ];
  return (
    <section id="compliance" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-glow-signal opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <SectionLabel>Legal framework</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              How this holds up when it matters.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground">
              Courts look for three things when a signature is challenged: authenticity, integrity,
              and a reliable timestamp. eSignRight's audit trail — IP, device, timestamp, optional
              photo — is built to answer exactly those questions.
            </p>
          </Reveal>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.08}>
              <div className="flex gap-5 rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
                <div className="shrink-0">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-signal/10 text-signal ring-1 ring-signal/30">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-signal">{it.k}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{it.v}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Testimonial ----------

function Testimonial() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <figure className="relative rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-10 md:p-14">
            <div className="absolute left-10 top-8 font-display text-6xl leading-none text-signal/60">
              &ldquo;
            </div>
            <blockquote className="pl-10 text-xl leading-relaxed text-foreground md:text-2xl">
              We needed to know exactly who signed what, and when, for our client contracts. The
              audit trail gave us that without adding a new tool our team had to learn.
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 pl-10">
              <div className="h-11 w-11 rounded-full bg-signal/20 ring-2 ring-signal/40" />
              <div>
                <div className="text-sm font-semibold">Operations Lead</div>
                <div className="text-xs text-muted-foreground">IT Staffing Firm · Placeholder</div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Pricing ----------

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
    cta: "Start free trial",
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
    cta: "Schedule a demo",
    href: CALENDAR_URL,
    external: true,
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
    cta: "Talk to sales",
    href: "#demo",
    external: false,
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative py-28">
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
            <p className="mt-4 text-muted-foreground">
              Full audit trail on every plan — including Free Forever.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all ${
                  t.highlight
                    ? "border-signal/50 bg-gradient-to-b from-signal/10 to-surface ring-signal"
                    : "border-border bg-surface hover:border-signal/30"
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
                <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
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
                      ? "bg-signal text-signal-foreground hover:shadow-[0_0_30px_-8px_var(--signal)]"
                      : "border border-border bg-background/40 hover:border-signal/40"
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

// ---------- FAQ ----------

const faqs = [
  {
    q: "Is this admissible as evidence in court?",
    a: "For standard commercial documents (NDAs, offer letters, vendor agreements), a strong audit trail is generally valid. Courts weigh authenticity, integrity, and timestamp reliability — all of which the audit trail is built to capture.",
  },
  {
    q: "Where is our data stored?",
    a: "We're happy to walk through data residency and hosting details directly with your team — reach out before you commit if this is a requirement for your compliance sign-off.",
  },
  {
    q: "Do signers need to install anything or create an account?",
    a: "No. They receive an email with a secure link, click it, and sign directly in their browser.",
  },
  {
    q: "Can we self-host?",
    a: "Yes, on the Enterprise plan — full control over data location and infrastructure.",
  },
  {
    q: "What's your data retention policy?",
    a: "Standard retention with export capability. Enterprise customers can configure custom retention and legal hold policies.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            Questions, answered.
          </h2>
        </Reveal>
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-surface/40">
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
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Closing CTA ----------

function ClosingCTA() {
  return (
    <section id="demo" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-signal/30 bg-gradient-to-br from-surface to-background p-10 text-center md:p-16">
            <div className="absolute inset-0 bg-glow-signal" />
            <div className="relative">
              <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
                See the audit trail{" "}
                <span className="text-gradient-signal italic">for yourself</span>.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Sign a real document in the next 5 minutes. Look at exactly what gets logged. Decide
                if that's the proof your business needs.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <PrimaryCTA href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule a Demo</PrimaryCTA>
                <GhostCTA href={SIGNUP_URL}>Sign up free</GhostCTA>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer ----------

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src={logoAsset.url}
                alt="eSignRight"
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
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
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
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

// ---------- Page ----------

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
