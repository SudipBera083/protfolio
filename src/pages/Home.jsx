import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import SkillConstellation from "../components/SkillConstellation"
import ProjectTimeline from "../components/ProjectTimeline"
import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip
} from "recharts"

const roles = [
"Full-Stack Engineer",
"Oracle SaaS Specialist",
"Django & AI Architect"
]

const projectGrowth = [
{year:"2021",projects:5},
{year:"2022",projects:12},
{year:"2023",projects:18},
{year:"2024",projects:26},
{year:"2025",projects:30}
]

export default function Home(){

return(

<div className="relative z-10 min-h-screen flex items-center">

<div className="section-container w-full">

<div className="grid lg:grid-cols-2 gap-16 items-center">

{/* LEFT SIDE */}

<div>

{/* Availability Badge */}

<motion.div
initial={{opacity:0,scale:.8}}
animate={{opacity:1,scale:1}}
transition={{duration:.8}}
className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-10"
style={{
background:"linear-gradient(135deg, rgba(0,255,242,0.06), rgba(177,76,255,0.04))",
border:"1px solid rgba(0,255,242,0.12)"
}}
>

<span className="glow-dot"/>
<span className="text-xs font-semibold tracking-wide text-cyan-300">
Open to Opportunities
</span>

</motion.div>


{/* HERO TITLE */}

<h1
className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6"
style={{fontFamily:"var(--font-display)"}}
>

Hi, I'm

<span className="block text-gradient-hero text-glow">
Sudip Bera
</span>

</h1>


{/* ROLE TAGS */}

<div className="flex flex-wrap gap-3 mb-8">

{roles.map(role=>(
<span
key={role}
className="px-4 py-2 rounded-xl text-sm"
style={{
background:"rgba(255,255,255,0.03)",
border:"1px solid rgba(255,255,255,0.06)",
color:"var(--color-text-secondary)"
}}
>
{role}
</span>
))}

</div>


{/* DESCRIPTION */}

<p className="text-lg leading-relaxed max-w-xl mb-10 text-gray-400">

I engineer <span className="text-cyan-400">enterprise-grade SaaS platforms</span>,
architect <span className="text-purple-400">scalable backend systems</span>,
and build intelligent <span className="text-pink-400">AI-powered solutions</span>
that transform businesses.

</p>

<br />
{/* CTA BUTTONS */}

<div className="flex gap-4 mb-16">

<Link to="/projects" className="btn-primary">
Explore My Work →
</Link>

<Link to="/contact" className="btn-outline">
Let's Connect
</Link>

</div>


{/* STATS */}
<br />
<div
className="flex flex-wrap gap-12 pt-10"
style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}
>

{[
{value:"2+",label:"Years Experience",color:"#00fff2"},
{value:"10+",label:"Projects Shipped",color:"#b14cff"},
{value:"5+",label:"Enterprise Clients",color:"#ff2d8a"},
{value:"99%",label:"Client Satisfaction",color:"#4d7cff"}
].map(stat=>(
<div key={stat.label}>

<div
className="text-3xl font-bold"
style={{color:stat.color}}
>
{stat.value}
</div>

<div className="text-xs text-gray-500 uppercase">
{stat.label}
</div>

</div>
))}

</div>

</div>


{/* RIGHT SIDE VISUAL PANEL */}

<div className="space-y-10">


{/* PROFILE CARD */}

<div className="glass p-6 rounded-2xl flex items-center gap-6">

<img
  src="/logos/sudip.png"
  alt="Sudip Bera"
  className="w-24 h-24 rounded-full border border-cyan-400/40"
/>

<div>

<h3 className="font-semibold text-lg">
Sudip Bera
</h3>

<p className="text-sm text-gray-400">
Full-Stack & Oracle Cloud Engineer
</p>

</div>

</div>


{/* SKILL CONSTELLATION */}

<SkillConstellation/>


{/* PROJECT GROWTH CHART */}

<div className="glass p-6 rounded-2xl">

<h3 className="text-lg font-semibold mb-4 text-purple-300">
Project Growth
</h3>

<div className="h-[220px]">

<ResponsiveContainer width="100%" height="100%">

<LineChart data={projectGrowth}>

<XAxis dataKey="year" stroke="#666"/>
<YAxis stroke="#666"/>

<Tooltip
contentStyle={{
background:"#0a0f1e",
border:"1px solid #222"
}}
/>

<Line
type="monotone"
dataKey="projects"
stroke="#b14cff"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>


{/* PROJECT TIMELINE */}

{/* <ProjectTimeline/> */}


</div>

</div>

</div>

</div>

)

}