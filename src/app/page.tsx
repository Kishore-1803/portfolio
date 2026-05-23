"use client";

import { useEffect, useRef, useLayoutEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const bookshelfRef = useRef<HTMLDivElement>(null);
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
      "#627D98", "#829AB1", "#9FB3C8", "#BCCCDC", "#546E7A",
      "#78909C", "#90A4AE", "#6C8EBF", "#84A1C4", "#A8C0D4",
      "#6D8B74", "#8DA399", "#A5B5A5", "#7E97A6", "#93A8B5",
      "#A6B9C7", "#8FA89B", "#7A9A95", "#8E9CA8", "#B4C5D4"
    ]
    : [
      "#2C3E50", "#1F2937", "#334155", "#4A5568", "#2D3748",
      "#1E3A5F", "#3B4252", "#44546A", "#374151", "#4C566A",
      "#2E4057", "#37474F", "#1A202C", "#233242", "#2F3E46",
      "#354F52", "#2C3539", "#202C39", "#2D3A4A", "#1D2A3A"
    ];

  const skillsData = [
    { category: "AI & ML", items: ["PyTorch", "TensorFlow", "LLMs & RAG", "Computer Vision", "NumPy", "Pandas"] },
    { category: "Web Dev", items: ["Next.js", "React", "FastAPI", "Flask", "Express.js"] },
    { category: "Cloud & Ops", items: ["AWS", "Azure", "Docker", "Kafka", "Git"] },
    { category: "Languages", items: ["Python", "C++"] }
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
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        x: theme === 'dark' ? 0 : 30,
        duration: 0.4,
        ease: "power2.out"
      });
    }
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

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
      <div className={styles.bgGlow}></div>
      <div className={styles.bgGrain}></div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>

      <nav className={styles.navContainer}>
        <div className={styles.navLogo}>
          <h2 className={styles.headerName}>KISHORE</h2>
          <span className={styles.headerRole}>STUDENT</span>
        </div>

        {/* Desktop nav links */}
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#skills" className={styles.navLink}>Stack</a>
          <a href="#experience" className={styles.navLink}>Exp</a>
          <a href="#work" className={styles.navLink}>Work</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
          <a href="/Resume.pdf" target="_blank" className={styles.navLink}>Resume</a>
          <div className={styles.themeToggle} onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}>
            <div ref={toggleRef} className={styles.toggleKnob}>
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
          {['About', 'Stack', 'Exp', 'Work', 'Contact', 'Resume'].map((item, i) => {
            const href = item === 'Resume' ? '/Resume.pdf' : `#${item === 'Stack' ? 'skills' : item === 'Exp' ? 'experience' : item.toLowerCase()}`;
            const isExternal = item === 'Resume';
            return (
              <a
                key={item}
                href={href}
                target={isExternal ? '_blank' : undefined}
                className={styles.overlayLink}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={styles.overlayLinkIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.overlayLinkText}>{item}</span>
              </a>
            );
          })}
          <div className={styles.overlayTheme}>
            <div className={styles.themeToggle} onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}>
              <div ref={toggleRef} className={styles.toggleKnob}>
                {theme === "dark" ? <FiMoon className={styles.toggleIcon} /> : <FiSun className={styles.toggleIcon} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.heroIntro}>I'M KISHORE BALAJI</p>
          <h1 ref={heroTextRef} className={styles.hugeText}>
            HELLO<br />WORLD.
          </h1>
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
          <div className={styles.statItem}><span className={styles.statNum}>100%</span><span className={styles.statLabel}>Dedication</span></div>
          <div className={styles.statItem}><span className={styles.statNum}>∞</span><span className={styles.statLabel}>Passion</span></div>
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
