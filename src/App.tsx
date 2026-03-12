import { useState } from "react";
import {
  Activity,
  Apple,
  Atom,
  ArrowRight,
  BarChart3,
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
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   TWO BUSINESS UNITS
   ═══════════════════════════════════════════ */
type BU = "health" | "discovery";

interface Agent {
  slug: string;
  name: string;
  title: string;
  icon: LucideIcon;
  personality: string;
  capabilities: string[];
  bu: BU | "shared";
}

/* ── Health agents (B2C) ── */
const healthAgents: Agent[] = [
  { slug: "metabolic-analyst", name: "Metabolic Analyst", title: "혈액/대사 패널 분석", icon: Activity, personality: "인슐린 저항성 패턴을 당뇨 진단 5년 전에 잡아냅니다.", capabilities: ["blood-panels", "glucose-dynamics", "insulin-resistance", "lipid-metabolism"], bu: "health" },
  { slug: "endocrine-specialist", name: "Endocrine Specialist", title: "호르몬 분석", icon: ScanLine, personality: "호르몬 패널을 소설처럼 읽어냅니다. 시상하부부터 말초기관까지 전체 내분비 축을 매핑합니다.", capabilities: ["thyroid", "cortisol", "sex-hormones", "HPA-axis", "growth-hormone"], bu: "health" },
  { slug: "longevity-tracker", name: "Longevity Tracker", title: "생물학적 나이 추적", icon: Hourglass, personality: "멀티오믹 데이터로 생물학적 나이를 계산하고 노화 속도를 추적합니다.", capabilities: ["bio-age", "epigenetic-clocks", "telomere", "aging-biomarkers"], bu: "health" },
  { slug: "nutrition-architect", name: "Nutrition Architect", title: "대사 맞춤 영양 설계", icon: Apple, personality: "대사 표현형에 기반한 정밀 영양 프로토콜을 설계합니다. 모든 매크로와 마이크로가 의도적입니다.", capabilities: ["metabolic-diets", "fasting-protocols", "micronutrients", "gut-microbiome"], bu: "health" },
  { slug: "exercise-physiologist", name: "Exercise Physiologist", title: "대사 운동 처방", icon: HeartPulse, personality: "미학이 아닌 대사 건강을 위한 운동을 프로그래밍합니다. FitFlow 앱과 연동.", capabilities: ["VO2max", "zone-2-training", "resistance-programming", "FitFlow-sync"], bu: "health" },
  { slug: "sleep-specialist", name: "Sleep Specialist", title: "수면/일주기 최적화", icon: Moon, personality: "가장 과소평가된 장수 개입을 최적화합니다 — 수면. 일주기 리듬과 호르몬 주기를 매핑.", capabilities: ["sleep-architecture", "circadian-rhythm", "HRV-analysis", "melatonin"], bu: "health" },
];

/* ── Discovery agents (B2B) ── */
const discoveryAgents: Agent[] = [
  { slug: "drug-discovery-lead", name: "Drug Discovery Lead", title: "타겟 발굴 & 약물 재창출", icon: FlaskConical, personality: "문헌 마이닝, 화합물 스크리닝, 기존 약물의 새로운 용도를 찾아 노화 치료제를 사냥합니다.", capabilities: ["target-identification", "drug-repurposing", "PubMed-mining", "ChEMBL"], bu: "discovery" },
  { slug: "computational-chemist", name: "Computational Chemist", title: "분자 모델링 & 도킹", icon: Atom, personality: "원자 수준의 정밀도로 분자 상호작용을 시뮬레이션합니다.", capabilities: ["molecular-docking", "ADMET-prediction", "binding-affinity", "SAR"], bu: "discovery" },
  { slug: "genomics-analyst", name: "Genomics Analyst", title: "유전체 & 약물유전체학", icon: Dna, personality: "게놈을 실행 가능한 건강 인사이트로 디코딩합니다.", capabilities: ["SNP-analysis", "pharmacogenomics", "GWAS", "nutrigenomics"], bu: "discovery" },
  { slug: "clinical-trials", name: "Clinical Trials Analyst", title: "임상시험 설계 & FDA", icon: ClipboardCheck, personality: "엄격한 임상시험을 설계하고 FDA 경로를 탐색합니다.", capabilities: ["trial-design", "FDA-pathways", "endpoint-analysis", "real-world-evidence"], bu: "discovery" },
  { slug: "longevity-researcher", name: "Longevity Researcher", title: "노화 생물학 연구", icon: Microscope, personality: "노화의 모든 hallmark를 추적합니다.", capabilities: ["hallmarks-of-aging", "senolytics", "mTOR", "NAD+", "caloric-restriction"], bu: "discovery" },
];

/* ── Shared agents ── */
const sharedAgents: Agent[] = [
  { slug: "clo", name: "Chief Longevity Officer", title: "전략 총괄", icon: Dna, personality: "내분비학 전문의 수준의 전략가. 임상 내분비학과 AI를 연결하여 두 사업부를 총괄합니다.", capabilities: ["strategy", "clinical-oversight", "orchestration"], bu: "shared" },
  { slug: "cto", name: "CTO", title: "기술 인프라 총괄", icon: Cpu, personality: "HIPAA 준수, 확장 가능한 헬스테크 인프라를 구축합니다.", capabilities: ["architecture", "HIPAA", "ML-ops"], bu: "shared" },
  { slug: "biomedical-data-eng", name: "Biomedical Data Engineer", title: "건강 데이터 파이프라인", icon: Database, personality: "Apple Watch부터 랩 결과까지 HIPAA 준수 데이터 파이프라인을 구축합니다.", capabilities: ["FHIR", "wearable-integration", "EHR", "data-anonymization"], bu: "shared" },
  { slug: "ml-engineer", name: "AI/ML Engineer", title: "바이오마커 AI 모델", icon: Brain, personality: "바이오마커 데이터로 건강 궤적을 예측하는 모델을 훈련합니다.", capabilities: ["predictive-models", "survival-analysis", "time-series-health"], bu: "shared" },
  { slug: "compliance-officer", name: "Compliance Officer", title: "HIPAA & FDA 규제", icon: ShieldCheck, personality: "컴플라이언스 갭에 대한 제로 톨러런스.", capabilities: ["HIPAA", "FDA", "IRB", "data-privacy"], bu: "shared" },
];

/* ── Health services ── */
const healthServices = [
  { icon: Activity, title: "Metabolic Panel AI", desc: "혈액 검사 업로드 → AI가 대사 패널, 인슐린 저항성, 지질대사를 분석하여 맞춤형 인사이트 제공", color: "from-amber-500 to-orange-600" },
  { icon: ScanLine, title: "Hormone Mapping", desc: "갑상선, 코르티솔, 성호르몬, 성장호르몬 — 전체 내분비 축 분석 및 최적 범위 가이드", color: "from-rose-400 to-amber-500" },
  { icon: Hourglass, title: "Biological Age", desc: "에피제네틱 클럭, 텔로미어, 노화 바이오마커를 종합하여 실제 생물학적 나이 측정 및 추적", color: "from-violet-400 to-purple-500" },
  { icon: Sparkles, title: "Longevity Protocol", desc: "영양, 운동(FitFlow 연동), 수면을 통합한 과학 기반 대사 최적화 프로토콜 자동 생성", color: "from-amber-600 to-brand" },
];

/* ── Discovery pipeline ── */
const discoveryPipeline = [
  { step: "01", title: "Target Identification", desc: "PubMed, ChEMBL, UniProt에서 노화/대사 관련 유효 타겟 AI 스캐닝", icon: Microscope, agent: "Drug Discovery Lead" },
  { step: "02", title: "Compound Screening", desc: "가상 스크리닝 — 분자 도킹, ADMET 예측, 구조-활성 관계 분석", icon: Atom, agent: "Computational Chemist" },
  { step: "03", title: "Drug Repurposing", desc: "기존 FDA 승인 약물의 노화/대사 새 적응증 탐색 (빠른 임상 경로)", icon: Pill, agent: "Drug Discovery Lead" },
  { step: "04", title: "Genomic Validation", desc: "약물유전체학 분석으로 반응군 예측 및 부작용 최소화", icon: Dna, agent: "Genomics Analyst" },
  { step: "05", title: "Clinical Trial Design", desc: "최적 엔드포인트, 피험자 선정 기준, FDA 제출 전략 설계", icon: ClipboardCheck, agent: "Clinical Trials Analyst" },
  { step: "06", title: "Regulatory Filing", desc: "IND/NDA 문서, IRB 프로토콜, 규제 컴플라이언스 패키지 작성", icon: ShieldCheck, agent: "Compliance Officer" },
];

/* ── Pricing ── */
const healthPlans = [
  { name: "Basic", price: "Free", period: "", desc: "기본 대사 건강 점수", features: ["기본 혈액 검사 분석", "대사 건강 점수", "일반 식단/운동 가이드", "커뮤니티 접근"], cta: "Get Started", highlight: false },
  { name: "Pro", price: "$49", period: "/month", desc: "개인 맞춤형 장수 관리", features: ["정밀 바이오마커 분석", "호르몬 패턴 매핑", "생물학적 나이 측정/추적", "맞춤 영양/운동/수면 프로토콜", "FitFlow 앱 연동", "월간 AI 리포트"], cta: "Start Free Trial", highlight: true },
  { name: "Premium", price: "$149", period: "/month", desc: "전문가급 종합 건강 최적화", features: ["Pro의 모든 기능", "유전체(SNP) 분석 연동", "약물/보충제 상호작용 체크", "실시간 웨어러블 데이터 분석", "1:1 AI 건강 컨설팅", "API 접근"], cta: "Start Free Trial", highlight: false },
];

/* ═══════════════════════════════════════════
   SVG HERO ILLUSTRATION
   ═══════════════════════════════════════════ */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto animate-float-slow">
      <svg viewBox="0 0 500 500" fill="none" className="w-full h-auto drop-shadow-xl">
        {/* Outer rings */}
        <circle cx="250" cy="250" r="230" stroke="url(#ring1)" strokeWidth="1" opacity="0.2" />
        <circle cx="250" cy="250" r="195" stroke="url(#ring1)" strokeWidth="0.5" opacity="0.1" strokeDasharray="6 4" />

        {/* DNA Helix curves */}
        <path d="M170,100 Q250,180 330,100" stroke="#D4A373" strokeWidth="2" opacity="0.3" fill="none" />
        <path d="M170,100 Q250,20 330,100" stroke="#D97706" strokeWidth="2" opacity="0.3" fill="none" />
        <path d="M170,190 Q250,270 330,190" stroke="#D4A373" strokeWidth="1.5" opacity="0.2" fill="none" />
        <path d="M170,190 Q250,110 330,190" stroke="#D97706" strokeWidth="1.5" opacity="0.2" fill="none" />
        <path d="M170,280 Q250,360 330,280" stroke="#D4A373" strokeWidth="1.5" opacity="0.15" fill="none" />
        <path d="M170,280 Q250,200 330,280" stroke="#D97706" strokeWidth="1.5" opacity="0.15" fill="none" />

        {/* Helix rungs */}
        {[130, 160, 220, 250].map((y, i) => (
          <line key={i} x1={195} y1={y} x2={305} y2={y} stroke="#D4A373" strokeWidth="0.8" opacity="0.12" />
        ))}

        {/* Connection lines */}
        <line x1="250" y1="250" x2="120" y2="170" stroke="#D4A373" strokeWidth="1.2" opacity="0.15" />
        <line x1="250" y1="250" x2="380" y2="170" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.15" />
        <line x1="250" y1="250" x2="120" y2="340" stroke="#D97706" strokeWidth="1" opacity="0.12" />
        <line x1="250" y1="250" x2="380" y2="340" stroke="#A78BFA" strokeWidth="1" opacity="0.12" />
        <line x1="250" y1="250" x2="250" y2="100" stroke="#92400E" strokeWidth="1" opacity="0.15" />
        <line x1="250" y1="250" x2="250" y2="400" stroke="#92400E" strokeWidth="1" opacity="0.1" />

        {/* Health nodes (warm) */}
        <circle cx="120" cy="170" r="30" fill="url(#amber-grad)" opacity="0.9" />
        <circle cx="120" cy="340" r="22" fill="url(#caramel-grad)" opacity="0.8" />
        <circle cx="185" cy="420" r="16" fill="url(#amber-grad)" opacity="0.5" />

        {/* Discovery nodes (cool) */}
        <circle cx="380" cy="170" r="26" fill="url(#violet-grad)" opacity="0.85" />
        <circle cx="380" cy="340" r="20" fill="url(#violet-grad)" opacity="0.75" />
        <circle cx="315" cy="420" r="14" fill="url(#violet-light)" opacity="0.5" />

        {/* Center hub */}
        <circle cx="250" cy="250" r="44" fill="url(#brand-grad)" />
        <circle cx="250" cy="250" r="54" stroke="url(#brand-grad)" strokeWidth="1" opacity="0.15" fill="none" />

        {/* Top + bottom nodes */}
        <circle cx="250" cy="100" r="18" fill="url(#amber-grad)" opacity="0.7" />
        <circle cx="250" cy="400" r="16" fill="url(#violet-light)" opacity="0.6" />

        {/* Tiny icons inside main nodes */}
        <text x="120" y="176" textAnchor="middle" fill="white" fontSize="22">&#9829;</text>
        <text x="380" y="176" textAnchor="middle" fill="white" fontSize="18">&#9883;</text>
        <text x="250" y="257" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">&#9854;</text>

        {/* Floating particles */}
        <circle cx="80" cy="250" r="5" fill="#D97706" opacity="0.25" className="animate-pulse-soft" />
        <circle cx="420" cy="250" r="4" fill="#8B5CF6" opacity="0.25" className="animate-pulse-soft" />
        <circle cx="160" cy="80" r="6" fill="#D4A373" opacity="0.2" />
        <circle cx="340" cy="430" r="5" fill="#A78BFA" opacity="0.2" />
        <circle cx="60" cy="380" r="3" fill="#F59E0B" opacity="0.15" />
        <circle cx="440" cy="120" r="3" fill="#7C3AED" opacity="0.15" />

        {/* Gradients */}
        <defs>
          <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="caramel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="violet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="violet-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   AGENT CARD — light theme
   ═══════════════════════════════════════════ */
function AgentCard({ agent, accentColor }: { agent: Agent; accentColor: string }) {
  const [open, setOpen] = useState(false);
  const Icon = agent.icon;
  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer card-lift shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center text-white shrink-0`}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate">{agent.name}</h4>
          <p className="text-[11px] text-text-muted truncate">{agent.title}</p>
        </div>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
          <p className="text-xs text-text-secondary italic leading-relaxed">"{agent.personality}"</p>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.map((c) => (
              <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">{c}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   WAITLIST MODAL — light theme
   ═══════════════════════════════════════════ */
function WaitlistModal({ open, onClose, plan }: { open: boolean; onClose: () => void; plan: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative bg-white border border-gray-100 rounded-3xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition"><X size={18} /></button>
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Waitlist 등록 완료!</h3>
            <p className="text-sm text-text-secondary mb-1">{email}</p>
            <p className="text-xs text-text-muted">런칭 시 가장 먼저 알려드리겠습니다.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="heading-serif text-2xl mb-1">
                {plan === "discovery" ? "파트너십 문의" : `${plan} 플랜 — Waitlist`}
              </h3>
              <p className="text-sm text-text-secondary">
                {plan === "discovery"
                  ? "Drug Discovery 파이프라인에 관심이 있으시면 이메일을 남겨주세요."
                  : "현재 사전 등록 중입니다. 이메일을 남겨주시면 런칭 시 가장 먼저 초대해드립니다."}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              />
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-sm shadow-md shadow-brand/15 hover:shadow-lg hover:shadow-brand/25 transition">
                {plan === "discovery" ? "문의하기" : "Waitlist 등록"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   APP — Bright & Hopeful Landing Page
   ═══════════════════════════════════════════ */
export function App() {
  const [activeTab, setActiveTab] = useState<BU>("health");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState("");

  const openWaitlist = (plan: string) => { setModalPlan(plan); setModalOpen(true); };

  return (
    <div className="min-h-screen bg-surface text-text-primary">

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-light to-brand flex items-center justify-center">
              <Dna size={18} className="text-white" />
            </div>
            <span className="heading-serif text-xl">Brown Biotech</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <button onClick={() => { setActiveTab("health"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`px-3.5 py-1.5 rounded-full transition font-medium ${activeTab === "health" ? "bg-amber-50 text-amber-800" : "text-text-secondary hover:text-text-primary"}`}>
              Health
            </button>
            <button onClick={() => { setActiveTab("discovery"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`px-3.5 py-1.5 rounded-full transition font-medium ${activeTab === "discovery" ? "bg-violet-50 text-violet-700" : "text-text-secondary hover:text-text-primary"}`}>
              Discovery
            </button>
            <span className="w-px h-4 bg-gray-200 mx-2" />
            <a href="#products" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Products</a>
            <a href="#team" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Team</a>
            <a href="#pricing" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Pricing</a>
          </div>
          <button onClick={() => openWaitlist("Basic")} className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand to-accent text-white text-sm font-semibold shadow-sm shadow-brand/10 hover:shadow-md hover:shadow-brand/20 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="hero-glow top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="blob-warm w-[500px] h-[500px] -top-20 -right-40" />
        <div className="blob-cool w-[400px] h-[400px] top-40 -left-40" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Text */}
          <div>
            <div className="section-badge bg-amber-50 text-amber-800 border border-amber-200 mb-8">
              <Sparkles size={12} /> Founded by MD/PhD Endocrinologist
            </div>

            <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
              <span className="bg-gradient-to-r from-brand via-accent to-caramel bg-clip-text text-transparent">
                Live Longer.
              </span>
              <br />
              <span className="text-text-primary">Age Smarter.</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
              내분비 전문의의 의학 전문성 + AI 에이전트의 자동화.
              <br className="hidden sm:inline" />
              두 개의 사업부로 노화와 대사를 공략합니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => openWaitlist("Basic")} className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand to-accent text-white font-semibold shadow-lg shadow-brand/15 hover:shadow-xl hover:shadow-brand/25 transition-all">
                Get Started Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#bu-section" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-brand/15 text-brand font-semibold hover:bg-brand/5 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>

        {/* BU Cards */}
        <div className="max-w-3xl mx-auto px-6 mt-20 grid sm:grid-cols-2 gap-6 relative z-10">
          <button onClick={() => { setActiveTab("health"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group text-left p-6 rounded-2xl bg-white border border-amber-100 shadow-sm card-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white">
                <HeartPulse size={22} />
              </div>
              <div>
                <h3 className="font-bold text-amber-800">Brown Biotech Health</h3>
                <p className="text-[10px] text-amber-600/70 font-semibold uppercase tracking-wider">B2C · Consumer</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">개인 맞춤형 대사 건강 분석, 생물학적 나이 추적, 장수 프로토콜 설계</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-amber-700 font-medium group-hover:gap-2 transition-all">
              자세히 보기 <ArrowRight size={12} />
            </div>
          </button>

          <button onClick={() => { setActiveTab("discovery"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group text-left p-6 rounded-2xl bg-white border border-violet-100 shadow-sm card-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white">
                <FlaskConical size={22} />
              </div>
              <div>
                <h3 className="font-bold text-violet-800">Brown Biotech Discovery</h3>
                <p className="text-[10px] text-violet-600/70 font-semibold uppercase tracking-wider">B2B · Pharma & Biotech</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">AI 기반 노화/대사 신약 타겟 발굴, 화합물 스크리닝, 임상시험 설계</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-violet-700 font-medium group-hover:gap-2 transition-all">
              자세히 보기 <ArrowRight size={12} />
            </div>
          </button>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-10 bg-surface-raised">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-light to-brand flex items-center justify-center text-white text-lg font-bold heading-serif">MD</div>
            <div className="text-left">
              <p className="font-semibold">Founded by MD/PhD Endocrinologist</p>
              <p className="text-sm text-text-muted">Specialty: Aging & Metabolism · Clinical + AI Research</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         BU SECTION — Tab Switcher
         ═══════════════════════════════════════════ */}
      <section id="bu-section" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tab Header */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex rounded-full border border-gray-200 bg-white p-1.5 gap-1 shadow-sm">
              <button onClick={() => setActiveTab("health")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition ${activeTab === "health" ? "bg-amber-50 text-amber-800 shadow-sm" : "text-text-muted hover:text-text-secondary"}`}>
                <HeartPulse size={16} /> Health
                <span className="text-[10px] opacity-60 ml-1">B2C</span>
              </button>
              <button onClick={() => setActiveTab("discovery")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition ${activeTab === "discovery" ? "bg-violet-50 text-violet-700 shadow-sm" : "text-text-muted hover:text-text-secondary"}`}>
                <FlaskConical size={16} /> Discovery
                <span className="text-[10px] opacity-60 ml-1">B2B</span>
              </button>
            </div>
          </div>

          {/* ─── HEALTH TAB ─── */}
          {activeTab === "health" && (
            <div className="space-y-20">
              {/* Tagline */}
              <div className="text-center">
                <span className="section-badge bg-amber-50 text-amber-700 border border-amber-200 mb-4">For Individuals</span>
                <h2 className="heading-serif text-4xl sm:text-5xl mb-4">AI 대사 건강 플랫폼</h2>
                <p className="text-text-secondary max-w-lg mx-auto text-lg">
                  혈액 검사부터 맞춤 장수 프로토콜까지 — 6개 전문 AI 에이전트가 당신의 건강을 최적화합니다.
                </p>
              </div>

              {/* Services */}
              <div className="grid sm:grid-cols-2 gap-6">
                {healthServices.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-7 card-lift shadow-sm">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-5`}>
                        <Icon size={26} />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* How it works */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-10">How It Works</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { num: "1", title: "데이터 업로드", desc: "혈액 검사, 웨어러블 데이터, 건강 기록", icon: Database },
                    { num: "2", title: "AI 분석", desc: "6개 전문 에이전트가 동시 분석", icon: Brain },
                    { num: "3", title: "프로토콜 생성", desc: "영양/운동/수면 맞춤 프로토콜", icon: Sparkles },
                    { num: "4", title: "추적 & 최적화", desc: "FitFlow 연동, AI 지속 최적화", icon: Activity },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.num} className="text-center bg-white border border-gray-100 rounded-2xl p-6 card-lift shadow-sm">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-4">
                          <Icon size={24} className="text-amber-600" />
                        </div>
                        <div className="text-[10px] text-text-muted font-mono mb-1.5">Step {item.num}</div>
                        <h4 className="font-bold text-sm mb-1.5">{item.title}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Health Agents */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-2">Health AI Team</h3>
                <p className="text-sm text-text-muted text-center mb-8">6 Specialized Agents · Click to expand</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {healthAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-amber-400 to-amber-600" />)}
                </div>
              </div>

              {/* Products */}
              <div id="products">
                <h3 className="heading-serif text-3xl text-center mb-2">Our Products</h3>
                <p className="text-sm text-text-muted text-center mb-8">Brown Biotech 생태계를 구성하는 제품들</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* BioStatX */}
                  <a href="https://biostatx.vercel.app" target="_blank" rel="noopener" className="group flex flex-col sm:flex-row items-center gap-5 bg-white border border-gray-100 rounded-2xl p-6 card-lift shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shrink-0">
                      <BarChart3 size={30} className="text-white" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <h4 className="text-lg font-bold">BioStatX</h4>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 font-semibold border border-orange-100">Analytics Engine</span>
                      </div>
                      <p className="text-sm text-text-secondary">바이오메디컬 통계 플랫폼 — T-Test, ANOVA, Kaplan-Meier 등 11개 도구.</p>
                      <div className="mt-2 flex items-center justify-center sm:justify-start gap-1 text-xs text-orange-600 font-medium group-hover:gap-2 transition-all">
                        BioStatX 열기 <ExternalLink size={10} />
                      </div>
                    </div>
                  </a>
                  {/* FitFlow */}
                  <a href="https://fitflow-website.vercel.app" target="_blank" rel="noopener" className="group flex flex-col sm:flex-row items-center gap-5 bg-white border border-gray-100 rounded-2xl p-6 card-lift shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-brand flex items-center justify-center shrink-0">
                      <HeartPulse size={30} className="text-white" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <h4 className="text-lg font-bold">FitFlow</h4>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100">Fitness App</span>
                      </div>
                      <p className="text-sm text-text-secondary">대사 최적화 운동이 FitFlow로 자동 전송. Zone 2, 저항 운동, HIIT.</p>
                      <div className="mt-2 flex items-center justify-center sm:justify-start gap-1 text-xs text-amber-700 font-medium group-hover:gap-2 transition-all">
                        FitFlow 다운로드 <ExternalLink size={10} />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ─── DISCOVERY TAB ─── */}
          {activeTab === "discovery" && (
            <div className="space-y-20">
              {/* Tagline */}
              <div className="text-center">
                <span className="section-badge bg-violet-50 text-violet-700 border border-violet-200 mb-4">For Pharma & Biotech</span>
                <h2 className="heading-serif text-4xl sm:text-5xl mb-4">AI Drug Discovery Pipeline</h2>
                <p className="text-text-secondary max-w-lg mx-auto text-lg">
                  노화/대사 분야에 특화된 AI 신약 발굴. 타겟 발굴부터 FDA 제출까지 AI가 가속합니다.
                </p>
              </div>

              {/* Focus Areas */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-8">Focus Areas</h3>
                <div className="grid sm:grid-cols-3 gap-5">
                  {[
                    { title: "Aging Therapeutics", desc: "세노리틱스, mTOR 억제제, NAD+ 부스터, 텔로미어 유지", icon: Hourglass },
                    { title: "Metabolic Disorders", desc: "인슐린 저항성, 비만, NAFLD, 대사증후군 타겟", icon: Activity },
                    { title: "Endocrine Targets", desc: "갑상선, 부신, 성선 기능 관련 신규 치료 타겟", icon: ScanLine },
                  ].map((area) => {
                    const Icon = area.icon;
                    return (
                      <div key={area.title} className="bg-white border border-gray-100 rounded-2xl p-6 card-lift shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-4">
                          <Icon size={22} />
                        </div>
                        <h4 className="font-bold mb-2">{area.title}</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{area.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pipeline */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-8">Discovery Pipeline</h3>
                <div className="space-y-3">
                  {discoveryPipeline.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.step} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 card-lift shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-text-muted font-mono">{item.step}</span>
                            <ChevronRight size={10} className="text-text-muted" />
                            <h4 className="font-bold text-sm">{item.title}</h4>
                          </div>
                          <p className="text-sm text-text-secondary">{item.desc}</p>
                        </div>
                        <span className="hidden sm:inline text-[10px] px-3 py-1 rounded-full bg-violet-50 text-violet-600 font-medium border border-violet-100 shrink-0">{item.agent}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Discovery Agents */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-2">Discovery AI Team</h3>
                <p className="text-sm text-text-muted text-center mb-8">5 Specialized Agents · Click to expand</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {discoveryAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-violet-400 to-purple-500" />)}
                </div>
              </div>

              {/* B2B CTA */}
              <div className="text-center bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-3xl p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center mx-auto mb-5">
                  <Building2 size={28} className="text-white" />
                </div>
                <h3 className="heading-serif text-3xl mb-3">파트너십 문의</h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  제약사, 바이오텍, 연구기관을 위한 맞춤 AI 파이프라인.
                  <br />라이선싱, 공동연구, 전용 에이전트 배정.
                </p>
                <button onClick={() => openWaitlist("discovery")} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/15 hover:shadow-xl hover:shadow-violet-500/25 transition text-sm">
                  Contact Us <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SHARED PLATFORM TEAM ── */}
      <section id="team" className="py-24 bg-surface-raised">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-badge bg-amber-50 text-brand border border-amber-200 mb-4">Platform</span>
            <h2 className="heading-serif text-4xl mb-3">Shared Platform Team</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              두 사업부를 지원하는 공통 인프라 팀.
              HIPAA 준수 데이터 파이프라인, AI/ML 모델, 규제 컴플라이언스.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {sharedAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-brand-light to-brand" />)}
          </div>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-6 text-sm text-text-muted bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Health: 6</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Discovery: 5</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-light" /> Shared: 5</span>
              <span className="font-bold text-text-primary">= 16 Total</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-badge bg-amber-50 text-amber-700 border border-amber-200 mb-4">Pricing</span>
            <h2 className="heading-serif text-4xl mb-3">개인 건강 관리 플랜</h2>
            <p className="text-text-secondary">무료로 시작하세요. Drug Discovery는 별도 파트너십으로 운영됩니다.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {healthPlans.map((p) => (
              <div key={p.name} className={`relative rounded-3xl p-7 border card-lift ${p.highlight ? "bg-gradient-to-b from-amber-50 to-white border-amber-200 shadow-lg shadow-amber-500/8 ring-1 ring-amber-200" : "bg-white border-gray-100 shadow-sm"}`}>
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-brand text-white text-[10px] font-bold shadow-sm">RECOMMENDED</div>
                )}
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-xs text-text-muted mb-5">{p.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-text-muted">{p.period}</span>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check size={14} className="text-amber-600 mt-0.5 shrink-0" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => openWaitlist(p.name)}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition ${p.highlight
                    ? "bg-gradient-to-r from-brand to-accent text-white shadow-md shadow-brand/15 hover:shadow-lg hover:shadow-brand/25"
                    : "border-2 border-gray-200 text-text-secondary hover:text-text-primary hover:border-amber-300 hover:bg-amber-50"
                  }`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-muted mt-8">
            Brown Biotech Discovery (B2B) 파트너십은 <a href="mailto:brownbio.ocm@gmail.com" className="text-violet-600 hover:underline font-medium">brownbio.ocm@gmail.com</a>으로 문의하세요.
          </p>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-14 bg-surface-raised">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-5">Powered By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "BioStatX", desc: "Biomedical Statistics", url: "https://biostatx.vercel.app" },
              { name: "FitFlow", desc: "Fitness App", url: "https://fitflow-website.vercel.app" },
              { name: "Paperclip", desc: "AI Orchestration", url: "https://github.com/paperclipai/paperclip" },
              { name: "Agent Hub", desc: "AI Agent Catalog", url: "https://agent-hub-alpha-nine.vercel.app" },
            ].map((t) => (
              <a key={t.name} href={t.url} target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition text-xs font-medium">
                <Globe size={12} className="text-text-muted" />
                <span className="font-semibold">{t.name}</span>
                <span className="text-text-muted">{t.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-light to-brand flex items-center justify-center">
                <Dna size={14} className="text-white" />
              </div>
              <span className="heading-serif text-lg">Brown Biotech Inc.</span>
            </div>
            <div className="flex items-center gap-5 text-sm text-text-muted">
              <a href="https://biostatx.vercel.app" target="_blank" rel="noopener" className="hover:text-text-primary transition">BioStatX</a>
              <a href="https://fitflow-website.vercel.app" target="_blank" rel="noopener" className="hover:text-text-primary transition">FitFlow</a>
              <span className="text-amber-600 font-medium">Health</span>
              <span className="text-violet-600 font-medium">Discovery</span>
              <a href="https://github.com/ohbryt" target="_blank" rel="noopener" className="hover:text-text-primary transition">GitHub</a>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-text-muted">
            Founded by MD/PhD Endocrinologist · Aging & Metabolism · 16 AI Agents
          </p>
        </div>
      </footer>

      {/* ── WAITLIST MODAL ── */}
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} plan={modalPlan} />
    </div>
  );
}
