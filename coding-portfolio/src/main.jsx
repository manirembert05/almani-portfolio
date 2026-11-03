import React, {useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,NavLink,Link,Routes,Route} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,Code2, Monitor, Github, Menu, X, Terminal, ShieldCheck, Mail, Sparkles, Layers, CheckCircle2, AlertCircle, LockKeyhole, LogOut, Trash2, ExternalLink} from 'lucide-react';
import {projects} from './projects';
import {supabase} from './supabase';
import './style.css';
import './retro-theme.css';
import './vista-grey.css';
const NAME='Almani Rembert';
const GITHUB='https://github.com/';
const skills=['JavaScript','React','Python','HTML' ,'Networking','Cybersecurity','SQL'];
function Header(){const[open,setOpen]=useState(false);return <header className="header"><div className="container nav"><Link className="brand" to="/" onClick={()=>setOpen(false)}><span className="brand-icon"><Monitor size={19}/></span><span>{NAME}</span></Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button><nav className={open?'links open':'links'}>{[['/','Home'],['/about','About'],['/projects','Projects'],['/feedback','Feedback']].map(([path,label])=><NavLink key={path} to={path} end={path==='/'} onClick={()=>setOpen(false)}>{label}</NavLink>)}<a className="nav-github" href={GITHUB} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a></nav></div></header>}
function Footer(){return <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} {NAME}. Built with React + Vite.</span><span>Designed to build, learn, and grow <span className="accent">✦</span></span></div></footer>}
function Heading({eyebrow,title,description}){return <div className="section-heading"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description&&<p>{description}</p>}</div>}
function ProjectCard({project}){return <article className="project-card"><div className={'project-visual visual-'+project.category.toLowerCase().replace(/\W+/g,'-')}><span className="project-glyph">{project.icon==='shield'?<ShieldCheck size={44}/>:project.icon==='chart'?<Layers size={44}/>:<Code2 size={44}/>}</span><span className="visual-number">0{project.id}</span></div><div className="project-content"><span className="category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="chips">{project.tech.map(t=><span key={t}>{t}</span>)}</div><div className="project-links">{project.github?<a href={project.github} target="_blank" rel="noreferrer"><Github size={16}/> Source code</a>:<span className="muted-link"><Github size={16}/> Code coming soon</span>}{project.demo?<a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={16}/></a>:null}</div></div></article>}

function ResumeTile({ large = false }) {
  return (
    <section className={`resume-tile ${large ? "resume-large" : ""}`}>
      <div className="resume-titlebar">
        <span>AlmaniRembert2.1.pdf</span>
        <span aria-hidden="true">_ □ ×</span>
      </div>

      <div className="resume-content">
        <div className="resume-icon">PDF</div>

        <div>
          <h2>My Resume</h2>
          <p>Almani Rembert | Computer Science</p>
          <p>
            Explore my education, technical skills,
            and professional experience.
          </p>

          <div className="resume-buttons">
            <a
              className="btn primary"
              href="/AlmaniRembert2.1.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>

            <a
              className="btn secondary"
              href="/AlmaniRembert2.1.pdf"
              download
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home(){return <><section className="hero container"><div className="hero-copy"><div className="status"><span className="status-dot"/> Looking for internships, 2027</div><div className="eyebrow">I AM</div><h1>{NAME}<span className="accent">.</span><br/><span className="gradient-text">Computer Science, B.S<br/>W. Governor's University</span></h1><p>Computer science student and aspiring Technical Professional, Exploring web development, Python, cybersecurity, and creative problem-solving.</p><div className="actions"><Link to="/projects" className="btn primary">Explore projects <ArrowRight size={18}/></Link><Link to="/feedback" className="btn secondary">Leave feedback <ArrowUpRight size={18}/></Link></div><div className="hero-stats"><div><strong>{projects.length.toString().padStart(2,'0')}</strong><span>Sample projects</span></div><div><strong>08</strong><span>Skills & tools</span></div><div><strong>∞</strong><span>Curiosity</span></div></div></div><div className="hero-art"><div className="orb orb-one"/><div className="orb orb-two"/><div className="terminal"><div className="terminal-top"><div className="dots"><i/><i/><i/></div><span>developer.js</span><Terminal size={16}/></div><div className="terminal-code"><div><span className="purple">const</span> developer = {'{'}</div><div className="indent">name: <span className="green">'{NAME}'</span>,</div><div className="indent">role: <span className="green">'Software Developer'</span>,</div><div className="indent">passions: [</div><div className="indent2"><span className="green">'Building'</span>,</div><div className="indent2"><span className="green">'Learning'</span>,</div><div className="indent2"><span className="green">'Problem Solving'</span></div><div className="indent">],</div><div className="indent">openToWork: <span className="orange">true</span></div><div>{'}'};</div><div className="terminal-prompt">$ npm run create-awesome<span className="cursor">▌</span></div></div></div><div className="floating-badge"><Sparkles size={18}/> Always learning</div></div>
</section>

<div className="container resume-home">
  <ResumeTile />
</div>

<section className="section section-muted">
"<div className="container"><div className="section-top"><div><div className="eyebrow">SELECTED WORK</div><h2>Featured projects<span className="accent">.</span></h2><p>Experiments, applications, and ideas brought to life through code.</p></div><Link to="/projects" className="text-link">View all projects <ArrowRight size={17}/></Link></div><div className="project-grid">{projects.slice(0,3).map(p=><ProjectCard key={p.id} project={p}/>)}</div></div></section><section className="section container cta"><div><div className="eyebrow">LET'S CONNECT</div><h2>Have thoughts on my work?</h2><p>Your feedback makes me better.</p></div><Link to="/feedback" className="btn primary">Share feedback <ArrowRight size={18}/></Link></section></>}

function EducationHistory() {
  return (
    <section className="education-window">
      <div className="resume-titlebar">
        <span>Education History</span>
        <span aria-hidden="true">_ □ ×</span>
      </div>

      <div className="education-content">
        <h2>Education & Academic Background</h2>

        <div className="education-item">
          <h3>Western Governors University</h3>
          <p>B.S. Computer Science — Current</p>
        </div>

        <div className="education-item">
          <h3>Garden City Community College</h3>
          <p>Cybersecurity Coursework</p>
          <p>2025-26</p>
          <p>GPA: 3.368</p>
        </div>

        <div className="education-item">
          <h3>University of Virginia's College at Wise</h3>
          <p>Software Engineering Coursework</p>
          <p>2024–25</p>
        </div>
      </div>
    </section>
  );
}
function About(){return <div className="container page"><Heading eyebrow="ABOUT ME." title={<>Behind the code<span className="accent">.</span></>} description="A little about my journey, interests, and the tools I use."/><div className="about-layout"><div className="about-panel"><div className="about-avatar"><Code2 size={68}/></div><div className="eyebrow">DEVELOPER PROFILE</div><h2>Hi, I'm {NAME}.</h2><p>Computer Science, B.S Western Govenor's University.</p><p>My projects are a glimpse into my mind, As a very creative person, I think of hundreds of ideas as the days pass.</p><Link to="/projects" className="text-link">See what I've built <ArrowRight size={18}/></Link></div><div className="about-side"><div className="info-card"><h3><Code2 size={20}/> Skills & technologies</h3><div className="chips large">{skills.map(s=><span key={s}>{s}</span>)}</div></div><div className="info-card"><h3><Sparkles size={20}/> What drives me</h3><p>As a former collegiate athlete, competition drives me. Whatever I partake in, I want to be the best at it.</p></div><div className="info-card"><h3><Github size={20}/> Find my work</h3><p>Browse my public repositories and follow along as I create more projects.</p><a className="text-link" href={GITHUB} target="_blank" rel="noreferrer">Visit GitHub <ArrowUpRight size={17}/></a></div></div></div><ResumeTile large /><EducationHistory /></div>}

function Projects(){const[filter,setFilter]=useState('All');const categories=['All',...new Set(projects.map(p=>p.category))];const shown=filter==='All'?projects:projects.filter(p=>p.category===filter);return <div className="container page"><Heading eyebrow="MY WORK" title={<>Projects & experiments<span className="accent">.</span></>} description="A collection of what I'm building and learning. Sample entries can be replaced with your real projects."/><div className="filters" role="group" aria-label="Filter projects">{categories.map(c=><button key={c} className={filter===c?'filter active':'filter'} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="project-grid">{shown.map(p=><ProjectCard key={p.id} project={p}/>)}</div></div>}
function Feedback(){const[name,setName]=useState(''),[email,setEmail]=useState(''),[type,setType]=useState('Project feedback'),[rating,setRating]=useState(5),[message,setMessage]=useState(''),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);async function submit(e){e.preventDefault();setStatus('');if(!supabase){setStatus('Feedback is not configured yet. The site owner must connect Supabase before submissions can be accepted.');return}setBusy(true);try{const {error}=await supabase.from('feedback').insert({name:name.trim(),email:email.trim()||null,kind:type,rating,message:message.trim()});if(error)throw error;setStatus('Thanks! Your feedback was submitted privately.');setName('');setEmail('');setMessage('');setRating(5)}catch(err){setStatus('Submission failed. Please try again later.')}finally{setBusy(false)}}return <div className="container page"><Heading eyebrow="YOUR VOICE MATTERS" title={<>Share your feedback<span className="accent">.</span></>} description="Found a bug? Have an idea? Want to collaborate? I'd love to hear your thoughts."/><div className="feedback-layout"><div className="feedback-info"><div className="info-card"><LockKeyhole className="accent-icon" size={26}/><h2>Private by design.</h2><p></p></div><div className="info-card"><Sparkles className="accent-icon" size={26}/><h2>Help me improve.</h2><p>Constructive feedback, bug reports, and project ideas help me learn and create better experiences.</p></div></div><form className="feedback-form" onSubmit={submit}><div className="form-row"><label>Almani Rembert<input required maxLength="100" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label><label>Email <span className="optional">(optional)</span><input type="email" maxLength="254" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label></div><label>What is this about?<select value={type} onChange={e=>setType(e.target.value)}><option>Project feedback</option><option>Bug report</option><option>Collaboration</option><option>General message</option></select></label><div className="rating-label">How would you rate my page/projects?</div><div className="stars" role="group" aria-label="Rating">{[1,2,3,4,5].map(n=><button type="button" aria-label={`${n} stars`} aria-pressed={rating===n} key={n} onClick={()=>setRating(n)} className={n<=rating?'star selected':'star'}>★</button>)}</div><label>Your message<textarea required minLength="10" maxLength="2000" rows="6" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell me what you think..."/></label><button className="btn primary submit" disabled={busy} type="submit">{busy?'Sending...':'Send private feedback'} <ArrowRight size={18}/></button>{status&&<p className="form-status" role="status">{status}</p>}<div className="form-note"><LockKeyhole size={14}/> Your submission is not publicly visible.</div></form></div></div>}
function Admin(){const[email,setEmail]=useState(''),[password,setPassword]=useState(''),[session,setSession]=useState(null),[items,setItems]=useState([]),[error,setError]=useState(''),[loading,setLoading]=useState(false);useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>setSession(data.session));const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>setSession(s));return()=>subscription.unsubscribe()},[]);useEffect(()=>{if(!session||!supabase){setItems([]);return}let active=true;supabase.from('feedback').select('*').order('created_at',{ascending:false}).then(({data,error})=>{if(active){if(error)setError('Unable to load feedback. Check administrator access.');else setItems(data||[])}});return()=>{active=false}},[session]);async function login(e){e.preventDefault();setLoading(true);setError('');const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setError('Sign-in failed. Check your credentials.');setLoading(false)}async function remove(id){if(!window.confirm('Delete this feedback permanently?'))return;const {error}=await supabase.from('feedback').delete().eq('id',id);if(error)setError('Unable to delete feedback.');else setItems(v=>v.filter(x=>x.id!==id))}return <div className="container page admin-page"><Heading eyebrow="PRIVATE AREA" title={<>Feedback inbox<span className="accent">.</span></>} description="Administrator-only access to submitted feedback."/>{!supabase?<div className="info-card">Configure Supabase to enable the private inbox.</div>:!session?<form className="feedback-form login-form" onSubmit={login}><h2>Administrator sign in</h2><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="btn primary" disabled={loading}>{loading?'Signing in...':'Sign in'} <ArrowRight size={17}/></button>{error&&<p role="alert">{error}</p>}</form>:<><div className="inbox-top"><p>Signed in as {session.user.email}</p><button className="btn secondary" onClick={()=>supabase.auth.signOut()}><LogOut size={16}/> Sign out</button></div>{error&&<p role="alert">{error}</p>}{items.length===0?<div className="info-card">No feedback submissions to display.</div>:<div className="inbox-list">{items.map(item=><article className="info-card inbox-item" key={item.id}><div className="inbox-top"><div><span className="category">{item.kind}</span><h3>{item.name} · {item.rating}/5 stars</h3><small>{new Date(item.created_at).toLocaleString()} {item.email&&`· ${item.email}`}</small></div><button className="icon-button" onClick={()=>remove(item.id)} aria-label="Delete feedback"><Trash2 size={18}/></button></div><p className="feedback-message">{item.message}</p></article>)}</div>}</>}</div>}
function App(){return <BrowserRouter><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/feedback" element={<Feedback/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<div className="container page"><Heading eyebrow="404" title="Page not found"/><Link to="/" className="btn primary">Back home</Link></div>}/></Routes></main><Footer/></BrowserRouter>}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
