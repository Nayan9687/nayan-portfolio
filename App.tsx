
import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  githubLink: string;
}

interface GalleryItem {
  src: string;
  title: string;
  category: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  result: string;
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    title: "Sici Technologies",
    description: "A professional corporate website for an IT solutions company. Built with a focus on clean aesthetics, responsive layouts, and performance optimization.",
    image: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/sici.png",
    tags: ["WordPress", "HTML", "CSS", "UI/UX"],
    liveLink: "https://sicitechnologies.com/",
    githubLink: "#"
  },
  {
    title: "Eduzone Frontend",
    description: "An educational platform designed for seamless learning. Features include course management, user dashboards, and interactive learning modules.",
    image: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/eduzone.png",
    tags: ["React", "Bootstrap", "JavaScript"],
    liveLink: "https://nayanchauhan2015.github.io/Eduzone_frontend/",
    githubLink: "https://github.com/nayanchauhan2015/Eduzone_frontend"
  },
  {
    title: "3D Portfolio",
    description: "My first interactive 3D portfolio using Three.js to showcase creative work in an immersive digital environment.",
    image: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/first_portfolio.png",
    tags: ["Three.js", "WebGL", "Creative Dev"],
    liveLink: "https://nayanchauhan2015.github.io/my3dportfolio/",
    githubLink: "https://github.com/nayanchauhan2015/my3dportfolio"
  }
];

const GALLERY_IMAGES: GalleryItem[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    src: `https://ik.imagekit.io/4awlyo9bf/images/LOGO/${i + 1}.png`,
    title: `Identity Concept ${i + 1}`,
    category: "logo"
  })),
  ...Array.from({ length: 18 }, (_, i) => ({
    src: `https://ik.imagekit.io/4awlyo9bf/images/POST/${i + 1}.png`,
    title: `Digital Marketing Asset ${i + 1}`,
    category: "social"
  })),
  { src: "https://ik.imagekit.io/4awlyo9bf/images/UIUX/post%20size%20.png", title: "Mobile UI Architecture", category: "uiux" },
  { src: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/sici.png", title: "Corporate Web Framework", category: "web" },
  { src: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/eduzone.png", title: "LMS Frontend Prototype", category: "web" },
  { src: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/first_portfolio.png", title: "3D Visual Experience", category: "web" },
  ...Array.from({ length: 5 }, (_, i) => ({
    src: `https://ik.imagekit.io/4awlyo9bf/images/PRODUCTS/${i + 1}.png`,
    title: `Product Packaging ${i + 1}`,
    category: "packaging"
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `https://ik.imagekit.io/4awlyo9bf/images/CARDS/${i + 1}.png`,
    title: `Professional Stationery ${i + 1}`,
    category: "cards"
  })),
  ...[1, 2, 4, 6, 7, 8, 10, 12, 13, 15].map(n => ({
    src: `https://ik.imagekit.io/4awlyo9bf/images/MOCKUPS/LL1%20(${n}).png`,
    title: `Apparel Brand Visual ${n}`,
    category: "mockups"
  }))
];

const GALLERY_CATEGORIES: Category[] = [
  { id: 'logo', title: 'Logo Design', description: 'Corporate & Creative Branding', image: 'https://ik.imagekit.io/4awlyo9bf/images/LOGO/1.png' },
  { id: 'social', title: 'Social Media Design', description: 'High-Impact Digital Marketing', image: 'https://ik.imagekit.io/4awlyo9bf/images/POST/17.png' },
  { id: 'uiux', title: 'UI/UX Design', description: 'User-Centric App Interfaces', image: 'https://ik.imagekit.io/4awlyo9bf/images/UIUX/post%20size%20.png' },
  { id: 'web', title: 'Web Design', description: 'Modern & Responsive Web Experiences', image: 'https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/sici.png' },
  { id: 'packaging', title: 'Packaging Design', description: 'Product Brand & Print Identity', image: 'https://ik.imagekit.io/4awlyo9bf/images/PRODUCTS/1.png' },
  { id: 'cards', title: 'Cards Design', description: 'Professional Business Cards', image: 'https://ik.imagekit.io/4awlyo9bf/images/CARDS/1.png' },
  { id: 'mockups', title: 'Mockups Design', description: 'Visual Brand Realization', image: 'https://ik.imagekit.io/4awlyo9bf/images/MOCKUPS/LL1%20(7).png' },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Graphic Designer & Shopify Expert",
    company: "Kuhluh Clothing Brand | Pune",
    date: "Aug 2024 - Jan 2025",
    description: [
      "Designed innovative graphic elements for apparel and brand marketing.",
      "Customized Shopify themes and optimized product listings for conversions.",
      "Managed social media visual assets and campaign branding."
    ]
  },
  {
    title: "WordPress Developer & Graphic Designer",
    company: "E6Websolutions | Pune",
    date: "May 2023 - July 2024",
    description: [
      "Built several full-scale WordPress websites for corporate and e-commerce clients.",
      "Customized plugins and child themes with PHP, HTML5, and CSS3.",
      "Developed comprehensive brand identities including logos and brochures."
    ]
  }
];

const INTERNSHIPS: ExperienceItem[] = [
  {
    title: "Java Full Stack Developer Intern",
    company: "TATA Strive | Anand",
    date: "Jan 2023 - April 2023",
    description: [
      "Worked on full-stack web applications using Java, Spring Boot, and React.js.",
      "Developed RESTful APIs and integrated them with frontend components.",
      "Gained hands-on experience in Agile development methodologies."
    ]
  },
  {
    title: "Front-end Development Intern",
    company: "Kathan Technologies | Nadiad",
    date: "2022",
    description: [
      "Collaborated on responsive UI development using HTML, CSS, and Bootstrap.",
      "Assisted in testing and debugging front-end components.",
      "Participated in client meetings to understand design requirements."
    ]
  }
];

const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Engineering (IT)",
    institution: "Sardar Patel College of Engineering",
    duration: "2018 - 2022",
    result: "7.23 CGPA"
  },
  {
    degree: "HSC [12 TH]",
    institution: "National Institute of Open Schooling (NIOS)",
    duration: "2017",
    result: "61.00%"
  },
  {
    degree: "SSC [10 TH]",
    institution: "G.E.B. High School",
    duration: "2015",
    result: "63.83%"
  }
];

const MENU_ITEMS = ['Home', 'About', 'Education', 'Experience', 'Projects', 'Gallery', 'Contact'];

// --- Components ---

const Card3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };
  return (
    <div ref={cardRef} className={`card-3d relative transition-all duration-500 overflow-hidden ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="card-shine"></div>
      {children}
    </div>
  );
};

const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section id={id} ref={ref} className={`section-reveal ${visible ? 'visible' : ''} ${className}`}>{children}</section>;
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.body.classList.remove('dark');
    } else {
      setIsDark(true);
      document.body.classList.add('dark');
    }
    
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const ThemeToggle = () => (
    <button 
      onClick={toggleTheme}
      className="p-3 rounded-lg glass-card transition-all hover:scale-110 active:scale-95 flex items-center justify-center group border border-white/5"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <i className="ri-sun-fill text-xl text-primary group-hover:rotate-90 transition-transform duration-700"></i>
      ) : (
        <i className="ri-moon-fill text-xl text-secondary group-hover:-rotate-12 transition-transform duration-700"></i>
      )}
    </button>
  );

  const openFullArchive = () => {
    setActiveCategory(null);
    setIsGalleryOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-primary/20`}>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-6xl px-4 hidden lg:block">
        <nav className="glass-card px-10 py-5 rounded-2xl flex items-center justify-between border-white/5 shadow-2xl">
          <div onClick={(e) => scrollToSection(e, 'home')} className="text-2xl font-black cursor-pointer tracking-tight group flex items-center">
            <span className="gradient-text group-hover:opacity-80 transition-opacity animate-logo-3d brand-logo-3d title-font">NAYAN</span>
          </div>
          <div className="flex space-x-8">
            {MENU_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => scrollToSection(e, item)} className="text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-dark text-[10px] font-bold uppercase tracking-[0.25em] transition-all relative group/link">
                {item}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all"></span>
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800"></div>
            <a href="https://github.com/Nayan9687" target="_blank" className="text-zinc-400 hover:text-primary transition-all hover:-translate-y-1"><i className="ri-github-fill text-2xl"></i></a>
            <a href="https://www.linkedin.com/in/nayan-chauhan-50334230b" target="_blank" className="text-zinc-400 hover:text-primary transition-all hover:-translate-y-1"><i className="ri-linkedin-fill text-2xl"></i></a>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] ${isDark ? 'bg-darkBg/98' : 'bg-lightBg/98'} backdrop-blur-3xl transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isMenuOpen ? 'clip-path-full' : 'clip-path-circle'}`} style={{ clipPath: isMenuOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}>
        <div className="p-10 flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-16">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(false)} className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-primary shadow-xl"><i className="ri-close-line text-3xl"></i></button>
          </div>
          <nav className="flex flex-col space-y-8 text-5xl font-black tracking-tighter title-font">
            {MENU_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => scrollToSection(e, item)} className="hover:text-primary dark:text-white text-zinc-900 transition-colors uppercase group flex items-center gap-6">
                {item}
                <i className="ri-arrow-right-line opacity-0 group-hover:opacity-100 transition-all text-3xl"></i>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="fixed top-6 right-6 z-50 lg:hidden flex items-center space-x-4">
        <ThemeToggle />
        <button onClick={() => setIsMenuOpen(true)} className="glass-card w-14 h-14 rounded-xl flex items-center justify-center text-primary shadow-2xl"><i className="ri-menu-3-line text-2xl"></i></button>
      </div>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center pt-32 lg:pt-48">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block glass-card px-8 py-3 rounded-full text-[11px] font-black text-primary mb-12 uppercase tracking-[0.5em] shadow-xl animate-item-reveal mt-12 lg:mt-0">
             IT Engineer
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-10 tracking-tighter leading-[0.8] dark:text-white text-zinc-900 title-font">CHAUHAN <span className="gradient-text">NAYAN</span></h1>
          <h2 className="text-xl md:text-3xl text-zinc-400 dark:text-zinc-500 font-bold mb-16 tracking-[0.5em] uppercase">Visual Innovation</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto mb-20 leading-relaxed font-medium">Melding modern development with striking visual strategy for a seamless digital presence.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <button onClick={(e) => scrollToSection(e, 'projects')} className="group bg-primary hover:bg-primary-dark text-slate-900 font-bold px-14 py-6 rounded-xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/30 flex items-center gap-4">
              Explore Projects
              <i className="ri-rocket-2-fill text-lg"></i>
            </button>
            <button onClick={(e) => scrollToSection(e, 'contact')} className="glass-card text-zinc-900 dark:text-white px-14 py-6 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-white/5">Start Conversation</button>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-28 items-center">
            <div className="w-full lg:w-5/12">
              <div className="relative group">
                <Card3D className="glass-card rounded-[3rem] p-4 relative overflow-hidden shadow-2xl border-white/5">
                  <img src="https://ik.imagekit.io/4awlyo9bf/images/my_photo_Last.png" alt="Nayan" className="w-full rounded-[2rem] transition-all duration-1000 group-hover:scale-105" />
                </Card3D>
              </div>
            </div>
            <div className="w-full lg:w-7/12">
              <h2 className="text-6xl font-black mb-14 dark:text-white text-zinc-900 tracking-tight leading-none title-font">About <span className="gradient-text">Me</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-20">
                {[{ label: 'IDENTITY', val: 'Nayan Chauhan', icon: 'ri-fingerprint-line' }, { label: 'CONNECT', val: 'nayanchauhan11111@gmail.com', icon: 'ri-mail-send-line' }, { label: 'VOICE', val: '+91 8200701016', icon: 'ri-phone-line' }, { label: 'REGION', val: 'Nadiad, Gujarat', icon: 'ri-map-pin-2-line' }].map(item => (
                  <div key={item.label} className="group flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all shadow-xl"><i className={item.icon + " text-2xl"}></i></div>
                    <div>
                      <p className="text-[10px] font-black text-primary tracking-[0.25em] mb-2 uppercase opacity-60">{item.label}</p>
                      <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-primary transition-colors break-all leading-tight">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-card p-12 rounded-3xl mb-16 border-l-8 border-l-primary shadow-2xl">
                <p className="text-zinc-600 dark:text-zinc-300 text-xl leading-relaxed font-medium">
                  My goal is to obtain a challenging position in an organization where I can utilize my technical and creative skills for the growth of the organization and myself. I am passionate about creating clean, modern interfaces and strong brand identities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" className="py-32 bg-zinc-50 dark:bg-zinc-900/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black mb-20 dark:text-white text-zinc-900 title-font">Academic <span className="gradient-text">Journey</span></h2>
          <div className="max-w-4xl mx-auto space-y-10">
            {EDUCATION.map((edu, idx) => (
              <Card3D key={idx} className="glass-card p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10 text-left border-white/5">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-4xl shrink-0"><i className="ri-graduation-cap-line"></i></div>
                <div>
                  <h3 className="text-2xl font-black title-font">{edu.degree}</h3>
                  <p className="text-zinc-500 font-bold mb-2">{edu.institution}</p>
                  <div className="flex gap-4">
                    <span className="text-[10px] font-black bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full uppercase tracking-widest">{edu.duration}</span>
                    <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">Result: {edu.result}</span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </Section>

      {/* Internship Section */}
      <Section id="internship" className="py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black mb-20 dark:text-white text-zinc-900 title-font">Technical <span className="gradient-text">Internships</span></h2>
          <div className="max-w-4xl mx-auto space-y-10">
            {INTERNSHIPS.map((exp, idx) => (
              <Card3D key={idx} className="glass-card p-10 rounded-3xl flex flex-col md:flex-row items-start gap-10 text-left border-white/5">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-4xl shrink-0"><i className="ri-terminal-window-line"></i></div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h3 className="text-2xl font-black title-font">{exp.title}</h3>
                    <span className="text-[11px] font-black text-accent uppercase tracking-widest">{exp.date}</span>
                  </div>
                  <p className="text-zinc-500 font-bold mb-4 uppercase text-xs tracking-widest">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((d, i) => (
                      <li key={i} className="text-zinc-400 text-sm flex gap-3"><i className="ri-check-line text-accent"></i> {d}</li>
                    ))}
                  </ul>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" className="py-32 bg-zinc-50 dark:bg-zinc-900/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black mb-20 dark:text-white text-zinc-900 title-font">Chronological <span className="gradient-text">Journal</span></h2>
          <div className="max-w-4xl mx-auto space-y-10">
            {EXPERIENCES.map((exp, idx) => (
              <Card3D key={idx} className="glass-card p-10 rounded-3xl flex flex-col md:flex-row items-start gap-10 text-left border-white/5">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-4xl shrink-0"><i className="ri-briefcase-line"></i></div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h3 className="text-2xl font-black title-font">{exp.title}</h3>
                    <span className="text-[11px] font-black text-primary uppercase tracking-widest">{exp.date}</span>
                  </div>
                  <p className="text-zinc-500 font-bold mb-4 uppercase text-xs tracking-widest">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((d, i) => (
                      <li key={i} className="text-zinc-400 text-sm flex gap-3"><i className="ri-check-line text-primary"></i> {d}</li>
                    ))}
                  </ul>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" className="py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-7xl font-black mb-28 dark:text-white text-zinc-900 tracking-tighter leading-none title-font">Core <span className="gradient-text">Vault</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
            {PROJECTS.map((p, idx) => (
              <Card3D key={idx} className="glass-card rounded-[3.5rem] group flex flex-col h-full overflow-hidden border-white/5 hover:-translate-y-4 shadow-2xl">
                <div className="aspect-[16/11] overflow-hidden relative">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="p-12 flex flex-col flex-1 relative z-10 bg-white/5 dark:bg-transparent backdrop-blur-md">
                  <div className="flex flex-wrap gap-3 mb-6">
                    {p.tags.map(t => <span key={t} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20">{t}</span>)}
                  </div>
                  <h3 className="text-3xl font-black mb-5 dark:text-white text-zinc-900 group-hover:text-primary transition-colors leading-none tracking-tight title-font">{p.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-base mb-14 flex-1 leading-relaxed font-medium">{p.description}</p>
                  <a href={p.liveLink} target="_blank" className="relative group/btn flex items-center justify-center overflow-hidden bg-primary hover:bg-emerald-600 text-zinc-900 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-primary/30 active:scale-95 border-b-4 border-emerald-800/40 title-font">
                    <span className="relative z-10 flex items-center gap-3">
                      Live Project
                      <i className="ri-arrow-right-up-line text-xl group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"></i>
                    </span>
                  </a>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Showcase */}
      <Section id="gallery" className="py-32 bg-zinc-50 dark:bg-zinc-900/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-28">
            <h2 className="text-7xl font-black mb-10 dark:text-white text-zinc-900 tracking-tighter leading-none title-font">Visual <span className="gradient-text">Curations</span></h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Explore the systematic development of brand identities, high-conversion marketing materials, and intuitive interface designs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
            {GALLERY_CATEGORIES.map((cat, idx) => (
              <div 
                key={cat.id} 
                onClick={() => { setActiveCategory(cat.id); setIsGalleryOpen(true); }} 
                className="group cursor-pointer overflow-hidden rounded-[3.5rem] glass-card border-white/5 transition-all hover:-translate-y-5 shadow-2xl relative bg-white/5"
              >
                <div className="aspect-[1.3] overflow-hidden relative">
                  <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
                     <span className="text-white text-[11px] font-black uppercase tracking-[0.5em] mb-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 title-font">Explore Repository</span>
                  </div>
                </div>
                <div className="p-12 backdrop-blur-3xl border-t border-white/5 group-hover:bg-primary/5 transition-colors relative z-10">
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 title-font">{cat.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs font-black uppercase tracking-[0.2em]">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-28 text-center">
            <button 
              onClick={openFullArchive}
              className="group glass-card border-primary/20 text-zinc-900 dark:text-white px-16 py-8 rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] hover:bg-primary/10 transition-all flex items-center gap-6 mx-auto hover:scale-105 active:scale-95 shadow-xl title-font"
            >
              View Full Archive
              <i className="ri-archive-stack-fill text-2xl group-hover:rotate-12 transition-transform"></i>
            </button>
          </div>
        </div>
      </Section>

      {/* Gallery Modal - RESTORED & FULLY IMPLEMENTED */}
      {isGalleryOpen && (
        <div className={`fixed inset-0 z-[100] ${isDark ? 'bg-zinc-950/98 text-zinc-100' : 'bg-slate-50/98 text-zinc-950'} backdrop-blur-[80px] flex flex-col animate-fade-in overflow-hidden transition-all duration-700`}>
          <div className="container mx-auto h-full flex flex-col p-8 lg:p-24 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
              <div>
                <h3 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none title-font uppercase">
                  {activeCategory ? GALLERY_CATEGORIES.find(c => c.id === activeCategory)?.title : 'Complete Archive'}
                </h3>
                <p className="text-primary text-xs mt-4 font-black tracking-[0.4em] uppercase opacity-70">Curated Design Systems & Digital Assets</p>
              </div>
              <button 
                onClick={() => setIsGalleryOpen(false)} 
                className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-zinc-400 hover:text-primary transition-all active:scale-90 border-white/10 group shadow-2xl"
              >
                 <i className="ri-close-fill text-4xl group-hover:rotate-90 transition-transform"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar pb-32">
              {(activeCategory ? [activeCategory] : GALLERY_CATEGORIES.map(c => c.id)).map((catId, catIdx) => {
                const categoryItems = GALLERY_IMAGES.filter(img => img.category === catId);
                const categoryInfo = GALLERY_CATEGORIES.find(c => c.id === catId);
                
                if (categoryItems.length === 0) return null;

                return (
                  <div key={catId} className="mb-24">
                    {!activeCategory && (
                      <div className="flex items-center gap-8 mb-12">
                         <h4 className="text-2xl font-black text-primary uppercase tracking-[0.4em] whitespace-nowrap title-font">{categoryInfo?.title}</h4>
                         <div className="h-px flex-1 bg-gradient-to-r from-primary/30 via-primary/5 to-transparent"></div>
                         <span className="text-zinc-500 font-black text-xs tracking-widest">{categoryItems.length} ITEMS</span>
                      </div>
                    )}
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                      {categoryItems.map((img, i) => (
                        <div 
                          key={`${catId}-${i}`} 
                          className="masonry-item glass-card rounded-[2.5rem] overflow-hidden group shadow-xl animate-item-reveal relative bg-white/5 border-white/5"
                          style={{ animationDelay: `${(i * 0.05) + (catIdx * 0.1)}s` }}
                        >
                          <div className="relative overflow-hidden cursor-zoom-in">
                             <img src={img.src} alt={img.title} className="w-full h-auto block transform transition-transform duration-700 group-hover:scale-105" />
                             <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                <p className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">{categoryInfo?.title}</p>
                                <p className="text-white/80 font-bold text-sm leading-tight">{img.title}</p>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-40 ${isDark ? 'bg-gradient-to-t from-zinc-950 to-transparent' : 'bg-gradient-to-t from-slate-50 to-transparent'} pointer-events-none`}></div>
          </div>
        </div>
      )}

      {/* Contact */}
      <Section id="contact" className="py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-6xl mx-auto glass-card rounded-[5rem] p-24 md:p-36 shadow-2xl relative overflow-hidden group border-white/5">
            <h2 className="text-7xl font-black mb-20 dark:text-white text-zinc-900 relative z-10 tracking-tighter leading-none title-font">LET'S <span className="gradient-text">SYNC</span></h2>
            <div className="flex flex-wrap justify-center gap-20 mb-28 relative z-10">
               {[
                 { icon: 'ri-at-line', val: 'nayanchauhan11111@gmail.com', label: 'Primary Node' },
                 { icon: 'ri-terminal-box-fill', val: '+91 8200701016', label: 'Direct Protocol' },
                 { icon: 'ri-global-fill', val: 'Nadiad, Gujarat', label: 'Base Sector' }
               ].map(c => (
                 <div key={c.val} className="flex flex-col items-center gap-6 group/icon">
                    <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center text-primary mb-4 transition-all group-hover/icon:scale-110 group-hover/icon:bg-primary group-hover/icon:text-slate-900 group-hover/icon:shadow-2xl group-hover/icon:shadow-primary/50"><i className={`${c.icon} text-4xl`}></i></div>
                    <p className="text-[12px] font-black text-zinc-400 uppercase tracking-[0.55em]">{c.label}</p>
                    <span className="font-bold text-zinc-800 dark:text-zinc-100 text-2xl md:text-3xl tracking-tight transition-colors group-hover/icon:text-primary leading-none">{c.val}</span>
                 </div>
               ))}
            </div>
            <a href="mailto:nayanchauhan11111@gmail.com" className="relative z-10 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-24 py-8 rounded-2xl font-black text-sm uppercase tracking-[0.5em] shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block hover:shadow-primary/30 border-b-4 border-primary/20 title-font">Establish Link</a>
          </div>
        </div>
      </Section>

      <footer className="py-28 text-center border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-transparent transition-all">
        <div className="mb-16 text-4xl font-black tracking-tighter group cursor-default title-font">
          <span className="gradient-text tracking-[-0.06em]">NAYAN CHAUHAN</span>
        </div>
        <div className="flex justify-center gap-8 mb-12">
           <a href="https://github.com/Nayan9687" target="_blank" className="text-zinc-400 hover:text-primary transition-all text-2xl"><i className="ri-github-fill"></i></a>
           <a href="https://www.linkedin.com/in/nayan-chauhan-50334230b" target="_blank" className="text-zinc-400 hover:text-primary transition-all text-2xl"><i className="ri-linkedin-fill"></i></a>
        </div>
        <p className="text-zinc-400 text-[11px] font-black tracking-[0.7em] uppercase flex items-center justify-center gap-10">
           &copy; 2025 Architectural Visuals & Engineering Systems
        </p>
      </footer>
    </div>
  );
};

export default App;
