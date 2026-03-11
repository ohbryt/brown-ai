import { useState } from "react";
import {
  Activity,
  Apple,
  Atom,
  ArrowRight,
  Brain,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  Database,
  Dna,
  ExternalLink,
  FlaskConical,
  Globe,
  HeartPulse,
  Hourglass,
  Microscope,
  Moon,
  Pill,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TestTubes,
  Users,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   TWO BUSINESS UNITS
   ═══════════════════════════════════════════ */
type BU = "health" | "discovery";

/* ── Agent type ── */
interface Agent {
  slug: string;
  name: string;
  title: string;
  icon: LucideIcon;
  personality: string;
  capabilities: string[];
  bu: BU | "shared";
}

/* ── BrownAI Health agents (B2C) ── */
const healthAgents: Agent[] = [
  { slug: "metabolic-analyst", name: "Metabolic Analyst", title: "혈액/대사 패널 분석", icon: Activity, personality: "인슐린 저항성 패턴을 당뇨 진단 5년 전에 잡아냅니다.", capabilities: ["blood-panels", "glucose-dynamics", "insulin-resistance", "lipid-metabolism"], bu: "health" },
  { slug: "endocrine-specialist", name: "Endocrine Specialist", title: "호르몬 분석", icon: ScanLine, personality: "호르몬 패널을 소설처럼 읽어냅니다. 시상하부부터 말초기관까지 전체 내분비 축을 매핑합니다.", capabilities: ["thyroid", "cortisol", "sex-hormones", "HPA-axis", "growth-hormone"], bu: "health" },
  { slug: "longevity-tracker", name: "Longevity Tracker", title: "생물학적 나이 추적", icon: Hourglass, personality: "멀티오믹 데이터로 생물학적 나이를 계산하고 노화 속도를 추적합니다.", capabilities: ["bio-age", "epigenetic-clocks", "telomere", "aging-biomarkers"], bu: "health" },
  { slug: "nutrition-architect", name: "Nutrition Architect", title: "대사 맞춤 영양 설계", icon: Apple, personality: "대사 표현형에 기반한 정밀 영양 프로토콜을 설계합니다. 모든 매크로와 마이크로가 의도적입니다.", capabilities: ["metabolic-diets", "fasting-protocols", "micronutrients", "gut-microbiome"], bu: "health" },
  { slug: "exercise-physiologist", name: "Exercise Physiologist", title: "대사 운동 처방", icon: HeartPulse, personality: "미학이 아닌 대사 건강을 위한 운동을 프로그래밍합니다. FitFlow 앱과 연동.", capabilities: ["VO2max", "zone-2-training", "resistance-programming", "FitFlow-sync"], bu: "health" },
  { slug: "sleep-specialist", name: "Sleep Specialist", title: "수면/일주기 최적화", icon: Moon, personality: "가장 과소평가된 장수 개입을 최적화합니다 — 수면. 일주기 리듬과 호르몬 주기를 매핑.", capabilities: ["sleep-architecture", "circadian-rhythm", "HRV-analysis", "melatonin"], bu: "health" },
];

/* ── BrownAI Discovery agents (B2B) ── */
const discoveryAgents: Agent[] = [
  { slug: "drug-discovery-lead", name: "Drug Discovery Lead", title: "타겟 발굴 & 약물 재창출", icon: FlaskConical, personality: "문헌 마이닝, 화합물 스크리닝, 기존 약물의 새로운 용도를 찾아 노화 치료제를 사냥합니다.", capabilities: ["target-identification", "drug-repurposing", "PubMed-mining", "ChEMBL"], bu: "discovery" },
  { slug: "computational-chemist", name: "Computational Chemist", title: "분자 모델링 & 도킹", icon: Atom, personality: "원자 수준의 정밀도로 분자 상호작용을 시뮬레이션합니다. 약물이 세포에 닿기 전에 행동을 예측.", capabilities: ["molecular-docking", "ADMET-prediction", "binding-affinity", "SAR"], bu: "discovery" },
  { slug: "genomics-analyst", name: "Genomics Analyst", title: "유전체 & 약물유전체학", icon: Dna, personality: "게놈을 실행 가능한 건강 인사이트로 디코딩합니다. SNP를 대사 경로와 약물 반응에 연결.", capabilities: ["SNP-analysis", "pharmacogenomics", "GWAS", "nutrigenomics"], bu: "discovery" },
  { slug: "clinical-trials", name: "Clinical Trials Analyst", title: "임상시험 설계 & FDA", icon: ClipboardCheck, personality: "엄격한 임상시험을 설계하고 FDA 경로를 탐색합니다. 유망한 화합물을 승인 의약품으로.", capabilities: ["trial-design", "FDA-pathways", "endpoint-analysis", "real-world-evidence"], bu: "discovery" },
  { slug: "longevity-researcher", name: "Longevity Researcher", title: "노화 생물학 연구", icon: Microscope, personality: "노화의 모든 hallmark를 추적합니다. 세노리틱스부터 mTOR 억제까지 최신 연구를 분석.", capabilities: ["hallmarks-of-aging", "senolytics", "mTOR", "NAD+", "caloric-restriction"], bu: "discovery" },
];

/* ── Shared platform agents ── */
const sharedAgents: Agent[] = [
  { slug: "clo", name: "Chief Longevity Officer", title: "전략 총괄", icon: Dna, personality: "내분비학 전문의 수준의 전략가. 임상 내분비학과 AI를 연결하여 두 사업부를 총괄합니다.", capabilities: ["strategy", "clinical-oversight", "orchestration"], bu: "shared" },
  { slug: "cto", name: "CTO", title: "기술 인프라 총괄", icon: Cpu, personality: "HIPAA 준수, 확장 가능한 헬스테크 인프라를 구축합니다.", capabilities: ["architecture", "HIPAA", "ML-ops"], bu: "shared" },
  { slug: "biomedical-data-eng", name: "Biomedical Data Engineer", title: "건강 데이터 파이프라인", icon: Database, personality: "Apple Watch부터 랩 결과까지 HIPAA 준수 데이터 파이프라인을 구축합니다.", capabilities: ["FHIR", "wearable-integration", "EHR", "data-anonymization"], bu: "shared" },
  { slug: "ml-engineer", name: "AI/ML Engineer", title: "바이오마커 AI 모델", icon: Brain, personality: "바이오마커 데이터로 건강 궤적을 예측하는 모델을 훈련합니다.", capabilities: ["predictive-models", "survival-analysis", "time-series-health"], bu: "shared" },
  { slug: "compliance-officer", name: "Compliance Officer", title: "HIPAA & FDA 규제", icon: ShieldCheck, personality: "컴플라이언스 갭에 대한 제로 톨러런스. 모든 데이터 포인트가 HIPAA와 FDA 기준을 충족.", capabilities: ["HIPAA", "FDA", "IRB", "data-privacy"], bu: "shared" },
];

/* ═══════════════════════════════════════════
   B2C HEALTH SERVICES
   ═══════════════════════════════════════════ */
const healthServices = [
  { icon: Activity, title: "Metabolic Panel AI", desc: "혈액 검사 업로드 → AI가 대사 패널, 인슐린 저항성, 지질대사를 분석하여 맞춤형 인사이트 제공", color: "from-emerald-500 to-teal-500" },
  { icon: ScanLine, title: "Hormone Mapping", desc: "갑상선, 코르티솔, 성호르몬, 성장호르몬 — 전체 내분비 축 분석 및 최적 범위 가이드", color: "from-cyan-500 to-blue-500" },
  { icon: Hourglass, title: "Biological Age", desc: "에피제네틱 클럭, 텔로미어, 노화 바이오마커를 종합하여 실제 생물학적 나이 측정 및 추적", color: "from-violet-500 to-purple-500" },
  { icon: Sparkles, title: "Longevity Protocol", desc: "영양, 운동(FitFlow 연동), 수면을 통합한 과학 기반 대사 최적화 프로토콜 자동 생성", color: "from-lime-500 to-emerald-500" },
];

/* ═══════════════════════════════════════════
   B2B DISCOVERY PIPELINE
   ═══════════════════════════════════════════ */
const discoveryPipeline = [
  { step: "01", title: "Target Identification", desc: "PubMed, ChEMBL, UniProt에서 노화/대사 관련 유효 타겟 AI 스캐닝", icon: Microscope, agent: "Drug Discovery Lead" },
  { step: "02", title: "Compound Screening", desc: "가상 스크리닝 — 분자 도킹, ADMET 예측, 구조-활성 관계 분석", icon: Atom, agent: "Computational Chemist" },
  { step: "03", title: "Drug Repurposing", desc: "기존 FDA 승인 약물의 노화/대사 새 적응증 탐색 (빠른 임상 경로)", icon: Pill, agent: "Drug Discovery Lead" },
  { step: "04", title: "Genomic Validation", desc: "약물유전체학 분석으로 반응군 예측 및 부작용 최소화", icon: Dna, agent: "Genomics Analyst" },
  { step: "05", title: "Clinical Trial Design", desc: "최적 엔드포인트, 피험자 선정 기준, FDA 제출 전략 설계", icon: ClipboardCheck, agent: "Clinical Trials Analyst" },
  { step: "06", title: "Regulatory Filing", desc: "IND/NDA 문서, IRB 프로토콜, 규제 컴플라이언스 패키지 작성", icon: ShieldCheck, agent: "Compliance Officer" },
];

/* ═══════════════════════════════════════════
   PRICING — B2C only
   ═══════════════════════════════════════════ */
const healthPlans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    desc: "기본 대사 건강 점수",
    features: ["기본 혈액 검사 분석", "대사 건강 점수", "일반 식단/운동 가이드", "커뮤니티 접근"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    desc: "개인 맞춤형 장수 관리",
    features: ["정밀 바이오마커 분석", "호르몬 패턴 매핑", "생물학적 나이 측정/추적", "맞춤 영양/운동/수면 프로토콜", "FitFlow 앱 연동", "월간 AI 리포트"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Premium",
    price: "$149",
    period: "/month",
    desc: "전문가급 종합 건강 최적화",
    features: ["Pro의 모든 기능", "유전체(SNP) 분석 연동", "약물/보충제 상호작용 체크", "실시간 웨어러블 데이터 분석", "1:1 AI 건강 컨설팅", "API 접근"],
    cta: "Start Free Trial",
    highlight: false,
  },
];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function AgentCard({ agent, accentColor }: { agent: Agent; accentColor: string }) {
  const [open, setOpen] = useState(false);
  const Icon = agent.icon;
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`relative border rounded-xl p-3.5 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 bg-white/[0.03] border-white/[0.06]`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${accentColor} flex items-center justify-center text-white shrink-0`}>
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

/* ═══════════════════════════════════════════
   APP — Two-Section Landing Page
   ═══════════════════════════════════════════ */
export function App() {
  const [activeTab, setActiveTab] = useState<BU>("health");

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
          </div>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <button onClick={() => { setActiveTab("health"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }} className={`px-3 py-1.5 rounded-lg transition ${activeTab === "health" ? "bg-emerald-500/10 text-emerald-400" : "text-text-secondary hover:text-text-primary"}`}>
              Health
            </button>
            <button onClick={() => { setActiveTab("discovery"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }} className={`px-3 py-1.5 rounded-lg transition ${activeTab === "discovery" ? "bg-violet-500/10 text-violet-400" : "text-text-secondary hover:text-text-primary"}`}>
              Discovery
            </button>
            <span className="w-px h-4 bg-border-dim mx-2" />
            <a href="#team" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Team</a>
            <a href="#pricing" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Pricing</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-xs mb-6">
            <Sparkles size={12} /> Founded by MD/PhD Endocrinologist
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-brand-light via-teal to-accent bg-clip-text text-transparent">
              Live Longer.
            </span>
            <br />
            <span className="text-text-primary">Age Smarter.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            내분비 전문의의 의학 전문성 + AI 에이전트의 자동화.
            <br className="hidden sm:inline" />
            두 개의 사업부로 노화와 대사를 공략합니다.
          </p>

          {/* Two BU Cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button onClick={() => { setActiveTab("health"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }} className="group text-left p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <HeartPulse size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-400">BrownAI Health</h3>
                  <p className="text-[10px] text-emerald-400/60 font-medium uppercase tracking-wider">B2C · Consumer</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary">개인 맞춤형 대사 건강 분석, 생물학적 나이 추적, 장수 프로토콜 설계</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 group-hover:gap-2 transition-all">
                자세히 보기 <ArrowRight size={12} />
              </div>
            </button>

            <button onClick={() => { setActiveTab("discovery"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }} className="group text-left p-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40 hover:bg-violet-500/10 transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-violet-400">BrownAI Discovery</h3>
                  <p className="text-[10px] text-violet-400/60 font-medium uppercase tracking-wider">B2B · Pharma & Biotech</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary">AI 기반 노화/대사 신약 타겟 발굴, 화합물 스크리닝, 임상시험 설계</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-violet-400 group-hover:gap-2 transition-all">
                자세히 보기 <ArrowRight size={12} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-10 border-y border-border-dim bg-surface-raised/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-card border border-border-dim">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-teal flex items-center justify-center text-white text-lg font-bold">MD</div>
            <div className="text-left">
              <p className="text-sm font-semibold">Founded by MD/PhD Endocrinologist</p>
              <p className="text-xs text-text-muted">Specialty: Aging & Metabolism · Clinical + AI Research</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         BU SECTION — Tab Switcher
         ═══════════════════════════════════════════ */}
      <section id="bu-section" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tab Header */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl border border-border-dim bg-surface-card p-1 gap-1">
              <button
                onClick={() => setActiveTab("health")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition ${activeTab === "health" ? "bg-emerald-500/15 text-emerald-400 shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
              >
                <HeartPulse size={16} /> BrownAI Health
                <span className="text-[10px] opacity-60">B2C</span>
              </button>
              <button
                onClick={() => setActiveTab("discovery")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition ${activeTab === "discovery" ? "bg-violet-500/15 text-violet-400 shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
              >
                <FlaskConical size={16} /> BrownAI Discovery
                <span className="text-[10px] opacity-60">B2B</span>
              </button>
            </div>
          </div>

          {/* ─── HEALTH TAB ─── */}
          {activeTab === "health" && (
            <div className="space-y-16">
              {/* Tagline */}
              <div className="text-center">
                <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mb-2">For Individuals</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">AI 대사 건강 플랫폼</h2>
                <p className="text-text-secondary max-w-lg mx-auto">
                  혈액 검사부터 맞춤 장수 프로토콜까지 — 6개 전문 AI 에이전트가 당신의 건강을 최적화합니다.
                </p>
              </div>

              {/* Services */}
              <div className="grid sm:grid-cols-2 gap-5">
                {healthServices.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="bg-surface-card border border-border-dim rounded-2xl p-6 hover:border-emerald-500/20 transition">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* How it works */}
              <div>
                <h3 className="text-xl font-bold text-center mb-8">How It Works</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { num: "1", title: "데이터 업로드", desc: "혈액 검사, 웨어러블 데이터, 건강 기록", icon: Database },
                    { num: "2", title: "AI 분석", desc: "6개 전문 에이전트가 동시 분석", icon: Brain },
                    { num: "3", title: "프로토콜 생성", desc: "영양/운동/수면 맞춤 프로토콜", icon: Sparkles },
                    { num: "4", title: "추적 & 최적화", desc: "FitFlow 연동, AI 지속 최적화", icon: Activity },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.num} className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                          <Icon size={22} className="text-emerald-400" />
                        </div>
                        <div className="text-[10px] text-text-muted font-mono mb-1">Step {item.num}</div>
                        <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-text-secondary">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Health Agents */}
              <div>
                <h3 className="text-xl font-bold text-center mb-2">Health AI Team</h3>
                <p className="text-sm text-text-muted text-center mb-6">6 Specialized Agents · Click to see details</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {healthAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-emerald-400 to-teal-400" />)}
                </div>
              </div>

              {/* FitFlow */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-surface-card border border-border-dim rounded-2xl p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime to-emerald flex items-center justify-center shrink-0">
                  <HeartPulse size={28} className="text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold mb-1">FitFlow 앱 연동</h4>
                  <p className="text-sm text-text-secondary">대사 최적화 운동이 FitFlow로 자동 전송. Zone 2, 저항 운동, HIIT — 바이오마커 맞춤 설계.</p>
                </div>
                <a href="https://fitflow-website.vercel.app" target="_blank" rel="noopener" className="shrink-0 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm hover:bg-emerald-500/20 transition flex items-center gap-1">
                  다운로드 <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* ─── DISCOVERY TAB ─── */}
          {activeTab === "discovery" && (
            <div className="space-y-16">
              {/* Tagline */}
              <div className="text-center">
                <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">For Pharma & Biotech</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">AI Drug Discovery Pipeline</h2>
                <p className="text-text-secondary max-w-lg mx-auto">
                  노화/대사 분야에 특화된 AI 신약 발굴. 타겟 발굴부터 FDA 제출까지 AI가 가속합니다.
                </p>
              </div>

              {/* Target Areas */}
              <div>
                <h3 className="text-xl font-bold text-center mb-6">Focus Areas</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { title: "Aging Therapeutics", desc: "세노리틱스, mTOR 억제제, NAD+ 부스터, 텔로미어 유지", icon: Hourglass },
                    { title: "Metabolic Disorders", desc: "인슐린 저항성, 비만, NAFLD, 대사증후군 타겟", icon: Activity },
                    { title: "Endocrine Targets", desc: "갑상선, 부신, 성선 기능 관련 신규 치료 타겟", icon: ScanLine },
                  ].map((area) => {
                    const Icon = area.icon;
                    return (
                      <div key={area.title} className="bg-surface-card border border-border-dim rounded-xl p-5 hover:border-violet-500/20 transition">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-3">
                          <Icon size={20} />
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{area.title}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{area.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pipeline Steps */}
              <div>
                <h3 className="text-xl font-bold text-center mb-6">Discovery Pipeline</h3>
                <div className="space-y-3">
                  {discoveryPipeline.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-border-dim hover:border-violet-500/15 transition">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs text-text-muted font-mono">{item.step}</span>
                            <ChevronRight size={10} className="text-text-muted" />
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                          </div>
                          <p className="text-xs text-text-secondary">{item.desc}</p>
                        </div>
                        <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 shrink-0">{item.agent}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Discovery Agents */}
              <div>
                <h3 className="text-xl font-bold text-center mb-2">Discovery AI Team</h3>
                <p className="text-sm text-text-muted text-center mb-6">5 Specialized Agents · Click to see details</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {discoveryAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-violet-400 to-purple-400" />)}
                </div>
              </div>

              {/* B2B CTA */}
              <div className="text-center bg-surface-card border border-violet-500/20 rounded-2xl p-8">
                <Building2 size={32} className="text-violet-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">파트너십 문의</h3>
                <p className="text-sm text-text-secondary mb-4 max-w-md mx-auto">
                  제약사, 바이오텍, 연구기관을 위한 맞춤 AI 파이프라인.
                  <br />라이선싱, 공동연구, 전용 에이전트 배정.
                </p>
                <a href="mailto:contact@brownai.com" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition text-sm">
                  Contact Us <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SHARED PLATFORM TEAM ── */}
      <section id="team" className="py-20 bg-surface-raised/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs text-brand-light font-semibold uppercase tracking-widest mb-2">Platform</p>
            <h2 className="text-3xl font-bold mb-3">Shared Platform Team</h2>
            <p className="text-text-secondary max-w-md mx-auto text-sm">
              두 사업부를 지원하는 공통 인프라 팀.
              HIPAA 준수 데이터 파이프라인, AI/ML 모델, 규제 컴플라이언스.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {sharedAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-brand-light to-teal" />)}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Health: 6 agents</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-400" /> Discovery: 5 agents</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-light" /> Shared: 5 agents</span>
              <span className="font-semibold text-text-secondary">= 16 Total</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING (B2C only) ── */}
      <section id="pricing" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mb-2">BrownAI Health Pricing</p>
            <h2 className="text-3xl font-bold mb-3">개인 건강 관리 플랜</h2>
            <p className="text-text-secondary text-sm">무료로 시작하세요. Drug Discovery는 별도 파트너십으로 운영됩니다.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {healthPlans.map((p) => (
              <div key={p.name} className={`relative rounded-2xl p-6 border transition ${p.highlight ? "bg-emerald-500/5 border-emerald-500/30 shadow-lg shadow-emerald-500/10" : "bg-surface-card border-border-dim"}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-semibold">RECOMMENDED</div>
                )}
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-xs text-text-muted mb-4">{p.desc}</p>
                <div className="mb-5">
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-text-muted">{p.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${p.highlight ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25" : "border border-border-dim text-text-secondary hover:text-text-primary hover:border-emerald-500/30"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-text-muted mt-6">
            BrownAI Discovery (B2B) 파트너십은 <a href="mailto:contact@brownai.com" className="text-violet-400 hover:underline">contact@brownai.com</a>으로 문의하세요.
          </p>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-12 bg-surface-raised/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-widest mb-4">Powered By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Paperclip", desc: "AI Orchestration", url: "https://github.com/paperclipai/paperclip" },
              { name: "Agent Hub", desc: "AI Agent Catalog", url: "https://agent-hub-alpha-nine.vercel.app" },
              { name: "FitFlow", desc: "Fitness App", url: "https://fitflow-website.vercel.app" },
            ].map((t) => (
              <a key={t.name} href={t.url} target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card border border-border-dim hover:border-brand/20 transition text-xs">
                <Globe size={12} className="text-text-muted" />
                <span className="font-semibold">{t.name}</span>
                <span className="text-text-muted">{t.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-border-dim">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Dna size={14} className="text-brand-light" />
              <span className="text-sm font-semibold">BrownAI</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="text-emerald-400/60">Health (B2C)</span>
              <span className="text-violet-400/60">Discovery (B2B)</span>
              <a href="https://github.com/ohbryt" target="_blank" rel="noopener" className="hover:text-text-secondary transition">GitHub</a>
            </div>
          </div>
          <p className="mt-3 text-center text-[10px] text-text-muted">
            Founded by MD/PhD Endocrinologist · Aging & Metabolism · 16 AI Agents
          </p>
        </div>
      </footer>
    </div>
  );
}
