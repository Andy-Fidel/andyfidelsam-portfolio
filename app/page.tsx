import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import ScrollReveals from "./scroll-reveals";
import styles from "./portfolio.module.css";
export const metadata: Metadata = {
    title: "Andy-Fidel Samuel — Full-stack Product Engineer",
    description: "Portfolio of Andy-Fidel Samuel, a full-stack product engineer building dependable, human-centred software for teams and institutions.",
};
type Project = {
    number: string;
    title: string;
    type: string;
    description: string;
    outcome: string;
    stack: string[];
    repoHref: string;
    liveHref?: string;
    preview?: string;
    previewAlt?: string;
    accent: string;
    visual: string;
};
const projects: Project[] = [
    {
        number: "01",
        title: "ActionPlan360",
        type: "Public sector operations",
        description: "An annual action-plan platform for Ghana TVET Service—bringing regional planning, approvals, quarterly reporting and headquarters oversight into one accountable workflow.",
        outcome: "Multi-tenant planning, scoped analytics & report exports",
        stack: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma"],
        repoHref: "https://github.com/Andy-Fidel/gtvets-actionplan360",
        accent: "acid",
        visual: "plan",
    },
    {
        number: "02",
        title: "TaskKollecta",
        type: "Real-time collaboration",
        description: "A premium project-management workspace with Kanban, timelines, automations and live collaboration—designed to help teams see the work and move it forward.",
        outcome: "Real-time sync, PWA, RBAC & automation engine",
        stack: ["React 19", "Node.js", "MongoDB", "Redis", "Socket.IO"],
        repoHref: "https://github.com/Andy-Fidel/TaskKollecta",
        liveHref: "https://taskkollecta.com",
        preview: "/taskkollecta-preview.png",
        previewAlt: "TaskKollecta website homepage",
        accent: "coral",
        visual: "tasks",
    },
    {
        number: "03",
        title: "GTVET WEL Dashboard",
        type: "Programme intelligence",
        description: "A full-stack monitoring dashboard for a work-based experiential learning programme, with field data, administration and decision-ready reporting in one deployable system.",
        outcome: "Production deployment, PWA push & IDMS integration",
        stack: ["React", "Vite", "Express", "MongoDB", "Web Push"],
        repoHref: "https://github.com/Andy-Fidel/gtvet-wel-dashboard",
        accent: "blue",
        visual: "analytics",
    },
    {
        number: "04",
        title: "SchoolFinder Ghana",
        type: "Education technology",
        description: "A searchable guide to Ghana’s second-cycle schools, pairing a verified national register with rule-aware placement choices for students and families.",
        outcome: "955-school data pipeline & rule-checked selection",
        stack: ["Laravel", "React", "TypeScript", "MySQL", "Queues"],
        repoHref: "https://github.com/Andy-Fidel/schoolfindergh",
        liveHref: "https://schoolfindergh.com",
        preview: "/schoolfinder-ghana-preview.png",
        previewAlt: "SchoolFinder Ghana website homepage",
        accent: "gold",
        visual: "schools",
    },
    {
        number: "05",
        title: "GTVETS Institution Portal",
        type: "National education directory",
        description: "Ghana’s central discovery hub for accredited technical and vocational institutions, training programmes, sector news and direct institution contact.",
        outcome: "Institution and programme discovery with admin publishing",
        stack: ["React", "Laravel", "MySQL", "Zustand", "Tailwind CSS"],
        repoHref: "https://github.com/Andy-Fidel/GTVET-Info-Portal",
        liveHref: "https://gtvets.info",
        preview: "/gtvets-institution-portal-preview.png",
        previewAlt: "GTVETS Institution Portal homepage",
        accent: "orange",
        visual: "portal",
    },
];
const services = [
    ["Product strategy", "Start with the real problem. Shape the workflow, define the scope, and build a clear path from idea to useful product."],
    ["UI/UX design", "Considered interfaces that make complex work feel simple. Clear hierarchy, thoughtful interactions, and care for the details."],
    ["Full-stack systems", "React and TypeScript on the surface; robust APIs, data models, permissions, queues and integrations underneath."],
    ["Production delivery", "Deployments, migrations, observability, security hardening and the details that make software dependable."],
];
function WhatsAppIcon() {
    return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a12 12 0 0 0 5.8 1.5c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4ZM12.1 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A9.9 9.9 0 0 1 2.1 12a10 10 0 1 1 10 10Zm5.5-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-1 1.1c-.1.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.2-.7.2-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z"/></svg>;
}
export default function Home() {
    return <main className={styles.page} id="top">
    <ScrollReveals />
    <a className={styles.skip} href="#expertise">Skip introduction</a>
    <header className={styles.navigation}>
      <a className={styles.brand} href="#top" aria-label="Andy-Fidel Samuel, home">
        <span className={styles.monogram}>AF<span>.</span></span>
        <span className={styles.identity}>Andy-Fidel Samuel<small>Full-stack product engineer</small></span>
      </a>
      <nav className={styles.navLinks} aria-label="Primary navigation">
        <a href="#expertise">Expertise</a><a href="#work">Work</a><a href="#about">About</a>
        <a href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
    <div className={styles.stage}>
      <aside className={styles.portraitRail} aria-label="Portrait of Andy-Fidel Samuel">
        <figure className={styles.portraitFigure}>
          <Image className={styles.portraitImage} src="/andy-seated-cutout.webp" alt="Andy-Fidel Samuel, seated in a white shirt and mustard trousers" fill sizes="(max-width: 700px) 95vw, 58vw" priority unoptimized/>
        </figure>
        <div className={styles.portraitCaption}><span>Based in Accra, Ghana<br />Building for the real world.</span><span><i />Open to projects</span></div>
      </aside>
      <div className={styles.story}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.mobileHeroPortrait} aria-hidden="true">
            <Image className={styles.portraitImage} src="/andy-seated-cutout.webp" alt="" fill sizes="95vw" unoptimized />
          </div>
          <p className={styles.eyebrow}>Independent engineer. End-to-end partner.</p>
          <h1 id="hero-heading"><span>I build</span><span>digital</span><span>products.</span></h1>
          <p className={styles.heroLead}>Dependable software for institutions, organisations and growing teams.</p>
          <div className={styles.heroActions}>
            <a className={styles.button} href="https://wa.me/233547525493" target="_blank" rel="noreferrer">Let’s talk <span aria-hidden="true">↗</span></a>
            <a className={styles.textLink} href="#work">Explore my work <span aria-hidden="true">↓</span></a>
          </div>
          <div className={styles.heroBottom}><a href="#expertise">Scroll to discover <span aria-hidden="true">↓</span></a><span>Strategy / Design / Engineering</span></div>
        </section>
        <aside className={styles.mobilePortraitPanel} aria-label="Your project partner">
          <a className={styles.mobilePortraitIdentity} href="#contact">
            <span className={styles.mobilePortraitBrand}>AF<span>.</span></span>
            <strong>Andy-Fidel<br />Samuel</strong>
            <small>Your idea.<br />Built for the real world.</small>
            <span className={styles.mobilePortraitContact}>Let’s talk ↗</span>
          </a>
          <div className={styles.mobilePortraitFrame}>
            <Image className={styles.portraitImage} src="/andy-seated-cutout.webp" alt="Andy-Fidel Samuel, your product engineering partner" fill sizes="65vw" unoptimized />
          </div>
        </aside>
        <section className={`${styles.chapter} ${styles.skills}`} id="expertise" aria-labelledby="skills-heading">
          <div className={styles.chapterLabel}><span>01 / What I do</span><span>From idea to delivery</span></div>
          <div className={styles.reveal} data-reveal>
            <h2 className={styles.sectionTitle} id="skills-heading">One partner.<br /><em>Every detail.</em></h2>
            <p className={styles.sectionLead}>From the first conversation to the production system. I connect product thinking, thoughtful design, and dependable engineering.</p>
          </div>
          {services.map(([title, copy], index) => <article className={`${styles.skill} ${styles.reveal}`} data-reveal key={title}><span className={styles.skillNumber}>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          <div className={styles.tools} aria-label="Technologies I work with">{["React", "TypeScript", "Next.js", "Node.js", "Laravel", "PostgreSQL", "MongoDB", "Docker", "Vercel"].map(tool => <span key={tool}>{tool}</span>)}</div>
        </section>
        <section className={`${styles.chapter} ${styles.work}`} id="work" aria-labelledby="work-heading">
          <div className={styles.chapterLabel}><span>02 / Selected work</span><span>2026 collection</span></div>
          <div className={styles.reveal} data-reveal><h2 className={styles.sectionTitle} id="work-heading">Built for<br /><em>the real world.</em></h2><p className={styles.sectionLead}>Real workflows. Considered interfaces. Systems built to keep working after launch.</p></div>
          <div className={styles.projects}>
            {projects.map(project => <article className={`${styles.project} ${styles.reveal}`} data-reveal key={project.title}>
              <div className={styles.projectMedia} style={{ "--project-accent": ({ acid: "#d1ed8c", coral: "#f4aa8c", blue: "#bdd5e8", gold: "#edcf83", orange: "#e9af87" } as Record<string, string>)[project.accent] } as CSSProperties}>
                <small>{project.preview ? "Live product" : "Interface concept"}</small>
                {project.preview ? <Image src={project.preview} alt={project.previewAlt ?? project.title} width={1000} height={573} sizes="(max-width: 700px) calc(100vw - 80px), 43vw"/> : <div>
                  <div className={styles.previewUI} aria-hidden="true">
                    <div className={styles.previewTop}><span>{project.visual === "plan" ? "ActionPlan360 / Overview" : "WEL / Programme pulse"}</span><span>•••</span></div>
                    {project.visual === "plan" ? <><strong>84%</strong><p>Quarterly execution</p><progress value="84" max="100"/><div className={styles.previewRegions}><span>HQ overview</span><span>16 regions</span><span>Q3 report</span></div></> : <><div className={styles.chart}><i /><i /><i /><i /><i /></div><p>Programme monitoring / Reporting / Insights</p></>}
                  </div>
                  <p className={styles.demoLabel}>Illustrative interface · not live reporting data</p>
                </div>}
              </div>
              <div className={styles.projectCopy}>
                <div className={styles.projectMeta}><span>{project.number} / {project.type}</span><span aria-hidden="true">↗</span></div>
                <h3>{project.title}</h3><p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectOutcome}><b>Key delivery</b>{project.outcome}</div>
                <ul className={styles.projectStack} aria-label="Technology stack">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
                <div className={styles.projectLinks}>
                  {project.liveHref && <a href={project.liveHref} target="_blank" rel="noreferrer">Visit {project.liveHref.replace("https://", "")} <span aria-hidden="true">↗</span></a>}
                  <a href={project.repoHref} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>)}
          </div>
        </section>
        <section className={`${styles.chapter} ${styles.about}`} id="about" aria-labelledby="about-heading">
          <div className={styles.chapterLabel}><span>03 / The person behind the work</span></div>
          <div className={styles.reveal} data-reveal>
            <h2 className={styles.sectionTitle} id="about-heading">An engineer.<br /><em>An operator’s mindset.</em></h2>
            <p>I’m Andy-Fidel Samuel, a full-stack product engineer based in Accra, Ghana. I care about software after launch: who can use it, how it handles messy data, and how confidently a team can run it.</p>
            <p>My work spans public-sector planning, education, programme monitoring, church operations, and team collaboration. The common thread: understand the real workflow, remove friction, and build the system to last.</p>
            <div className={styles.aboutLinks}><a className={styles.textLink} href="https://github.com/Andy-Fidel" target="_blank" rel="noreferrer">GitHub ↗</a><a className={styles.textLink} href="mailto:andyfidelsam@gmail.com">Email me ↗</a></div>
          </div>
        </section>
      </div>
    </div>
    <footer className={styles.footer} id="contact">
      <p className={styles.eyebrow}>Have an idea or a meaningful problem to solve?</p>
      <div className={styles.footerTop}><h2>Let’s build<br />something <span>useful.</span></h2><a className={styles.button} href="https://wa.me/233547525493" target="_blank" rel="noreferrer">Start a conversation ↗</a></div>
      <div className={styles.contactGrid}>
        <div><small>WhatsApp / Call</small><a href="https://wa.me/233547525493" target="_blank" rel="noreferrer"><WhatsAppIcon />054 752 5493</a></div>
        <div><small>Email</small><a href="mailto:andyfidelsam@gmail.com">andyfidelsam@gmail.com ↗</a></div>
        <div><small>Find me online</small><a href="https://github.com/Andy-Fidel" target="_blank" rel="noreferrer">github.com/Andy-Fidel ↗</a></div>
      </div>
      <div className={styles.footerMeta}><span>© {new Date().getFullYear()} Andy-Fidel Samuel</span><span>Accra, Ghana · GMT</span><a href="#top">Back to top ↑</a></div>
    </footer>
  </main>;
}
