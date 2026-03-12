import { useEffect, useRef } from "react"

const skills = [
"React","Django","Python","Oracle HCM","Node.js",
"SQL","AI","REST APIs","Docker","GraphQL"
]

export default function SkillConstellation(){

const canvasRef = useRef(null)

useEffect(()=>{

const canvas = canvasRef.current
const ctx = canvas.getContext("2d")

let width = canvas.width = canvas.offsetWidth
let height = canvas.height = canvas.offsetHeight

const nodes = skills.map((skill)=>({
x: Math.random()*width,
y: Math.random()*height,
vx:(Math.random()-.5)*0.5,
vy:(Math.random()-.5)*0.5,
skill
}))

function draw(){

ctx.clearRect(0,0,width,height)

nodes.forEach(node=>{
node.x += node.vx
node.y += node.vy

if(node.x<0||node.x>width) node.vx*=-1
if(node.y<0||node.y>height) node.vy*=-1

// node glow
ctx.beginPath()
ctx.arc(node.x,node.y,3,0,Math.PI*2)
ctx.fillStyle="#00fff2"
ctx.fill()

// label
ctx.font="12px sans-serif"
ctx.fillStyle="#8892B0"
ctx.fillText(node.skill,node.x+6,node.y+4)
})

// draw connections
for(let i=0;i<nodes.length;i++){
for(let j=i+1;j<nodes.length;j++){

const dx = nodes[i].x-nodes[j].x
const dy = nodes[i].y-nodes[j].y
const dist = Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.beginPath()
ctx.moveTo(nodes[i].x,nodes[i].y)
ctx.lineTo(nodes[j].x,nodes[j].y)
ctx.strokeStyle="rgba(0,255,242,0.15)"
ctx.stroke()

}

}
}

requestAnimationFrame(draw)

}

draw()

},[])

return(

<div className="glass rounded-xl p-6">

<h3 className="text-lg font-semibold mb-4 text-cyan-400">
Skill Constellation
</h3>

<canvas
ref={canvasRef}
className="w-full h-[300px]"
/>

</div>

)
}