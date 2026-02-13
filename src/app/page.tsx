"use client";

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { FiSun, FiMoon, FiDownload, FiArrowRight } from "react-icons/fi"; // Added Icons
import styles from "./styles/Home.module.css";

export default function Home() {
  const [theme, setTheme] = useState("dark"); // Theme State

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  // --- DATA ---
  const projects = [
    { 
      id: "01",
      title: "THALA", 
      fullName: "Thala - Intelligent Incident Management System",
      category: "GenAI System", 
      desc: "An autonomous incident agent using Llama 3.3 and Kafka to detect and classify tickets. Integrated Elasticsearch and AWS Textract.", 
      image: "/Thala.jpeg",
      link: "https://github.com/Kishore-1803/Thala"
    },
    { 
      id: "02",
      title: "CAUSAL ML", 
      fullName: "Bridging Correlation and Causation",
      category: "Research", 
      desc: "ML project predicting using both traditional and causal-informed modeling approaches.", 
      image: "/casualML.jpg",
      link: "https://github.com/Kishore-1803/Bridging-Correlation-and-Causation-An-Explainable-ML-Approach"
    },
    { 
      id: "03",
      title: "LOAN RISK", 
      fullName: "Loan Default Risk Prediction",
      category: "FinTech AI", 
      desc: "Robust loan default prediction system using Bayesian Neural Networks (BNN).", 
      image: "/BNN.jpg",
      link: "https://github.com/Kishore-1803/Loan-Default-Risk-Prediction-Using-Bayesian-Neural-Network"
    },
    { 
      id: "04",
      title: "YOLO XAI", 
      fullName: "XAI Driven Robustness Analysis For YOLO",
      category: "Vision Intelligence", 
      desc: "Anomaly detection pipeline using YOLOv11 with XAI methods including Grad-CAM and Saliency Maps.", 
      image: "/YOLO.jpg",
      link: "https://github.com/Kishore-1803/XAI-Driven-Robustness-Analysis-of-YOLO"
    },
    { 
      id: "05",
      title: "SYNGENX", 
      fullName: "SyngenX - Developer Analytics",
      category: "Dev Analytics", 
      desc: "AI-powered developer performance analytics system connecting to GitHub.", 
      image: "/SyngenX.jpg",
      link: "https://github.com/Kishore-1803/SyngenX"
    },
    { 
      id: "06",
      title: "XENDRIX", 
      fullName: "XendrixAI - Multimodal Assistant",
      category: "Multimodal AI", 
      desc: "Multimodal AI assistant combining conversational AI, document analysis, and image generation.", 
      image: "/Xendrix.jpg",
      link: "https://github.com/Kishore-1803/XendrixAI"
    },
    { 
      id: "07",
      title: "PERSPECTAI", 
      fullName: "PerspectAI - Resume Analyzer",
      category: "NLP", 
      desc: "AI Powered Resume Analyzer which provides insights of your Resume.", 
      image: "/AI_Resume.png",
      link: "https://github.com/Kishore-1803/PerspectAI"
    },
    { 
      id: "08",
      title: "AUDIOAURA", 
      fullName: "AudioAura - Podcast Generator",
      category: "Voice AI", 
      desc: "AI Powered Podcast Generator That Provides News And Weather Updates Using APIs.", 
      image: "/podcast.jpg",
      link: "https://github.com/Kishore-1803/AudioAura"
    },
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
    // 1. Initialize Lenis
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
      // HERO PARALLAX
      gsap.to(heroTextRef.current, {
        scrollTrigger: { trigger: document.body, start: "top top", end: "100vh top", scrub: 1 },
        y: -150, opacity: 0, scale: 1.1
      });

      // TEXT REVEALS (Big Statement)
      gsap.utils.toArray(`.${styles.revealText}`).forEach((el: any) => {
         gsap.from(el, {
           scrollTrigger: { trigger: el, start: "top 85%", end: "top 60%", scrub: true },
           opacity: 0.1, y: 20
         });
      });

      // ABOUT CONTENT FADE UP
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

      // SKILLS STAGGER
      gsap.utils.toArray(`.${styles.skillCategory}`).forEach((el: any) => {
        gsap.from(el, {
           scrollTrigger: { trigger: el, start: "top 85%" },
           y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
      });

      // EXPERIENCE ITEMS SLIDE IN
      gsap.utils.toArray(`.${styles.expItem}`).forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          x: -50, opacity: 0, duration: 1, ease: "power3.out"
        });
      });

      // PROJECT TEXT REVEAL
      gsap.utils.toArray(`.${styles.projectInfo}`).forEach((el: any) => {
         gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 80%" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
         });
      });

      // IMAGE PARALLAX
      gsap.utils.toArray(`.${styles.projectImage}`).forEach((img: any) => {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

    }, containerRef);
    
    // Custom cursor movement
    const moveCursor = (e: MouseEvent) => {
      // Use duration 0 for instant, lag-free movement 
      gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
    };
    window.addEventListener("mousemove", moveCursor);

    // Cursor hover effects
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

  return (
    <div ref={containerRef} className={styles.main}>
      <div className={styles.bgGlow}></div>
      <div className={styles.bgGrain}></div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>

      {/* FIXED NAV */}
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

            {/* THEME TOGGLE */}
            <div className={styles.themeToggle} onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}>
               <div ref={toggleRef} className={styles.toggleKnob}>
                  {theme === "dark" ? <FiMoon className={styles.toggleIcon} /> : <FiSun className={styles.toggleIcon} />}
               </div>
            </div>
         </div>
      </nav>

      {/* HERO */}
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
           <p className={styles.heroIntro}>I'M KISHORE BALAJI</p>
           <h1 ref={heroTextRef} className={styles.hugeText}>
             HELLO<br/>WORLD.
           </h1>
           <div className={styles.scrollIndicator}>SCROLL TO EXPLORE</div>
        </div>
      </header>

      {/* ABOUT */}
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

      {/* SKILLS */}
      <section id="skills" className={styles.skillsSection}>
        <div className={styles.sectionHeader}>
            <span>TECHNICAL SKILLS</span>
        </div>
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

      {/* EXPERIENCE */}
      <section id="experience" className={styles.experienceSection}>
        <div className={styles.sectionHeader}>
            <span>CAREER HISTORY</span>
        </div>
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

      {/* WORK / PROJECTS */}
      <section id="work" className={styles.gallerySection}>
        <div className={styles.sectionHeader}>
            <span>SELECTED WORKS</span>
            <span>(2023 — 2026)</span>
        </div>
        {projects.map((proj, i) => (
          <div key={i} className={styles.projectContainer}>
             <div className={styles.projectInfo}>
                <span className={styles.projectIndex}>{proj.id}</span>
                <h2 className={styles.projectTitle}>{proj.title}</h2>
                <h3 className={styles.projectSubTitle}>{proj.fullName}</h3>
                <p className={styles.projectCat}>{proj.category}</p>
                <p className={styles.projectDesc}>{proj.desc}</p>
                <a href={proj.link} target="_blank" className={styles.projectLink}>VIEW CASE STUDY</a>
             </div>
             <div className={styles.projectVisual}>
                <div className={styles.imageWrapper}>
                   <div 
                      className={styles.projectImage} 
                      style={{ 
                        backgroundImage: `url(${proj.image})`,
                      }}
                   >
                     {/* Overlay for readability if image is light */}
                     <div className="absolute inset-0 bg-black/20"></div>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </section>

      {/* ACHIEVEMENTS MARQUEE */}
      <section className={styles.awardsSection}>
        <div className={styles.sectionHeader} style={{paddingLeft: '5vw'}}>
            <span>HACKATHONS</span>
        </div>
        
        <div className={styles.marqueeContainer}>
           <div className={styles.marqueeTrack}>
              {/* Grouped list to allow gaps between sets */}
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

      {/* CONNECT / FOOTER */}
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
    </div>
  );
}
