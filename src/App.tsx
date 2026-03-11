import { useState } from "react";
import {
  Activity,
  Apple,
  Atom,
  Brain,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  Database,
  Dna,
  ExternalLink,
  FlaskConical,
  HeartPulse,
  Hourglass,
  Moon,
  ScanLine,
  ShieldCheck,
  Zap,
  ArrowRight,
  Check,
  Globe,
  Microscope,
  Pill,
  Sparkles,
  TestTubes,
  Users,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   AGENT DATA
   ═══════════════════════════════════════════ */
interface Agent {
  slug: string;
  name: string;
  title: string;
  division: string;
  icon: LucideIcon;
  personality: string;
  capabilities: string[];
  reportsTo: string | null;
}

const agents: Agent[] = [
  { slug: "clo", name: "Chief Longevity Officer", title: "CLO", division: "executive", icon: Dna, personality: "MD/PhD-level strategist. Bridges clinical endocrinology with AI to orchestrate longevity research and metabolic health services.", capabilities: ["strategy", "clinical-oversight", "orchestration"], reportsTo: null },
  { slug: "cto", name: "CTO", title: "Chief Technology Officer", division: "executive", icon: Cpu, personality: "Builds HIPAA-compliant, scalable health tech infrastructure.", capabilities: ["architecture", "HIPAA", "ML-ops"], reportsTo: "clo" },
  { slug: "metabolic-analyst", name: "Metabolic Analyst", title: "Metabolic Health Analyst", division: "clinical", icon: Activity, personality: "Spots insulin resistance patterns 5 years before diabetes diagnosis.", capabilities: ["blood-panels", "glucose", "insulin-resistance"], reportsTo: "clo" },
  { slug: "endocrine-specialist", name: "Endocrine Specialist", title: "Endocrine Analysis", division: "clinical", icon: ScanLine, personality: "Reads hormone panels like a novel. Maps the full endocrine axis.", capabilities: ["thyroid", "cortisol", "sex-hormones", "HPA-axis"], reportsTo: "clo" },
  { slug: "longevity-researcher", name: "Longevity Researcher", title: "Aging & Longevity", division: "research", icon: Hourglass, personality: "Calculates biological age from multi-omic data and designs intervention protocols.", capabilities: ["bio-age", "epigenetic-clocks", "senescence"], reportsTo: "clo" },
  { slug: "genomics-analyst", name: "Genomics Analyst", title: "Genomics & Pharmacogenomics", division: "research", icon: Dna, personality: "Decodes your genome into actionable health insights.", capabilities: ["SNP-analysis", "pharmacogenomics", "nutrigenomics"], reportsTo: "longevity-researcher" },
  { slug: "drug-discovery-lead", name: "Drug Discovery Lead", title: "Drug Discovery & Repurposing", division: "research", icon: FlaskConical, personality: "Hunts for aging therapeutics by mining literature and screening compounds.", capabilities: ["target-ID", "drug-repurposing", "PubMed-mining"], reportsTo: "clo" },
  { slug: "computational-chemist", name: "Computational Chemist", title: "Computational Chemistry", division: "research", icon: Atom, personality: "Simulates molecular interactions at atomic precision.", capabilities: ["molecular-docking", "ADMET", "binding-affinity"], reportsTo: "drug-discovery-lead" },
  { slug: "clinical-trials", name: "Clinical Trials Analyst", title: "Clinical Trials & Regulatory", division: "research", icon: ClipboardCheck, personality: "Designs rigorous trials and navigates FDA pathways.", capabilities: ["trial-design", "FDA", "endpoints"], reportsTo: "drug-discovery-lead" },
  { slug: "nutrition-architect", name: "Nutrition Architect", title: "Metabolic Nutrition", division: "wellness", icon: Apple, personality: "Designs precision nutrition protocols based on metabolic phenotype.", capabilities: ["metabolic-diets", "fasting", "micronutrients"], reportsTo: "clo" },
  { slug: "exercise-physiologist", name: "Exercise Physiologist", title: "Exercise & Metabolic Fitness", division: "wellness", icon: HeartPulse, personality: "Programs exercise for metabolic health. Integrates with FitFlow.", capabilities: ["VO2max", "zone-2", "resistance-training"], reportsTo: "clo" },
  { slug: "sleep-circadian", name: "Sleep Specialist", title: "Sleep & Circadian Rhythm", division: "wellness", icon: Moon, personality: "Optimizes the most underrated longevity intervention — sleep.", capabilities: ["sleep-architecture", "circadian", "HRV"], reportsTo: "clo" },
  { slug: "biomedical-data-eng", name: "Biomedical Data Engineer", title: "Health Data Pipelines", division: "engineering", icon: Database, personality: "Builds HIPAA-compliant pipelines from Apple Watch to lab results.", capabilities: ["FHIR", "wearables", "EHR"], reportsTo: "cto" },
  { slug: "ml-engineer", name: "AI/ML Engineer", title: "Biomedical AI/ML", division: "engineering", icon: Brain, personality: "Trains models on biomarker data to predict health trajectories.", capabilities: ["predictive-models", "survival-analysis", "time-series"], reportsTo: "cto" },
  { slug: "compliance-officer", name: "Compliance Officer", title: "HIPAA & Regulatory", division: "operations", icon: ShieldCheck, personality: "Zero tolerance for compliance gaps. Every data point meets HIPAA and FDA standards.", capabilities: ["HIPAA", "FDA", "data-privacy"], reportsTo: "clo" },
];

const divisionMeta: Record<string, { label: string; color: string; bg: string; border: string }> = {
  executive: { label: "Executive", color: "from-emerald-400 to-teal-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  clinical: { label: "Clinical Science", color: "from-cyan-400 to-blue-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  research: { label: "Drug Discovery & Research", color: "from-violet-400 to-purple-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  wellness: { label: "Lifestyle & Wellness", color: "from-lime-400 to-green-400", bg: "bg-lime-500/10", border: "border-lime-500/20" },
  engineering: { label: "Engineering", color: "from-sky-400 to-indigo-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  operations: { label: "Operations", color: "from-amber-400 to-orange-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
};

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */
const platformServices = [
  {
    icon: Activity,
    title: "Metabolic Health Analysis",
    desc: "AI가 혈액 검사, 대사 패널, 인슐린 저항성을 분석하여 맞춤형 건강 인사이트를 제공합니다.",
    color: "from-cyan-500 to-teal-500",
    agents: ["Metabolic Analyst", "Endocrine Specialist"],
  },
  {
    icon: Hourglass,
    title: "Biological Age Tracking",
    desc: "에피제네틱 클럭, 텔로미어, 노화 바이오마커 분석으로 생물학적 나이를 측정하고 추적합니다.",
    color: "from-violet-500 to-purple-500",
    agents: ["Longevity Researcher", "Genomics Analyst"],
  },
  {
    icon: FlaskConical,
    title: "Drug Discovery",
    desc: "AI 기반 타겟 발굴, 분자 도킹, 약물 재창출로 노화/대사 신약을 탐색합니다.",
    color: "from-rose-500 to-pink-500",
    agents: ["Drug Discovery Lead", "Computational Chemist", "Clinical Trials"],
  },
  {
    icon: HeartPulse,
    title: "Longevity Protocol Design",
    desc: "영양, 운동, 수면을 통합한 대사 최적화 프로토콜. FitFlow 앱과 연동됩니다.",
    color: "from-lime-500 to-emerald-500",
    agents: ["Nutrition Architect", "Exercise Physiologist", "Sleep Specialist"],
  },
];

/* ═══════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════ */
const plans = [
  {
    name: "Metabolic Check",
    price: "Free",
    period: "",
    desc: "기본 대사 건강 점수 확인",
    features: ["기본 혈액 검사 분석", "대사 건강 점수", "일반 식단 가이드", "커뮤니티 접근"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Longevity Pro",
    price: "$49",
    period: "/month",
    desc: "개인 맞춤형 노화 관리",
    features: ["정밀 바이오마커 분석", "생물학적 나이 측정", "맞춤 영양/운동/수면 프로토콜", "호르몬 패턴 분석", "FitFlow 앱 연동", "월간 AI 컨설팅 리포트"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "기업/연구기관 맞춤 솔루션",
    features: ["Drug Discovery 파이프라인 접근", "게노믹스 분석", "임상시험 설계 지원", "HIPAA 컴플라이언스 통합", "전담 AI 에이전트 배정", "API 접근"],
    cta: "Contact Us",
    highlight: false,
  },
];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function AgentCard({ agent }: { agent: Agent }) {
  const [open, setOpen] = useState(false);
  const d = divisionMeta[agent.division];
  const Icon = agent.icon;
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`relative border rounded-xl p-3.5 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 ${d.bg} ${d.border}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${d.color} flex items-center justify-center text-white shrink-0`}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate">{agent.name}</h4>
          <p className="text-[11px] text-text-muted truncate">{agent.title}</p>
        </div>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
          <p className="text-xs text-text-secondary italic leading-relaxed">"{agent.personality}"</p>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.map((c) => (
              <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">{c}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrgChart() {
  const clo = agents.find((a) => a.slug === "clo")!;
  const divisions = ["clinical", "research", "wellness", "engineering", "operations"] as const;

  return (
    <div className="space-y-8">
      {/* CLO + CTO */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-72"><AgentCard agent={clo} /></div>
        <div className="w-px h-4 bg-brand/30" />
        <div className="w-72"><AgentCard agent={agents.find((a) => a.slug === "cto")!} /></div>
      </div>
      <div className="flex justify-center"><div className="w-px h-6 bg-brand/20" /></div>
      {/* Divisions */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {divisions.map((div) => {
          const d = divisionMeta[div];
          const divAgents = agents.filter((a) => a.division === div);
          return (
            <div key={div} className="space-y-3">
              <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${d.bg} ${d.border} border text-center`}>
                {d.label}
              </div>
              {divAgents.map((a) => <AgentCard key={a.slug} agent={a} />)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export function App() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-surface/80 border-b border-border-dim">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-teal flex items-center justify-center">
              <Dna size={17} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">BrownAI</span>
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand-light font-medium">LONGEVITY</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
            <a href="#services" className="hover:text-text-primary transition">Services</a>
            <a href="#team" className="hover:text-text-primary transition">AI Team</a>
            <a href="#pipeline" className="hover:text-text-primary transition">Pipeline</a>
            <a href="#pricing" className="hover:text-text-primary transition">Pricing</a>
            <a href="https://agent-hub-alpha-nine.vercel.app" target="_blank" rel="noopener" className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand/10 text-brand-light hover:bg-brand/20 transition text-xs font-medium">
              Agent Hub <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2" />
        <div className="dna-glow -top-20 right-0" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-xs mb-6">
            <Sparkles size={12} /> AI-Powered Longevity Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-brand-light via-teal to-accent bg-clip-text text-transparent">
              Live Longer.
            </span>
            <br />
            <span className="text-text-primary">Age Smarter.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-4">
            내분비 전문의가 설계하고, 15개 AI 에이전트가 운영하는
            <br className="hidden sm:inline" />
            대사 건강 최적화 & 신약 발굴 플랫폼.
          </p>
          <p className="text-sm text-text-muted max-w-lg mx-auto mb-8">
            Designed by an MD/PhD Endocrinologist specializing in Aging & Metabolism.
            <br />
            Powered by autonomous AI agents orchestrated through Paperclip.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing" className="group px-7 py-3 rounded-xl bg-gradient-to-r from-brand to-brand-dark text-white font-semibold hover:shadow-lg hover:shadow-brand/25 transition flex items-center gap-2">
              Start Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#pipeline" className="px-7 py-3 rounded-xl border border-border-dim text-text-secondary hover:text-text-primary hover:border-brand/30 transition flex items-center gap-2">
              <TestTubes size={16} /> Drug Discovery Pipeline
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-4 gap-6 max-w-lg mx-auto">
            {[
              { n: "15", label: "AI Agents", color: "text-brand-light" },
              { n: "5", label: "Divisions", color: "text-teal" },
              { n: "0", label: "Humans Required", color: "text-accent" },
              { n: "24/7", label: "Always On", color: "text-lime" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.n}</div>
                <div className="text-[10px] sm:text-xs text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER CREDIBILITY ── */}
      <section className="py-16 border-y border-border-dim bg-surface-raised/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-card border border-border-dim">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-teal flex items-center justify-center text-white text-lg font-bold">
              MD
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">Founded by MD/PhD Endocrinologist</p>
              <p className="text-xs text-text-muted">Specialty: Aging & Metabolism | Clinical + AI Research</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-text-muted">
            {["Endocrinology", "Aging Biology", "Metabolic Syndrome", "Hormone Therapy", "Drug Discovery", "AI/ML"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full border border-border-dim">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-brand-light font-semibold uppercase tracking-widest mb-2">Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">What We Do</h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              대사 건강 분석부터 신약 발굴까지 — AI가 수행하고, 의학이 검증합니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {platformServices.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="group bg-surface-card border border-border-dim rounded-2xl p-6 hover:border-brand/20 transition">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.agents.map((a) => (
                      <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-brand/10 text-brand-light">{a}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI TEAM ── */}
      <section id="team" className="py-20 bg-surface-raised/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-brand-light font-semibold uppercase tracking-widest mb-2">AI Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">15 Specialized AI Agents</h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              각 에이전트를 클릭하면 역할과 성격을 확인할 수 있습니다.
            </p>
          </div>
          <OrgChart />
        </div>
      </section>

      {/* ── DRUG DISCOVERY PIPELINE ── */}
      <section id="pipeline" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-violet font-semibold uppercase tracking-widest mb-2">Drug Discovery</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">AI Drug Discovery Pipeline</h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              노화/대사 관련 신약 타겟 발굴부터 임상 설계까지 — AI가 가속합니다.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "Target Identification", desc: "PubMed, ChEMBL, UniProt에서 노화/대사 관련 유효 타겟 스캐닝", icon: Microscope, agent: "Drug Discovery Lead" },
              { step: "02", title: "Compound Screening", desc: "가상 스크리닝으로 후보 화합물 선별 (분자 도킹, ADMET 예측)", icon: Atom, agent: "Computational Chemist" },
              { step: "03", title: "Drug Repurposing", desc: "기존 승인 약물의 노화/대사 적응증 탐색 (빠른 경로)", icon: Pill, agent: "Drug Discovery Lead" },
              { step: "04", title: "Genomic Validation", desc: "약물유전체학 분석으로 반응군 예측 및 부작용 최소화", icon: Dna, agent: "Genomics Analyst" },
              { step: "05", title: "Clinical Trial Design", desc: "최적 엔드포인트, 피험자 선정, FDA 경로 설계", icon: ClipboardCheck, agent: "Clinical Trials Analyst" },
              { step: "06", title: "Regulatory Compliance", desc: "FDA/IRB 규제 문서 작성 및 컴플라이언스 검증", icon: ShieldCheck, agent: "Compliance Officer" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex items-start gap-4 p-5 rounded-xl bg-surface-card border border-border-dim hover:border-violet/20 transition">
                  <div className="w-11 h-11 rounded-lg bg-violet/10 flex items-center justify-center text-violet shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-text-muted font-mono">{item.step}</span>
                      <ChevronRight size={12} className="text-text-muted" />
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-full bg-violet/10 text-violet shrink-0">{item.agent}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-surface-raised/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-teal font-semibold uppercase tracking-widest mb-2">Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Upload Data", desc: "혈액 검사 결과, 웨어러블 데이터, 건강 기록을 업로드합니다.", icon: Database },
              { num: "2", title: "AI Analysis", desc: "15개 전문 에이전트가 동시에 데이터를 분석합니다.", icon: Brain },
              { num: "3", title: "Protocol Design", desc: "영양, 운동, 수면, 보충제 맞춤 프로토콜을 생성합니다.", icon: Sparkles },
              { num: "4", title: "Track & Optimize", desc: "FitFlow 연동으로 추적하고 AI가 지속적으로 최적화합니다.", icon: Activity },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.num} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-teal/20 border border-brand/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-brand-light" />
                  </div>
                  <div className="text-xs text-text-muted font-mono mb-1">Step {item.num}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FITFLOW INTEGRATION ── */}
      <section className="py-16 border-y border-border-dim">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center gap-8 bg-surface-card border border-border-dim rounded-2xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime to-emerald flex items-center justify-center shrink-0">
              <HeartPulse size={32} className="text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-2">FitFlow 앱 연동</h3>
              <p className="text-sm text-text-secondary mb-3">
                대사 건강에 최적화된 운동 프로그램이 FitFlow 앱으로 자동 전송됩니다.
                Zone 2 유산소, 저항 운동, HIIT — 모두 당신의 바이오마커에 맞춰 설계.
              </p>
              <a href="https://fitflow-website.vercel.app" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm text-lime hover:text-brand-light transition">
                FitFlow 다운로드 <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-brand-light font-semibold uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Plans</h2>
            <p className="text-text-secondary">무료로 시작하고, 필요에 따라 확장하세요.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`relative rounded-2xl p-6 border transition ${p.highlight ? "bg-brand/5 border-brand/30 shadow-lg shadow-brand/10" : "bg-surface-card border-border-dim"}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand text-white text-[10px] font-semibold">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-xs text-text-muted mb-4">{p.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-text-muted">{p.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check size={14} className="text-brand-light mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${p.highlight ? "bg-gradient-to-r from-brand to-brand-dark text-white hover:shadow-lg hover:shadow-brand/25" : "border border-border-dim text-text-secondary hover:text-text-primary hover:border-brand/30"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-16 bg-surface-raised/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-6">Powered By</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Paperclip", desc: "AI Orchestration", url: "https://github.com/paperclipai/paperclip" },
              { name: "Agent Hub", desc: "101 AI Agents", url: "https://agent-hub-alpha-nine.vercel.app" },
              { name: "FitFlow", desc: "Fitness App", url: "https://fitflow-website.vercel.app" },
              { name: "Claude", desc: "LLM Engine", url: "https://anthropic.com" },
            ].map((t) => (
              <a key={t.name} href={t.url} target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-dim hover:border-brand/20 transition">
                <Globe size={14} className="text-text-muted" />
                <div className="text-left">
                  <div className="text-xs font-semibold">{t.name}</div>
                  <div className="text-[10px] text-text-muted">{t.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="animate-float mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-teal flex items-center justify-center mx-auto">
              <Dna size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Your Longevity Journey
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            15개 AI 에이전트가 당신의 대사 건강을 분석하고,
            맞춤형 장수 프로토콜을 설계합니다. 지금 무료로 시작하세요.
          </p>
          <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand to-brand-dark text-white font-semibold hover:shadow-xl hover:shadow-brand/25 transition text-lg">
            Get Started Free <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-border-dim">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Dna size={16} className="text-brand-light" />
              <span className="text-sm font-semibold">BrownAI</span>
              <span className="text-xs text-text-muted">— AI-Powered Longevity Platform</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <a href="https://agent-hub-alpha-nine.vercel.app" target="_blank" rel="noopener" className="hover:text-text-secondary transition">Agent Hub</a>
              <a href="https://fitflow-website.vercel.app" target="_blank" rel="noopener" className="hover:text-text-secondary transition">FitFlow</a>
              <a href="https://github.com/ohbryt" target="_blank" rel="noopener" className="hover:text-text-secondary transition">GitHub</a>
            </div>
          </div>
          <div className="mt-4 text-center text-[10px] text-text-muted">
            Designed by MD/PhD Endocrinologist. Powered by 15 AI Agents. Built with Paperclip.
          </div>
        </div>
      </footer>
    </div>
  );
}
