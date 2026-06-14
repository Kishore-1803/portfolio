"use client";

import { useEffect, useRef, useLayoutEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import { FiSun, FiMoon, FiGithub, FiExternalLink } from "react-icons/fi";
import styles from "./styles/Home.module.css";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [openBook, setOpenBook] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  const [tappedAchieve, setTappedAchieve] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const heroOrbitRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const bookshelfRef = useRef<HTMLDivElement>(null);
  const wipeLineRef = useRef<HTMLDivElement>(null);
  const qrCardRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const nameRevealRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // --- Mouse tilt handler ---
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const book = e.currentTarget;
    const rect = book.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 10;
    book.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const resetTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
  }, []);

  // --- Toggle book open/close ---
  const openBookModal = useCallback((idx: number) => {
    setOpenBook(idx);
    setIsClosing(false);
  }, []);

  const closeBookModal = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      setOpenBook(null);
      setIsClosing(false);
    }, 600); // 600ms match cover flip animation duration
  }, []);

  // --- Smooth scroll with screen wipe line ---
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    const wipeLine = wipeLineRef.current;
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    const scrollingDown = offset > window.scrollY;

    // Wipe line animation: sweeps across viewport during scroll
    if (wipeLine) {
      const startY = scrollingDown ? '-2px' : 'calc(100vh + 2px)';
      const endY = scrollingDown ? 'calc(100vh + 2px)' : '-2px';

      gsap.set(wipeLine, { top: startY, opacity: 1, scaleX: 0 });
      gsap.timeline()
        .to(wipeLine, {
          scaleX: 1,
          duration: 0.15,
          ease: 'power2.out',
        })
        .to(wipeLine, {
          top: endY,
          duration: 1.0,
          ease: 'power3.inOut',
        }, 0.05)
        .to(wipeLine, {
          opacity: 0,
          scaleX: 0,
          duration: 0.3,
          ease: 'power2.in',
        }, '-=0.3');
    }

    // Smooth scroll
    gsap.to(window, {
      scrollTo: { y: offset, autoKill: false },
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, []);

  // --- PROJECT DATA with tech stacks ---
  // Shelf 1: AI / ML Projects
  const aiProjects = [
    {
      id: "01", title: "THALA",
      fullName: "Thala - Intelligent Incident Management",
      category: "GenAI System",
      desc: "Intelligent incident management system for automated detection, classification, and resolution tracking using LLM agents.",
      features: [
        "Intelligent semantic classification via LLM",
        "Smart incident prediction & resolution linking",
        "AWS Textract & S3 attachment processing",
        "Semantic search with vector embeddings"
      ],
      tech: ["AWS Bedrock", "Kafka", "Elasticsearch", "AWS Textract"],
      link: "https://github.com/Kishore-1803/Thala"
    },
    {
      id: "02", title: "CAUSAL ML",
      fullName: "Bridging Correlation and Causation",
      category: "Explainable ML",
      desc: "Combining causal inference with machine learning to move beyond prediction and uncover true causal drivers using DoWhy and SHAP.",
      features: [
        "Causal effect identification & estimation",
        "Causal-informed Gradient Boosting models",
        "SHAP-based explainability & attribution",
        "What-if analysis & scenario simulation"
      ],
      tech: ["Python", "DoWhy", "SHAP", "Scikit-learn"],
      link: "https://github.com/Kishore-1803/Bridging-Correlation-and-Causation-An-Explainable-ML-Approach"
    },
    {
      id: "03", title: "LOAN RISK",
      fullName: "Loan Default Risk Prediction",
      category: "FinTech AI",
      desc: "Production-ready loan default prediction system providing probabilistic predictions with uncertainty quantification for risk-aware lending decisions.",
      features: [
        "Bayesian Neural Networks via NumPyro",
        "Predictive uncertainty quantification",
        "Risk-based decision framework (Approve/Review)",
        "High-performance HMC inference"
      ],
      tech: ["JAX", "NumPyro", "Scikit-learn", "Pandas"],
      link: "https://github.com/Kishore-1803/Loan-Default-Risk-Prediction-Using-Bayesian-Neural-Network"
    },
    {
      id: "04", title: "YOLO XAI",
      fullName: "XAI-Driven Robustness Analysis of YOLO",
      category: "Vision Intelligence",
      desc: "Comprehensive explainable-AI (XAI) and robustness analysis pipeline built on Ultralytics YOLOv11 for object detection reliability.",
      features: [
        "XAI via Grad-CAM, Eigen-CAM & Saliency Maps",
        "Uncertainty bounding via Monte Carlo Dropout",
        "Real-world perturbation robustness testing",
        "Multi-resolution performance benchmarking"
      ],
      tech: ["YOLOv11", "PyTorch", "Grad-CAM", "OpenCV"],
      link: "https://github.com/Kishore-1803/XAI-Driven-Robustness-Analysis-of-YOLO"
    },
    {
      id: "05", title: "XENDRIX",
      fullName: "Xendrix AI Assistant",
      category: "Multimodal AI",
      desc: "Intelligent, multimodal AI assistant combining conversational chat, RAG, multilingual understanding, data visualization, and image generation.",
      features: [
        "Multimodal chat with persistent history",
        "Document RAG (PDF, DOCX, CSV) via FAISS",
        "Stable Diffusion v1.5 image generation",
        "Interactive data visualization & tools"
      ],
      tech: ["FastAPI", "React", "FAISS", "SentenceTransformers"],
      link: "https://github.com/Kishore-1803/XendrixAI"
    },
    {
      id: "06", title: "FINCAUSAL",
      fullName: "Financial Document Causality Detection",
      category: "NLP Research",
      desc: "Benchmarking Transformer architectures with neuro-symbolic guardrails to extract causal relationships from financial reports.",
      features: [
        "RoBERTa + DeBERTa model ensembling",
        "Neuro-Symbolic logic & guardrail layers",
        "Domain Adaptive Pre-Training (DAPT)",
        "Factoid vs. Causal semantic filtering"
      ],
      tech: ["HuggingFace", "PyTorch", "RoBERTa", "DeBERTa"],
      link: "https://github.com/Kishore-1803/Financial-Document-Causality-Detection"
    },
    {
      id: "07", title: "PERSPECTAI",
      fullName: "Perspect AI — AI-Powered Resume Analyzer",
      category: "AI / NLP",
      desc: "AI-driven platform leveraging NLP and RAG to analyze resumes, identify skill gaps, and generate job-specific recommendations.",
      features: [
        "Resume parsing & job description analysis",
        "RAG-based compatibility scoring via ChromaDB",
        "AI-powered improvement suggestions",
        "Keyword matching for ATS optimization"
      ],
      tech: ["React", "Flask", "Gemini API", "ChromaDB"],
      link: "https://github.com/Kishore-1803/PerspectAI"
    },
    {
      id: "14", title: "FRAUD GNN",
      fullName: "Temporal GNN for Financial Fraud Detection",
      category: "FinTech AI",
      desc: "Detecting fraudulent interactions in temporal trust networks using a GRU-based Temporal Graph Neural Network that models dynamic evolution of user behavior over time.",
      features: [
        "GRU-based node memory with continual state updates",
        "Temporal negative sampling & cost-sensitive BCE loss",
        "Zero-leakage historical feature engineering",
        "ROC-AUC 0.89 & PR-AUC 0.71 on Bitcoin OTC dataset"
      ],
      tech: ["PyTorch", "Pandas", "Scikit-learn", "Jupyter"],
      link: "https://github.com/Kishore-1803/Temporal-GNN-for-Financial-Fraud-Detection"
    },
    {
      id: "17", title: "CLOUD DEPLOY",
      fullName: "CloudDeploy-RL - OpenEnv Planner Environment",
      category: "RL Platform",
      desc: "OpenEnv-compliant reinforcement learning simulation environment for testing and evaluating autonomous cloud-agnostic deployment planner agents.",
      features: [
        "OpenEnv loop interface (reset, step, state MDP)",
        "Deterministic task grader scoring between 0.0 and 1.0",
        "Progressive trajectory reward shaping logic",
        "Multi-provider LLM benchmarking (Groq / HF / OpenAI)"
      ],
      tech: ["Python", "OpenEnv", "Docker", "Groq AI"],
      link: "https://github.com/Kishore-1803/CloudDeploy-RL"
    },
  ];

  // Shelf 2: Systems / Web / Tools
  const systemsProjects = [
    {
      id: "08", title: "SYNGENX",
      fullName: "SyngenX - Developer Analytics",
      category: "Dev Analytics",
      desc: "AI-powered developer analytics platform that aggregates GitHub activity to generate comprehensive individual and team performance reports.",
      features: [
        "Secure GitHub OAuth Integration",
        "Comprehensive GitHub Data Aggregation",
        "AI-Generated Performance Insights via Gemini",
        "Developer productivity & behavioral analytics"
      ],
      tech: ["Next.js", "FastAPI", "Supabase", "Gemini API"],
      link: "https://github.com/Kishore-1803/SyngenX"
    },
    {
      id: "09", title: "AUDIOAURA",
      fullName: "AudioAura - AI Podcast Generator",
      category: "Voice AI",
      desc: "Dynamic web application that automatically generates high-quality, AI-powered podcast episodes using real-time news and weather data.",
      features: [
        "News & weather driven podcast generation",
        "Context-aware AI script creation",
        "OpenAI / gTTS Text-to-Speech conversion",
        "Audio playback & downloads via REST API"
      ],
      tech: ["React.js", "FastAPI", "OpenAI TTS", "Vercel"],
      link: "https://github.com/Kishore-1803/AudioAura-Frontend"
    },
    {
      id: "10", title: "VIGILANCE",
      fullName: "VigilanceStream - Security Monitoring",
      category: "Security AI",
      desc: "Autonomous real-time security monitoring engine leveraging Groq Compound AI and Kafka to detect threats and block malicious actors instantly.",
      features: [
        "Apache Kafka real-time event streaming",
        "Semantic intent analysis via Groq Cloud AI",
        "Automated response & IP blocking system",
        "Live Subscriptions dashboard & triple-channel alerts"
      ],
      tech: ["Groq AI", "Kafka", "Next.js", "Supabase"],
      link: "https://github.com/Kishore-1803/VigilanceStream"
    },
    {
      id: "11", title: "NEXUS",
      fullName: "Nexus Sentinel - AI Governance",
      category: "AI Governance",
      desc: "Enterprise AI governance platform that monitors operational intent across collaboration tools to detect compliance risks in real time.",
      features: [
        "Intent-Aware Risk Classification via Groq",
        "Multi-Tenant Policy Isolation with Pinecone",
        "RAG-based Contractual Clause Evaluation",
        "AMD ROCm GPU-accelerated embeddings"
      ],
      tech: ["FastAPI", "Pinecone", "Groq AI", "AMD ROCm"],
      link: "https://github.com/Kishore-1803/Nexus-sentinel"
    },
    {
      id: "12", title: "CODE STUDIO",
      fullName: "Agentic Code Studio",
      category: "Agentic AI",
      desc: "Advanced autonomous software engineering platform leveraging multi-agent collaboration to detect bugs, optimize performance, and audit security vulnerabilities.",
      features: [
        "Actor-Critic architecture using LangGraph",
        "Multi-agent Developer, Critic, and Tester loop",
        "Automated unit testing & verification",
        "Security auditing & performance optimization"
      ],
      tech: ["LangGraph", "Next.js", "FastAPI", "Gemini API"],
      link: "https://github.com/Kishore-1803/AI-bug-detector-and-optimizer"
    },
    {
      id: "13", title: "HIRELYTICS",
      fullName: "Hirelytics - SHL Assessment Recommender",
      category: "HR Tech AI",
      desc: "AI-driven recommendation system that intelligently suggests SHL assessments using semantic embeddings and Gemini reranking.",
      features: [
        "Context-Aware Recommendations (Text/URL)",
        "Hybrid Ranking (70% semantic + 30% keyword)",
        "LLM-Based Reranking via Gemini 2.5 Flash",
        "FastAPI Backend with Minimal HTML/JS UI"
      ],
      tech: ["FastAPI", "Sentence-BERT", "Supabase", "Gemini 2.5"],
      link: "https://github.com/Kishore-1803/hirelytics"
    },
    {
      id: "15", title: "ANOMYST",
      fullName: "Anomyst - Monitoring Data Pipeline Health",
      category: "Data Ops",
      desc: "Modern data pipeline health monitoring platform designed to catch silent failures using statistical profiling (Z-score & KS-tests) and Groq LLM narration.",
      features: [
        "Statistical Drift Detection via Z-score & KS-tests",
        "Dynamic baseline profiling over trailing runs",
        "AI-augmented root-cause alerts via Groq Llama 3.3",
        "Simulation framework for CSV anomaly injection"
      ],
      tech: ["FastAPI", "Next.js", "PostgreSQL", "Groq AI"],
      link: "https://github.com/Kishore-1803/Anomyst"
    },
    {
      id: "16", title: "SAKHI LEDGER",
      fullName: "Sakhi's Ledger - Gamified Financial Literacy",
      category: "FinTech App",
      desc: "Gamified, offline-first financial literacy mobile app built for women in Self-Help Groups across India with multilingual TTS support.",
      features: [
        "Gamified XP, levels, community leaderboards",
        "AI-generated fraud simulations (SMS/Call Scam Arena)",
        "Visual envelope-jar budgeting system",
        "Offline-first sync via Redux Persist & AsyncStorage"
      ],
      tech: ["React Native", "Expo", "Redux Toolkit", "TypeScript"],
      link: "https://github.com/Kishore-1803/Sakhis-Ledger"
    },
  ];

  // Custom ranking logic to surface the most complex/impressive projects first on mobile
  const mobileRank = ["01", "12", "17", "14", "05", "16", "15", "11", "10", "06", "02", "04", "03", "13", "08", "09", "07"];
  const allProjects = [...aiProjects, ...systemsProjects].sort((a, b) => mobileRank.indexOf(a.id) - mobileRank.indexOf(b.id));

  // Vibrant gradient pairs for mobile carousel cards
  const mobileCardGradients = [
    ['#0f2027', '#2c5364'],  // Deep Teal
    ['#1a1a2e', '#16213e'],  // Midnight Blue
    ['#0d1117', '#1b3a4b'],  // Ocean Depth
    ['#1c1c3d', '#3a1c71'],  // Purple Night
    ['#1a0a2e', '#2d1b69'],  // Violet Abyss
    ['#0b0f19', '#1e3a5f'],  // Navy Steel
    ['#111827', '#1f4037'],  // Forest Dark
    ['#0f0c29', '#302b63'],  // Indigo Haze
    ['#141e30', '#243b55'],  // Slate Storm
    ['#1b1b2f', '#162447'],  // Cosmic Ink
    ['#0a0e27', '#1a237e'],  // Deep Sapphire
    ['#100e17', '#2d132c'],  // Dark Plum
    ['#0b0c10', '#1b2838'],  // Charcoal Blue
    ['#161625', '#1d2b3a'],  // Dark Graphite
    ['#140d24', '#2c1654'],  // Cyber Violet / Anomyst Alert
    ['#1e0a16', '#3d162a'],  // Warm Rosewood / Sakhi's Ledger
    ['#071510', '#103020'],  // Emerald Obsidian / CloudDeploy-RL
  ];

  const mobileCardAccents = [
    '#00f3ff', '#60a5fa', '#34d399', '#a78bfa',
    '#f472b6', '#38bdf8', '#4ade80', '#818cf8',
    '#fb923c', '#22d3ee', '#6366f1', '#ec4899',
    '#2dd4bf', '#facc15', '#ff5757', '#ff7ebb', '#00ff88',
  ];

  const bookColors = theme === "light"
    ? [
      "#627D98", "#7B8F9E", "#9FB3C8", "#8C9DAD", "#546E7A",
      "#6C8EBF", "#7A9A95", "#A08B7E", "#84A1C4", "#8D7B6C",
      "#6D8B74", "#957B8D", "#7E97A6", "#A5957D", "#8B7E9A",
      "#93A8B5", "#8C7D68", "#7A8F8B", "#6B7F94", "#A09080"
    ]
    : [
      "#2C3E50", "#1B3A4B", "#3D5A80", "#4A5568", "#2D3748",
      "#1E3A5F", "#4A6670", "#44546A", "#2F4858", "#5C6B73",
      "#2E4057", "#37474F", "#3C4F65", "#2D4059", "#354F52",
      "#4A7C8F", "#3A506B", "#3E3B5C", "#2D3A4A", "#4B5D6E"
    ];

  const skillsData = [
    { category: "Languages", items: ["Python", "C++", "JavaScript"] },
    { category: "AI & ML", items: ["PyTorch", "TensorFlow", "HuggingFace Transformers", "RAG", "LLM Fine-tuning", "NLP", "Computer Vision", "Pandas", "NumPy"] },
    { category: "Backend & Web", items: ["FastAPI", "Flask", "Express.js", "Next.js", "React"] },
    { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Pinecone", "Supabase"] },
    { category: "Infrastructure", items: ["Apache Kafka", "Docker", "AWS", "Azure", "CI/CD", "Git"] }
  ];

 const experience = [
  {
    year: "2026",
    role: "Software Engineer Intern",
    company: "MuxGrow",
    desc: [
      "Rebuilt transactional email system with Amazon SES, Handlebars templates, event-driven delivery, payload validation, retry handling, and idempotency guards.",
      "Built a chat-first AI playground with agent layer, DB-persisted session history, slash-command skill creation, per-response attribution, and telemetry.",
      "Extended DM automation pipeline with plan-aware watermark injection, idempotency, overflow handling, and structured telemetry for Free plan enforcement.",
      "Shipped workspace email campaign module with SES v2, sender identity management, template versioning, send_email automation action, and analytics pipeline.",
      "Fixed billing, account lifecycle, and inbox bugs — including async webhook unsubscription on deletion, WebSocket inbox sync, chat pagination, and AI autocomplete."
    ]
  },
  {
    year: "2025",
    role: "Software Developer Intern",
    company: "TechZeeb",
    desc: [
      "Built 'Kovai Natural Farmers' platform bridging organic farmers to customers.",
      "Optimized backend APIs reducing data response time by 40%.",
      "Designed responsive UI enhancing cross-device usability."
    ]
  }
];

  const achievements = [
    { year: "2026", name: "INNOVATEFINLIT", desc: "Finalist", accent: "#facc15" },
    { year: "2025", name: "SUPERHACK", desc: "Runner Up", accent: "#60a5fa" },
    { year: "2025", name: "BUILD WITH INDIA", desc: "Top 20%", accent: "#34d399" },
    { year: "2024", name: "PROVIDENCE LEAP", desc: "Semifinalist", accent: "#a78bfa" }
  ];

  // THEME EFFECT
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      // --- Preloader: QR Business Card Intro ---
      const qrCard = qrCardRef.current;
      const qrCode = qrCodeRef.current;
      const scanLine = scanLineRef.current;
      const nameReveal = nameRevealRef.current;
      const qrModules = gsap.utils.toArray(`.${styles.qrModule}`);
      const nameLetters = gsap.utils.toArray(`.${styles.nameLetter}`);

      // Initial states
      gsap.set(qrCard, { opacity: 0, scale: 0.7, rotateX: 15, rotateY: -5 });
      gsap.set(scanLine, { top: '0%', opacity: 0 });
      gsap.set(qrCode, { xPercent: -50, yPercent: -50, transformPerspective: 1200 });
      gsap.set(nameReveal, { opacity: 0 });
      gsap.set(nameLetters, { opacity: 0, y: 30, scale: 0.5 });
      gsap.set(qrModules, { opacity: 0 });

      const tl = gsap.timeline();

      // Step 1: Card materializes — slides in with premium 3D rotation
      tl.to(qrCard, {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.out",
      }, 0.5)

      // Step 2: QR code modules populate in a wave pattern
      .to(qrModules, {
        opacity: 1,
        duration: 0.03,
        stagger: {
          each: 0.008,
          from: "center",
          grid: "auto",
        },
        ease: "none",
      }, "-=0.4")

      // Step 3: Scan line sweeps down the QR code
      .to(scanLine, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }, "-=0.1")
      .to(scanLine, {
        top: '100%',
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(scanLine, {
        top: '0%',
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(scanLine, {
        opacity: 0,
        duration: 0.3,
      })

      // Step 4: Card edges glow on "scan complete"
      .to(qrCard, {
        boxShadow: '0 0 40px rgba(0, 243, 255, 0.5), 0 0 80px rgba(0, 243, 255, 0.2), inset 0 0 30px rgba(0, 243, 255, 0.05)',
        borderColor: 'rgba(0, 243, 255, 0.6)',
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.2")

      // Step 4b: QR wrapper also glows to match
      .to(qrCode, {
        boxShadow: '0 0 30px rgba(0, 243, 255, 0.4), 0 0 60px rgba(0, 243, 255, 0.15)',
        borderColor: 'rgba(0, 243, 255, 0.5)',
        duration: 0.5,
        ease: "power2.out",
      }, "<")

      // Step 5: Brief pause — scan is complete
      .to({}, { duration: 0.4 })

      // Step 6a: Card fades out behind
      .to(qrCard, {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: "power2.in",
      })

      // Step 6b: QR code ALONE jumps forward in 3D and zooms in
      .to(qrCode, {
        scale: 15,
        z: 800,
        rotateX: -5,
        opacity: 0,
        duration: 1.8,
        ease: "power2.in",
      }, "-=0.6")

      // Step 7: Name reveal — show the name container
      .to(nameReveal, {
        opacity: 1,
        duration: 0.01,
      }, "-=0.6")

      // Step 8: Letters appear from center outward
      .to(nameLetters, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: {
          each: 0.06,
          from: "center",
        },
        ease: "back.out(1.7)",
      }, "-=0.5")

      // Step 9: Name glows with portfolio accent
      .to(nameReveal, {
        textShadow: '0 0 30px rgba(0, 243, 255, 0.6), 0 0 60px rgba(0, 243, 255, 0.3)',
        duration: 0.6,
        ease: "power2.out",
      })

      // Step 10: Hold the name visible
      .to({}, { duration: 0.5 })

      // Step 11: Name scales up and fades — we "enter" the portfolio
      .to(nameReveal, {
        scale: 3,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 1,
        ease: "power3.in",
      })

      // Step 12: Hide preloader overlay
      .set(preloaderRef.current, { display: "none" })

      // ── Step 10: Grand Hero Entrance ──
      // Nav slides down
      .from(`.${styles.navContainer}`, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5")

      // "I'M KISHORE BALAJI" intro text rises up
      .from(`.${styles.heroIntro}`, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")

      // "HELLO WORLD." wrapper — dramatic scale + blur entrance
      // (Targets the WRAPPER, not the h1, to avoid conflict with the scroll trigger on h1)
      .from(`.${styles.heroTextWrapper}`, {
        scale: 0.3,
        opacity: 0,
        y: 60,
        filter: 'blur(20px)',
        duration: 1.4,
        ease: "expo.out",
        clearProps: "filter",
      }, "-=0.5")

      // Corner marks expand outward from center
      .from(`.${styles.cornerMark}`, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: 0.08,
      }, "-=1.0")

      // Orbit ring spins in
      .from(heroOrbitRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -180,
        duration: 1.4,
        ease: "power3.out",
      }, "-=1.2")

      // Scroll indicator bounces in
      .from(`.${styles.scrollIndicator}`, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.6");

      // ── Scroll-based parallax on HELLO WORLD (retained) ──
      gsap.to(heroTextRef.current, {
        scrollTrigger: { trigger: document.body, start: "top top", end: "100vh top", scrub: 1 },
        y: -150, opacity: 0, scale: 1.1
      });

      gsap.utils.toArray(`.${styles.revealText}`).forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 60%", scrub: true },
          opacity: 0.1, y: 20
        });
      });

      gsap.from(`.${styles.bioText}`, {
        scrollTrigger: { trigger: `.${styles.bioText}`, start: "top 85%" },
        y: 40, opacity: 0, duration: 1, ease: "power3.out"
      });

      gsap.utils.toArray(`.${styles.statItem}`).forEach((el: any, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: `.${styles.statsGrid}`, start: "top 85%" },
          y: 40, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "back.out(1.7)"
        });
      });

      gsap.utils.toArray(`.${styles.skillCategory}`).forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
      });

      gsap.utils.toArray(`.${styles.expItem}`).forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          x: -50, opacity: 0, duration: 1, ease: "power3.out"
        });
      });

      // Books stagger in
      gsap.utils.toArray(`.${styles.bookContainer}`).forEach((el: any, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el.closest(`.${styles.shelf}`), start: "top 85%" },
          y: 60, opacity: 0, duration: 0.7, delay: (i % 7) * 0.08, ease: "back.out(1.2)"
        });
      });

      gsap.utils.toArray(`.${styles.shelf}`).forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          opacity: 0, y: 40, duration: 1, ease: "power3.out"
        });
      });

    }, containerRef);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
    };
    window.addEventListener("mousemove", moveCursor);

    const onHover = () => document.body.classList.add("hovering");
    const onLeave = () => document.body.classList.remove("hovering");
    const links = document.querySelectorAll("a, button, .projectLink");
    links.forEach(link => {
      link.addEventListener("mouseenter", onHover);
      link.addEventListener("mouseleave", onLeave);
    });

    return () => {
      lenis.destroy();
      ctx.revert();
      window.removeEventListener("mousemove", moveCursor);
      links.forEach(link => {
        link.removeEventListener("mouseenter", onHover);
        link.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Render a single book on the shelf
  const renderBook = (proj: typeof aiProjects[0], globalIdx: number) => {
    return (
      <div
        key={globalIdx}
        className={styles.bookContainer}
        style={{ '--book-color': bookColors[globalIdx % bookColors.length] } as React.CSSProperties}
      >
        {/* The 3D shelf book */}
        <div
          className={styles.book}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          onClick={() => openBookModal(globalIdx)}
          role="button"
          tabIndex={0}
          aria-label={`Open ${proj.title}`}
        >
          {/* Tooltip on hover */}
          <div className={styles.bookTooltip}>
            <div className={styles.tooltipTitle}>{proj.title}</div>
            <div className={styles.tooltipDesc}>{proj.category}</div>
            <div className={styles.tooltipTech}>
              {proj.tech.slice(0, 3).map((t, ti) => (
                <span key={ti} className={styles.tooltipTechItem}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.bookSpine}>
            <span className={styles.bookSpineTitle}>{proj.title}</span>
            <span className={styles.bookSpineCategory}>{proj.category}</span>
          </div>
          <div className={styles.bookFront}></div>
        </div>
      </div>
    );
  };

  // Render shelf
  const renderShelf = (projects: typeof aiProjects, label: string, startIndex: number) => (
    <div className={styles.shelf}>
      <div className={styles.shelfLabel}>{label}</div>
      <div className={styles.shelfBooks}>
        {projects.map((proj, i) => renderBook(proj, startIndex + i))}
      </div>
      <div className={styles.shelfBoard}></div>
    </div>
  );

  // Active project for modal
  const activeProject = openBook !== null ? allProjects[openBook] : null;

  return (
    <div ref={containerRef} className={styles.main}>
      {/* Preloader — QR Business Card Intro */}
      <div ref={preloaderRef} className={styles.preloader}>
        {/* The Business Card (text + border only, no QR inside) */}
        <div ref={qrCardRef} className={styles.qrCard}>
          {/* Card top: Name */}
          <div className={styles.qrCardName}>KISHORE BALAJI</div>

          {/* Spacer where QR sits visually */}
          <div className={styles.qrPlaceholder}></div>

          {/* Card bottom tagline */}
          <div className={styles.qrCardTagline}>PORTFOLIO</div>
        </div>

        {/* QR Code — positioned as sibling, overlapping the card center */}
        <div ref={qrCodeRef} className={styles.qrCodeWrapper}>
          {/* Scan line overlay */}
          <div ref={scanLineRef} className={styles.qrScanLine}></div>

          {/* QR code pattern — rendered as a CSS grid of small modules */}
          <div className={styles.qrGrid}>
            {(() => {
              // Generate a realistic-looking QR code pattern
              const size = 25;
              const grid: boolean[][] = Array.from({ length: size }, () =>
                Array.from({ length: size }, () => false)
              );

              // Helper to fill a finder pattern at (r,c)
              const fillFinder = (r: number, c: number) => {
                for (let i = 0; i < 7; i++) {
                  for (let j = 0; j < 7; j++) {
                    if (i === 0 || i === 6 || j === 0 || j === 6) grid[r + i][c + j] = true;
                    else if (i >= 2 && i <= 4 && j >= 2 && j <= 4) grid[r + i][c + j] = true;
                    else grid[r + i][c + j] = false;
                  }
                }
              };

              fillFinder(0, 0);       // Top-left
              fillFinder(0, size - 7); // Top-right
              fillFinder(size - 7, 0); // Bottom-left

              // Timing patterns
              for (let i = 8; i < size - 8; i++) {
                grid[6][i] = i % 2 === 0;
                grid[i][6] = i % 2 === 0;
              }

              // Fill random data modules (avoiding finder areas)
              const isFinderArea = (r: number, c: number) =>
                (r < 9 && c < 9) || (r < 9 && c >= size - 8) || (r >= size - 8 && c < 9);

              // Seed-based pseudo-random for deterministic pattern
              let seed = 42;
              const rand = () => { seed = (seed * 16807 + 0) % 2147483647; return seed / 2147483647; };

              for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                  if (!isFinderArea(r, c) && !(r === 6 || c === 6)) {
                    grid[r][c] = rand() > 0.5;
                  }
                }
              }

              // Alignment pattern at (size-9, size-9)
              const ar = size - 9; const ac = size - 9;
              for (let i = -2; i <= 2; i++) {
                for (let j = -2; j <= 2; j++) {
                  const rr = ar + i; const cc = ac + j;
                  if (rr >= 0 && rr < size && cc >= 0 && cc < size) {
                    if (Math.abs(i) === 2 || Math.abs(j) === 2 || (i === 0 && j === 0)) grid[rr][cc] = true;
                    else grid[rr][cc] = false;
                  }
                }
              }

              return grid.flatMap((row, ri) =>
                row.map((filled, ci) => (
                  <div
                    key={`${ri}-${ci}`}
                    className={`${styles.qrModule} ${filled ? styles.qrModuleFilled : ''}`}
                  />
                ))
              );
            })()}
          </div>
        </div>

        {/* Name reveal — appears after QR zoom */}
        <div ref={nameRevealRef} className={styles.nameRevealContainer}>
          {'KISHORE BALAJI'.split('').map((letter, i) => (
            <span
              key={i}
              className={styles.nameLetter}
              style={letter === ' ' ? { width: '0.3em' } : {}}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.bgGlow}></div>
      <div className={styles.bgGrain}></div>
      <div ref={wipeLineRef} className={styles.navWipeLine}></div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>

      <nav className={styles.navContainer}>
        <div className={styles.navLogo}>
          <h2 className={styles.headerName}>KISHORE</h2>
          <span className={styles.headerRole}>STUDENT</span>
        </div>

        {/* Desktop nav links */}
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink} onClick={(e) => { e.preventDefault(); gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 1.2, ease: 'power3.inOut' }); const wl = wipeLineRef.current; if (wl) { gsap.set(wl, { top: 'calc(100vh + 2px)', opacity: 1, scaleX: 0 }); gsap.timeline().to(wl, { scaleX: 1, duration: 0.15, ease: 'power2.out' }).to(wl, { top: '-2px', duration: 1.0, ease: 'power3.inOut' }, 0.05).to(wl, { opacity: 0, scaleX: 0, duration: 0.3, ease: 'power2.in' }, '-=0.3'); } }}>Home</a>
          <a href="#about" className={styles.navLink} onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#skills" className={styles.navLink} onClick={(e) => handleNavClick(e, 'skills')}>Stack</a>
          <a href="#experience" className={styles.navLink} onClick={(e) => handleNavClick(e, 'experience')}>Exp</a>
          <a href="#work" className={styles.navLink} onClick={(e) => handleNavClick(e, 'work')}>Work</a>
          <a href="#contact" className={styles.navLink} onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="/Resume.pdf" target="_blank" className={styles.navLink}>Resume</a>
          <div className={styles.themeToggle} onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}>
            <div className={styles.toggleKnob} style={{ transform: `translateX(${theme === 'dark' ? 0 : 30}px)` }}>
              {theme === "dark" ? <FiMoon className={styles.toggleIcon} /> : <FiSun className={styles.toggleIcon} />}
            </div>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <div className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.mobileOverlayOpen : ''}`}>
        <div className={styles.overlayContent}>
          {['Home', 'About', 'Stack', 'Exp', 'Work', 'Contact', 'Resume'].map((item, i) => {
            const isHome = item === 'Home';
            const href = item === 'Resume' ? '/Resume.pdf' : isHome ? '#' : `#${item === 'Stack' ? 'skills' : item === 'Exp' ? 'experience' : item.toLowerCase()}`;
            const isExternal = item === 'Resume';
            return (
              <a
                key={item}
                href={href}
                target={isExternal ? '_blank' : undefined}
                className={styles.overlayLink}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (isHome) {
                    e.preventDefault();
                    gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 1.2, ease: 'power3.inOut' });
                  } else if (!isExternal) {
                    const targetId = item === 'Stack' ? 'skills' : item === 'Exp' ? 'experience' : item.toLowerCase();
                    handleNavClick(e as any, targetId);
                  }
                }}
              >
                <span className={styles.overlayLinkIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.overlayLinkText}>{item}</span>
              </a>
            );
          })}
          <div className={styles.overlayTheme}>
            <div className={styles.themeToggle} onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}>
              <div className={styles.toggleKnob} style={{ transform: `translateX(${theme === 'dark' ? 0 : 30}px)` }}>
                {theme === "dark" ? <FiMoon className={styles.toggleIcon} /> : <FiSun className={styles.toggleIcon} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.heroIntro}>I'M KISHORE BALAJI</p>
          <div className={styles.heroTextWrapper}>
            {/* Orbit ring behind the text */}
            <div ref={heroOrbitRef} className={styles.heroOrbit}>
              <div className={styles.orbitDot} style={{ '--orbit-angle': '0deg' } as React.CSSProperties}></div>
              <div className={styles.orbitDot} style={{ '--orbit-angle': '90deg' } as React.CSSProperties}></div>
              <div className={styles.orbitDot} style={{ '--orbit-angle': '180deg' } as React.CSSProperties}></div>
              <div className={styles.orbitDot} style={{ '--orbit-angle': '270deg' } as React.CSSProperties}></div>
            </div>
            {/* Decorative corner marks */}
            <div className={`${styles.cornerMark} ${styles.cornerTL}`}></div>
            <div className={`${styles.cornerMark} ${styles.cornerTR}`}></div>
            <div className={`${styles.cornerMark} ${styles.cornerBL}`}></div>
            <div className={`${styles.cornerMark} ${styles.cornerBR}`}></div>
            <h1 ref={heroTextRef} className={styles.hugeText}>
              HELLO<br />WORLD.
            </h1>
          </div>
          <div className={styles.scrollIndicator}>SCROLL TO EXPLORE</div>
        </div>
      </header>

      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutLeft}>
          <div className={styles.bigStatement}>
            <p className={styles.revealText}>I BUILD SYSTEMS THAT THINK.</p>
            <p className={styles.revealText}>TURNING BLANK EDITORS INTO</p>
            <p className={styles.revealText}>INTELLIGENT ECOSYSTEMS.</p>
          </div>
          <p className={styles.bioText}>
            I am a B.Tech AI student at Amrita Vishwa Vidyapeetham, architecting the future of synthetic intelligence.
            Specializing in Generative AI, Computer Vision, and high-performance Web Systems, I bridge the gap between
            raw correlation and true causation.
          </p>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}><span className={styles.statNum}>4th</span><span className={styles.statLabel}>Year Student</span></div>
          <div className={styles.statItem}><span className={styles.statNum}>15+</span><span className={styles.statLabel}>Projects</span></div>
          <div className={styles.statItem}><span className={styles.statNum}>2</span><span className={styles.statLabel}>Internships</span></div>
          <div className={styles.statItem}><span className={styles.statNum}>8.26</span><span className={styles.statLabel}>CGPA</span></div>
        </div>
      </section>

      <section id="skills" className={styles.skillsSection}>
        <div className={styles.sectionHeader}><span>TECHNICAL SKILLS</span></div>
        {skillsData.map((cat, i) => (
          <div key={i} className={styles.skillCategory}>
            <h3 className={styles.skillCatTitle}>{cat.category}</h3>
            <div className={styles.skillList}>
              {cat.items.map((skill, j) => (
                <span key={j} className={styles.skillItem}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="experience" className={styles.experienceSection}>
        <div className={styles.sectionHeader}><span>CAREER HISTORY</span></div>
        <div>
          {experience.map((exp, i) => (
            <div key={i} className={styles.expItem}>
              <div className={styles.expDate}>{exp.year}</div>
              <div className={styles.expContent}>
                <h3 className={styles.expRole}>{exp.role}</h3>
                <span className={styles.expCompany}>{exp.company}</span>
                <ul className={styles.expDesc}>
                  {exp.desc.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className={styles.bookshelfSection} ref={bookshelfRef}>
        <div className={styles.sectionHeader}>
          <span>PROJECTS</span>
          <span>(2023 — Present)</span>
        </div>

        <div className={styles.desktopProjects}>
          <div className={styles.exploreHint}>
            <span>Click any book to explore</span>
            <span className={styles.exploreArrow}>→</span>
          </div>

          <div className={styles.bookshelfWrapper}>
            {renderShelf(aiProjects, "AI / ML PROJECTS", 0)}
            {renderShelf(systemsProjects, "SYSTEMS / WEB / TOOLS", aiProjects.length)}
          </div>
        </div>

        <div className={styles.mobileProjects}>
          {/* Swipe hint */}
          <div className={styles.carouselHint}>
            <span>← SWIPE TO EXPLORE →</span>
          </div>

          {/* 3D Stacked Card Carousel */}
          <div
            className={styles.carouselViewport}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              touchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              const dy = e.changedTouches[0].clientY - touchStartY.current;
              if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
                if (dx < 0 && mobileCardIndex < allProjects.length - 1) {
                  setSwipeDir('left');
                  setTimeout(() => { setMobileCardIndex(prev => prev + 1); setSwipeDir(null); }, 50);
                } else if (dx > 0 && mobileCardIndex > 0) {
                  setSwipeDir('right');
                  setTimeout(() => { setMobileCardIndex(prev => prev - 1); setSwipeDir(null); }, 50);
                }
              }
            }}
          >
            <div className={styles.carouselStack}>
              {allProjects.map((proj, idx) => {
                const offset = idx - mobileCardIndex;
                if (offset < -1 || offset > 3) return null;
                const isActive = offset === 0;
                const gradient = mobileCardGradients[idx % mobileCardGradients.length];
                const accent = mobileCardAccents[idx % mobileCardAccents.length];
                return (
                  <div
                    key={idx}
                    className={`${styles.carouselCard} ${isActive ? styles.carouselCardActive : ''} ${offset < 0 ? styles.carouselCardExiting : ''}`}
                    style={{
                      '--card-offset': offset,
                      '--card-accent': accent,
                      zIndex: allProjects.length - offset,
                      background: `linear-gradient(145deg, ${gradient[0]}, ${gradient[1]})`,
                      transform: offset < 0
                        ? `translateX(-120%) scale(0.9) rotateY(10deg)`
                        : `translateY(${offset * 14}px) scale(${1 - offset * 0.06})`,
                      opacity: offset < 0 ? 0 : offset > 2 ? 0 : 1 - offset * 0.2,
                      pointerEvents: isActive ? 'auto' : 'none',
                      filter: isActive ? 'none' : `brightness(${1 - offset * 0.15})`,
                    } as React.CSSProperties}
                  >
                    {/* Gradient accent bar */}
                    <div className={styles.cardAccentBar} style={{ background: `linear-gradient(90deg, ${accent}, ${accent}44)` }} />

                    <div className={styles.cardInner}>
                      <div className={styles.cardTopRow}>
                        <span className={styles.cardNumber} style={{ color: accent }}>{String(idx + 1).padStart(2, '0')}</span>
                        <span className={styles.cardCategoryBadge} style={{ borderColor: `${accent}44`, color: accent }}>{proj.category}</span>
                      </div>

                      <h3 className={styles.cardTitle}>{proj.fullName}</h3>
                      <p className={styles.cardDesc}>{proj.desc}</p>

                      <div className={styles.cardFeatures}>
                        {proj.features.slice(0, 3).map((feat, fi) => (
                          <div key={fi} className={styles.cardFeatureItem}>
                            <span className={styles.featureArrow} style={{ color: accent }}>→</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.cardTechRow}>
                        {proj.tech.map((t, ti) => (
                          <span key={ti} className={styles.cardTechPill} style={{ borderColor: `${accent}33` }}>{t}</span>
                        ))}
                      </div>

                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardGithubBtn}
                        style={{ background: accent, color: '#000' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub /> VIEW ON GITHUB <FiExternalLink />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Counter & dots */}
          <div className={styles.carouselNav}>
            <button
              className={styles.carouselNavBtn}
              onClick={() => { if (mobileCardIndex > 0) { setSwipeDir('right'); setTimeout(() => { setMobileCardIndex(prev => prev - 1); setSwipeDir(null); }, 50); } }}
              disabled={mobileCardIndex === 0}
              aria-label="Previous"
            >
              ←
            </button>
            <div className={styles.carouselCounter}>
              <span className={styles.counterCurrent}>{String(mobileCardIndex + 1).padStart(2, '0')}</span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>{String(allProjects.length).padStart(2, '0')}</span>
            </div>
            <button
              className={styles.carouselNavBtn}
              onClick={() => { if (mobileCardIndex < allProjects.length - 1) { setSwipeDir('left'); setTimeout(() => { setMobileCardIndex(prev => prev + 1); setSwipeDir(null); }, 50); } }}
              disabled={mobileCardIndex === allProjects.length - 1}
              aria-label="Next"
            >
              →
            </button>
          </div>

          {/* Progress bar */}
          <div className={styles.carouselProgress}>
            <div
              className={styles.carouselProgressFill}
              style={{ width: `${((mobileCardIndex + 1) / allProjects.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className={styles.awardsSection}>
        <div className={styles.sectionHeader} style={{ paddingLeft: '5vw' }}><span>HACKATHONS</span></div>
        
        {/* Desktop: Marquee with animated border cards */}
        <div className={styles.desktopAwards}>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {[1, 2, 3, 4].map((group) => (
                <div key={group} className={styles.awardGroup}>
                  {achievements.map((award, i) => (
                    <div key={i} className={styles.achieveCard} style={{ '--achieve-accent': award.accent } as React.CSSProperties}>
                      <div className={styles.achieveBorderGlow} />
                      <div className={styles.achieveShimmer} />
                      <div className={styles.achieveInner} data-year={award.year}>
                        <div className={styles.achieveLeft}>
                          <div className={styles.achieveUnlocked}>ACHIEVEMENT UNLOCKED</div>
                          <h3 className={styles.achieveName}>{award.name}</h3>
                          <div className={styles.achieveMeta}>
                            <span className={styles.achieveYear}>{award.year}</span>
                            <span className={styles.achieveDot}>•</span>
                            <span className={styles.achieveResult} style={{ color: award.accent }}>{award.desc}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Achievement Unlocked Cards */}
        <div className={styles.mobileAwards}>
          <div className={styles.achieveGrid}>
            {achievements.map((award, i) => (
              <div
                key={i}
                className={`${styles.achieveCard} ${tappedAchieve === i ? styles.achieveTapped : ''}`}
                style={{ '--achieve-accent': award.accent, animationDelay: `${i * 0.15}s` } as React.CSSProperties}
                onClick={() => {
                  setTappedAchieve(i);
                  setTimeout(() => setTappedAchieve(null), 600);
                }}
              >
                <div className={styles.achieveBorderGlow} />
                <div className={styles.achieveShimmer} />
                <div className={styles.achieveInner} data-year={award.year}>
                  <div className={styles.achieveLeft}>
                    <div className={styles.achieveUnlocked}>ACHIEVEMENT UNLOCKED</div>
                    <h4 className={styles.achieveName}>{award.name}</h4>
                    <div className={styles.achieveMeta}>
                      <span className={styles.achieveYear}>{award.year}</span>
                      <span className={styles.achieveDot}>•</span>
                      <span className={styles.achieveResult} style={{ color: award.accent }}>{award.desc}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className={styles.contactSection}>
        <h2 className={styles.contactTitle}>GET IN TOUCH</h2>
        <p className={styles.bioText} style={{ margin: '0', textAlign: 'center' }}>
          Have an idea? I'm always open to exciting opportunities or just a friendly chat.
        </p>
        <form action="https://formspree.io/f/xgvzpbpz" method="POST" className={styles.contactForm}>
          <input type="text" name="name" placeholder="YOUR NAME" className={styles.formInput} required />
          <input type="email" name="email" placeholder="YOUR EMAIL" className={styles.formInput} required />
          <textarea name="message" rows={4} placeholder="TELL ME ABOUT YOUR PROJECT" className={styles.formText} required></textarea>
          <button type="submit" className={styles.submitBtn}>SEND MESSAGE</button>
        </form>
        <div className={styles.socialRow}>
          <a href="https://github.com/Kishore-1803" target="_blank" className={styles.socialBtn}>GITHUB</a>
          <a href="https://www.linkedin.com/in/kishore-balaji-081168292/" target="_blank" className={styles.socialBtn}>LINKEDIN</a>
          <a href="https://leetcode.com/u/kishore_balaji_03/" target="_blank" className={styles.socialBtn}>LEETCODE</a>
          <a href="mailto:contact@kishore.dev" className={styles.socialBtn}>EMAIL</a>
        </div>
        <div style={{ marginTop: '4rem', opacity: 0.3, fontSize: '0.8rem' }}>
          © 2026 KISHORE BALAJI. SYSTEM OPERATIONAL.
        </div>
      </footer>

      {/* 3D BOOK MODAL */}
      {activeProject && (
        <div className={`${styles.bookModal} ${isClosing ? styles.bookModalClosing : ''}`} onClick={closeBookModal}>
          <div
            className={`${styles.largeBookContainer} ${isClosing ? styles.closing : styles.opening}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* The right page (static detailed content) */}
            <div className={styles.largeBookPage}>
              <button className={styles.largeBookCloseBtn} onClick={closeBookModal} aria-label="Close">✕</button>

              <div className={styles.largeBookTechSection} style={{ marginBottom: '15px' }}>
                <span className={styles.largeBookTechLabel}>KEY FEATURES</span>
                <ul className={styles.largeBookFeaturesList}>
                  {activeProject.features && activeProject.features.map((feat: string, i: number) => (
                    <li key={i} className={styles.largeBookFeatureItem}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.largeBookSection}>
                <span className={styles.largeBookTechLabel}>ABOUT PROJECT</span>
                <p className={styles.largeBookDescText}>{activeProject.desc}</p>
              </div>

              <div className={styles.largeBookTechSection}>
                <span className={styles.largeBookTechLabel}>TECH STACK / TOOLS</span>
                <div className={styles.largeBookTechList}>
                  {activeProject.tech.map((t, i) => (
                    <span key={i} className={styles.largeBookTechItem}>{t}</span>
                  ))}
                </div>
              </div>

              <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className={styles.largeBookLinkBtn}>
                <FiGithub /> VIEW ON GITHUB <FiExternalLink />
              </a>
            </div>

            {/* The 3D front cover (rotates open) */}
            <div className={styles.largeBookCoverGroup}>
              {/* Outside of the cover */}
              <div className={styles.largeBookCoverOutside} style={{ '--book-color': bookColors[openBook as number] } as React.CSSProperties}>
                <div className={styles.largeBookCoverContent}>
                  <span className={styles.bookCoverDeco}></span>
                  <span className={styles.bookCoverTitle}>{activeProject.title}</span>
                  <span className={styles.bookCoverCategory}>{activeProject.category}</span>
                  <span className={styles.bookCoverDeco}></span>
                </div>
              </div>
              {/* Inside of the cover (textured) - NOW HAS TITLE */}
              <div className={styles.largeBookCoverInside}>
                <div className={styles.insideCoverContent}>
                  <h3 className={styles.insideCoverTitle}>{activeProject.fullName}</h3>
                  <div className={styles.insideCoverCategoryBadge}>{activeProject.category}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
