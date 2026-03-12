import { motion, useAnimationFrame } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function ProjectCard({ project, index }) {

const [stats,setStats] = useState(null)
const [rotate,setRotate] = useState({x:0,y:0})
const orbitAngle = useRef(0)

useEffect(()=>{

if(!project.github) return

fetch(project.github)
.then(res=>res.json())
.then(data=>{
setStats({
stars:data.stargazers_count,
forks:data.forks_count,
watchers:data.watchers_count
})
})

},[project.github])


useAnimationFrame((t,delta)=>{
orbitAngle.current += delta * 0.00025
})


/* MOUSE TILT */

const handleMove = (e)=>{

const rect = e.currentTarget.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const rotateX = -(y - rect.height/2)/18
const rotateY = (x - rect.width/2)/18

setRotate({x:rotateX,y:rotateY})

}

const reset = ()=>setRotate({x:0,y:0})


const radius = 70

return(

<div
className="relative perspective-[1400px]"
onMouseMove={handleMove}
onMouseLeave={reset}
>

<motion.div

initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.1}}

style={{
transform:`rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
}}

className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5 transition duration-300"

>

{/* HOLOGRAPHIC LAYER */}

<div
className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
style={{
background:"linear-gradient(120deg,rgba(0,255,242,0.15),rgba(177,76,255,0.15),rgba(255,45,138,0.15))",
mixBlendMode:"overlay"
}}
/>


{/* GLOW BORDER */}

<div
className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
style={{
background:"linear-gradient(120deg,#00fff2,#b14cff,#ff2d8a)",
filter:"blur(30px)",
zIndex:-1
}}
/>


{/* IMAGE AREA */}

<div className="relative h-56 overflow-hidden flex items-center justify-center">

<img
src={project.image}
alt={project.title}
className="absolute w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-80"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>


{/* ORBITING TECH */}

{(project.stack||[]).map((tech,i)=>{

const angle = orbitAngle.current + (i*(Math.PI*2))/(project.stack.length||1)

const x = Math.cos(angle)*radius
const y = Math.sin(angle)*radius

return(

<div
key={tech}
style={{
position:"absolute",
transform:`translate(${x}px,${y}px)`
}}
className="text-xs px-2 py-1 rounded bg-black/50 border border-white/10 backdrop-blur"
>
{tech}
</div>

)

})}

</div>


{/* CONTENT */}

<div className="p-6 relative">

<h3 className="text-lg font-semibold text-white mb-2">
{project.title}
</h3>

<p className="text-sm text-gray-400 mb-4">
{project.description}
</p>


{/* TECH TAGS */}

<div className="flex flex-wrap gap-2 mb-4">

{(project.stack||[]).map((tech)=>(
<motion.span
key={tech}
whileHover={{scale:1.15,y:-2}}
className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10"
>
{tech}
</motion.span>
))}

</div>


{/* GITHUB STATS */}

{stats && (

<div className="flex gap-4 text-xs text-gray-400 mb-4">

<span>⭐ {stats.stars}</span>
<span>🍴 {stats.forks}</span>
<span>👁 {stats.watchers}</span>

</div>

)}


{/* ACTION BUTTONS */}

<div className="flex gap-4 text-sm">

{project.repo && (

<a
href={project.repo}
target="_blank"
className="text-cyan-400 hover:text-cyan-300 transition"
>
GitHub →
</a>

)}

{project.demo && (

<a
href={project.demo}
target="_blank"
className="text-purple-400 hover:text-purple-300 transition"
>
Live Demo →
</a>

)}

</div>

</div>

</motion.div>

</div>

)

}