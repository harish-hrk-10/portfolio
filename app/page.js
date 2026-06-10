'use client';

import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

const skillCategories = [
  {
    title: 'Technical Skills',
    items: [
      { label: 'Web Development', percent: 90 },
      { label: 'Data Analysis', percent: 75 },
      { label: 'Project Management', percent: 85 },
    ],
  },
  {
    title: 'Tools & Soft Skills',
    items: [
      { label: 'Communication', percent: 95 },
      { label: 'Problem Solving', percent: 80 },
      { label: 'Leadership', percent: 80 },
    ],
  },
];

const timelineItems = [
  {
    date: '2025',
    title: 'HTML and CSS',
    description: 'Designed and developed responsive web pages using HTML and CSS',
    subtext: 'Web Development (HTML & CSS)',
  },
  {
    date: '2025',
    title: 'C++',
    description: 'Learned C++ with focus on object-oriented concepts, loops, arrays, and functions',
    subtext: 'C++ Programming',
  },
  {
    date: '2025',
    title: 'Python',
    description: 'Gained strong fundamentals in Python, including variables, control statements, functions, and basic problem solving',
    subtext: 'Python Programming',
  },
];

const certifications = [
  {
    title: 'Build a natural language processing solution with Azure AI Language',
    issuer: 'Microsoft',
    date: 'December 2, 2024',
  },
  {
    title: 'Implement a data warehouse in Microsoft Fabric',
    issuer: 'Microsoft',
    date: 'December 20, 2024',
  },
  {
    title: 'Migrate SQL Server workloads to Azure SQL Database',
    issuer: 'Microsoft',
    date: 'December 3, 2024',
  },
];

const galleryItems = [
  {
    src: '/first.jpeg',
    alt: 'Award Ceremony',
    title: 'Complete 1st year',
    description: 'Completed the 1st year without any arrears.',
  },
  {
    src: '/second.png',
    alt: 'Presentation',
    title: 'Paper Presentation',
    description: 'My first Paper Presentation at the Symposium.',
  },
  {
    src: '/third.jpeg',
    alt: 'Leadership Award',
    title: 'Leader of club activity',
    description: 'Actively leading the club activities.',
  },
];

export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach((fill) => {
      const targetWidth = fill.getAttribute('data-width');
      fill.style.width = targetWidth || '0%';
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage('Your message was sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMessage(result.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatusMessage('Unable to send message at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav>
        <div className="logo">Harish</div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>
            Hi, I'm <br /> <span>Harish</span>
          </h1>
          <p>
            I’m Harish, from Thoothukudi, and I am currently pursuing my BCA degree at Kamaraj College.
            I have a strong interest in technology and web development, and I enjoy creating my own websites to improve my skills.
          </p>
          <a href="#contact" className="btn">
            Get in Touch
          </a>
          <a href="#achievements" className="btn secondary-btn">
            View Work
          </a>
        </div>
        <div className="hero-img-container">
          <img src="/hrk.jpeg" alt="Profile Photo" className="hero-img" />
        </div>
      </section>

      <section id="skills">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category">
              <h3>{category.title}</h3>
              {category.items.map((skill) => (
                <div key={skill.label} className="skill-bar-container">
                  <div className="skill-info">
                    <span>{skill.label}</span>
                    <span>{skill.percent}%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill" data-width={`${skill.percent}%`} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="timeline-container">
        <h2 className="section-title">Experience & Education</h2>
        <div className="timeline">
          {timelineItems.map((item) => (
            <div key={`${item.title}-${item.date}`} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certifications">
        <h2 className="section-title">Certifications</h2>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <div key={cert.title} className="cert-card">
              <i className="fas fa-certificate cert-icon" />
              <h3>{cert.title}</h3>
              <p>Issued by {cert.issuer}</p>
              <small>{cert.date}</small>
            </div>
          ))}
        </div>
      </section>

      <section id="achievements" style={{ backgroundColor: 'var(--bg-light)' }}>
        <h2 className="section-title">Achievements Gallery</h2>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.alt} className="gallery-item">
              <img src={item.src} alt={item.alt} />
              <div className="overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2 className="section-title">Contact</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-map-marker-alt" />
              <span>Thoothukudi, Tamil Nadu</span>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope" />
              <span>harishrathnakumar10@gmail.com</span>
            </div>
            <div className="info-item">
              <i className="fas fa-phone" />
              <span>+91 12345 67890</span>
            </div>
            <div className="social-links">
              <a href="#" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin" />
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
                <button className="btn" type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {statusMessage && (
              <p style={{ marginTop: '20px', color: 'var(--text-main)', fontWeight: 500 }}>
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} Harish. Built with Next.js.
      </footer>
    </>
  );
}
