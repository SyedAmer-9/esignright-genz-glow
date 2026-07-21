import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  FileSignature,
  Fingerprint,
  Lock,
  Users,
  ArrowRight,
  Check,
  Play,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
  Star,
  Workflow,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import videoPoster from "@/assets/video-poster.jpg";
import logoAsset from "@/assets/esignright-logo.png.asset.json";
import heroOrbs from "@/assets/hero-orbs.jpg";
import ctaOrb from "@/assets/cta-orb.jpg";

const VIDEO_BUCKET = "videobucket";
const VIDEO_PATH = "eSignRight_HandsON.mp4";
const YOUTUBE_FALLBACK_URL = "https://youtube.com/";
const SIGNUP_URL = "https://app.esignright.com/account/signup";
const CALENDAR_URL = "https://calendly.com/esignright/30min";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ------------ primitives ------------ */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-signal shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </span>
  );
}

function PillPrimary({
  children,
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-6 pr-2 text-sm font-medium text-primary-foreground transition-all hover:pr-3 hover:pl-7"
    >
      {children}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-signal text-signal-foreground transition-transform group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function PillGhost({
  children,
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/40"
    >
      {children}
    </a>
  );
}

/* ------------ nav ------------ */

function Nav() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-6xl">
      <div className="flex items-center justify-between rounded-full border border-black/5 bg-white/85 px-4 py-2 shadow-[0_10px_40px_-20px_rgba(20,40,80,0.25)] backdrop-blur">
        <a href="#" className="flex items-center gap-2 pl-1" aria-label="eSignRight home">
          <img src={logoAsset.url} alt="eSignRight" className="h-7 w-auto" />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#integrations" className="hover:text-foreground">Integrations</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={SIGNUP_URL}
            className="hidden rounded-full border border-primary/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground hover:border-primary/40 sm:inline-flex"
          >
            Sign In
          </a>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------ hero video ------------ */

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
    <div className="mx-auto mt-14 max-w-5xl px-4">
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_40px_120px_-40px_rgba(30,60,140,0.35)]">
        <img
          src={videoPoster}
          alt="Product walkthrough preview"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            playing ? "scale-105 opacity-0" : "scale-105 blur-xl opacity-90"
          }`}
          aria-hidden={playing}
        />
        <div
          className={`absolute inset-0 bg-white/20 transition-opacity duration-500 ${
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
              playing ? "opacity-100" : "pointer-events-none opacity-0"
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
              <img src={logoAsset.url} alt="eSignRight" className="h-7 w-auto opacity-90" />
              <span className="grid h-16 w-16 place-items-center rounded-full bg-signal text-signal-foreground shadow-[0_20px_60px_-10px_rgba(37,99,235,0.6)] transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 translate-x-0.5" />
              </span>
              <span className="text-xs font-medium text-foreground/70">
                {loading ? "Loading video…" : "Watch the 2-minute walkthrough"}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <span>Video not loading?</span>
        <a
          href={YOUTUBE_FALLBACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-signal underline-offset-4 hover:underline"
        >
          Watch on YouTube <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

/* ------------ hero ------------ */

function Hero() {
  return (
    <section className="px-3 pt-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
        {/* backdrop image */}
        <div className="absolute inset-0">
          <img
            src={heroOrbs}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/60" />
        </div>

        <div className="relative px-6 pt-24 pb-16 text-center md:pt-32">
          <Reveal>
            <h1 className="mx-auto max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              E-Signature Done Right:
              <br />
              Fast, Legal, and Secure
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
              Streamline your business agreements with secure, legally-binding eSignatures
              that are easy to send, sign, and track — with a full audit trail on every plan.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PillPrimary href={SIGNUP_URL}>Get Started</PillPrimary>
              <PillGhost href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Schedule a Demo
              </PillGhost>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <HeroVideo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------ trust bar ------------ */

function TrustBar() {
  const brands = ["Northwind", "Craftlink", "OrbitPay", "Meridian", "Ledgerly", "Havenlaw"];
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
        Trusted by <span className="text-foreground">308 North American clients</span>
      </p>
      <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
        {brands.map((b) => (
          <div
            key={b}
            className="text-center font-display text-lg font-semibold tracking-tight text-foreground/60"
          >
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------ stats: contracts & approvals ------------ */

function Stats() {
  const stats = [
    { k: "80%", v: "Faster contract turnaround for teams that switch." },
    { k: "$2B+", v: "In business agreements processed on eSignRight." },
    { k: "95%", v: "Of signed docs finalized on the first send." },
    { k: "4x", v: "More visibility across approvals & signers." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-3">
      <div className="rounded-[2rem] bg-surface-2 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>By the numbers</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            Contracts and Approvals,
            <br /> visibly faster.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-white/70 p-6 backdrop-blur">
                <div className="font-display text-4xl font-semibold text-signal md:text-5xl">{s.k}</div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------ bento features ------------ */

const bento = [
  {
    icon: Workflow,
    tag: "Workflows",
    title: "Custom Workflows for Teams",
    body: "Send to multiple signers in a single request, choose between sequential or parallel routing, and create your own templates that grow with your team.",
  },
  {
    icon: ShieldCheck,
    tag: "Security",
    title: "Advanced Security & Compliance",
    body: "Meets global standards including ESIGN and UETA. Captures geo, device, and IP for every signature — plus optional photo capture and IP-restriction for regulated teams.",
  },
  {
    icon: FileSignature,
    tag: "Documents",
    title: "Flexible Document Workflows",
    body: "Manage users, roles and document access from a single dashboard. Monitor every document in real time with intelligent status and reminders.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-3 pt-24">
      <div className="rounded-[2rem] bg-surface px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Product</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            Everything you need for efficient <br className="hidden md:block" /> eSignature
            management
          </h2>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {bento.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-white/70 bg-white p-7 shadow-[0_20px_60px_-40px_rgba(20,40,80,0.35)]">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-signal/10 text-signal">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {f.tag}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{f.body}</p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  {[0, 1, 2].map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                      <span>
                        {k === 0 && "Send to multiple signers in a single request"}
                        {k === 1 && "Sequential or parallel signing flows"}
                        {k === 2 && "Automated reminders that keep deals moving"}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------ compliance ------------ */

function Compliance() {
  const items = [
    { k: "ESIGN Act", v: "Electronic records get the same legal recognition as paper." },
    { k: "UETA", v: "A properly authenticated electronic signature equals a handwritten one." },
    { k: "Contract law", v: "NDAs, offer letters, and vendor agreements — enforceable exactly like paper." },
  ];
  return (
    <section id="compliance" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>Legal framework</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            Built to hold up when it matters.
          </h2>
          <p className="mt-5 max-w-md text-foreground/70">
            Courts weigh three things when a signature is challenged: authenticity, integrity,
            and a reliable timestamp. eSignRight's audit trail — IP, device, timestamp, optional
            photo — is built to answer exactly those questions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillGhost href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
              Talk to compliance
            </PillGhost>
          </div>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.06}>
              <div className="flex gap-5 rounded-2xl border border-black/5 bg-white p-6">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signal/10 text-signal">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-signal">{it.k}</div>
                  <p className="mt-1 text-sm text-foreground/70">{it.v}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------ integrations ------------ */

function Integrations() {
  const rows = [
    ["Slack", "Notion", "HubSpot", "Salesforce", "Dropbox", "Google Drive"],
    ["Zapier", "OneDrive", "Zoho", "Freshworks", "Monday", "Airtable"],
    ["Gmail", "Outlook", "Box", "Xero", "QuickBooks", "Stripe"],
  ];
  return (
    <section id="integrations" className="mx-auto max-w-7xl px-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-surface-2 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            Integrations that power
            <br /> real productivity
          </h2>
          <p className="mt-4 text-foreground/70">
            Plugs into the tools your team already lives in — no new dashboards to learn.
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-center gap-3"
              style={{ marginLeft: i % 2 === 1 ? "2rem" : 0 }}
            >
              {row.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/80 bg-white px-5 py-2.5 text-sm font-medium text-foreground/70 shadow-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------ testimonials ------------ */

const quotes = [
  {
    name: "Priya Menon",
    role: "Head of Ops · IT Staffing Firm",
    body: "We finally have a signature we can point to. The audit trail settled a client dispute in ten minutes.",
  },
  {
    name: "Marcus Ellis",
    role: "General Counsel · MidMarket SaaS",
    body: "It's the first eSign tool our legal team hasn't tried to replace. That's the highest compliment I can give.",
  },
  {
    name: "Sana Karim",
    role: "People Lead · 120-person startup",
    body: "Offer letters, NDAs, contractor agreements — all signed and tracked without another tool for HR to babysit.",
  },
  {
    name: "David Rowe",
    role: "Founder · Boutique Consultancy",
    body: "Free Forever tier gave us everything we needed to start. We upgraded because we wanted to, not because we had to.",
  },
  {
    name: "Ana Costa",
    role: "Finance Director · Logistics Co.",
    body: "Vendor contracts move through 4 approvers in a day now. That used to take a week of chasing on email.",
  },
  {
    name: "Jordan Blake",
    role: "COO · Regional Healthcare Group",
    body: "Self-hosted was a hard requirement for us. eSignRight was one of the very few that actually delivered.",
  },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Customer stories</Eyebrow>
        <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          Trusted by teams who sign smarter
        </h2>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={(i % 3) * 0.06}>
            <figure className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6">
              <div className="flex gap-0.5 text-signal">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                "{q.body}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-signal/15 font-display text-sm font-semibold text-signal">
                  {q.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------ pricing ------------ */

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
    href: CALENDAR_URL,
    external: true,
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          Simple pricing. No surprises.
        </h2>
        <p className="mt-4 text-foreground/70">
          Full audit trail on every plan — including Free Forever.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all ${
                t.highlight
                  ? "border-signal/40 bg-gradient-to-b from-signal/8 to-white shadow-[0_30px_80px_-40px_rgba(37,99,235,0.35)]"
                  : "border-black/5 bg-white"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-signal-foreground">
                  Most popular
                </span>
              )}
              <div className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.per}</span>
              </div>
              <p className="mt-2 text-sm text-foreground/70">{t.tagline}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
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
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary/15 text-foreground hover:border-primary/40"
                }`}
              >
                {t.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------ faq ------------ */

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
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          Common questions
        </h2>
      </div>
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen ? "border-signal/30 bg-white" : "border-black/5 bg-white"
              }`}
            >
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
    </section>
  );
}

/* ------------ closing ------------ */

function ClosingCTA() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-3 pb-16">
      <div className="relative overflow-hidden rounded-[2rem]">
        <img src={ctaOrb} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white/80" />
        <div className="relative px-6 py-24 text-center md:py-28">
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
            Legally binding eSignatures
            <br /> made simple and secure
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-foreground/70">
            Sign a real document in the next five minutes. See exactly what gets logged.
            Decide if that's the proof your business needs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PillPrimary href={SIGNUP_URL}>Get Started Free</PillPrimary>
            <PillGhost href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
              Schedule a Demo
            </PillGhost>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------ footer ------------ */

function Footer() {
  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logoAsset.url} alt="eSignRight" className="h-8 w-auto" />
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
              <li><a href="#integrations" className="hover:text-signal">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-signal">Pricing</a></li>
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
                <a href="mailto:hello@esignright.com" className="hover:text-foreground">
                  hello@esignright.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <a href="tel:+19720200559" className="hover:text-foreground">
                  +1 (972) 020-05599
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span>
                  400 E Royal Lane, Suite 218
                  <br /> Irving, TX 75039
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
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

/* ------------ page ------------ */

// Keep unused-imports quiet: Users, Fingerprint, Lock are legacy icons kept for future feature slots.
void Users; void Fingerprint; void Lock;

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Features />
        <Compliance />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Faq />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
