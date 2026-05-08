import React, { useState } from "react";
import {
  Activity,
  Apple,
  Atom,
  ArrowRight,
  BarChart3,
  Box,
  Brain,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Cpu,
  Database,
  Dna,
  ExternalLink,
  FlaskConical,
  Github,
  Globe,
  HeartPulse,
  Hourglass,
  Layers,
  Microscope,
  Moon,
  Package,
  Pill,
  Puzzle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  X,
  Zap,
  BookOpen,
  FileText,
  Beaker,
  Award,
  GraduationCap,
  Stethoscope,
  MapPin,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   THREE BUSINESS UNITS
   ═══════════════════════════════════════════ */
type BU = "health" | "discovery" | "paperclip";

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
  { step: "01", title: "Target Discovery", desc: "PubMed, ChEMBL, UniProt에서 노화·대사·암 관련 타겟을 먼저 좁히고 우선순위를 매깁니다.", icon: Microscope, agent: "Drug Discovery Lead" },
  { step: "02", title: "Affinity Modeling", desc: "MolXProt-style cross-attention GNN으로 단백질-리간드 결합 친화도를 예측합니다.", icon: Atom, agent: "Computational Chemist" },
  { step: "03", title: "De Novo Design", desc: "기하 딥러닝 + hierarchical VAE/RL로 새 분자를 설계하고 활성 최적화를 진행합니다.", icon: FlaskConical, agent: "Drug Discovery Lead" },
  { step: "04", title: "Explainability Check", desc: "XAI 평가 프레임워크로 예측 근거를 점검하고, 파트너에게 설명 가능한 결과만 남깁니다.", icon: ShieldCheck, agent: "Compliance Officer" },
  { step: "05", title: "Causal Validation", desc: "CADS-style 인과추론으로 필수 유전자를 식별하고 약물 시너지 가능성을 검증합니다.", icon: Dna, agent: "Genomics Analyst" },
  { step: "06", title: "Translation Pack", desc: "멀티오믹스·임상·규제 데이터를 묶어 공동연구/라이선싱용 패키지로 정리합니다.", icon: ClipboardCheck, agent: "Clinical Trials Analyst" },
];

/* ── Pricing ── */
const healthPlans = [
  {
    name: "Basic", price: "Free", period: "", desc: "대사 건강의 첫 걸음 — 무료로 시작",
    features: [
      "기본 혈액 검사 AI 분석 (공복혈당, HbA1c, 지질패널)",
      "대사 건강 점수 산출 (100점 만점)",
      "일반 식단/운동 가이드 (한국인 기준)",
      "커뮤니티 포럼 접근 & Q&A",
      "월 1회 건강 리포트 이메일",
    ],
    details: "혈액검사 결과 사진을 업로드하면 AI가 자동으로 수치를 추출하고, 대사 건강 점수를 산출합니다. 인슐린 저항성, 지질대사, 염증 지표를 종합 평가합니다.",
    agents: "Metabolic Analyst",
    cta: "Get Started", highlight: false,
  },
  {
    name: "Pro", price: "$49", period: "/month", desc: "6개 AI 에이전트 — 개인 맞춤형 장수 관리",
    features: [
      "정밀 바이오마커 분석 (인슐린, CRP, 호모시스테인 등 30+)",
      "호르몬 패턴 매핑 (갑상선·코르티솔·성호르몬)",
      "생물학적 나이 측정 & 월별 추적 그래프",
      "맞춤 영양/운동/수면 프로토콜 (AI 자동 생성)",
      "FitFlow 앱 연동 (Zone 2·HIIT 자동 전송)",
      "Longevity Lab 주간 리서치 브리핑",
      "월간 종합 AI 리포트 + 트렌드 분석",
    ],
    details: "6개 전문 AI 에이전트가 동시에 작동합니다. 혈액검사 업로드 → 대사 분석 → 호르몬 매핑 → 생물학적 나이 측정 → 맞춤 프로토콜 생성 → FitFlow 운동 전송까지 자동 파이프라인.",
    agents: "6개 Health AI 에이전트 전체",
    cta: "Start Free Trial", highlight: true,
  },
  {
    name: "Premium", price: "$149", period: "/month", desc: "전문가급 종합 건강 최적화 + 유전체 연동",
    features: [
      "Pro의 모든 기능 포함",
      "유전체(SNP) 분석 연동 (약물유전체학·영양유전체학)",
      "약물/보충제 상호작용 AI 체크",
      "실시간 웨어러블 데이터 분석 (Apple Watch·Garmin)",
      "PaperMind 논문 분석 무제한 이용",
      "1:1 AI 건강 컨설팅 (월 4회)",
      "API 접근 (개발자용 바이오마커 데이터)",
      "우선 고객 지원 & 신기능 얼리 액세스",
    ],
    details: "유전체 데이터와 바이오마커를 통합 분석하여 약물 반응 예측, 개인 맞춤 보충제 추천, 실시간 웨어러블 모니터링까지. 기업 임직원 건강 관리에도 활용 가능합니다.",
    agents: "전체 에이전트 + Genomics Analyst",
    cta: "Start Free Trial", highlight: false,
  },
];

/* ── Paperclip features ── */
const paperclipFeatures = [
  { icon: Workflow, title: "AI Orchestration", desc: "LLM 파이프라인을 시각적으로 설계하고 자동 실행. 복잡한 워크플로우를 드래그앤드롭으로 구성.", color: "from-blue-500 to-indigo-600" },
  { icon: Puzzle, title: "ClipMart Marketplace", desc: "커뮤니티가 만든 프롬프트 템플릿, 에이전트 플러그인을 검색하고 즉시 적용.", color: "from-indigo-500 to-blue-600" },
  { icon: Layers, title: "Multi-Model Support", desc: "OpenAI, Anthropic, Google, 그리고 로컬 LLM까지 하나의 인터페이스에서 비교하고 전환.", color: "from-cyan-500 to-blue-500" },
  { icon: Zap, title: "Real-time Streaming", desc: "응답을 실시간 스트리밍으로 표시. 긴 생성 작업도 즉시 피드백.", color: "from-blue-400 to-indigo-500" },
];

const paperclipHowItWorks = [
  { num: "1", title: "Install CLI", desc: "npm install -g paperclip 한 줄로 설치", icon: Terminal },
  { num: "2", title: "Build Pipeline", desc: "YAML 또는 UI로 LLM 파이프라인 설계", icon: Workflow },
  { num: "3", title: "Add Plugins", desc: "ClipMart에서 템플릿과 플러그인 추가", icon: Package },
  { num: "4", title: "Deploy & Scale", desc: "로컬 또는 클라우드에서 자동 스케일링", icon: Zap },
];

const clipmartTemplates = [
  { name: "Code Review Agent", category: "Development", downloads: "2.4k", desc: "PR 코드를 자동 리뷰하고 개선 제안" },
  { name: "Research Synthesizer", category: "Research", downloads: "1.8k", desc: "논문을 분석하고 핵심 인사이트 추출" },
  { name: "Data Pipeline Builder", category: "Data", downloads: "1.2k", desc: "ETL 파이프라인을 자연어로 생성" },
  { name: "Content Writer", category: "Marketing", downloads: "3.1k", desc: "브랜드 톤에 맞는 마케팅 콘텐츠 생성" },
];

/* ── Product detail data for expandable cards ── */
interface ProductInfo {
  slug: string;
  name: string;
  badge: string;
  desc: string;
  url: string;
  icon: LucideIcon;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentText: string;
  ringColor: string;
  accentColor: string;
  features: string[];
  useCase: { title: string; description: string };
  highlights: { label: string; value: string }[];
}

const products: ProductInfo[] = [
  {
    slug: "biostatx", name: "BioStatX", badge: "Analytics Engine",
    desc: "Biostatistics for study review, service scoping, and decision-ready reporting.",
    url: "https://biostatx.vercel.app", icon: BarChart3,
    gradient: "from-orange-400 to-amber-500", badgeBg: "bg-orange-50", badgeText: "text-orange-600", badgeBorder: "border-orange-100", accentText: "text-orange-600", ringColor: "#f59e0b", accentColor: "#f59e0b",
    features: ["T-Test / Paired T-Test 분석", "One-way & Two-way ANOVA", "Kaplan-Meier 생존 분석 & Log-rank", "ROC Curve + AUC 계산", "상관관계 & 회귀 분석", "Chi-Square 적합도 검정"],
    useCase: { title: "Study review", description: "Upload a trial or translational dataset and get a fast, decision-ready readout with survival, comparison, and regression outputs." },
    highlights: [{ label: "통계 도구", value: "11개" }, { label: "지원 분석", value: "생존·회귀·비교" }, { label: "가격", value: "무료" }],
  },
  {
    slug: "fitflow", name: "FitFlow", badge: "Fitness App",
    desc: "Weekly exercise planning for metabolic goals, routed into a tracked FitFlow flow.",
    url: "https://fitflow-website.vercel.app", icon: HeartPulse,
    gradient: "from-amber-400 to-amber-600", badgeBg: "bg-amber-50", badgeText: "text-amber-700", badgeBorder: "border-amber-100", accentText: "text-amber-700", ringColor: "#d97706", accentColor: "#d97706",
    features: ["VO2max 기반 Zone 2 유산소 프로그램", "대사 맞춤형 저항 운동 처방", "HIIT 인터벌 자동 설계", "Apple Watch / Garmin 웨어러블 연동", "주간 대사 리포트 & 진행 추적"],
    useCase: { title: "Weekly plan", description: "When a metabolic signal changes, FitFlow updates the weekly plan so the next session is simple to follow and easy to review." },
    highlights: [{ label: "운동 유형", value: "Zone2·HIIT·저항" }, { label: "웨어러블", value: "Apple·Garmin" }, { label: "AI 연동", value: "Health BU" }],
  },
  {
    slug: "longevity-lab", name: "Longevity Lab", badge: "Research",
    desc: "Healthspan research briefs translated into practical, readable insight.",
    url: "https://longevity-lab.io", icon: Microscope,
    gradient: "from-emerald-400 to-teal-600", badgeBg: "bg-emerald-50", badgeText: "text-emerald-700", badgeBorder: "border-emerald-100", accentText: "text-emerald-600", ringColor: "#10b981", accentColor: "#10b981",
    features: ["최신 노화/대사 논문 AI 큐레이션", "한국어 인사이트 요약 리포트", "주간 리서치 브리핑 뉴스레터", "건강수명 토픽별 아카이브", "연구 트렌드 시각화 대시보드"],
    useCase: { title: "Healthspan brief", description: "Pull the latest papers, compress the signal, and keep the weekly brief focused on what actually changed." },
    highlights: [{ label: "논문 소스", value: "PubMed·bioRxiv" }, { label: "업데이트", value: "주간" }, { label: "언어", value: "한국어" }],
  },
  {
    slug: "papermind", name: "PaperMind", badge: "AI Insights",
    desc: "Fast Med-Bio paper analysis for teams that need usable takeaways.",
    url: "https://www.papermind.me", icon: BookOpen,
    gradient: "from-purple-400 to-indigo-600", badgeBg: "bg-purple-50", badgeText: "text-purple-700", badgeBorder: "border-purple-100", accentText: "text-purple-600", ringColor: "#8b5cf6", accentColor: "#8b5cf6",
    features: ["논문 PDF 업로드 → AI 즉시 분석", "핵심 발견 · 방법론 · 한계점 자동 추출", "임상 적용 가능성 평가", "Llama 3.3 70B 오픈소스 모델 사용", "의료 전문가 무료 이용"],
    useCase: { title: "Paper brief", description: "Upload a paper and get a short summary of findings, limits, and what matters next." },
    highlights: [{ label: "AI 모델", value: "Llama 3.3 70B" }, { label: "분석 시간", value: "~2분" }, { label: "가격", value: "무료" }],
  },
  {
    slug: "paperclip", name: "Paperclip", badge: "AI Orchestration",
    desc: "Workflow orchestration for repeatable delivery across multiple models.",
    url: "https://dist-chi-two-33.vercel.app", icon: Workflow,
    gradient: "from-blue-400 to-indigo-600", badgeBg: "bg-blue-50", badgeText: "text-blue-700", badgeBorder: "border-blue-100", accentText: "text-blue-600", ringColor: "#3b82f6", accentColor: "#3b82f6",
    features: ["드래그앤드롭 LLM 파이프라인 빌더", "ClipMart 마켓플레이스 (템플릿·플러그인)", "OpenAI / Anthropic / Google 멀티모델", "실시간 스트리밍 응답", "CLI + YAML 기반 워크플로우"],
    useCase: { title: "Delivery pipeline", description: "Turn a repeat task into a reproducible workflow with model routing, handoff, and alerts." },
    highlights: [{ label: "지원 LLM", value: "GPT·Claude·Gemini" }, { label: "템플릿", value: "ClipMart" }, { label: "설치", value: "npm i -g" }],
  },
  {
    slug: "brown-biotech", name: "Brown Biotech", badge: "Drug Discovery",
    desc: "Target discovery, affinity modeling, and translational planning for partner-ready projects.",
    url: "https://brown-biotech-website.vercel.app", icon: Dna,
    gradient: "from-brand-light to-brand", badgeBg: "bg-amber-50", badgeText: "text-brand", badgeBorder: "border-amber-100", accentText: "text-brand", ringColor: "#92400e", accentColor: "#92400e",
    features: ["AI 타겟 발굴 & 검증", "가상 화합물 스크리닝 & 분자 도킹", "ADMET 독성/약동학 예측", "약물 재창출 (Drug Repurposing)", "FDA 임상시험 설계 자동화"],
    useCase: { title: "Partner brief", description: "Move from target idea to a partner-ready brief with clear evidence, scope, and next step." },
    highlights: [{ label: "브리프", value: "Ready" }, { label: "스크리닝", value: "Ranked" }, { label: "핸드오프", value: "Fast" }],
  },
];

/* ═══════════════════════════════════════════
   PRODUCT CARD — expandable with detail panel
   ═══════════════════════════════════════════ */
function ProductCard({ product, isExpanded, onToggle }: { product: ProductInfo; isExpanded: boolean; onToggle: () => void }) {
  const Icon = product.icon;
  return (
    <div className="flex flex-col">
      {/* Collapsed card */}
      <button
        onClick={onToggle}
        className={`group flex flex-col sm:flex-row items-center gap-5 bg-white border rounded-2xl p-6 text-left transition-all duration-300 shadow-sm cursor-pointer ${
          isExpanded
            ? "border-2 shadow-lg scale-[1.01]"
            : "border-gray-100 hover:shadow-md hover:-translate-y-1"
        }`}
        style={isExpanded ? { borderColor: product.ringColor, boxShadow: `0 0 0 1px ${product.ringColor}22, 0 8px 32px rgba(0,0,0,0.06)` } : {}}
      >
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shrink-0`}>
          <Icon size={30} className="text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h4 className="text-lg font-bold">{product.name}</h4>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${product.badgeBg} ${product.badgeText} font-semibold border ${product.badgeBorder}`}>{product.badge}</span>
          </div>
          <p className="text-sm text-text-secondary">{product.desc}</p>
          <div className={`mt-2 flex items-center justify-center sm:justify-start gap-1 text-xs ${product.accentText} font-medium`}>
            {isExpanded ? "닫기 ↑" : "자세히 보기 ↓"}
          </div>
        </div>
      </button>
    </div>
  );
}

function ProductDetailPanel({ product, isOpen }: { product: ProductInfo | null; isOpen: boolean }) {
  if (!product) return null;
  return (
    <div className={`product-detail-enter col-span-full ${isOpen ? "open" : ""}`}>
      <div className="product-detail-inner">
        <div
          className="detail-pointer bg-white border border-gray-100 rounded-2xl p-8 mt-3 shadow-md"
          style={{ "--pointer-left": "50%", "--accent-color": product.accentColor } as React.CSSProperties}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Features */}
            <div>
              <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                  <Check size={12} className="text-white" />
                </span>
                주요 기능
              </h4>
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check size={13} className={`${product.accentText} mt-0.5 shrink-0`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Case Example */}
            <div>
              <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                  <Sparkles size={12} className="text-white" />
                </span>
                사용 예시
              </h4>
              <div className="example-block rounded-xl p-5" style={{ "--accent-color": product.accentColor } as React.CSSProperties}>
                <h5 className="font-semibold text-sm mb-2">{product.useCase.title}</h5>
                <p className="text-xs text-text-secondary leading-relaxed">{product.useCase.description}</p>
              </div>
            </div>

            {/* Highlights + CTA */}
            <div className="flex flex-col">
              <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                  <BarChart3 size={12} className="text-white" />
                </span>
                하이라이트
              </h4>
              <div className="space-y-3 mb-6">
                {product.highlights.map((h) => (
                  <div key={h.label} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-xs text-text-muted">{h.label}</span>
                    <span className="text-sm font-bold">{h.value}</span>
                  </div>
                ))}
              </div>
              <a
                href={product.url}
                target="_blank"
                rel="noopener"
                className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${product.gradient} text-white font-semibold text-sm shadow-md hover:shadow-lg transition`}
              >
                {product.name} 열기 <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SVG HERO ILLUSTRATION
   ═══════════════════════════════════════════ */
function HeroIllustration() {
  const lanes = [
    { n: "01", title: "peptide-service", desc: "Primary lane for peptide projects, quotes, and consults.", accent: "from-[#ffd88a] to-[#d88a2c]" },
    { n: "02", title: "biostatx", desc: "Decision-ready statistics and reporting.", accent: "from-white/25 to-white/10" },
    { n: "03", title: "genox-site", desc: "Discovery scoping and partner fit.", accent: "from-white/25 to-white/10" },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto animate-float-slow overflow-hidden rounded-[2rem] border border-[#ffd88a]/22 bg-gradient-to-br from-[#1c1117] via-[#120f14] to-[#09090d] p-4 sm:p-5 shadow-[0_28px_80px_rgba(0,0,0,0.38)] ring-1 ring-white/5">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,216,138,0.12),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_32%)]" />
      <div className="relative flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#ffd88a]/82">Service snapshot</p>
          <p className="mt-1 text-lg font-semibold text-white leading-tight">Three lanes. One intake.</p>
          <p className="mt-1 text-sm text-white/70">Primary lane first. Human review always.</p>
        </div>
        <span className="shrink-0 rounded-full border border-[#ffd88a]/18 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[#ffe0a3] shadow-sm shadow-black/20">Human review</span>
      </div>

      <div className="relative mt-4 space-y-3">
        {lanes.map((lane, idx) => (
          <div
            key={lane.title}
            className={`rounded-2xl border p-3.5 backdrop-blur-sm ${idx === 0 ? "border-[#ffd88a]/24 bg-[#fff1cf]/8 shadow-[0_0_0_1px_rgba(255,216,138,0.05)]" : "border-white/10 bg-white/[0.035]"}`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${lane.accent} text-sm font-bold text-white shadow-md shadow-black/20 ring-1 ring-white/10`}>
                {lane.n}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="truncate text-[15px] font-semibold tracking-tight text-white">{lane.title}</h3>
                  {idx === 0 && <span className="rounded-full border border-[#ffd88a]/18 bg-[#ffd88a]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ffd88a]">Primary</span>}
                </div>
                <p className="mt-1 text-[13px] leading-snug text-white/80">{lane.desc}</p>
              </div>
              <ArrowRight size={15} className="mt-1 shrink-0 text-[#ffd88a]" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2">
        {[
          ["Response", "24h"],
          ["Focus", "Scope"],
          ["Output", "Handoff"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-center shadow-inner shadow-black/10">
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/46">{label}</div>
            <div className="mt-0.5 text-sm font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/75">
        <Check size={12} className="text-[#ffd88a]" />
        Research support only. High-stakes decisions stay human-reviewed.
      </div>
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceLane, setServiceLane] = useState(plan === "discovery" ? "genox-site" : "peptide-service");
  const [priority, setPriority] = useState(plan === "discovery" ? "hot" : "warm");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  if (!open) return null;

  const modalTitle =
    plan === "discovery"
      ? "Discovery / Partner Brief — Request a Brief"
      : plan === "peptide-service"
        ? "Peptide Service — Request a Brief"
        : `${plan} — Request a Brief`;

  const modalCopy =
    plan === "discovery"
      ? "Tell us the target, stage, and partner context. We will route the brief to the right review path."
      : plan === "peptide-service"
        ? "Peptide projects, quotes, and consults start here. Share the minimum context and we will scope the next step."
        : "Tell us what you want to remove, automate, or scope first.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          source: "website",
          serviceLane,
          priority,
          plan,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Request failed");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative bg-white border border-gray-100 rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition"><X size={18} /></button>
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Request received</h3>
            <p className="text-sm text-text-secondary mb-1">{name}</p>
            <p className="text-xs text-text-muted">We’ve placed this into the Brown Biotech intake queue.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <h3 className="heading-serif text-2xl mb-1">{modalTitle}</h3>
              <p className="text-sm text-text-secondary">{modalCopy}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                />
              </div>
              <input
                type="text"
                placeholder="Company / lab / team"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              />
              <select
                value={serviceLane}
                onChange={(e) => setServiceLane(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              >
                <option value="peptide-service">Peptide Service</option>
                <option value="biostatx">BioStatX</option>
                <option value="genox-site">Genox Site</option>
                <option value="general">General / Other</option>
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              >
                <option value="hot">Hot — ready to scope now</option>
                <option value="warm">Warm — exploring options</option>
                <option value="cold">Cold — early signal only</option>
              </select>
              <textarea
                rows={4}
                placeholder="What do you want to remove, automate, or scope first?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition resize-none"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-sm shadow-md shadow-brand/15 hover:shadow-lg hover:shadow-brand/25 transition disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? "Sending..." : "Send private brief"}
              </button>
              <p className="text-[11px] text-text-muted text-center">This goes straight into the Brown Biotech intake queue with service lane and priority attached.</p>
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
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

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
            <button onClick={() => { setActiveTab("paperclip"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`px-3.5 py-1.5 rounded-full transition font-medium ${activeTab === "paperclip" ? "bg-blue-50 text-blue-700" : "text-text-secondary hover:text-text-primary"}`}>
              Paperclip
            </button>
            <span className="w-px h-4 bg-gray-200 mx-2" />
            <a href="#ceo" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Founder / CEO</a>
            <a href="#research" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Research</a>
            <a href="#products" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Services</a>
            <a href="#team" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Team</a>
            <a href="#pricing" className="px-3 py-1.5 text-text-secondary hover:text-text-primary transition">Contact</a>
          </div>
          <button onClick={() => openWaitlist("peptide-service")} className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand to-accent text-white text-sm font-semibold shadow-sm shadow-brand/10 hover:shadow-md hover:shadow-brand/20 transition">
            Request a Brief
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#07070d] via-[#0f0f18] to-[#15111a] text-white">
        <div className="hero-glow top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="blob-warm w-[500px] h-[500px] -top-20 -right-40" />
        <div className="blob-cool w-[400px] h-[400px] top-40 -left-40" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 sm:gap-12 items-center relative z-10">
          {/* Left: Text */}
          <div className="text-white max-w-xl">
            <div className="section-badge bg-white/10 text-white border border-white/10 mb-6 sm:mb-8">
              <Sparkles size={12} /> Decision-ready biotech · Human review
            </div>

            <h1 className="heading-serif text-[3rem] sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[#ffd88a] via-[#f0b45f] to-[#b86c1b] bg-clip-text text-transparent">
                Biotech services,
              </span>
              <br />
              <span className="text-white">scoped with precision.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/72 max-w-lg mb-6 sm:mb-8 leading-relaxed">
              브라운 바이오텍 주식회사는 peptide-service를 중심으로, biostatistics와 discovery scoping을 하나의 intake 흐름으로 정리합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={() => openWaitlist("peptide-service")} className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-brand to-accent text-white font-semibold shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all w-full sm:w-auto">
                Request a Brief <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#bu-section" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full border-2 border-white/15 text-white font-semibold hover:bg-white/5 transition w-full sm:w-auto">
                View Service Hub
              </a>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>

        {/* Mobile-first service snapshot */}
        <div className="max-w-5xl mx-auto px-5 sm:px-6 mt-10 sm:mt-20 relative z-10 lg:hidden">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#ffd88a]/22 bg-gradient-to-br from-[#1c1117] via-[#120f14] to-[#09090d] p-4 sm:p-5 shadow-[0_24px_72px_rgba(0,0,0,0.34)] ring-1 ring-white/5">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,216,138,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_34%)]" />
            <div className="relative flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ffd88a]/82">Service snapshot</p>
                <p className="mt-1 text-base sm:text-lg font-semibold text-white leading-tight">Three lanes. One intake.</p>
                <p className="mt-1 text-xs sm:text-sm text-white/70">Primary lane first. Human review always.</p>
              </div>
              <a href="#bu-section" className="shrink-0 rounded-full border border-[#ffd88a]/18 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#ffe0a3] shadow-sm shadow-black/20 transition hover:bg-white/10">View details</a>
            </div>
            <div className="relative grid gap-3 mt-4">
              {[
                ["peptide-service", "Primary lane for peptide projects, quotes, and consults.", "Primary lane"],
                ["biostatx", "Decision-ready statistics and reporting.", "Analysis"],
                ["genox-site", "Discovery scoping and partner fit.", "Scope"],
              ].map(([lane, desc, tag], idx) => (
                <div key={lane} className={`rounded-2xl border p-3.5 ${idx === 0 ? "border-[#ffd88a]/24 bg-[#fff1cf]/8 shadow-[0_0_0_1px_rgba(255,216,138,0.05)]" : "border-white/10 bg-white/[0.035]"} backdrop-blur-sm`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 border-l-2 border-[#ffd88a]/35 pl-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[15px] font-semibold tracking-tight text-white leading-none">{lane}</div>
                        {idx === 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd88a]/12 text-[#ffd88a] border border-[#ffd88a]/16">{tag}</span>}
                      </div>
                      <div className="text-[13px] text-white/80 leading-snug">{desc}</div>
                    </div>
                    <ArrowRight size={15} className="text-[#ffd88a] shrink-0 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-4 grid grid-cols-3 gap-2">
              {[
                ["Response", "24h"],
                ["Focus", "Scope"],
                ["Output", "Handoff"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-center shadow-inner shadow-black/10">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-white/46">{label}</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{value}</div>
                </div>
              ))}
            </div>
            <div className="relative mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/75">
              <Check size={12} className="text-[#ffd88a]" />
              Research support only. High-stakes decisions stay human-reviewed.
            </div>
          </div>
        </div>

        {/* BU Cards */}
        <div className="hidden lg:grid max-w-5xl mx-auto px-6 mt-20 sm:grid-cols-3 gap-6 relative z-10">
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

          <button onClick={() => { setActiveTab("paperclip"); document.getElementById("bu-section")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group text-left p-6 rounded-2xl bg-white border border-blue-100 shadow-sm card-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white">
                <Workflow size={22} />
              </div>
              <div>
                <h3 className="font-bold text-blue-800">Paperclip AI</h3>
                <p className="text-[10px] text-blue-600/70 font-semibold uppercase tracking-wider">Platform · AI Orchestration</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">LLM 파이프라인 오케스트레이션, ClipMart 마켓플레이스, 멀티모델 지원</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-blue-700 font-medium group-hover:gap-2 transition-all">
              자세히 보기 <ArrowRight size={12} />
            </div>
          </button>
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
              <button onClick={() => setActiveTab("paperclip")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition ${activeTab === "paperclip" ? "bg-blue-50 text-blue-700 shadow-sm" : "text-text-muted hover:text-text-secondary"}`}>
                <Workflow size={16} /> Paperclip
                <span className="text-[10px] opacity-60 ml-1">Platform</span>
              </button>
            </div>
          </div>

          {/* ─── HEALTH TAB ─── */}
          {activeTab === "health" && (
            <div className="space-y-20">
              {/* Tagline */}
              <div className="text-center">
                <span className="section-badge bg-amber-50 text-amber-700 border border-amber-200 mb-4">Service Lane</span>
                <h2 className="heading-serif text-4xl sm:text-5xl mb-4">Personal Health Intelligence</h2>
                <p className="text-text-secondary max-w-lg mx-auto text-lg">
                  혈액 검사, 바이오마커, 프로토콜을 한 흐름으로 정리해 decision confidence를 높입니다.
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
                <h3 className="heading-serif text-3xl text-center mb-10">Flow</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { num: "1", title: "Intake", desc: "혈액 검사, 웨어러블 데이터, 건강 기록", icon: Database },
                    { num: "2", title: "Review", desc: "6개 전문 에이전트가 동시 분석", icon: Brain },
                    { num: "3", title: "Plan", desc: "영양/운동/수면 맞춤 프로토콜", icon: Sparkles },
                    { num: "4", title: "Track", desc: "FitFlow 연동, AI 지속 최적화", icon: Activity },
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

              {/* Health App Showcase */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-4">Service Flow Preview</h3>
                <p className="text-sm text-text-muted text-center mb-10">브리프부터 추적까지 — 실제 화면 흐름을 확인하세요</p>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* App Mockup — Phone Frame */}
                  <div className="flex justify-center">
                    <div className="w-[300px] bg-gray-900 rounded-[40px] p-3 shadow-2xl">
                      <div className="bg-white rounded-[32px] overflow-hidden">
                        {/* Status bar */}
                        <div className="bg-gradient-to-r from-amber-500 to-brand px-6 py-3 flex items-center justify-between">
                          <span className="text-white text-[10px] font-bold">Brown Health</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-white/80 text-[9px]">100%</span>
                            <div className="w-5 h-2.5 border border-white/80 rounded-sm p-[1px]"><div className="w-full h-full bg-white/80 rounded-[1px]" /></div>
                          </div>
                        </div>

                        {/* Dashboard */}
                        <div className="px-5 py-4 space-y-4">
                          <div>
                            <p className="text-[10px] text-text-muted">안녕하세요, 오창명님</p>
                            <p className="text-sm font-bold">대사 건강 대시보드</p>
                          </div>

                          {/* Health Score */}
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] text-text-muted font-semibold">대사 건강 점수</span>
                              <span className="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">양호</span>
                            </div>
                            <div className="flex items-end gap-3">
                              <span className="text-3xl font-extrabold text-brand">78</span>
                              <span className="text-xs text-text-muted mb-1">/100</span>
                              <span className="text-[10px] text-emerald-600 font-bold ml-auto mb-1">+3 ↑</span>
                            </div>
                            <div className="w-full h-2 bg-amber-100 rounded-full mt-2 overflow-hidden">
                              <div className="w-[78%] h-full bg-gradient-to-r from-amber-400 to-brand rounded-full" />
                            </div>
                          </div>

                          {/* Biomarkers */}
                          <div>
                            <p className="text-[10px] font-semibold mb-2">주요 바이오마커</p>
                            <div className="space-y-1.5">
                              {[
                                { name: "공복혈당", value: "92 mg/dL", status: "정상", color: "text-emerald-600 bg-emerald-50" },
                                { name: "HbA1c", value: "5.4%", status: "정상", color: "text-emerald-600 bg-emerald-50" },
                                { name: "HOMA-IR", value: "2.8", status: "경계", color: "text-amber-600 bg-amber-50" },
                                { name: "hsCRP", value: "0.9 mg/L", status: "정상", color: "text-emerald-600 bg-emerald-50" },
                              ].map((m) => (
                                <div key={m.name} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-gray-50">
                                  <span className="text-[10px] text-text-secondary">{m.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold">{m.value}</span>
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${m.color}`}>{m.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Today's Protocol */}
                          <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                            <p className="text-[10px] font-semibold text-violet-800 mb-2">오늘의 프로토콜</p>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[9px]">
                                <span className="w-4 h-4 rounded bg-amber-100 flex items-center justify-center text-[8px]">🏃</span>
                                <span className="text-text-secondary">Zone 2 유산소 45분</span>
                                <span className="ml-auto text-emerald-600 font-bold">FitFlow →</span>
                              </div>
                              <div className="flex items-center gap-2 text-[9px]">
                                <span className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center text-[8px]">🥗</span>
                                <span className="text-text-secondary">지중해식 저탄수 식단</span>
                              </div>
                              <div className="flex items-center gap-2 text-[9px]">
                                <span className="w-4 h-4 rounded bg-violet-100 flex items-center justify-center text-[8px]">😴</span>
                                <span className="text-text-secondary">수면 7.5h 목표 · 22:30 취침</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom nav */}
                        <div className="flex items-center justify-around py-3 border-t border-gray-100 bg-white">
                          <div className="text-center"><div className="text-[10px]">🏠</div><span className="text-[8px] text-brand font-bold">홈</span></div>
                          <div className="text-center"><div className="text-[10px]">📊</div><span className="text-[8px] text-text-muted">분석</span></div>
                          <div className="text-center"><div className="text-[10px]">🍎</div><span className="text-[8px] text-text-muted">영양</span></div>
                          <div className="text-center"><div className="text-[10px]">👤</div><span className="text-[8px] text-text-muted">프로필</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right — Feature Highlights */}
                  <div className="space-y-5 flex flex-col justify-center">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm card-lift">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shrink-0">
                          <Activity size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">혈액검사 AI 분석</h4>
                          <p className="text-xs text-text-secondary leading-relaxed">검사 결과 사진을 업로드하면 AI가 30+ 바이오마커를 자동 추출. 인슐린 저항성, 지질대사, 염증, 호르몬 패턴을 종합 분석하여 대사 건강 점수 100점 만점으로 산출합니다.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm card-lift">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white shrink-0">
                          <Hourglass size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">생물학적 나이 추적</h4>
                          <p className="text-xs text-text-secondary leading-relaxed">에피제네틱 클럭, 텔로미어 길이, 노화 바이오마커를 종합하여 생물학적 나이를 측정합니다. 월별 추적 그래프로 당신의 노화 속도가 빨라지는지 느려지는지 확인하세요.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm card-lift">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white shrink-0">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">AI 맞춤 프로토콜</h4>
                          <p className="text-xs text-text-secondary leading-relaxed">6개 전문 AI 에이전트가 영양, 운동, 수면 프로토콜을 자동 생성합니다. Zone 2 유산소는 FitFlow로 자동 전송되고, 매주 당신의 진행 상황에 맞게 프로토콜이 최적화됩니다.</p>
                        </div>
                      </div>
                    </div>
                    <a href="https://fitflow-website.vercel.app" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-sm shadow-md hover:shadow-lg transition">
                      FitFlow 앱 체험하기 <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Health Agents */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-2">Health Review Team</h3>
                <p className="text-sm text-text-muted text-center mb-8">6 specialists · Click to expand</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {healthAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-amber-400 to-amber-600" />)}
                </div>
              </div>

              {/* Products — Expandable Cards */}
              <div id="products">
                <h3 className="heading-serif text-3xl text-center mb-2">Service Portfolio</h3>
                <p className="text-sm text-text-muted text-center mb-8">각 lane의 역할만 빠르게 확인하세요</p>
                <div className="mb-8 bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 rounded-3xl p-7 shadow-sm">
                  <div className="max-w-3xl mx-auto text-center">
                    <span className="section-badge bg-white text-violet-700 border border-violet-200 mb-4">Primary Service Lane</span>
                    <h4 className="heading-serif text-3xl mb-3">Peptide Service</h4>
                    <p className="text-text-secondary mb-5 max-w-2xl mx-auto">
                      Peptide projects, quotes, and consults start here. One brief, one scope, one human review gate.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-xs text-violet-700 font-medium">
                      <span className="px-3 py-1.5 rounded-full bg-white border border-violet-100">Request a Brief</span>
                      <span className="px-3 py-1.5 rounded-full bg-white border border-violet-100">Scope Review</span>
                      <span className="px-3 py-1.5 rounded-full bg-white border border-violet-100">Human review</span>
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {products.map((p, idx) => {
                    const isExpanded = expandedProduct === p.slug;
                    const rowEnd = idx % 2 === 1 || idx === products.length - 1;
                    const pairSlug = idx % 2 === 0 && idx + 1 < products.length ? products[idx + 1].slug : null;
                    const showPanelAfter = rowEnd && (isExpanded || (pairSlug === null && isExpanded) || expandedProduct === (idx % 2 === 1 ? products[idx - 1]?.slug : null) || (idx % 2 === 1 && expandedProduct === products[idx]?.slug));
                    const rowStart = idx % 2 === 0 ? idx : idx - 1;
                    const rowProducts = products.slice(rowStart, rowStart + 2);
                    const expandedInRow = rowProducts.find(rp => rp.slug === expandedProduct);
                    const isRowEnd = idx % 2 === 1 || idx === products.length - 1;

                    return (
                      <React.Fragment key={p.slug}>
                        <ProductCard
                          product={p}
                          isExpanded={isExpanded}
                          onToggle={() => setExpandedProduct(isExpanded ? null : p.slug)}
                        />
                        {isRowEnd && expandedInRow && (
                          <ProductDetailPanel product={expandedInRow} isOpen={true} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ─── DISCOVERY TAB ─── */}
          {activeTab === "discovery" && (
            <div className="space-y-20">
              {/* Tagline */}
              <div className="text-center">
                <span className="section-badge bg-violet-50 text-violet-700 border border-violet-200 mb-4">B2B Discovery</span>
                <h2 className="heading-serif text-4xl sm:text-5xl mb-4">Discovery and Translational Planning</h2>
                <p className="text-text-secondary max-w-lg mx-auto text-lg">
                  노화/대사 타겟 발굴부터 번역 패키지 정리까지, partner-ready brief로 묶습니다.
                </p>
              </div>

              {/* Focus Areas */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-8">Key Questions</h3>
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

              {/* Pipeline — Visual Graphic */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-8">Discovery Workflow</h3>
                <p className="text-sm text-text-muted text-center mb-10">타겟 스캐닝부터 번역 패키지 정리까지 — decision-ready research support</p>

                {/* SVG Pipeline Graphic */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm mb-8">
                  <svg viewBox="0 0 900 320" fill="none" className="w-full h-auto">
                    {/* Connection arrows */}
                    <path d="M155,90 L215,90" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrowV)" />
                    <path d="M365,90 L425,90" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrowV)" />
                    <path d="M575,90 L635,90" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrowV)" />
                    <path d="M300,140 L300,180" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrowV)" />
                    <path d="M510,140 L510,180" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrowV)" />
                    <path d="M370,240 L440,240" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrowV)" />

                    {/* Stage 1: Target ID */}
                    <rect x="20" y="40" width="130" height="100" rx="16" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5" />
                    <text x="85" y="72" textAnchor="middle" fill="#7C3AED" fontSize="24">🔬</text>
                    <text x="85" y="95" textAnchor="middle" fill="#5B21B6" fontSize="11" fontWeight="700">Target ID</text>
                    <text x="85" y="112" textAnchor="middle" fill="#8B5CF6" fontSize="8">PubMed · ChEMBL</text>
                    <text x="85" y="125" textAnchor="middle" fill="#8B5CF6" fontSize="8">AI 타겟 스캐닝</text>

                    {/* Stage 2: Compound Screening */}
                    <rect x="220" y="40" width="150" height="100" rx="16" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5" />
                    <text x="295" y="72" textAnchor="middle" fill="#7C3AED" fontSize="24">⚗️</text>
                    <text x="295" y="95" textAnchor="middle" fill="#5B21B6" fontSize="11" fontWeight="700">Virtual Screening</text>
                    <text x="295" y="112" textAnchor="middle" fill="#8B5CF6" fontSize="8">분자 도킹 · ADMET</text>
                    <text x="295" y="125" textAnchor="middle" fill="#8B5CF6" fontSize="8">large-library screening</text>

                    {/* Stage 3: Drug Repurposing */}
                    <rect x="430" y="40" width="150" height="100" rx="16" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1.5" />
                    <text x="505" y="72" textAnchor="middle" fill="#6D28D9" fontSize="24">💊</text>
                    <text x="505" y="95" textAnchor="middle" fill="#5B21B6" fontSize="11" fontWeight="700">Drug Repurposing</text>
                    <text x="505" y="112" textAnchor="middle" fill="#7C3AED" fontSize="8">FDA 승인 약물 재창출</text>
                    <text x="505" y="125" textAnchor="middle" fill="#7C3AED" fontSize="8">빠른 임상 경로 탐색</text>

                    {/* Stage 4: Lead Candidate */}
                    <rect x="640" y="40" width="140" height="100" rx="16" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1.5" />
                    <text x="710" y="72" textAnchor="middle" fill="#6D28D9" fontSize="24">🧬</text>
                    <text x="710" y="95" textAnchor="middle" fill="#5B21B6" fontSize="11" fontWeight="700">Lead Candidate</text>
                    <text x="710" y="112" textAnchor="middle" fill="#7C3AED" fontSize="8">SAR 최적화</text>
                    <text x="710" y="125" textAnchor="middle" fill="#7C3AED" fontSize="8">rapid lead handoff</text>

                    {/* Stage 5: Genomic Validation (bottom row) */}
                    <rect x="220" y="190" width="150" height="100" rx="16" fill="#FEFCE8" stroke="#FDE68A" strokeWidth="1.5" />
                    <text x="295" y="222" textAnchor="middle" fill="#92400E" fontSize="24">🧪</text>
                    <text x="295" y="245" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="700">Genomic Validation</text>
                    <text x="295" y="262" textAnchor="middle" fill="#B45309" fontSize="8">약물유전체학 분석</text>
                    <text x="295" y="275" textAnchor="middle" fill="#B45309" fontSize="8">반응군 예측 · 부작용 최소화</text>

                    {/* Stage 6: Clinical & FDA */}
                    <rect x="440" y="190" width="150" height="100" rx="16" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5" />
                    <text x="515" y="222" textAnchor="middle" fill="#065F46" fontSize="24">📋</text>
                    <text x="515" y="245" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="700">Clinical & FDA</text>
                    <text x="515" y="262" textAnchor="middle" fill="#047857" fontSize="8">임상시험 설계 · IND/NDA</text>
                    <text x="515" y="275" textAnchor="middle" fill="#047857" fontSize="8">규제 컴플라이언스 패키지</text>

                    {/* Timeline badge */}
                    <rect x="680" y="220" width="180" height="50" rx="25" fill="url(#pipeline-grad)" />
                    <text x="770" y="242" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">타겟 → 리드 후보</text>
                    <text x="770" y="258" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10">rapid first pass</text>

                    <defs>
                      <marker id="arrowV" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <path d="M0,0 L8,3 L0,6" fill="#C4B5FD" />
                      </marker>
                      <linearGradient id="pipeline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#6D28D9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Pipeline example scenario */}
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-7">
                  <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-violet-600" /> 실제 사용 시나리오
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-sm text-violet-800 mb-2">Partner-ready brief</h5>
                      <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
                        <p><span className="font-mono text-violet-600">01</span> Target → affinity shortlist</p>
                        <p><span className="font-mono text-violet-600">02</span> De novo design → optimization → expansion</p>
                        <p><span className="font-mono text-violet-600">03</span> Explainability + causal validation</p>
                        <p><span className="font-mono text-violet-600">04</span> Multi-omics → regulatory handoff</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-violet-100">
                      <h5 className="font-semibold text-sm mb-3">Decision outputs</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-text-muted">Target shortlist</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-violet-500 rounded-full" /></div>
                            <span className="text-xs font-bold text-violet-700">Ready</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-text-muted">Screening queue</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="w-[75%] h-full bg-violet-500 rounded-full" /></div>
                            <span className="text-xs font-bold text-violet-700">Ranked</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-text-muted">Handoff speed</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="w-[95%] h-full bg-violet-500 rounded-full" /></div>
                            <span className="text-xs font-bold text-violet-700">Fast first pass</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-text-muted">Risk flags</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="w-[88%] h-full bg-emerald-500 rounded-full" /></div>
                            <span className="text-xs font-bold text-emerald-700">Contextual</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discovery Agents */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-2">Discovery Review Team</h3>
                <p className="text-sm text-text-muted text-center mb-8">5 specialists · Click to expand</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {discoveryAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-violet-400 to-purple-500" />)}
                </div>
              </div>

              {/* B2B CTA */}
              <div className="text-center bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-3xl p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center mx-auto mb-5">
                  <Building2 size={28} className="text-white" />
                </div>
                <h3 className="heading-serif text-3xl mb-3">Partner discovery</h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  Target discovery, affinity modeling, and partner-ready translation.
                </p>
                <button onClick={() => openWaitlist("discovery")} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/15 hover:shadow-xl hover:shadow-violet-500/25 transition text-sm">
                  Request Partner Brief <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ─── PAPERCLIP TAB ─── */}
          {activeTab === "paperclip" && (
            <div className="space-y-20">
              {/* Tagline */}
              <div className="text-center">
                <span className="section-badge bg-blue-50 text-blue-700 border border-blue-200 mb-4">AI Infrastructure</span>
                <h2 className="heading-serif text-4xl sm:text-5xl mb-4">AI Orchestration Platform</h2>
                <p className="text-text-secondary max-w-lg mx-auto text-lg">
                  LLM 파이프라인을 설계하고, ClipMart에서 템플릿을 공유하고, 멀티모델로 AI를 오케스트레이션합니다.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-6">
                {paperclipFeatures.map((s) => {
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
                <h3 className="heading-serif text-3xl text-center mb-10">Process</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paperclipHowItWorks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.num} className="text-center bg-white border border-gray-100 rounded-2xl p-6 card-lift shadow-sm">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                          <Icon size={24} className="text-blue-600" />
                        </div>
                        <div className="text-[10px] text-text-muted font-mono mb-1.5">Step {item.num}</div>
                        <h4 className="font-bold text-sm mb-1.5">{item.title}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Terminal Install */}
              <div className="max-w-2xl mx-auto">
                <h3 className="heading-serif text-3xl text-center mb-8">Quick Install</h3>
                <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs text-gray-500 font-mono">terminal</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">$</span>
                      <span className="text-gray-100">npm install -g paperclip</span>
                      <button
                        onClick={() => navigator.clipboard.writeText("npm install -g paperclip")}
                        className="ml-auto text-gray-500 hover:text-gray-300 transition p-1"
                        title="Copy"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <div className="text-gray-500">
                      <span className="text-blue-400">→</span> Installing paperclip@latest...
                    </div>
                    <div className="text-gray-500">
                      <span className="text-green-400">✓</span> <span className="text-gray-300">Paperclip installed successfully</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                      <span className="text-green-400">$</span>
                      <span className="text-gray-100">paperclip init my-project</span>
                    </div>
                    <div className="text-gray-500">
                      <span className="text-blue-400">→</span> Scaffolding project...
                    </div>
                    <div className="text-gray-500">
                      <span className="text-green-400">✓</span> <span className="text-gray-300">Ready! Run `paperclip dev` to start</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ClipMart Marketplace */}
              <div>
                <h3 className="heading-serif text-3xl text-center mb-2">ClipMart Marketplace</h3>
                <p className="text-sm text-text-muted text-center mb-8">커뮤니티가 만든 템플릿과 플러그인</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {clipmartTemplates.map((t) => (
                    <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-5 card-lift shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                            <Package size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold">{t.name}</h4>
                            <span className="text-[10px] text-text-muted">{t.category}</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold border border-blue-100">
                          ↓ {t.downloads}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paperclip CTA */}
              <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mx-auto mb-5">
                  <Workflow size={28} className="text-white" />
                </div>
                <h3 className="heading-serif text-3xl mb-3">Start Building with Paperclip</h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  오픈소스 AI 오케스트레이션 플랫폼으로
                  <br />LLM 파이프라인을 더 빠르게 구축하세요.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="https://dist-chi-two-33.vercel.app" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-500/25 transition text-sm">
                    Visit Paperclip <ExternalLink size={14} />
                  </a>
                  <a href="https://github.com/paperclipai/paperclip" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition text-sm">
                    GitHub <ArrowRight size={14} />
                  </a>
                </div>
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
            <h2 className="heading-serif text-4xl mb-3">Core Operating Team</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              세 lane을 받쳐주는 공통 운영팀.
              데이터, 실행, 규제, 그리고 human review를 연결합니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {sharedAgents.map((a) => <AgentCard key={a.slug} agent={a} accentColor="from-brand-light to-brand" />)}
          </div>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-6 text-sm text-text-muted bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Health: 6</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Discovery: 5</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Paperclip: Platform</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-light" /> Shared: 5</span>
              <span className="font-bold text-text-primary">= 16 Agents + 7 Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEO / FOUNDER ── */}
      <section id="ceo" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-badge bg-amber-50 text-brand border border-amber-200 mb-4">
              <Award size={12} /> Founder / CEO
            </span>
            <h2 className="heading-serif text-4xl sm:text-5xl mb-3">Chang-Myung Oh, M.D., Ph.D.</h2>
            <p className="text-text-secondary max-w-xl mx-auto">Clinical endocrinology, metabolism, and biotech company building — combining research depth with a decision-ready operating style.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left — Bio Card */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center card-lift">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-light to-brand flex items-center justify-center text-white mx-auto mb-5">
                  <span className="heading-serif text-3xl font-bold">MD</span>
                </div>
                <h3 className="text-xl font-bold mb-1">오창명</h3>
                <p className="text-sm text-text-muted mb-4">Chang-Myung Oh, M.D., Ph.D.</p>
                <div className="flex justify-center gap-3 mb-5">
                  <a href="https://scholar.google.com/citations?user=hcYYWNAAAAAJ&hl=en" target="_blank" rel="noopener" className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition" title="Google Scholar">
                    <GraduationCap size={16} />
                  </a>
                  <a href="https://orcid.org/0000-0001-6681-4478" target="_blank" rel="noopener" className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition" title="ORCID">
                    <Globe size={16} />
                  </a>
                </div>
                <div className="space-y-2.5 text-left">
                  <div className="flex items-center gap-2.5 text-sm"><MapPin size={14} className="text-text-muted shrink-0" /><span className="text-text-secondary">GIST, Gwangju, South Korea</span></div>
                  <div className="flex items-center gap-2.5 text-sm"><Stethoscope size={14} className="text-text-muted shrink-0" /><span className="text-text-secondary">Endocrinology & Metabolism</span></div>
                  <div className="flex items-center gap-2.5 text-sm"><Microscope size={14} className="text-text-muted shrink-0" /><span className="text-text-secondary">Aging · Serotonin · Metabolism</span></div>
                </div>
              </div>
            </div>

            {/* Right — Career & Research */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
                <h4 className="font-bold text-sm mb-5 flex items-center gap-2"><GraduationCap size={16} className="text-brand" /> Career Track Record</h4>
                <div className="space-y-3">
                  {[
                    { year: "2025 –", role: "Professor", org: "Department of BMSE, GIST", highlight: true },
                    { year: "2023 – 2025", role: "Associate Professor", org: "Department of BMSE, GIST", highlight: false },
                    { year: "2019 – 2023", role: "Assistant Professor", org: "Department of BMSE, GIST", highlight: false },
                    { year: "2017 – 2019", role: "Post-Doc.", org: "Lab of Integrative Systems Physiology, EPFL, Switzerland", highlight: false },
                    { year: "2016 – 2019", role: "Clinical Assistant Professor", org: "Dept. of Endocrinology, CHA Medical University", highlight: false },
                    { year: "2015 – 2016", role: "Clinical & Research Fellow", org: "Endocrinology & Metabolism, Seoul National University Hospital", highlight: false },
                    { year: "2011 – 2015", role: "Ph.D.", org: "GSMSE, KAIST", highlight: false },
                    { year: "2006 – 2011", role: "Intern & Resident", org: "Internal Medicine, Severance Hospital (Yonsei Univ.)", highlight: false },
                  ].map((item) => (
                    <div key={item.year} className={`flex items-start gap-3 px-4 py-2.5 rounded-xl ${item.highlight ? "bg-amber-50 border border-amber-100" : "bg-gray-50"}`}>
                      <span className="text-[11px] font-mono text-text-muted whitespace-nowrap mt-0.5 w-24 shrink-0">{item.year}</span>
                      <div className="min-w-0">
                        <span className={`text-sm font-semibold ${item.highlight ? "text-brand" : ""}`}>{item.role}</span>
                        <p className="text-xs text-text-muted truncate">{item.org}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
                <h4 className="font-bold text-sm mb-5 flex items-center gap-2"><BookOpen size={16} className="text-violet-600" /> Selected Papers</h4>
                <div className="space-y-3">
                  {[
                    { journal: "Nature Communications", title: "Regulation of systemic energy homeostasis by serotonin in adipose tissues", year: "2015", color: "bg-red-50 text-red-600 border-red-100" },
                    { journal: "Science Transl. Med.", title: "Inhibiting de novo ceramide synthesis restores mitochondrial and protein homeostasis in muscle aging", year: "2023", color: "bg-blue-50 text-blue-600 border-blue-100" },
                    { journal: "Nature Communications", title: "Cross-talks between metabolic and translational controls during beige adipocyte differentiation", year: "2025", color: "bg-red-50 text-red-600 border-red-100" },
                    { journal: "Exp. & Mol. Medicine", title: "Mitochondria-associated programmed cell death as a therapeutic target for age-related disease", year: "2023", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                    { journal: "Exp. & Mol. Medicine", title: "Inhibition of serotonin-Htr2b signaling in skeletal muscle mitigates obesity-induced insulin resistance", year: "2025", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                  ].map((pub) => (
                    <div key={pub.title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/60 hover:bg-gray-50 transition">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border shrink-0 mt-0.5 ${pub.color}`}>{pub.journal}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-text-primary leading-relaxed line-clamp-2">{pub.title}</p>
                        <span className="text-[10px] text-text-muted">{pub.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm card-lift">
                  <div className="text-2xl font-extrabold text-brand mb-1">15+</div>
                  <p className="text-xs text-text-muted">Years in Aging Research</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm card-lift">
                  <div className="text-2xl font-extrabold text-violet-700 mb-1">80+</div>
                  <p className="text-xs text-text-muted">Peer-reviewed Publications</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm card-lift">
                  <div className="text-2xl font-extrabold text-blue-700 mb-1">KAIST · EPFL</div>
                  <p className="text-xs text-text-muted">Ph.D. & Post-Doc Training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH SPOTLIGHT ── */}
      <section id="research" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-badge bg-violet-50 text-violet-700 border border-violet-200 mb-4">
              <Microscope size={12} /> Research Spotlight
            </span>
            <h2 className="heading-serif text-4xl sm:text-5xl mb-3">Research Briefing</h2>
            <p className="text-text-secondary max-w-xl mx-auto">Metabolism and aging signals tracked into a concise, decision-ready reading list.</p>
          </div>

          {/* Featured Paper Card */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-violet-500 via-rose-400 to-amber-400" />

            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[10px] px-3 py-1 rounded-full font-bold bg-violet-50 text-violet-700 border border-violet-100">Nature Metabolism</span>
                <span className="text-[10px] px-3 py-1 rounded-full font-bold bg-gray-50 text-text-muted border border-gray-200">2026</span>
                <span className="text-[10px] px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Original Article</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-text-primary leading-snug mb-3">
                Defining the vascular niche of human adipose tissue across metabolic states
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-3xl">
                AlZaim I, Hassan MN, Schröter M, <em>et al.</em> — 인간 지방 조직의 혈관 미세환경을 단일세포 수준에서 매핑하여,
                대사 상태(정상체중·비만·당뇨)에 따른 내피세포 이질성과 혈관-지방세포 상호작용의 변화를 규명한 연구입니다.
                비만 환경에서 내피세포가 EndMT(내피-중간엽 전이)를 거치며 지방 조직 기능 장애를 촉진하는 메커니즘을 밝혔습니다.
              </p>

              {/* Key Findings Grid */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Dna, label: "Single-cell Atlas", desc: "인간 지방 조직 혈관 세포의 포괄적 단일세포 전사체 지도 구축", color: "text-violet-600 bg-violet-50" },
                  { icon: Activity, label: "Metabolic States", desc: "정상체중 · 비만 · 2형 당뇨 — 3가지 대사 상태 비교 분석", color: "text-rose-600 bg-rose-50" },
                  { icon: FlaskConical, label: "Drug Targets", desc: "EndMT 경로 및 SREBF1/YAP 시그널링 — 새로운 치료 타겟 제시", color: "text-amber-600 bg-amber-50" },
                ].map((f) => (
                  <div key={f.label} className="rounded-2xl border border-gray-100 p-5 bg-gray-50/40">
                    <div className={`w-9 h-9 rounded-xl ${f.color} flex items-center justify-center mb-3`}>
                      <f.icon size={18} />
                    </div>
                    <h4 className="text-sm font-bold mb-1">{f.label}</h4>
                    <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Relevance to Brown AI */}
              <div className="rounded-2xl bg-gradient-to-r from-amber-50/80 to-violet-50/60 border border-amber-100 p-6">
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-600" />
                  Brown AI 플랫폼 연계
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { tool: "Longevity Lab", desc: "이 논문의 단일세포 데이터를 기반으로 비만-노화 연관 바이오마커 탐색" },
                    { tool: "PaperMind", desc: "EndMT 관련 3,200+ 참조 문헌의 핵심 인사이트를 30초 내 요약" },
                    { tool: "Drug Discovery", desc: "SREBF1/YAP 타겟 기반 기존 약물 재창출 후보 스크리닝" },
                    { tool: "BioStatX", desc: "scRNA-seq 클러스터링 및 차등발현 유전자 분석 자동화" },
                  ].map((r) => (
                    <div key={r.tool} className="flex items-start gap-2.5">
                      <ChevronRight size={14} className="text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-text-primary">{r.tool}</span>
                        <p className="text-[11px] text-text-muted leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOI & Links */}
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <a
                  href="https://doi.org/10.1038/s42255-026-01475-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 transition"
                >
                  <ExternalLink size={14} />
                  DOI: 10.1038/s42255-026-01475-2
                </a>
                <a
                  href="https://github.com/Kalucka-Lab/SAT_Atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
                >
                  <Github size={14} />
                  Code &amp; Data
                </a>
                <span className="text-[11px] text-text-muted">Nat Metab (2026) · Kalucka Lab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-surface-raised">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-badge bg-amber-50 text-amber-700 border border-amber-200 mb-4">Service Access</span>
            <h2 className="heading-serif text-4xl mb-3">Health Memberships</h2>
            <p className="text-text-secondary max-w-lg mx-auto">Choose the level of review you need. Start light, move deeper when the signal matters, and keep human review in the loop for higher-stakes decisions.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {healthPlans.map((p) => (
              <div key={p.name} className={`relative flex flex-col rounded-3xl p-7 border ${p.highlight ? "bg-gradient-to-b from-amber-50 to-white border-amber-200 shadow-lg shadow-amber-500/8 ring-1 ring-amber-200" : "bg-white border-gray-100 shadow-sm"}`}>
                {p.highlight ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-brand text-white text-[10px] font-bold shadow-sm">MOST USED</div>
                ) : null}
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-xs text-text-muted mb-4">{p.desc}</p>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-text-muted">{p.period}</span>
                </div>

                {/* Detail description */}
                <div className="mb-5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-text-secondary leading-relaxed">{p.details}</p>
                </div>

                {/* Agent badge */}
                <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-amber-50/60 border border-amber-100">
                  <Brain size={14} className="text-amber-600 shrink-0" />
                  <span className="text-[11px] text-amber-800 font-medium">{p.agents}</span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-text-secondary leading-snug">
                      <Check size={13} className="text-amber-600 mt-0.5 shrink-0" /><span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => openWaitlist(p.name)}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition ${p.highlight
                    ? "bg-gradient-to-r from-brand to-accent text-white shadow-md shadow-brand/15 hover:shadow-lg hover:shadow-brand/25"
                    : "border-2 border-gray-200 text-text-secondary hover:text-text-primary hover:border-amber-300 hover:bg-amber-50"
                  }`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Comparison highlights */}
          <div className="mt-14 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="font-bold text-center mb-8">Capability comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 text-text-muted font-medium text-xs">Capability</th>
                    <th className="text-center py-3 px-4 text-text-muted font-medium text-xs">Basic</th>
                    <th className="text-center py-3 px-4 font-medium text-xs text-amber-700">Pro</th>
                    <th className="text-center py-3 px-4 text-text-muted font-medium text-xs">Premium</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { feature: "혈액검사 AI 분석", basic: "기본 패널", pro: "30+ 바이오마커", premium: "30+ 바이오마커" },
                    { feature: "대사 건강 점수", basic: "✓", pro: "✓", premium: "✓" },
                    { feature: "호르몬 패턴 매핑", basic: "—", pro: "✓", premium: "✓" },
                    { feature: "생물학적 나이 측정", basic: "—", pro: "월별 추적", premium: "실시간 추적" },
                    { feature: "맞춤 프로토콜 (영양/운동/수면)", basic: "일반 가이드", pro: "AI 맞춤 생성", premium: "AI 맞춤 생성" },
                    { feature: "FitFlow 앱 연동", basic: "—", pro: "✓", premium: "✓" },
                    { feature: "유전체(SNP) 분석", basic: "—", pro: "—", premium: "✓" },
                    { feature: "약물/보충제 상호작용 체크", basic: "—", pro: "—", premium: "✓" },
                    { feature: "웨어러블 실시간 분석", basic: "—", pro: "—", premium: "Apple·Garmin" },
                    { feature: "PaperMind 논문 분석", basic: "—", pro: "—", premium: "무제한" },
                    { feature: "1:1 AI 컨설팅", basic: "—", pro: "—", premium: "월 4회" },
                    { feature: "AI 에이전트", basic: "1개", pro: "6개", premium: "7개 + Genomics" },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-gray-50">
                      <td className="py-2.5 pr-4 text-text-primary font-medium">{row.feature}</td>
                      <td className="py-2.5 px-4 text-center text-text-muted">{row.basic}</td>
                      <td className="py-2.5 px-4 text-center text-amber-700 font-medium">{row.pro}</td>
                      <td className="py-2.5 px-4 text-center text-text-secondary">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-sm text-text-muted mt-8">
            Brown Biotech Discovery (B2B) private briefs: <a href="mailto:brownbio.ocm@gmail.com" className="text-violet-600 hover:underline font-medium">brownbio.ocm@gmail.com</a>
          </p>
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
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <a href="https://biostatx.vercel.app" target="_blank" rel="noopener" className="hover:text-text-primary transition">BioStatX</a>
              <a href="https://fitflow-website.vercel.app" target="_blank" rel="noopener" className="hover:text-text-primary transition">FitFlow</a>
              <a href="https://longevity-lab.io" target="_blank" rel="noopener" className="hover:text-text-primary transition">Longevity Lab</a>
              <a href="https://www.papermind.me" target="_blank" rel="noopener" className="hover:text-text-primary transition">PaperMind</a>
              <a href="https://dist-chi-two-33.vercel.app" target="_blank" rel="noopener" className="hover:text-text-primary transition">Paperclip</a>
              <span className="text-amber-600 font-medium">Health</span>
              <span className="text-violet-600 font-medium">Discovery</span>
              <span className="text-blue-600 font-medium">Paperclip</span>
              <a href="https://github.com/ohbryt" target="_blank" rel="noopener" className="hover:text-text-primary transition">GitHub</a>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-text-muted">
            Brown Biotech Inc. · decision-ready biotech services · peptide-service · biostatx · genox-site · private brief intake
          </p>
        </div>
      </footer>

      {/* ── WAITLIST MODAL ── */}
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} plan={modalPlan} />
    </div>
  );
}
