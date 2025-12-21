"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/Home.module.css";

// --- BACKGROUND ANIMATION COMPONENT ---
const ParticleBackground = ({ theme }: { theme: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const particleCount = 50; // Density of dots

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Change color based on theme
        ctx.fillStyle = theme === 'dark' 
          ? "rgba(100, 255, 218, 0.3)" // Cyan for dark mode
          : "rgba(37, 99, 235, 0.3)";  // Blue for light mode
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Draw lines between close particles
        for (let j = index; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            // Line color based on theme
            const color = theme === 'dark' ? "100, 255, 218" : "37, 99, 235";
            ctx.strokeStyle = `rgba(${color}, ${0.1 - distance / 1500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]); // Re-run if theme changes

  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
};

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"recent" | "old">("recent");
  
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const moveCursor = (e: MouseEvent) => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
        cursorOutlineRef.current.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [theme]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  const closeMenu = () => setMobileMenuOpen(false);

  // Projects
  const projects = [
    { title: "Thala - Intelligent Incident Management System", image: "/Thala.jpeg", link: "https://github.com/Kishore-1803/Thala", desc: "An autonomous incident agent using Llama 3.3 and Kafka to detect and classify tickets. Integrated Elasticsearch and AWS Textract.", tags: ["GenAI", "AWS Bedrock", "Kafka", "Elasticsearch", "Flask"], year: 2025 },
    { title: "Bridging Correlation and Causation", image: "/casualML.jpg", link: "https://github.com/Kishore-1803/Bridging-Correlation-and-Causation-An-Explainable-ML-Approach", desc: "ML project predicting using both traditional and causal-informed modeling approaches.", tags: ["Machine Learning", "Causal Inference", "Explainable AI", "SHAP"], year: 2025 },
    { title: "Loan Default Risk Prediction", image: "/BNN.jpg", link: "https://github.com/Kishore-1803/Loan-Default-Risk-Prediction-Using-Bayesian-Neural-Network", desc: "Robust loan default prediction system using Bayesian Neural Networks (BNN).", tags: ["Neural Networks", "Uncertainty", "Risk Prediction", "AI in Finance"], year: 2025 },
    { title: "XAI Driven Robustness Analysis For YOLO", image: "/YOLO.jpg", link: "https://github.com/Kishore-1803/XAI-Driven-Robustness-Analysis-of-YOLO", desc: "Anomaly detection pipeline using YOLOv11 with XAI methods including Grad-CAM and Saliency Maps.", tags: ["Computer Vision", "XAI", "YOLOv11", "PyTorch"], year: 2025 },
    { title: "SyngenX", image: "/SyngenX.jpg", link: "https://github.com/Kishore-1803/SyngenX", desc: "AI-powered developer performance analytics system connecting to GitHub.", tags: ["GenAI", "Developer Analytics", "FastAPI", "Next.js", "Supabase"], year: 2025 },
    { title: "XendrixAI", image: "/Xendrix.jpg", link: "https://github.com/Kishore-1803/XendrixAI", desc: "Multimodal AI assistant combining conversational AI, document analysis, and image generation.", tags: ["AI", "Multimodal", "NLP", "Python", "Next.js"], year: 2025 },
    { title: "PerspectAI", image: "/AI_Resume.png", link: "https://github.com/Kishore-1803/PerspectAI", desc: "AI Powered Resume Analyzer which provides insights of your Resume.", tags: ["AI", "NLP", "Analytics"], year: 2025 },
    { title: "AudioAura", image: "/podcast.jpg", link: "https://github.com/Kishore-1803/AudioAura", desc: "AI Powered Podcast Generator That Provides News And Weather Updates Using APIs.", tags: ["AI", "React", "Express", "MongoDB"], year: 2024 }
  ];
  const sortedProjects = sortOrder === "recent" ? [...projects] : [...projects].reverse();

  // Skills Data - Updated based on Resume.pdf
  const skillsData = [
    { 
      category: "Programming", 
      items: [
        {name: "Python", icon: "/python.png"}, 
        {name: "C++", icon: "/c-.png"}, 
        {name: "Java", icon: "/java.png"}
      ] 
    },
    { 
      category: "AI & ML", 
      items: [
        {name: "PyTorch", icon: "/pytorch.png"}, 
        {name: "TensorFlow", icon: "/tensorflow.png"}, 
        {name: "Computer Vision", icon: "/view.png"}, 
        {name: "LLMs & RAG", icon: "/RAG.png"}, // Grouped LLMs and RAG
        {name: "NumPy", icon: "/numpy.png"},
        {name: "Pandas", icon: "/pandas.png"},
        {name: "Scikit-Learn", icon: "/scikit-learn.png"},
        {name: "keras", icon: "/keras.png"},
        {name: "Matplotlib", icon: "/matplotlib.png"}
      ] 
    },
    { 
      category: "Web Development", 
      items: [
        {name: "Next.js", icon: "/next.png"}, 
        {name: "React", icon: "/react.png"}, 
        {name: "FastAPI", icon: "/FastAPI.png"}, 
        {name: "Flask", icon: "/flask.png"}, 
        {name: "Express.js", icon: "/express.png"}
      ] 
    },
    { 
      category: "Databases", 
      items: [
        {name: "PostgreSQL", icon: "/postgresql.png"}, 
        {name: "MongoDB", icon: "/mongodb.png"}, 
        {name: "MySQL", icon: "/sql.png"}, 
        {name: "Pinecone", icon: "/pinecone.png"} // Generic DB icon for Pinecone if specific one missing
      ] 
    },
    { 
      category: "Tools & Cloud", 
      items: [
        {name: "Git & GitHub", icon: "/github.png"}, 
        {name: "Docker", icon: "/docker.png"}, // Ensure you have this icon
        {name: "Kafka", icon: "/kafka.png"},   // Ensure you have this icon
        {name: "AWS", icon: "/aws.png"}        // Ensure you have this icon
      ] 
    }
  ];

  return (
    <div className={styles.container}>
      <Head><title>Kishore B | Portfolio</title><meta name="viewport" content="width=device-width, initial-scale=1" /></Head>
      
      {/* Background Animation */}
      <ParticleBackground theme={theme} />

      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>

      <nav className={styles.navbar}>
        <div className={styles.logo}>KB.</div>
        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            {["Home", "About", "Skills", "Experience", "Projects", "Achievements", "Connect"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.navItem}>{item}</a>
            ))}
          </div>
          <label className={styles.themeSwitch}>
            <input type="checkbox" className={styles.themeCheckbox} checked={theme === 'dark'} onChange={toggleTheme} />
            <span className={styles.switchIcon}>☀️</span>
            <span className={styles.switchIcon}>🌙</span>
            <span className={styles.sliderKnob}></span>
          </label>
          <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? "✕" : "☰"}</button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {["Home", "About", "Skills", "Experience", "Projects", "Achievements", "Connect"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className={styles.navItem} onClick={closeMenu}>{item}</a>
          ))}
        </div>
      )}

      <div className={styles.scrollControls}>
        <button onClick={scrollToTop} className={styles.scrollBtn}>↑</button>
        <button onClick={scrollToBottom} className={styles.scrollBtn}>↓</button>
      </div>

      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
            <span className={styles.heroBadge}>Hello, World!</span>
            <h1 className={styles.heroTitle}>I'm Kishore.<br /><span>Turning blank editors into intelligent ecosystems.</span></h1>
            <p className={styles.heroDesc}>A 3rd Year B.Tech student architecting the future of synthetic intelligence. I engineer robust cognitive systems and seamless digital experiences.</p>
            <div className={styles.heroBtns}><a href="/Resume.pdf" target="_blank" className={styles.btnPrimary}>Download Resume</a><a href="#projects" className={styles.btnSecondary}>View Projects</a></div>
          </div>
          <div className={styles.heroImageWrapper}><Image src="/me.jpg" alt="Kishore B" width={450} height={450} className={styles.heroImg} priority /></div>
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.sectionHeader}><span className={styles.preTitle}>Introduction</span><h2 className={styles.title}>Who Am I?</h2></div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCard}><p className={styles.aboutText}>I’m a B.Tech AI student at Amrita Vishwa Vidyapeetham, Coimbatore. I specialize in AI, web development, and creative applications of machine learning.<br /><br />Beyond academics, I contribute to open-source projects and enjoy experimenting with emerging technologies.</p></div>
          <div className={styles.statsGrid}>
             <div className={styles.statItem}><span className={styles.statNum}>3rd</span><span className={styles.statLabel}>Year Student</span></div>
             <div className={styles.statItem}><span className={styles.statNum}>B.Tech</span><span className={styles.statLabel}>CSE (AI)</span></div>
             <div className={styles.statItem}><span className={styles.statNum}>10+</span><span className={styles.statLabel}>Projects</span></div>
             <div className={styles.statItem}><span className={styles.statNum}>3</span><span className={styles.statLabel}>Awards</span></div>
          </div>
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <div className={styles.sectionHeader}><span className={styles.preTitle}>Tech Stack</span><h2 className={styles.title}>My Arsenal</h2></div>
        {skillsData.map((cat, idx) => (
          <div key={idx} className={styles.skillCategory}>
            <h3>{cat.category}</h3>
            <div className={styles.skillGrid}>{cat.items.map((skill, sIdx) => (<div key={sIdx} className={styles.skillCard}><img src={skill.icon} alt={skill.name} className={styles.skillIcon} /><span style={{fontWeight: 500, fontSize: '0.9rem'}}>{skill.name}</span></div>))}</div>
          </div>
        ))}
      </section>

      <section id="experience" className={styles.section}>
        <div className={styles.sectionHeader}><span className={styles.preTitle}>Career History</span><h2 className={styles.title}>Experience</h2></div>
        <div className={styles.timelineSection}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}><span className={styles.dateYear}>2025</span><span style={{color: 'var(--text-secondary)'}}>Jun - Aug</span></div>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineRole}>Software Developer Intern</h3><span className={styles.timelineCompany}>TechZeeb</span>
              <ul className={styles.expList}>
                <li className={styles.expItem}>Built "Kovai Natural Farmers" - a web platform bridging organic farmers and local customers.</li>
                <li className={styles.expItem}>Developed scalable backend APIs with JavaScript and phpMyAdmin; improved data response time by 40%.</li>
                <li className={styles.expItem}>Designed responsive UI using HTML and CSS, enhancing cross-device usability and UX.</li>
                <li className={styles.expItem}>Working remotely to deliver high-quality software solutions for agricultural technology.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.sectionHeader}><span className={styles.preTitle}>Portfolio</span><h2 className={styles.title}>What I've Built</h2></div>
        <div className={styles.filterBar}>
          <label style={{marginRight: '10px'}}>Sort By:</label>
          <select className={styles.filterSelect} value={sortOrder} onChange={e => setSortOrder(e.target.value as "recent" | "old")}>
            <option value="recent">Recent First</option><option value="old">Oldest First</option>
          </select>
        </div>
        <div className={styles.projectsGrid}>
          {sortedProjects.map((proj, idx) => (
            <div key={idx} className={styles.projectCard}>
              <div className={styles.projectImgWrapper}><img src={proj.image} alt={proj.title} className={styles.projectImg} /></div>
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <div className={styles.projectTags}>{proj.tags.map((tag, tIdx) => (<span key={tIdx} className={styles.tag}>{tag}</span>))}</div>
                <p style={{color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem'}}>{proj.desc}</p>
                <a href={proj.link} target="_blank" className={styles.projectLink}>View on GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="achievements" className={styles.section}>
        <div className={styles.sectionHeader}><span className={styles.preTitle}>Recognition</span><h2 className={styles.title}>Trophy Cabinet</h2></div>
        <div className={styles.achievementGrid}>
          <div className={styles.achievementCard}><div className={styles.achievementYearBg}>2025</div><div className={styles.achievementIconBox}>🥈</div><div className={styles.achievementInfo}><h3 className={styles.achievementTitle}>Runner Up - Superhack</h3><span className={styles.achievementContext}>Thala: Incident Management</span></div></div>
          <div className={styles.achievementCard}><div className={styles.achievementYearBg}>2025</div><div className={styles.achievementIconBox}>🏅</div><div className={styles.achievementInfo}><h3 className={styles.achievementTitle}>Top 20% - Build With India</h3><span className={styles.achievementContext}>SatyaCheck: Fact-checking</span></div></div>
          <div className={styles.achievementCard}><div className={styles.achievementYearBg}>2024</div><div className={styles.achievementIconBox}>🏆</div><div className={styles.achievementInfo}><h3 className={styles.achievementTitle}>Semifinalist - Ideathon</h3><span className={styles.achievementContext}>Providence Leap</span></div></div>
        </div>
      </section>

      <section id="connect" className={styles.section}>
        <div className={styles.contactBox}>
          <div>
            <h2 className={styles.title} style={{fontSize: '2rem', marginBottom: '20px'}}>Connect With Me</h2>
            <p className={styles.aboutText}>I’m always open to exciting opportunities, collaborations, or just a friendly chat. Send me a message, and let’s make something amazing together.</p>
            <div className={styles.socialRow}>
              <a href="https://github.com/Kishore-1803" target="_blank" className={styles.socialBtn}><img src="/github.png" alt="Github" /></a>
              <a href="https://www.linkedin.com/in/kishore-balaji-081168292/" target="_blank" className={styles.socialBtn}><img src="/linkedin.png" alt="LinkedIn" /></a>
              <a href="https://www.instagram.com/kishore_balaji_03/" target="_blank" className={styles.socialBtn}><img src="/instagram.png" alt="Instagram" /></a>
              <a href="https://www.facebook.com/profile.php?id=100017656030709" target="_blank" className={styles.socialBtn}><img src="/facebook.png" alt="Facebook" /></a>
            </div>
          </div>
          <form action="https://formspree.io/f/xgvzpbpz" method="POST">
            <input type="text" name="name" placeholder="Your Name" className={styles.formInput} required />
            <input type="email" name="email" placeholder="Your Email" className={styles.formInput} required />
            <textarea name="message" rows={5} placeholder="Your Message" className={styles.formText} required></textarea>
            <button type="submit" className={styles.btnPrimary} style={{width: '100%'}}>Send Message</button>
          </form>
        </div>
      </section>

      <footer style={{textAlign: 'center', padding: '40px', borderTop: '1px solid var(--border-light)', marginTop: '50px'}}>
        <p style={{color: 'var(--text-secondary)'}}>© 2025 Kishore. All rights reserved.</p>
      </footer>
    </div>
  );
}