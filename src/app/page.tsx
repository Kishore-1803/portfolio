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
      desc: "An autonomous incident agent using Llama 3.3 and Kafka to detect and classify tickets. Integrated Elasticsearch and AWS Textract.", 
      features: [
        "Autonomous ticket classification",
        "Kafka event streaming architecture",
        "AWS Textract OCR integration",
        "Elasticsearch log analysis"
      ],
      tech: ["Llama 3.3", "Kafka", "Elasticsearch", "AWS Textract"],
      link: "https://github.com/Kishore-1803/Thala"
    },
    { 
      id: "02", title: "CAUSAL ML", 
      fullName: "Bridging Correlation and Causation",
      category: "Research",
      desc: "ML project predicting using both traditional and causal-informed modeling approaches.", 
      features: [
        "Causal Inference Modeling",
        "DoWhy framework integration",
        "SHAP value explainability",
        "Correlation vs Causation analysis"
      ],
      tech: ["Python", "Scikit-learn", "DoWhy", "SHAP"],
      link: "https://github.com/Kishore-1803/Bridging-Correlation-and-Causation-An-Explainable-ML-Approach"
    },
    { 
      id: "03", title: "LOAN RISK", 
      fullName: "Loan Default Risk Prediction",
      category: "FinTech AI",
      desc: "Robust loan default prediction system using Bayesian Neural Networks (BNN).", 
      features: [
        "Bayesian Neural Networks (BNN)",
        "Uncertainty quantification",
        "Robust default risk prediction",
        "Financial data preprocessing"
      ],
      tech: ["PyTorch", "BNN", "Pandas", "NumPy"],
      link: "https://github.com/Kishore-1803/Loan-Default-Risk-Prediction-Using-Bayesian-Neural-Network"
    },
    { 
      id: "04", title: "YOLO XAI", 
      fullName: "XAI Driven Robustness Analysis",
      category: "Vision Intelligence",
      desc: "Anomaly detection pipeline using YOLOv11 with XAI methods including Grad-CAM and Saliency Maps.", 
      features: [
        "YOLOv11 Anomaly Detection",
        "Grad-CAM visual explanations",
        "Saliency Map generation",
        "Model robustness evaluation"
      ],
      tech: ["YOLOv11", "Grad-CAM", "PyTorch", "OpenCV"],
      link: "https://github.com/Kishore-1803/XAI-Driven-Robustness-Analysis-of-YOLO"
    },
    { 
      id: "05", title: "XENDRIX", 
      fullName: "XendrixAI - Multimodal Assistant",
      category: "Multimodal AI",
      desc: "Multimodal AI assistant combining conversational AI, document analysis, and image generation.", 
      features: [
        "Multimodal input (Text, PDF, Images)",
        "RAG pipeline using LangChain",
        "Secure User Auth integration",
        "Image Generation via APIs"
      ],
      tech: ["FastAPI", "React", "LangChain", "FAISS"],
      link: "https://github.com/Kishore-1803/XendrixAI"
    },
    {
      id: "06", title: "FINCAUSAL",
      fullName: "Financial Document Causality Detection",
      category: "NLP Research",
      desc: "Benchmarking Transformer architectures for extracting causal relationships from financial reports.",
      features: [
        "Transformer Benchmarking (BERT, RoBERTa)",
        "Financial narrative parsed extraction",
        "Causal relationship mapping",
        "Performance metric comparison"
      ],
      tech: ["BERT", "RoBERTa", "FinBERT", "PyTorch"],
      link: "https://github.com/Kishore-1803/Financial-Document-Causality-Detection"
    },
    { 
      id: "07", title: "PERSPECTAI", 
      fullName: "PerspectAI - Resume Analyzer",
      category: "NLP",
      desc: "AI Powered Resume Analyzer which provides insights of your Resume.", 
      features: [
        "Automated Resume Parsing",
        "NLP-based Insight generation",
        "Skill extraction & matching",
        "Interactive Streamlit dashboard"
      ],
      tech: ["Python", "NLP", "Streamlit", "SpaCy"],
      link: "https://github.com/Kishore-1803/PerspectAI"
    },
  ];

  // Shelf 2: Systems / Web / Tools
  const systemsProjects = [
    { 
      id: "08", title: "SYNGENX", 
      fullName: "SyngenX - Developer Analytics",
      category: "Dev Analytics", 
      desc: "AI-powered developer performance analytics system connecting to GitHub.", 
      features: [
        "GitHub API data extraction",
        "Developer Performance metrics",
        "Predictive burnout analysis",
        "D3.js visualization charts"
      ],
      tech: ["Next.js", "GitHub API", "Python", "D3.js"],
      link: "https://github.com/Kishore-1803/SyngenX"
    },
    { 
      id: "09", title: "AUDIOAURA", 
      fullName: "AudioAura - Podcast Generator",
      category: "Voice AI", 
      desc: "AI Powered Podcast Generator That Provides News And Weather Updates Using APIs.", 
      features: [
        "Automated News Aggregation",
        "Script generation pipeline",
        "Text-to-Speech audio rendering",
        "Daily podcast scheduling"
      ],
      tech: ["Python", "TTS", "News API", "Flask"],
      link: "https://github.com/Kishore-1803/AudioAura"
    },
    {
      id: "10", title: "VIGILANCE",
      fullName: "VigilanceStream - Security Monitoring",
      category: "Security AI",
      desc: "Autonomous security monitoring engine using Groq AI, Kafka streaming, and Supabase for real-time threat detection.",
      features: [
        "Real-time event streaming",
        "Ultra-fast Groq AI analysis",
        "Threat detection rules engine",
        "Live monitoring dashboard"
      ],
      tech: ["Groq AI", "Kafka", "Supabase", "Next.js"],
      link: "https://github.com/Kishore-1803/VigilanceStream"
    },
    {
      id: "11", title: "NEXUS",
      fullName: "Nexus Sentinel - AI Governance",
      category: "AI Governance",
      desc: "Enterprise AI governance platform bridging operational velocity and legal compliance via Slack & Jira integration.",
      features: [
        "Slack & Jira API Integration",
        "Automated Compliance checks",
        "Governance workflow routing",
        "Audit trail generation"
      ],
      tech: ["FastAPI", "Kafka", "Slack API", "Jira API"],
      link: "https://github.com/Kishore-1803/Nexus-sentinel"
    },
    {
      id: "12", title: "CODE STUDIO",
      fullName: "Agentic Code Studio",
      category: "Agentic AI",
      desc: "Multi-agent autonomous software engineering platform using Actor-Critic architecture with LangGraph.",
      features: [
        "Actor-Critic AI workflow",
        "LangGraph state management",
        "Autonomous code generation",
        "Self-healing execution loops"
      ],
      tech: ["LangGraph", "React", "FastAPI", "GPT-4"],
      link: "https://github.com/Kishore-1803/Agentic-Code-Studio"
    },
    {
      id: "13", title: "HIRELYTICS",
      fullName: "Hirelytics - Assessment Recommender",
      category: "HR Tech AI",
      desc: "AI-driven SHL assessment recommendation system using semantic embeddings and Gemini-based reranking.",
      features: [
        "Semantic Candidate Matching",
        "Gemini LLM Reranking layer",
        "Bias-free assessment APIs",
        "HR Dashboard interface"
      ],
      tech: ["Gemini", "FastAPI", "Embeddings", "React"],
      link: "https://github.com/Kishore-1803/Hirelytics"
    },
  ];

  const allProjects = [...aiProjects, ...systemsProjects];

  const bookColors = [
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
             HELLO<br/>WORLD.
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
            <span>(2023 — 2026)</span>
        </div>

        <div className={styles.bookshelfWrapper}>
          {renderShelf(aiProjects, "AI / ML PROJECTS", 0)}
          {renderShelf(systemsProjects, "SYSTEMS / WEB / TOOLS", aiProjects.length)}
        </div>
      </section>

      <section className={styles.awardsSection}>
        <div className={styles.sectionHeader} style={{paddingLeft: '5vw'}}><span>HACKATHONS</span></div>
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
          <p className={styles.bioText} style={{margin: '0', textAlign: 'center'}}>
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
          <div style={{marginTop: '4rem', opacity: 0.3, fontSize: '0.8rem'}}>
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
              
              <div className={styles.largeBookTechSection} style={{marginBottom: '15px'}}>
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
