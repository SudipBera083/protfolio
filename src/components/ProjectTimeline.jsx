import { motion } from "framer-motion"

const projects = [

{
year:"2025",
title:"Enterprise HCM Automation",
desc:"Built Oracle Fusion HCM automation and integration pipelines."
},

{
year:"2024",
title:"AI SaaS Platform",
desc:"Developed Django-based AI platform with REST APIs."
},

{
year:"2023",
title:"Full-Stack SaaS Dashboard",
desc:"React + Django analytics dashboard for enterprise clients."
},

{
year:"2022",
title:"Data Integration Engine",
desc:"Built SQL data pipeline for enterprise reporting."
}

]

export default function ProjectTimeline(){

return(

<div className="glass p-6 rounded-xl">

<h3 className="text-lg font-semibold mb-6 text-purple-400">
Project Timeline
</h3>

<div className="relative border-l border-white/10 pl-6 space-y-10">

{projects.map((project,i)=>(

<motion.div
key={project.title}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{delay:i*0.15}}
className="relative"
>

<div className="absolute -left-[13px] top-1 w-3 h-3 rounded-full bg-cyan-400"/>

<div className="text-xs text-cyan-400 mb-1">
{project.year}
</div>

<h4 className="font-semibold text-white">
{project.title}
</h4>

<p className="text-sm text-gray-400">
{project.desc}
</p>

</motion.div>

))}

</div>

</div>

)
}