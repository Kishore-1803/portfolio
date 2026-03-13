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

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const bookshelfRef = useRef<HTMLDivElement>(null);

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
  ];

  const allProjects = [...aiProjects, ...systemsProjects];

  const bookColors = theme === "light"
    ? [
      "#627D98", "#829AB1", "#9FB3C8", "#BCCCDC", "#546E7A",
      "#78909C", "#90A4AE", "#6C8EBF", "#84A1C4", "#A8C0D4",
      "#6D8B74", "#8DA399", "#A5B5A5"
    ]
    : [
      "#2C3E50", "#1F2937", "#334155", "#4A5568", "#2D3748",
      "#1E3A5F", "#3B4252", "#44546A", "#374151", "#4C566A",
      "#2E4057", "#37474F", "#1A202C"
    ];

  const skillsData = [
    { category: "AI & ML", items: ["PyTorch", "TensorFlow", "LLMs & RAG", "Computer Vision", "NumPy", "Pandas"] },
    { category: "Web Dev", items: ["Next.js", "React", "FastAPI", "Flask", "Express.js"] },
    { category: "Cloud & Ops", items: ["AWS", "Azure", "Docker", "Kafka", "Git"] },
    { category: "Languages", items: ["Python", "C++"] }
  ];

  const experience = [
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
    { year: "2025", name: "SUPERHACK", desc: "Runner Up" },
    { year: "2025", name: "BUILD WITH INDIA", desc: "Top 20%" },
    { year: "2024", name: "PROVIDENCE LEAP IDEATHON", desc: "Semifinalist" }
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
        style={{ '--book-color': bookColors[globalIdx] } as React.CSSProperties}
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
      </nav>

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
          <div className={styles.statItem}><span className={styles.statNum}>3rd</span><span className={styles.statLabel}>Year Student</span></div>
          <div className={styles.statItem}><span className={styles.statNum}>10+</span><span className={styles.statLabel}>Projects</span></div>
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

      {/* PROJECTS — BOOKSHELF */}
      <section id="work" className={styles.bookshelfSection} ref={bookshelfRef}>
        <div className={styles.sectionHeader}>
          <span>PROJECTS</span>
          <span>(2023 — Present)</span>
        </div>

        <div className={styles.exploreHint}>
          <span>Click any book to explore</span>
          <span className={styles.exploreArrow}>→</span>
        </div>

        <div className={styles.bookshelfWrapper}>
          {renderShelf(aiProjects, "AI / ML PROJECTS", 0)}
          {renderShelf(systemsProjects, "SYSTEMS / WEB / TOOLS", aiProjects.length)}
        </div>
      </section>

      <section className={styles.awardsSection}>
        <div className={styles.sectionHeader} style={{ paddingLeft: '5vw' }}><span>HACKATHONS</span></div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[1, 2, 3, 4].map((group) => (
              <div key={group} className={styles.awardGroup}>
                {achievements.map((award, i) => (
                  <div key={i} className={styles.awardCard}>
                    <span className={styles.awardYear}>{award.year}</span>
                    <h3 className={styles.awardName}>{award.name}</h3>
                    <span className={styles.awardDesc}>{award.desc}</span>
                  </div>
                ))}
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
