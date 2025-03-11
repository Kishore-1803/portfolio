"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/Home.module.css";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Effect for navbar scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kishore's Portfolio</title>
        <meta name="description" content="Portfolio of Kishore B - AI Engineer, Full Stack Developer, and Software Engineer" />
        <meta name="keywords" content="portfolio, web development, AI, software engineer, full stack" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navbar */}
      <header>
        <nav className={`${styles.navbar} ${styles.dynamicNavbar} ${isScrolled ? styles.scrolled : ""}`}>
          <div className={styles.logo}>KB</div>
          <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#social" onClick={() => setMenuOpen(false)}>Connect</a>
          </div>
          <button className={styles.menuButton} onClick={toggleMenu}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <Image
              src="/me.png"
              alt="Kishore"
              width={300}
              height={300}
              className={styles.heroImage}
              priority
            />
            <div>
              <h1 className={styles.heroTitle}>Hi 👋, I am Kishore B</h1>
              <div className={styles.rotatingTitles}>
                <span className={styles.title}>Student</span>
                <span className={styles.title}>AI Engineer</span>
                <span className={styles.title}>Full Stack Developer</span>
                <span className={styles.title}>Software Engineer</span>
              </div>
              <a href="/Resume.pdf" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
                My Resume
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p>
          Hi, I'm Kishore B, a 4th-semester B.Tech student specializing in Computer Science and Artificial Intelligence. 
          Passionate about coding, learning, and exploring cutting-edge AI technologies, I thrive on solving problems 
          and building innovative solutions. My academic journey has fueled my enthusiasm for both theoretical concepts 
          and their practical applications in AI and web development. Beyond academics, I actively contribute to open-source 
          projects, enhancing my skills while giving back to the community. Driven by curiosity and a commitment to growth, 
          I'm excited to shape a future where technology and creativity come together to make an impact.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.section}>
        <h2 className={styles.sectionTitle}>My Skills</h2>
        <div className={styles.skillsContainer}>
          {/* Languages */}
          <div className={styles.skillCard}>
            <img
              src="/programming.png"
              alt="Languages Icon"
              className={styles.skillIcon}
              width={60}
              height={60}
            />
            <h3>Languages</h3>
            <ul className={styles.skillList}>
              <li>
                <img src="/java.png" alt="Java Icon" className={styles.skillSubIcon} width={24} height={24} /> Java
              </li>
              <li>
                <img src="/python.png" alt="Python Icon" className={styles.skillSubIcon} width={24} height={24} /> Python
              </li>
              <li>
                <img src="/c.png" alt="C Icon" className={styles.skillSubIcon} width={24} height={24} /> C
              </li>
              <li>
                <img src="/c-.png" alt="C++ Icon" className={styles.skillSubIcon} width={24} height={24} /> C++
              </li>
            </ul>
          </div>

          {/* Frontend */}
          <div className={styles.skillCard}>
            <img
              src="/frontend.png"
              alt="Frontend Icon"
              className={styles.skillIcon}
              width={60}
              height={60}
            />
            <h3>Frontend</h3>
            <ul className={styles.skillList}>
              <li>
                <img src="/html-5.png" alt="HTML Icon" className={styles.skillSubIcon} width={24} height={24} /> HTML5
              </li>
              <li>
                <img src="/css-3.png" alt="CSS Icon" className={styles.skillSubIcon} width={24} height={24} /> CSS3
              </li>
              <li>
                <img src="/js.png" alt="JavaScript Icon" className={styles.skillSubIcon} width={24} height={24} /> JavaScript
              </li>
              <li>
                <img src="/react.png" alt="React Icon" className={styles.skillSubIcon} width={24} height={24} /> React.js
              </li>
              <li>
                <img src="/nextjs.png" alt="Next Icon" className={styles.skillSubIcon} width={24} height={24} /> Next.js
              </li>
            </ul>
          </div>

          {/* Backend */}
          <div className={styles.skillCard}>
            <img
              src="/backend.png"
              alt="Backend Icon"
              className={styles.skillIcon}
              width={60}
              height={60}
            />
            <h3>Backend</h3>
            <ul className={styles.skillList}>
              <li>
                <img src="/node.png" alt="Node.js Icon" className={styles.skillSubIcon} width={24} height={24} /> Node.js
              </li>
              <li>
                <img src="/express.png" alt="Express Icon" className={styles.skillSubIcon} width={24} height={24} /> Express.js
              </li>
            </ul>
          </div>

          {/* Database */}
          <div className={styles.skillCard}>
            <img
              src="/database.png"
              alt="Database Icon"
              className={styles.skillIcon}
              width={60}
              height={60}
            />
            <h3>Database</h3>
            <ul className={styles.skillList}>
              <li>
                <img src="/sql.png" alt="MySQL Icon" className={styles.skillSubIcon} width={24} height={24} /> MySQL
              </li>
              <li>
                <img src="/mongodb.png" alt="MongoDB Icon" className={styles.skillSubIcon} width={24} height={24} /> MongoDB
              </li>
              <li>
                <img src="/neo4j.png" alt="Neo4j Icon" className={styles.skillSubIcon} width={24} height={24} /> Neo4j
              </li>
              <li>
                <img src="/postgresql.png" alt="PostgreSQL Icon" className={styles.skillSubIcon} width={24} height={24} /> PostgreSQL
              </li>
            </ul>
          </div>

          {/* AI/ML Frameworks */}
          <div className={styles.skillCard}>
            <img
              src="/aiml.png"
              alt="AI/ML Icon"
              className={styles.skillIcon}
              width={60}
              height={60}
            />
            <h3>AI/ML Frameworks</h3>
            <ul className={styles.skillList}>
              <li>
                <img src="/tensorflow.png" alt="TensorFlow Icon" className={styles.skillSubIcon} width={24} height={24} /> TensorFlow
              </li>
              <li>
                <img src="/pytorch.png" alt="PyTorch Icon" className={styles.skillSubIcon} width={24} height={24} /> PyTorch
              </li>
              <li>
                <img src="/classifiers.png" alt="Classifiers Icon" className={styles.skillSubIcon} width={24} height={24} /> Classifiers
              </li>
              <li>
                <img src="/regressors.png" alt="Regressors Icon" className={styles.skillSubIcon} width={24} height={24} /> Regressors
              </li>
              <li>
                <img src="/neural network.png" alt="Neural Networks Icon" className={styles.skillSubIcon} width={24} height={24} /> Neural Networks
              </li>
            </ul>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectsGrid}>
          {/* Project 1 */}
          <div className={styles.projectCard}>
            <img
              src="/AI_Resume.png"
              alt="Project 1 Preview"
              className={styles.projectImage}
            />
            <div className={styles.projectContent}>
              <h3>PerspectAI</h3>
              <p>An AI Powered Resume Analyzer which provides insights of your Resume.</p>
              <a
                href="https://github.com/Kishore-1803/PerspectAI"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div className={styles.projectCard}>
            <img
              src="/podcast.jpg"
              alt="Project 2 Preview"
              className={styles.projectImage}
            />
            <div className={styles.projectContent}>
              <h3>AudioAura</h3>
                <p>A Podcast Generator That Provides News And Weather Updates Using APIs. The Frontend is Built With React, The Backend with Express, and MongoDB is Used For The Database.</p>
              <a
                href="https://github.com/Kishore-1803/AudioAura"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                View on GitHub
              </a>
            </div>
          </div>
           {/* Project 3 */}
          <div className={styles.projectCard}>
            <img
              src="/Fraud.jpg"
              alt="Project 3 Preview"
              className={styles.projectImage}
            />
            <div className={styles.projectContent}>
              <h3>Fraud Detection in Financial Networks</h3>
              <p>A project to detect fraudulent transactions in financial networks using Logistic Regression.</p>
              <a
                href="https://github.com/Kishore-1803/Fraud-Detection-in-Financial-Networks"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                View on GitHub
              </a>
            </div>
          </div>
          {/* Add more project cards as needed */}
        </div>
      </section>


     {/* Social Section */}
      <section id="social" className={styles.section}>
        <h2 className={styles.sectionTitle}>Connect With Me</h2>
        <div className={styles.socialLinks}>
          <a
            href="https://www.facebook.com/profile.php?id=100017656030709"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/facebook.png" alt="Facebook" className={styles.socialIcon} />
            Facebook
          </a>
          <a
            href="https://www.instagram.com/kishore_balaji_03/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/instagram.png" alt="Instagram" className={styles.socialIcon} />
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/kishore-balaji-081168292/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/linkedin.png" alt="LinkedIn" className={styles.socialIcon} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Kishore-1803"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/github (1).png" alt="GitHub" className={styles.socialIcon} />
            GitHub
          </a>
        </div>
      </section>


      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Kishore. All rights reserved.</p>
      </footer>
    </div>
  );
}
