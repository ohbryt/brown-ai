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

/* ── Paperclip features ── */
const paperclipFeatures = [
  { icon: Workflow, title: "AI Orchestration", desc: "LLM 파이프라인을 시각적으로 설계하고 자동 실행. 복잡한 워크플로우를 드래그앤드롭으로 구성.", color: "from-blue-500 to-indigo-600" },
  { icon: Puzzle, title: "ClipMart Marketplace", desc: "커뮤니티가 만든 프롬프트 템플릿, 에이전트 플러그인을 검색하고 즉시 적용.", color: "from-indigo-500 to-blue-600" },
  { icon: Layers, title: "Multi-Model Support", desc: "OpenAI, Anthropic, Google 등 모든 LLM을 하나의 인터페이스에서 비교하고 전환.", color: "from-cyan-500 to-blue-500" },
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
    desc: "바이오메디컬 통계 플랫폼 — T-Test, ANOVA, Kaplan-Meier 등 11개 도구.",
    url: "https://biostatx.vercel.app", icon: BarChart3,
    gradient: "from-orange-400 to-amber-500", badgeBg: "bg-orange-50", badgeText: "text-orange-600", badgeBorder: "border-orange-100", accentText: "text-orange-600", ringColor: "#f59e0b", accentColor: "#f59e0b",
    features: ["T-Test / Paired T-Test 분석", "One-way & Two-way ANOVA", "Kaplan-Meier 생존 분석 & Log-rank", "ROC Curve + AUC 계산", "상관관계 & 회귀 분석", "Chi-Square 적합도 검정"],
    useCase: { title: "임상시험 생존 분석", description: "Phase II 항노화 약물 임상시험 데이터를 업로드하면, Kaplan-Meier 곡선이 자동 생성되고 Log-rank test로 대조군 대비 유의미한 생존 개선 여부를 즉시 판정합니다." },
    highlights: [{ label: "통계 도구", value: "11개" }, { label: "지원 분석", value: "생존·회귀·비교" }, { label: "가격", value: "무료" }],
  },
  {
    slug: "fitflow", name: "FitFlow", badge: "Fitness App",
    desc: "대사 최적화 운동이 FitFlow로 자동 전송. Zone 2, 저항 운동, HIIT.",
    url: "https://fitflow-website.vercel.app", icon: HeartPulse,
    gradient: "from-amber-400 to-amber-600", badgeBg: "bg-amber-50", badgeText: "text-amber-700", badgeBorder: "border-amber-100", accentText: "text-amber-700", ringColor: "#d97706", accentColor: "#d97706",
    features: ["VO2max 기반 Zone 2 유산소 프로그램", "대사 맞춤형 저항 운동 처방", "HIIT 인터벌 자동 설계", "Apple Watch / Garmin 웨어러블 연동", "주간 대사 리포트 & 진행 추적"],
    useCase: { title: "대사 맞춤 운동 처방", description: "혈액검사에서 인슐린 저항성이 감지되면, AI가 자동으로 Zone 2 유산소 60% + 저항운동 40% 비율의 주간 운동 프로그램을 생성하고 FitFlow 앱에 푸시합니다." },
    highlights: [{ label: "운동 유형", value: "Zone2·HIIT·저항" }, { label: "웨어러블", value: "Apple·Garmin" }, { label: "AI 연동", value: "Health BU" }],
  },
  {
    slug: "longevity-lab", name: "Longevity Lab", badge: "Research",
    desc: "최신 건강수명(healthspan) 논문을 분석하여 실생활 인사이트로 전하는 리서치 플랫폼.",
    url: "https://longevity-lab.io", icon: Microscope,
    gradient: "from-emerald-400 to-teal-600", badgeBg: "bg-emerald-50", badgeText: "text-emerald-700", badgeBorder: "border-emerald-100", accentText: "text-emerald-600", ringColor: "#10b981", accentColor: "#10b981",
    features: ["최신 노화/대사 논문 AI 큐레이션", "한국어 인사이트 요약 리포트", "주간 리서치 브리핑 뉴스레터", "건강수명 토픽별 아카이브", "연구 트렌드 시각화 대시보드"],
    useCase: { title: "NAD+ 보충제 메타분석", description: "최근 발표된 NAD+ 보충제 메타분석 논문 10편을 자동 수집 → 핵심 발견(효과 크기, 복용량, 부작용)을 한국어 인사이트로 요약하여 주간 브리핑에 포함합니다." },
    highlights: [{ label: "논문 소스", value: "PubMed·bioRxiv" }, { label: "업데이트", value: "주간" }, { label: "언어", value: "한국어" }],
  },
  {
    slug: "papermind", name: "PaperMind", badge: "AI Insights",
    desc: "Llama 3.3 70B 기반 무료 Med-Bio 논문 인사이트. 의료 전문가를 위한 AI 분석 서비스.",
    url: "https://www.papermind.me", icon: BookOpen,
    gradient: "from-purple-400 to-indigo-600", badgeBg: "bg-purple-50", badgeText: "text-purple-700", badgeBorder: "border-purple-100", accentText: "text-purple-600", ringColor: "#8b5cf6", accentColor: "#8b5cf6",
    features: ["논문 PDF 업로드 → AI 즉시 분석", "핵심 발견 · 방법론 · 한계점 자동 추출", "임상 적용 가능성 평가", "Llama 3.3 70B 오픈소스 모델 사용", "의료 전문가 무료 이용"],
    useCase: { title: "논문 핵심 분석", description: "30페이지 임상시험 논문 PDF를 업로드하면 2분 내에: ① 핵심 발견 3줄 요약, ② 연구 방법론 평가, ③ 한계점 및 바이어스 분석, ④ 임상 현장 적용 제안을 생성합니다." },
    highlights: [{ label: "AI 모델", value: "Llama 3.3 70B" }, { label: "분석 시간", value: "~2분" }, { label: "가격", value: "무료" }],
  },
  {
    slug: "paperclip", name: "Paperclip", badge: "AI Orchestration",
    desc: "LLM 파이프라인 오케스트레이션 플랫폼. ClipMart 마켓플레이스, 멀티모델 지원.",
    url: "https://dist-chi-two-33.vercel.app", icon: Workflow,
    gradient: "from-blue-400 to-indigo-600", badgeBg: "bg-blue-50", badgeText: "text-blue-700", badgeBorder: "border-blue-100", accentText: "text-blue-600", ringColor: "#3b82f6", accentColor: "#3b82f6",
    features: ["드래그앤드롭 LLM 파이프라인 빌더", "ClipMart 마켓플레이스 (템플릿·플러그인)", "OpenAI / Anthropic / Google 멀티모델", "실시간 스트리밍 응답", "CLI + YAML 기반 워크플로우"],
    useCase: { title: "코드리뷰 자동화 파이프라인", description: "GitHub PR → GPT-4로 코드 분석 → Claude로 리팩토링 제안 → Slack 알림 전송하는 3단계 파이프라인을 ClipMart 템플릿에서 원클릭으로 설치하고 바로 실행합니다." },
    highlights: [{ label: "지원 LLM", value: "GPT·Claude·Gemini" }, { label: "템플릿", value: "ClipMart" }, { label: "설치", value: "npm i -g" }],
  },
  {
    slug: "brown-biotech", name: "Brown Biotech", badge: "Drug Discovery",
    desc: "AI 기반 신약 발굴 — 타겟 분자부터 리드 후보까지 며칠 만에 달성.",
    url: "https://brown-biotech-website.vercel.app", icon: Dna,
    gradient: "from-brand-light to-brand", badgeBg: "bg-amber-50", badgeText: "text-brand", badgeBorder: "border-amber-100", accentText: "text-brand", ringColor: "#92400e", accentColor: "#92400e",
    features: ["AI 타겟 발굴 & 검증", "가상 화합물 스크리닝 & 분자 도킹", "ADMET 독성/약동학 예측", "약물 재창출 (Drug Repurposing)", "FDA 임상시험 설계 자동화"],
    useCase: { title: "노화 타겟 리드 후보 발굴", description: "mTOR 경로의 새로운 억제 타겟을 AI로 발굴 → 100만 화합물 가상 스크리닝 → ADMET 필터링 → 72시간 내에 리드 후보 3개를 도출하고 합성 가능성까지 평가합니다." },
    highlights: [{ label: "발굴 속도", value: "72시간" }, { label: "스크리닝", value: "100만+ 화합물" }, { label: "파이프라인", value: "타겟→리드" }],
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
              세 개의 사업부로 노화, 대사, AI 인프라를 공략합니다.
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
        <div className="max-w-5xl mx-auto px-6 mt-20 grid sm:grid-cols-3 gap-6 relative z-10">
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

      {/* ── CEO / FOUNDER ── */}
      <section id="ceo" className="py-20 bg-surface-raised">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-badge bg-amber-50 text-brand border border-amber-200 mb-4">
              <Award size={12} /> Founder & CEO
            </span>
            <h2 className="heading-serif text-4xl sm:text-5xl mb-3">Chang-Myung Oh, M.D., Ph.D.</h2>
            <p className="text-text-secondary max-w-xl mx-auto">내분비학 전문의이자 대사·노화 연구자. 임상 의학과 AI를 융합하여 장수 과학의 새로운 패러다임을 만듭니다.</p>
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
                  <div className="flex items-center gap-2.5 text-sm">
                    <MapPin size={14} className="text-text-muted shrink-0" />
                    <span className="text-text-secondary">GIST, Gwangju, South Korea</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Stethoscope size={14} className="text-text-muted shrink-0" />
                    <span className="text-text-secondary">Endocrinology & Metabolism</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Microscope size={14} className="text-text-muted shrink-0" />
                    <span className="text-text-secondary">Aging · Serotonin · Metabolism</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Career & Research */}
            <div className="lg:col-span-2 space-y-6">
              {/* Career Timeline */}
              <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
                <h4 className="font-bold text-sm mb-5 flex items-center gap-2">
                  <GraduationCap size={16} className="text-brand" /> Career Timeline
                </h4>
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

              {/* Key Publications */}
              <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
                <h4 className="font-bold text-sm mb-5 flex items-center gap-2">
                  <BookOpen size={16} className="text-violet-600" /> Selected Publications
                </h4>
                <div className="space-y-3">
                  {[
                    { journal: "Nature Communications", title: "Regulation of systemic energy homeostasis by serotonin in adipose tissues", year: "2015", color: "bg-red-50 text-red-600 border-red-100" },
                    { journal: "Science Translational Medicine", title: "Inhibiting de novo ceramide synthesis restores mitochondrial and protein homeostasis in muscle aging", year: "2023", color: "bg-blue-50 text-blue-600 border-blue-100" },
                    { journal: "Nature Communications", title: "Cross-talks between metabolic and translational controls during beige adipocyte differentiation", year: "2025", color: "bg-red-50 text-red-600 border-red-100" },
                    { journal: "Exp. & Mol. Medicine", title: "Mitochondria-associated programmed cell death as a therapeutic target for age-related disease", year: "2023", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                    { journal: "Exp. & Mol. Medicine", title: "Inhibition of serotonin-Htr2b signaling in skeletal muscle mitigates obesity-induced insulin resistance", year: "2025", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                    { journal: "Communications Biology", title: "Spatial profiling of non-small cell lung cancer provides insights into tumorigenesis and immunotherapy response", year: "2024", color: "bg-amber-50 text-amber-700 border-amber-100" },
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

              {/* Research Highlights */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm card-lift">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white mx-auto mb-3">
                    <Dna size={22} />
                  </div>
                  <div className="text-2xl font-extrabold text-brand mb-1">15+</div>
                  <p className="text-xs text-text-muted">Years in Aging Research</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm card-lift">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white mx-auto mb-3">
                    <BookOpen size={22} />
                  </div>
                  <div className="text-2xl font-extrabold text-violet-700 mb-1">80+</div>
                  <p className="text-xs text-text-muted">Peer-reviewed Publications</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm card-lift">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white mx-auto mb-3">
                    <Globe size={22} />
                  </div>
                  <div className="text-2xl font-extrabold text-blue-700 mb-1">KAIST · EPFL</div>
                  <p className="text-xs text-text-muted">Ph.D. & Post-Doc Training</p>
                </div>
              </div>
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

              {/* Products — Expandable Cards */}
              <div id="products">
                <h3 className="heading-serif text-3xl text-center mb-2">Our Products</h3>
                <p className="text-sm text-text-muted text-center mb-8">클릭하여 각 제품의 상세 기능과 사용 예시를 확인하세요</p>
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
                <h3 className="heading-serif text-3xl text-center mb-10">How It Works</h3>
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
            <h2 className="heading-serif text-4xl mb-3">Shared Platform Team</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              세 사업부를 지원하는 공통 인프라 팀.
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
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Paperclip: Platform</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-light" /> Shared: 5</span>
              <span className="font-bold text-text-primary">= 16 Agents + 7 Products</span>
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
              { name: "Paperclip", desc: "AI Orchestration", url: "https://dist-chi-two-33.vercel.app" },
              { name: "Longevity Lab", desc: "Research Platform", url: "https://longevity-lab.io" },
              { name: "PaperMind", desc: "Med-Bio Insights", url: "https://www.papermind.me" },
              { name: "Brown Biotech", desc: "Drug Discovery", url: "https://brown-biotech-website.vercel.app" },
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
            Founded by MD/PhD Endocrinologist · Aging & Metabolism · 16 AI Agents · 7 Products
          </p>
        </div>
      </footer>

      {/* ── WAITLIST MODAL ── */}
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} plan={modalPlan} />
    </div>
  );
}
