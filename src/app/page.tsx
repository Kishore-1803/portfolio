"use client";

import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/Home.module.css";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  
  // Register section refs
  const registerSection = (id: string, ref: HTMLElement | null) => {
    sectionsRef.current[id] = ref;
  };

  // Handle intersection observer for sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      
      // Find which section is currently visible
      for (const section in sectionsRef.current) {
        const element = sectionsRef.current[section];
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Head>
        <title>Kishore's Portfolio</title>
        <meta name="description" content="Portfolio of Kishore B - AI Engineer, Full Stack Developer, and Software Engineer" />
        <meta name="keywords" content="portfolio, web development, AI, software engineer, full stack" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Side Navigation */}
      <nav className={styles.sideNav}>
        <div className={styles.themeToggle} onClick={toggleTheme}>
          {isDarkMode ? "☀️" : "🌙"}
        </div>
        
        <div className={styles.navItems}>
          <a 
            href="#home" 
            className={`${styles.navItem} ${activeSection === "home" ? styles.active : ""}`}
            aria-label="Home"
          >
            <span className={styles.navIcon}>🏠</span>
            <span className={styles.navText}>Home</span>
          </a>
          <a 
            href="#about" 
            className={`${styles.navItem} ${activeSection === "about" ? styles.active : ""}`}
            aria-label="About"
          >
            <span className={styles.navIcon}>👤</span>
            <span className={styles.navText}>About</span>
          </a>
          <a 
            href="#skills" 
            className={`${styles.navItem} ${activeSection === "skills" ? styles.active : ""}`}
            aria-label="Skills"
          >
            <span className={styles.navIcon}>🛠️</span>
            <span className={styles.navText}>Skills</span>
          </a>
          <a 
            href="#projects" 
            className={`${styles.navItem} ${activeSection === "projects" ? styles.active : ""}`}
            aria-label="Projects"
          >
            <span className={styles.navIcon}>📂</span>
            <span className={styles.navText}>Projects</span>
          </a>
          <a 
            href="#social" 
            className={`${styles.navItem} ${activeSection === "social" ? styles.active : ""}`}
            aria-label="Connect"
          >
            <span className={styles.navIcon}>🔗</span>
            <span className={styles.navText}>Connect</span>
          </a>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <div className={styles.mobileNavHeader}>
          <span className={styles.mobileLogo}>KB</span>
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <a href="#home" className={styles.mobileMenuItem} onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" className={styles.mobileMenuItem} onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" className={styles.mobileMenuItem} onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#projects" className={styles.mobileMenuItem} onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#social" className={styles.mobileMenuItem} onClick={() => setMenuOpen(false)}>Connect</a>
            <button className={styles.themeToggleBtn} onClick={toggleTheme}>
              {isDarkMode ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}
            </button>
          </div>
        )}
      </div>

      <main className={styles.content}>
        {/* Hero Section */}
        <section 
          id="home" 
          className={styles.hero}
          ref={(el) => registerSection("home", el)}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroGreeting}>Hello, World!</div>
              <h1 className={styles.heroTitle}>I'm <span className={styles.highlight}>Kishore B</span></h1>
              <div className={styles.roleWrapper}>
                <div className={styles.roleSlider}>
                  <div className={styles.role}>Student</div>
                  <div className={styles.role}>AI Engineer</div>
                  <div className={styles.role}>Full Stack Developer</div>
                </div>
              </div>
              <div className={styles.heroCTA}>
                <a href="/Resume.pdf" className={styles.primaryBtn} target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
                <a href="#projects" className={styles.secondaryBtn}>
                  View Projects
                </a>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.profileImgContainer}>
                <Image
                  src="/me.jpg"
                  alt="Kishore"
                  width={320}
                  height={320}
                  className={styles.profileImg}
                  priority
                />
                <div className={styles.profileImgShape}></div>
                <div className={styles.profileImgDecoration}></div>
              </div>
            </div>
          </div>
          <div className={styles.scrollIndicator}>
            <div className={styles.mouse}>
              <div className={styles.wheel}></div>
            </div>
            <div className={styles.scrollText}>Scroll Down</div>
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          className={`${styles.section} ${styles.about}`}
          ref={(el) => registerSection("about", el)}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPreTitle}>Who Am I</span>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              Passionate about coding, learning, and exploring cutting-edge AI technologies, I thrive on solving problems 
              and building innovative solutions. My academic journey has fueled my enthusiasm for both theoretical concepts 
              and their practical applications in AI and web development. Beyond academics, I actively contribute to open-source 
              projects, enhancing my skills while giving back to the community. Driven by curiosity and a commitment to growth, 
              I'm excited to shape a future where technology and creativity come together to make an impact.
            </p>
            <div className={styles.aboutStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>5th</div>
                <div className={styles.statLabel}>Semester</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>B.Tech</div>
                <div className={styles.statLabel}>Degree</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>CSE(AI)</div>
                <div className={styles.statLabel}>Specialization</div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          className={`${styles.section} ${styles.skills}`}
          ref={(el) => registerSection("skills", el)}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPreTitle}>What I Know</span>
            <h2 className={styles.sectionTitle}>My Skills</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          
          <div className={styles.skillsGrid}>
            {/* Languages */}
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryHeader}>
                <div className={styles.categoryIcon}>
                  <img
                    src="/programming.png"
                    alt="Languages Icon"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className={styles.skillCategoryTitle}>Languages</h3>
              </div>
              <div className={styles.skillItems}>
                <div className={styles.skillItem}>
                  <img src="/c-.png" alt="C++ Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>C++</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/python.png" alt="Python Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Python</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/java.png" alt="Java Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Java</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/c.png" alt="C Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>C</span>
                </div>
              </div>
            </div>

            {/* Frontend */}
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryHeader}>
                <div className={styles.categoryIcon}>
                  <img
                    src="/frontend.png"
                    alt="Frontend Icon"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className={styles.skillCategoryTitle}>Frontend</h3>
              </div>
              <div className={styles.skillItems}>
                <div className={styles.skillItem}>
                  <img src="/html-5.png" alt="HTML Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>HTML5</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/css-3.png" alt="CSS Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>CSS3</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/js.png" alt="JavaScript Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>JavaScript</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/react.png" alt="React Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>React.js</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/next.png" alt="Next Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Next.js</span>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryHeader}>
                <div className={styles.categoryIcon}>
                  <img
                    src="/backend.png"
                    alt="Backend Icon"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className={styles.skillCategoryTitle}>Backend</h3>
              </div>
              <div className={styles.skillItems}>
                <div className={styles.skillItem}>
                  <img src="/node.png" alt="Node.js Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Node.js</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/express.png" alt="Express Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Express.js</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/flask.png" alt="Express Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Flask</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/FastAPI.png" alt="Express Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>FastAPI</span>
                </div>
              </div>
            </div>

            {/* Database */}
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryHeader}>
                <div className={styles.categoryIcon}>
                  <img
                    src="/database.png"
                    alt="Database Icon"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className={styles.skillCategoryTitle}>Database</h3>
              </div>
              <div className={styles.skillItems}>
                <div className={styles.skillItem}>
                  <img src="/sql.png" alt="MySQL Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>MySQL</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/mongodb.png" alt="MongoDB Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>MongoDB</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/neo4j.png" alt="Neo4j Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Neo4j</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/postgresql.png" alt="PostgreSQL Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* AI/ML Frameworks */}
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryHeader}>
                <div className={styles.categoryIcon}>
                  <img
                    src="/aiml.png"
                    alt="AI/ML Icon"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className={styles.skillCategoryTitle}>AI/ML Frameworks</h3>
              </div>
              <div className={styles.skillItems}>
                <div className={styles.skillItem}>
                  <img src="/tensorflow.png" alt="TensorFlow Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>TensorFlow</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/pytorch.png" alt="PyTorch Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>PyTorch</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/classifiers.png" alt="Classifiers Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Classifiers</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/regressors.png" alt="Regressors Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Regressors</span>
                </div>
                <div className={styles.skillItem}>
                  <img src="/neural network.png" alt="Neural Networks Icon" width={24} height={24} className={styles.skillItemImg} />
                  <span>Neural Networks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          className={`${styles.section} ${styles.projects}`}
          ref={(el) => registerSection("projects", el)}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPreTitle}>What I've Built</span>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          
          <div className={styles.projectsContainer}>
            {/* Project 1 */}
            <div className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img 
                  src="/AI_Resume.png" 
                  alt="PerspectAI Project" 
                  className={styles.projectImg}
                />
                <div className={styles.projectOverlay}>
                  <a
                    href="https://github.com/Kishore-1803/PerspectAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>PerspectAI</h3>
                <p className={styles.projectDesc}>
                  An AI Powered Resume Analyzer which provides insights of your Resume.
                </p>
                <div className={styles.projectTags}>
                  <span className={styles.projectTag}>AI</span>
                  <span className={styles.projectTag}>NLP</span>
                  <span className={styles.projectTag}>Analytics</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img 
                  src="/podcast.jpg" 
                  alt="AudioAura Project"
                  className={styles.projectImg}
                />
                <div className={styles.projectOverlay}>
                  <a
                    href="https://github.com/Kishore-1803/AudioAura"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>AudioAura</h3>
                <p className={styles.projectDesc}>
                  An AI Powered Podcast Generator That Provides News And Weather Updates Using APIs.
                </p>
                <div className={styles.projectTags}>
                  <span className={styles.projectTag}>AI</span>
                  <span className={styles.projectTag}>React</span>
                  <span className={styles.projectTag}>Express</span>
                  <span className={styles.projectTag}>MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img 
                  src="/Xendrix.jpg" 
                  alt="XendrixAI"
                  className={styles.projectImg}
                />
                <div className={styles.projectOverlay}>
                  <a
                    href="https://github.com/Kishore-1803/XendrixAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>XendrixAI</h3>
                <p className={styles.projectDesc}>
                   An intelligent, multimodal AI assistant. Xendrix combines conversational AI, document analysis, multilingual capabilities, data visualization, and image generation to provide a powerful interactive assistant.
                </p>
                <div className={styles.projectTags}>
                  <span className={styles.projectTag}>AI</span>
                  <span className={styles.projectTag}>Multimodal</span>
                  <span className={styles.projectTag}>NLP</span>
                  <span className={styles.projectTag}>Data Visualization</span>
                  <span className={styles.projectTag}>Image Generation</span>
                  <span className={styles.projectTag}>Conversational AI</span>
                  <span className={styles.projectTag}>Python</span>
                  <span className={styles.projectTag}>Next.js</span>
                </div>
              </div>
            </div>

            <div className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img 
                  src="/SyngenX.jpg" 
                  alt="SyngenX"
                  className={styles.projectImg}
                />
                <div className={styles.projectOverlay}>
                  <a
                    href="https://github.com/Kishore-1803/SyngenX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>SyngenX</h3>
                <p className={styles.projectDesc}>
                  An AI-powered developer performance analytics system. SyngenX connects to GitHub to deliver intelligent insights on individual strengths, team metrics, productivity, and criticality handling using data from real contributions.
                </p>
                <div className={styles.projectTags}>
                  <span className={styles.projectTag}>GenAI</span>
                  <span className={styles.projectTag}>Developer Analytics</span>
                  <span className={styles.projectTag}>FastAPI</span>
                  <span className={styles.projectTag}>Next.js</span>
                  <span className={styles.projectTag}>Supabase</span>
                  <span className={styles.projectTag}>Data Visualization</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        

        {/* Social Connect Section */}
        <section 
          id="social" 
          className={`${styles.section} ${styles.social}`}
          ref={(el) => registerSection("social", el)}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPreTitle}>Get In Touch</span>
            <h2 className={styles.sectionTitle}>Connect With Me</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          
          <div className={styles.connectGrid}>
            <a
              href="https://www.facebook.com/profile.php?id=100017656030709"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
            >
              <div className={styles.socialIconWrap}>
                <img src="/facebook.png" alt="Facebook" className={styles.socialIcon} />
              </div>
              <span>Facebook</span>
            </a>
            
            <a
              href="https://www.instagram.com/kishore_balaji_03/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
            >
              <div className={styles.socialIconWrap}>
                <img src="/instagram.png" alt="Instagram" className={styles.socialIcon} />
              </div>
              <span>Instagram</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/kishore-balaji-081168292/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
            >
              <div className={styles.socialIconWrap}>
                <img src="/linkedin.png" alt="LinkedIn" className={styles.socialIcon} />
              </div>
              <span>LinkedIn</span>
            </a>
            
            <a
              href="https://github.com/Kishore-1803"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
            >
              <div className={styles.socialIconWrap}>
                <img src="/github.png" alt="GitHub" className={styles.socialIcon} />
              </div>
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span>KB</span>
          </div>
          <p className={styles.footerCopyright}>© 2024 Kishore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
