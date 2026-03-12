import { motion } from "framer-motion";
import {
RadarChart,
Radar,
PolarGrid,
PolarAngleAxis,
PolarRadiusAxis,
ResponsiveContainer
} from "recharts";

const skills = [
{ skill:"React", value:92 },
{ skill:"Django", value:90 },
{ skill:"Oracle HCM", value:88 },
{ skill:"SQL", value:85 },
{ skill:"Node", value:82 },
{ skill:"SaaS", value:87 },
{ skill:"AI", value:78 },
{ skill:"REST APIs", value:90 }
];

const experiences = [
{
company:"Cognizant Technology Solutions",
logo:"/logos/cognizant.png",
roles:[
{
title:"Programmer Analyst",
period:"Aug 2025 — Present",
desc:"Develop enterprise Oracle Fusion HCM integrations, Fast Formula automation, and HR reporting pipelines."
},
{
title:"Programmer Analyst Trainee",
period:"Aug 2024 — Aug 2025",
desc:"Built BI Publisher reports, HCM Extract pipelines and SQL/PLSQL data validation frameworks."
},
{
title:"Oracle Cloud HCM Intern",
period:"Feb 2024 — Jul 2024",
desc:"Supported HR reporting automation using Fast Formula and BI Publisher development."
}
]
},
{
company:"University of Engineering & Management, Kolkata",
logo:"/logos/uem.png",
roles:[
{
title:"Bachelor of Technology — Computer Science",
period:"2019 — 2023",
desc:"Focused on distributed systems, backend engineering and full-stack application development."
}
]
}
];

const techStack = [
"React","Django","Python","Oracle Cloud","Node.js","PostgreSQL",
"MongoDB","Docker","AWS","GraphQL","REST APIs","Git","CI/CD"
];

export default function About(){

return(

<div className="relative min-h-screen pt-28 pb-24">

<div className="section-container">

{/* HEADER */}

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
className="mb-20"
>

<h1 className="text-5xl font-bold mb-6">

<span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
Engineering Scalable
</span>{" "}
Cloud Platforms

</h1>

<p className="text-gray-400 max-w-3xl leading-relaxed text-lg">
Full-stack engineer specializing in enterprise SaaS platforms and Oracle
Fusion Cloud technologies. I design scalable backend architectures,
modern React applications, and intelligent automation systems.
</p>

</motion.div>


<div className="grid lg:grid-cols-2 gap-20">


{/* LEFT — CAREER */}

<div>

<h2 className="text-2xl font-bold mb-12 text-cyan-400">
Career Journey
</h2>

<div className="relative border-l border-cyan-400/20 pl-10 space-y-14">

{experiences.map((exp,i)=>(

<div key={i}>

{/* COMPANY */}

<div className="flex items-center gap-4 mb-8">

<div className="w-14 h-14 rounded-xl bg-white/5 backdrop-blur flex items-center justify-center border border-cyan-400/20">

<img src={exp.logo} className="w-10"/>

</div>

<div>

<h3 className="text-lg font-semibold text-white">
{exp.company}
</h3>

<p className="text-xs text-gray-500">
Organization
</p>

</div>

</div>


{/* ROLES */}

<div className="space-y-6">

{exp.roles.map((role,idx)=>(

<motion.div
key={idx}
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
transition={{delay:idx*.1}}
whileHover={{scale:1.03}}
className="p-6 rounded-xl backdrop-blur border border-white/10 bg-white/5 hover:border-cyan-400/40 transition"
>

<div className="flex justify-between mb-2">

<h4 className="font-semibold text-white">
{role.title}
</h4>

<span className="text-xs text-cyan-400">
{role.period}
</span>

</div>

<p className="text-sm text-gray-400">
{role.desc}
</p>

</motion.div>

))}

</div>

</div>

))}

</div>

</div>



{/* RIGHT — SKILLS */}

<div>


{/* SKILL RADAR */}

<div className="p-7 rounded-2xl backdrop-blur border border-white/10 bg-white/5 mb-12">

<div className="flex justify-between mb-6">

<h2 className="text-xl font-bold text-purple-400">
Skill Intelligence
</h2>

<span className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400">
Radar
</span>

</div>

<div className="h-[340px]">

<ResponsiveContainer width="100%" height="100%">

<RadarChart data={skills}>

<PolarGrid stroke="rgba(255,255,255,0.1)" />

<PolarAngleAxis
dataKey="skill"
tick={{fill:"#8892B0",fontSize:11}}
/>

<PolarRadiusAxis domain={[0,100]} tick={false}/>

<Radar
dataKey="value"
stroke="#00FFF2"
fill="#00FFF2"
fillOpacity={0.35}
/>

</RadarChart>

</ResponsiveContainer>

</div>

</div>



{/* TECH STACK */}

<h2 className="text-xl font-bold mb-6 text-pink-400">
Technology Ecosystem
</h2>

<div className="flex flex-wrap gap-3">

{techStack.map((tech,i)=>(

<motion.div
key={tech}
whileHover={{scale:1.08,y:-3}}
className="px-4 py-2 rounded-lg text-sm border border-white/10 bg-white/5 hover:border-cyan-400/40 transition"
>

{tech}

</motion.div>

))}

</div>


</div>

</div>

</div>

</div>

);
}