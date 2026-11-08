// ReadyPH script: checklists, readiness percentage, supply calculator, hotlines
const D={
typhoon:{n:"Typhoon",e:"🌀",
evac:"Leave early. Evacuate as soon as your barangay or officials tell you to, or when you live near a river, the coast, or a slope that can flood or slide. Do not wait for the water to rise. Walk to the nearest evacuation center with your go-bag, and stay away from floodwater and fallen wires.",
g:[["What to bring in a typhoon (3 days)",[
"Drinking water: {W} liters in total","Ready-to-eat food: {M} meals, plus rice or canned goods","Flashlight and extra batteries","Power banks, fully charged","First aid kit","A week of regular medicines","Waterproof bag with IDs and important papers","Whistle, small cash, and a battery radio","Raincoats and extra clothes in plastic bags"]],
["Prepare your home",[
"Tie down or bring in loose items outside","Check the roof, doors, and windows","Fill clean water containers before the storm arrives","Move valuables and papers to a high place","Charge phones and save the emergency numbers"]],
["Evacuation plan",[
"Know the PAGASA wind signals","Know your nearest evacuation center and the way there","Agree on a family meeting place","Decide who helps seniors, children, and pets","Leave when officials tell you to, not later"]]]},
tsunami:{n:"Tsunami",e:"🌊",
evac:"Do not wait for a warning. If a strong or long earthquake shakes you near the coast, or the sea suddenly pulls back or roars, go to high ground or inland at once, on foot if you can. Stay away from the shore until officials say it is safe, because waves can keep coming for hours.",
g:[["What to bring in a tsunami (3 days)",[
"Go-bag kept by the door, ready to grab","Drinking water: {W} liters in total","Ready-to-eat food: {M} meals","Flashlight and extra batteries","First aid kit","A week of regular medicines","Waterproof bag with IDs and important papers","Whistle and a power bank","Warm clothes, a blanket, and sturdy shoes for each person","Life jacket for each person if you live near the coast"]],
["Know your risk",[
"Find out if your home, school, or work is in a coastal hazard zone","Learn the warning signs: a strong or long earthquake, the sea pulling back, a loud roar","Everyone knows to move at once without waiting for a warning"]],
["Evacuation plan",[
"Find the nearest high ground or tall, sturdy building","Walk the route together as a family","Agree on a meeting place on high ground","Decide how to help children and seniors move quickly","Practice the route once or twice a year"]]]},
earthquake:{n:"Earthquake",e:"🌍",
evac:"During shaking: drop, cover, and hold on. When it stops, check for injuries, gas leaks, and cracks. If the building is damaged, leave and gather at your open meeting place, away from buildings, posts, and wires. Expect aftershocks. If you are near the coast, move to high ground.",
g:[["What to bring in an earthquake (3 days)",[
"Go-bag kept by the door","Drinking water: {W} liters in total","Ready-to-eat food: {M} meals","Flashlight and sturdy shoes kept by each bed","First aid kit","A week of regular medicines","Waterproof bag with IDs and important papers","Whistle and a power bank","Hard hat or helmet, dust masks, and work gloves"]],
["Make your home safer",[
"Fasten tall furniture to the wall","Move heavy items off high shelves","Learn how to shut off electricity and gas","Pick a safe spot in each room under a sturdy table, away from windows","Keep hallways and exits clear"]],
["Evacuation plan",[
"Practice drop, cover, and hold on","Choose an open meeting place away from buildings and wires","Know two ways out of your home","Plan to move to high ground if you live near the coast","Plan to text each other if phone calls fail"]]]}};
const CT=[["National Emergency Hotline","Police, ambulance, fire: call first","911"],["Philippine National Police","Police","117 / (02) 8722-0650"],["Philippine Red Cross","Ambulance, rescue, relief","143 / (02) 8790-2300"],["Bureau of Fire Protection","Fire and rescue","(02) 8426-0219 / (02) 8426-0246"],["NDRRMC Operations Center","Disaster response","(02) 8911-1406 / (02) 8912-2665 / (02) 8912-5668"],["PAGASA","Typhoon and weather warnings","(02) 8284-0800"],["PHIVOLCS","Earthquakes, tsunamis, volcanoes","(02) 8426-1468 to 79"],["Philippine Coast Guard","Sea and coastal emergencies","(02) 8527-8481 to 89"],["DSWD","Relief and evacuation aid","(02) 8931-8101 to 07"],["Department of Health","Medical emergencies","8711-1001 to 02"]];
let S={n:4,done:{},tab:""};
try{Object.assign(S,JSON.parse(localStorage.getItem("rph3")||"{}"))}catch(e){}
const $=s=>document.querySelector(s),sv=()=>{try{localStorage.setItem("rph3",JSON.stringify(S))}catch(e){}};
const H=Object.keys(D),keys=h=>D[h].g.flatMap((g,i)=>g[1].map((_,j)=>h+i+"_"+j));
const pct=h=>{const k=keys(h);return Math.round(k.filter(x=>S.done[x]).length/k.length*100)};
const lvl=p=>p>=100?"Ready!":p>=70?"Almost ready":p>=40?"Getting there":"Not ready yet";
const fill=t=>t.replace("{W}",S.n*9).replace("{M}",S.n*9);
function render(){
 const avg=Math.round(H.reduce((a,h)=>a+pct(h),0)/H.length);
 $("#tot").textContent=avg+"%";$("#lv").textContent=lvl(avg);$("#bar").style.width=avg+"%";
 $("#tabs").innerHTML=H.map(h=>`<button class="tab${S.tab===h?" on":""}" data-t="${h}">${D[h].e}<br>${D[h].n}<b>${pct(h)}%</b></button>`).join("");
 if(!D[S.tab]){$("#panel").innerHTML=`<div class="card"><h2>Choose a disaster</h2><p>Tap Typhoon, Tsunami, or Earthquake above to see what to bring. Tick what you already have to see how ready your household is.</p></div>`;return}
 const d=D[S.tab],p=pct(S.tab);
 $("#panel").innerHTML=`<div class="card"><h2>${d.n}: you are ${p}% ready (${lvl(p)})</h2><div class="bar"><i style="width:${p}%"></i></div>`+
 d.g.map((g,i)=>`<h3>${g[0]}</h3>`+g[1].map((t,j)=>{const k=S.tab+i+"_"+j,c=S.done[k];return `<label class="item${c?" d":""}"><input type="checkbox" data-k="${k}"${c?" checked":""}><span>${fill(t)}</span></label>`}).join("")).join("")+`<div class="evac"><b>When and how to evacuate</b><br>${d.evac}</div><p><a class="btn" href="#hotlines">Go to emergency hotlines</a></p></div>`;
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(b){S.tab=b.dataset.t;sv();render();scrollTo(0,0)}});
document.addEventListener("change",e=>{const k=e.target.dataset.k;if(k){S.done[k]=e.target.checked?1:0;sv();render()}});
$("#n").value=S.n;
$("#n").oninput=e=>{S.n=Math.min(30,Math.max(1,parseInt(e.target.value)||1));sv();render();days()};
$("#reset").onclick=()=>{if(confirm("Clear all ticks?")){S.done={};sv();render()}};
// Draws the hotline list at the bottom of the page
function hotlines(){$("#hl").innerHTML=CT.map(c=>`<div class="c"><div><b>${c[0]}</b><small>${c[1]}</small>${c[2]}</div><a class="btn" href="tel:${c[2].split(/\/| to /)[0].replace(/[^\d+]/g,"")}">Call</a></div>`).join("")}
function days(){
 const n=S.n,w=+S.w||0,f=+S.f||0;
 if(!w&&!f){$("#res").innerHTML="Enter the water and food you have to see how long they will last.";return}
 const wd=w/(n*3),fd=f/(n*3),d=Math.floor(Math.min(wd,fd)*10)/10,low=wd<=fd?"drinking water":"food";
 const p=[];if(n*9-w>0)p.push(Math.ceil(n*9-w)+" more liters of water");if(n*9-f>0)p.push(Math.ceil(n*9-f)+" more meals");
 $("#res").innerHTML=`<b style="font-size:1.4rem">Your supplies last about ${d} day${d===1?"":"s"}</b><br>Water lasts ${wd.toFixed(1)} days. Food lasts ${fd.toFixed(1)} days. You will run out of ${low} first.<br>`+(p.length?`To reach 3 days, add ${p.join(" and ")}.`:"You have at least the 3 days recommended.")}
$("#w").value=S.w||"";$("#f").value=S.f||"";
$("#w").oninput=e=>{S.w=e.target.value;sv();days()};
$("#f").oninput=e=>{S.f=e.target.value;sv();days()};
hotlines();render();days();
