import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Andy-Fidel Samuel — Full-stack Product Engineer",
  description:
    "Portfolio of Andy-Fidel Samuel, a full-stack product engineer building dependable, human-centred software for teams and institutions.",
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
    description:
      "An annual action-plan platform for Ghana TVET Service—bringing regional planning, approvals, quarterly reporting and headquarters oversight into one accountable workflow.",
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
    description:
      "A premium project-management workspace with Kanban, timelines, automations and live collaboration—designed to help teams see the work and move it forward.",
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
    description:
      "A full-stack monitoring dashboard for a work-based experiential learning programme, with field data, administration and decision-ready reporting in one deployable system.",
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
    description:
      "A searchable guide to Ghana’s second-cycle schools, pairing a verified national register with rule-aware placement choices for students and families.",
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
    description:
      "Ghana’s central discovery hub for accredited technical and vocational institutions, training programmes, sector news and direct institution contact.",
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

const capabilities = [
  {
    index: "01",
    title: "Product engineering",
    copy: "Turning a real operational need into a product that feels clear, capable and intentional—from first workflow to finished interface.",
  },
  {
    index: "02",
    title: "Full-stack systems",
    copy: "React and TypeScript on the surface; robust APIs, data models, permissions, queues and integrations underneath.",
  },
  {
    index: "03",
    title: "Production delivery",
    copy: "Deployments, migrations, observability, security hardening and the unglamorous details that make software dependable.",
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "plan") {
    return (
      <div className="project-ui plan-ui" aria-hidden="true">
        <div className="ui-bar"><span>ActionPlan / 2026</span><i /></div>
        <div className="stat-row"><b>84%</b><span>Quarterly execution</span></div>
        <div className="progress"><i /></div>
        <div className="mini-grid"><span>HQ overview</span><span>16 regions</span><span>Q3 report</span></div>
      </div>
    );
  }
  if (type === "tasks") {
    return (
      <div className="project-ui tasks-ui" aria-hidden="true">
        <div className="ui-bar"><span>Product launch</span><i /></div>
        <div className="task-columns">
          <div><em>TO DO · 3</em><span /><span /></div>
          <div><em>IN PROGRESS · 2</em><span /><span /></div>
          <div><em>DONE · 6</em><span /><span /></div>
        </div>
      </div>
    );
  }
  if (type === "analytics") {
    return (
      <div className="project-ui analytics-ui" aria-hidden="true">
        <div className="ui-bar"><span>Programme pulse</span><i /></div>
        <div className="chart"><span /><span /><span /><span /><span /><span /></div>
        <div className="chart-label"><b>1,248</b><span>Active learners</span></div>
      </div>
    );
  }
  return (
    <div className="project-ui schools-ui" aria-hidden="true">
      <div className="ui-bar"><span>Find your school</span><i /></div>
      <div className="search-line">Search 955 schools…</div>
      <div className="school-row"><b>PRESEC, Legon</b><span>Greater Accra</span></div>
      <div className="school-row"><b>Wesley Girls’ High</b><span>Central</span></div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="Andy-Fidel Samuel, home">
          <span>AF<span className="brand-dot">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#expertise">Expertise</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="mailto:andyfidelsam@gmail.com">
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="availability"><i /> Available for ambitious digital projects</div>
        <h1>
          I build digital products
          <span>that make complex work feel simple.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            I’m Andy-Fidel Samuel, a full-stack product engineer in Ghana. I design and ship dependable software for institutions, organisations and growing teams.
          </p>
          <a className="circle-link" href="#work" aria-label="Explore selected work">
            <span>Explore<br />work</span><b aria-hidden="true">↓</b>
          </a>
        </div>
        <div className="hero-marquee" aria-label="Core disciplines">
          <span>Strategy</span><i>✦</i><span>Product design</span><i>✦</i><span>Engineering</span><i>✦</i><span>Delivery</span>
        </div>
      </section>

      <section className="work-section shell" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work / 2026</p>
          <h2>Systems built for<br />the real world.</h2>
          <p className="section-intro">A selection of products where product thinking, technical depth and operational reality meet.</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.title}>
              <div className="project-card-inner">
                <div className="project-copy">
                  <div className="project-kicker"><span>{project.number}</span><span>{project.type}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="outcome"><span>Key delivery</span><b>{project.outcome}</b></div>
                  <ul aria-label="Technology stack">
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="project-actions">
                    {project.liveHref && (
                      <a href={project.liveHref} target="_blank" rel="noreferrer">
                        Visit {project.liveHref.replace("https://", "")} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    <a href={project.repoHref} target="_blank" rel="noreferrer">
                      View repository <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
                <div className="project-visual">
                  <span className="view-project">
                    {project.liveHref ? "Live product" : "Project preview"}
                  </span>
                  {project.preview ? (
                    <Image
                      className="project-screenshot"
                      src={project.preview}
                      alt={project.previewAlt ?? `${project.title} website preview`}
                      width={1680}
                      height={962}
                      sizes="(max-width: 980px) calc(100vw - 48px), 55vw"
                    />
                  ) : (
                    <ProjectVisual type={project.visual} />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section" id="expertise">
        <div className="shell">
          <div className="expertise-heading">
            <p className="eyebrow light">How I contribute</p>
            <h2>One partner.<br />End to end.</h2>
            <p>I work across the product lifecycle, keeping the user experience and the underlying system in the same conversation.</p>
          </div>
          <div className="capability-list">
            {capabilities.map((item) => (
              <article key={item.title}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="stack-line">
            <span>Often working with</span>
            <p>React · TypeScript · Node.js · Laravel · PostgreSQL · MongoDB · Redis · Docker · Vercel · Render</p>
          </div>
        </div>
      </section>

      <section className="about-section shell" id="about">
        <div className="about-portrait">
          <Image
            src="/andy-fidel-samuel.jpeg"
            alt="Portrait of Andy-Fidel Samuel"
            width={600}
            height={600}
            sizes="(max-width: 640px) calc(100vw - 32px), 46vw"
            loading="eager"
          />
          <span aria-hidden="true">AF.</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">A little context</p>
          <h2>Engineering with<br />an operator’s mindset.</h2>
          <p className="about-lead">
            I care about software after launch: who can use it, what happens when data gets messy, whether the permissions hold, and how confidently a team can run it.
          </p>
          <p>
            My work spans public-sector planning, education, programme monitoring, church operations and team collaboration. The common thread is simple: understand the real workflow, remove friction, and build the system to last.
          </p>
          <div className="about-links">
            <a href="https://github.com/Andy-Fidel" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            <a href="mailto:andyfidelsam@gmail.com">Email <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <p className="eyebrow light">Have a meaningful problem to solve?</p>
          <h2>Let’s build something<br /><span>useful.</span></h2>
          <a className="footer-cta" href="mailto:andyfidelsam@gmail.com">andyfidelsam@gmail.com <b>↗</b></a>
          <div className="footer-meta">
            <p>Andy-Fidel Samuel<br /><span>Full-stack Product Engineer</span></p>
            <p>Accra, Ghana<br /><span>GMT timezone</span></p>
            <p>© {new Date().getFullYear()}<br /><span>Designed & engineered with intent.</span></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
