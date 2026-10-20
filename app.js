"use strict";
/* ---------- anonymous stats -> Google Sheet in the club Drive (append-only); no names or IPs ---------- */
const STATS_URL="";
const VID=(()=>{try{let v=localStorage.getItem("ttc_v");if(!v){v=Math.random().toString(36).slice(2,12);localStorage.setItem("ttc_v",v)}return v}catch(e){return "anon"}})();
const SRC=(()=>{const x=location.search+" "+document.referrer;return /fbclid|facebook|fb\.com/i.test(x)?"facebook":/instagram|igsh/i.test(x)?"instagram":/whatsapp|wa\.me/i.test(x)?"whatsapp":document.referrer?"other":"direct"})();
const DEV=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)?"mobile":"desktop";
const QUEUE=[];let qTimer=0;
function track(t,n){if(!STATS_URL)return;QUEUE.push({t,n:String(n||"").slice(0,80),v:VID,s:SRC,d:DEV});clearTimeout(qTimer);qTimer=setTimeout(flush,1500)}
function flush(){if(!STATS_URL||!QUEUE.length)return;try{fetch(STATS_URL,{method:"POST",mode:"no-cors",keepalive:true,body:JSON.stringify(QUEUE.splice(0,20))})}catch(e){}}
addEventListener("pagehide",flush);
track("view","home");

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const CAT={S:"בוגרים",S40:"ותיקים 40+",S50:"ותיקים 50+",S60:"ותיקים 60+",S70:"ותיקים 70+",J19:"נוער עד 19",Y17:"נוער עד 17",C14:"עד 15",C15:"עד 15",M13:"עד 13",M12:"עד 13",B11:"עד 11",B10:"עד 11",B9:"עד 11"};
const AGES=[["ילדים","עד גיל 11",c=>/^B/.test(c)],["צעירים","עד גיל 15",c=>/^[MC]/.test(c)],["נוער","עד גיל 19",c=>/^[JY]/.test(c)],["בוגרים","",c=>c==="S"],["ותיקים","40 ומעלה",c=>/^S\d/.test(c)]];
const DAYS=["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"];
let D=null,POSTS=[];
if(top!==self)try{top.location=location.href}catch(e){} // no framing of the board
const safeUrl=u=>/^https:\/\/[^\s"'<>]+$/.test(u||"")?u:"#";
const pick=(v,re,d="")=>typeof v==="string"&&re.test(v)?v:d;
const num=(v,d=0)=>v!==null&&v!==""&&Number.isFinite(+v)?+v:d;
const numOrNull=v=>v===null||v===undefined||v===""||!Number.isFinite(+v)?null:+v;
const str=(v,n=120)=>typeof v==="string"?v.slice(0,n):"";
const CODE=/^[A-Za-z0-9]{1,8}$/,DATE=/^\d{2}\/\d{2}\/\d{2}$/,TIME=/^\d{1,2}:\d{2}$/,RES=/^\d{1,2}:\d{1,2}$/;
// data.json comes from scraped pages: force every field into the shape the page expects before anything renders
function cleanData(d){
  const teams={};for(const[k,v]of Object.entries(d.teams||{}))if(CODE.test(k))teams[k]=str(v,80);
  return{
    updated:str(d.updated,40),nextRanking:pick(d.nextRanking,DATE),teams,
    ours:(d.ours||[]).filter(c=>teams[c]),
    leagues:(d.leagues||[]).filter(l=>/^[a-z0-9]{1,20}$/.test(l.id)).map(l=>({id:l.id,name:str(l.name,60),group:str(l.group,40),short:str(l.short,30),url:safeUrl(l.url),
      ourTeams:(l.ourTeams||[]).filter(c=>teams[c]),
      standings:(l.standings||[]).filter(r=>teams[r.t]).map(r=>({t:r.t,p:num(r.p),w:num(r.w),d:num(r.d),l:num(r.l),pts:num(r.pts)})),
      matches:(l.matches||[]).filter(m=>teams[m.h]&&teams[m.a]&&DATE.test(m.d)).map(m=>({r:Math.max(1,Math.floor(num(m.r,1))),d:m.d,t:pick(m.t,TIME,"00:00"),h:m.h,a:m.a,res:pick(m.res,RES),w:teams[m.w]?m.w:""}))})),
    rosters:Object.fromEntries(Object.entries(d.rosters||{}).filter(([k])=>teams[k]).map(([k,v])=>[k,(v||[]).map(x=>Math.floor(num(x,-1))).filter(x=>x>0)])),
    players:(d.players||[]).filter(x=>num(x.id,-1)>0&&typeof x.n==="string").map(x=>({id:Math.floor(+x.id),n:str(x.n,60),c:pick(x.c,CODE,"S"),rank:numOrNull(x.rank),ch:numOrNull(x.ch),pts:num(x.pts)})),
    training:(d.training||[]).map(v=>({v:str(v.v,40),g:(v.g||[]).filter(Array.isArray).map(r=>r.slice(0,4).map(x=>str(x,60)))})),
    events:(d.events||[]).filter(e=>Array.isArray(e)&&DATE.test(e[0])).map(e=>[e[0],str(e[1],80),safeUrl(e[2])])
  };
}
// children (under-18 categories) show as first name + last initial, because the same page shows where and when training happens
const MINOR=/^[BMCJY]/;
const dn=p=>{if(!MINOR.test(p.c))return p.n;const w=p.n.trim().split(/\s+/);return w.length>1?w[0]+" "+w[w.length-1][0]+"׳":w[0]};
const when=(d,t)=>{const[dd,mm,yy]=d.split("/");const[h,mi]=(t||"00:00").split(":");return new Date(2000+ +yy,mm-1,+dd,+h,+mi)}; // viewers are in Israel; local clock is the venue clock
const dshort=d=>{const x=when(d);return `${DAYS[x.getDay()]} ${x.getDate()}.${x.getMonth()+1}`};
const ours=c=>D.ours.includes(c);
const short=c=>(D.teams[c]||c).replace("הפועל מבואות חרמון","מבואות חרמון").replace("כרמל מרכזי טניס שולחן חיפה","כרמל חיפה").replace("עירוני מעלות תרשיחא","מעלות תרשיחא").replace("עמותת קריית מוצקין","קריית מוצקין").replace("הפועל עירוני ","").replace("אליצור ","");
const played=m=>!!m.res;
const haptic=()=>{try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}};
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("on"),1800)}

/* ---------- springs (critically damped by default), interruptible: always start from the live value ---------- */
function spring({from,to,velocity=0,response=.4,damping=1,onUpdate,onDone}){
  const k=Math.pow(2*Math.PI/response,2),c=4*Math.PI*damping/response;let x=from,v=velocity,last=performance.now(),id=0,stopped=false;
  const step=t=>{if(stopped)return;let dt=Math.min(.032,(t-last)/1000);last=t;
    for(let i=0;i<2;i++){const h=dt/2,a=-k*(x-to)-c*v;v+=a*h;x+=v*h}
    if(Math.abs(v)<4&&Math.abs(x-to)<.4){onUpdate(to);onDone&&onDone();return}
    onUpdate(x);id=requestAnimationFrame(step)};
  if(RM.matches){onUpdate(to);onDone&&onDone();return()=>{}}
  id=requestAnimationFrame(step);return()=>{stopped=true;cancelAnimationFrame(id)};
}

/* ---------- tab bar ball: arcs from wherever it is now to the tapped tab ---------- */
const ball=$("#tball");let ballX=0,ballStop=null;
function tabCenter(name){const b=$(`.tab[data-go="${name}"]`),bar=$("#tabbar").getBoundingClientRect(),r=b.getBoundingClientRect();return r.left-bar.left+r.width/2}
function moveBall(name,instant){
  const to=tabCenter(name),from=ballX;ballStop&&ballStop();
  if(instant||RM.matches){ballX=to;ball.style.transform=`translate(${to}px,0)`;return}
  const dist=Math.abs(to-from)||1,arc=Math.min(26,10+dist*.12);
  ballStop=spring({from,to,response:.5,damping:.82,onUpdate:x=>{ballX=x;const p=Math.min(1,Math.max(0,Math.abs(x-from)/dist));const y=-arc*Math.sin(Math.PI*Math.min(1,p));ball.style.transform=`translate(${x}px,${y}px)`},
    onDone:()=>ball.animate([{transform:`translate(${to}px,0) scale(1.35,.7)`},{transform:`translate(${to}px,0) scale(1)`}],{duration:260,easing:"cubic-bezier(.2,.8,.2,1)"})});
}
addEventListener("resize",()=>moveBall(current,true));

/* ---------- screens: direction-aware slide, per-screen scroll is kept ---------- */
const ORDER=["home","leagues","rank","club"];let current="home",busySwap=null;
function go(name,opts={}){
  if(!ORDER.includes(name))return;
  if(name===current){const s=$("#s-"+name);s.scrollTo({top:0,behavior:RM.matches?"auto":"smooth"});return}
  const from=$("#s-"+current),to=$("#s-"+name),dir=ORDER.indexOf(name)>ORDER.indexOf(current)?1:-1; // RTL: forward = slides in from the left
  busySwap&&busySwap();
  $$(".tab").forEach(t=>t.setAttribute("aria-selected",t.dataset.go===name));
  moveBall(name);haptic();
  to.hidden=false;
  if(!RM.matches){
    const dx=28*dir;
    const a=from.animate([{transform:"translateX(0)",opacity:1},{transform:`translateX(${dx}%)`,opacity:0}],{duration:300,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});
    const b=to.animate([{transform:`translateX(${-dx}%)`,opacity:0},{transform:"translateX(0)",opacity:1}],{duration:360,easing:"cubic-bezier(.2,.8,.2,1)"});
    const done=()=>{from.hidden=true;a.cancel()};a.onfinish=done;busySwap=()=>{a.finish();b.finish()};
  }else from.hidden=true;
  current=name;
  if(!opts.silent){try{history.replaceState(null,"","#"+name)}catch(e){}}
  track("section",name);
  if(name==="rank")growPodium();
  if(name==="leagues")requestAnimationFrame(()=>{placePill($("#lgSeg"));placePill($("#viewSeg"))});
  if(name==="club")requestAnimationFrame(()=>placePill($("#venueSeg")));
}
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g){e.preventDefault();go(g.dataset.go)}});
$$(".screen").forEach(s=>s.addEventListener("scroll",()=>{const t=s.querySelector(".top");t&&t.classList.toggle("scrolled",s.scrollTop>4)},{passive:true}));

/* ---------- segmented control pill ---------- */
function placePill(seg){if(!seg||seg.offsetParent===null)return;let p=seg.querySelector(".pill");if(!p){p=document.createElement("span");p.className="pill";seg.prepend(p)}
  const b=seg.querySelector('[aria-selected="true"]');if(!b)return;p.style.width=b.offsetWidth+"px";p.style.transform=`translateX(${b.offsetLeft-3}px)`;p.style.left="3px"}
function segment(seg,onPick){seg.addEventListener("click",e=>{const b=e.target.closest("button");if(!b||b.getAttribute("aria-selected")==="true")return;
  seg.querySelectorAll("button").forEach(x=>x.setAttribute("aria-selected",x===b));placePill(seg);haptic();onPick(b)})}
addEventListener("resize",()=>$$(".seg").forEach(placePill));

/* ---------- bottom sheet: drag to dismiss with momentum projection and rubber-banding ---------- */
const sheet=$("#sheet"),scrim=$("#scrim");let sheetY=0,sheetH=0,sheetStop=null;
const setY=y=>{sheetY=y;sheet.style.transform=`translateY(${y}px)`;scrim.style.opacity=String(Math.max(0,1-y/Math.max(1,sheetH)))};
function openSheet(html){
  $("#sheetBody").innerHTML=html;$("#sheetBody").scrollTop=0;sheet.hidden=false;scrim.hidden=false;
  sheetH=sheet.getBoundingClientRect().height;sheetStop&&sheetStop();
  sheetStop=spring({from:sheetY>0&&sheetY<sheetH?sheetY:sheetH,to:0,response:.38,damping:.86,onUpdate:setY});
}
function closeSheet(v=0){sheetStop&&sheetStop();sheetStop=spring({from:sheetY,to:sheetH+40,velocity:v,response:.32,damping:1,onUpdate:setY,onDone:()=>{sheet.hidden=true;scrim.hidden=true}})}
scrim.addEventListener("click",()=>closeSheet());
addEventListener("keydown",e=>{if(e.key==="Escape"&&!sheet.hidden)closeSheet()});
(()=>{let start=null,hist=[];
  sheet.addEventListener("pointerdown",e=>{const body=$("#sheetBody");if(e.target.closest("a,button")&&!e.target.closest("#grab"))return;
    if(!e.target.closest("#grab")&&body.scrollTop>0)return;start={y:e.clientY,base:sheetY,drag:false};hist=[{y:e.clientY,t:performance.now()}]});
  sheet.addEventListener("pointermove",e=>{if(!start)return;const dy=e.clientY-start.y;
    if(!start.drag){if(Math.abs(dy)<8)return;if(dy<0&&!e.target.closest("#grab")){start=null;return}start.drag=true;sheet.setPointerCapture(e.pointerId);sheetStop&&sheetStop()}
    let y=start.base+dy;if(y<0)y=-(-y*sheetH*.55)/(sheetH+.55*-y); // rubber-band past the top
    setY(y);hist.push({y:e.clientY,t:performance.now()});if(hist.length>6)hist.shift()});
  const end=()=>{if(!start)return;const was=start.drag;start=null;if(!was)return;
    const a=hist[0],b=hist[hist.length-1],v=b.t>a.t?(b.y-a.y)/(b.t-a.t)*1000:0;
    const projected=sheetY+(v/1000)*.998/(1-.998);
    if(projected>sheetH*.45)closeSheet(v);else{sheetStop=spring({from:sheetY,to:0,velocity:v,response:.35,damping:.85,onUpdate:setY})}};
  sheet.addEventListener("pointerup",end);sheet.addEventListener("pointercancel",end);
})();

/* ---------- home ---------- */
function ourMatches(){return D.leagues.flatMap(l=>l.matches.filter(m=>ours(m.h)||ours(m.a)).map(m=>({...m,lg:l})))}
function renderHome(){
  const all=ourMatches(),now=new Date();
  const upcoming=all.filter(m=>!played(m)&&when(m.d,m.t)>now-3*3600e3).sort((a,b)=>when(a.d,a.t)-when(b.d,b.t));
  const n=upcoming[0];
  if(n){
    const T=when(n.d,n.t),today=T.toDateString()===now.toDateString(),home=ours(n.h);
    const side=c=>`<div class="side${ours(c)?" us":""}"><b>${esc(short(c))}</b><small>${c===n.h?"בית":"חוץ"}</small></div>`;
    $("#hero").innerHTML=`<div class="hero${today?" live":""}" role="group" aria-label="המשחק הבא">
      <div class="kick"><span class="dot"></span>${today?"היום משחקים!":"המשחק הבא שלנו"} · ${esc(n.lg.short)}, מחזור ${n.r}</div>
      <div class="table" role="img" aria-label="${esc(D.teams[n.h])} נגד ${esc(D.teams[n.a])}"><span class="net"></span><span class="pp" aria-hidden="true"><i></i></span>${side(n.h)}<div class="vs">VS</div>${side(n.a)}</div>
      <div class="facts"><span>📅 ${dshort(n.d)}</span><span class="num">🕖 ${n.t}</span><span>📍 ${home?"בית ספר רמת כורזים":"משחק חוץ"}</span></div>
      <div class="count num" id="cd"></div></div>`;
    const tick=()=>{const el=$("#cd");if(!el)return;let s=Math.max(0,(T-new Date())/1e3);
      el.innerHTML=s>0?[[Math.floor(s/86400),"ימים"],[Math.floor(s%86400/3600),"שעות"],[Math.floor(s%3600/60),"דקות"]].map(([v,l])=>`<span>${v}<small>${l}</small></span>`).join(""):`<span style="font-size:15px">המשחק התחיל · בהצלחה!</span>`};
    tick();clearInterval(renderHome.iv);renderHome.iv=setInterval(tick,30e3);
  }else $("#hero").innerHTML=`<div class="hero"><div class="kick"><span class="dot"></span>אין משחקים קרובים בלוח</div></div>`;
  const card=m=>{const us=ours(m.h)?m.h:m.a,opp=ours(m.h)?m.a:m.h,home=ours(m.h);let res="";
    if(played(m))res=m.w===us?'<span class="badge w">ניצחון</span>':m.w?'<span class="badge l">הפסד</span>':"";
    return `<button class="mcard" data-go="leagues" data-lg="${m.lg.id}" data-r="${m.r}"><div class="lg"><span>${esc(m.lg.short)} · מחזור ${m.r}</span><span class="num">${dshort(m.d)} ${played(m)?"":m.t}</span></div>
      <div class="tm us"><span>${esc(short(us))}</span>${home?'<span class="badge home">בית</span>':'<span class="badge">חוץ</span>'}${res}</div>
      <div class="tm"><span>נגד ${esc(short(opp))}</span>${played(m)?`<span class="badge num">${esc(m.res)}</span>`:""}</div></button>`};
  const rest=upcoming.slice(1,8);$("#nextRail").innerHTML=rest.map(card).join("");$("#nextSec").hidden=!rest.length;
  const res=all.filter(played).sort((a,b)=>when(b.d,b.t)-when(a.d,a.t)).slice(0,8);$("#resRail").innerHTML=res.map(card).join("");$("#resSec").hidden=!res.length;
  const top=D.players.filter(p=>p.rank).sort((a,b)=>a.rank-b.rank)[0];
  $("#tiles").innerHTML=`<button class="tile" data-go="rank"><small>המדורג הגבוה במועדון</small><b>${top?esc(dn(top)):"—"}</b><small class="num">${top?"מקום "+top.rank+" בארץ":""}</small></button>
    <button class="tile cta" data-go="club"><small>מצטרפים?</small><b>אימון ניסיון חינם</b><small>בכל מועד אימון</small></button>`;
}
function renderPosts(){
  const ps=(POSTS||[]).filter(x=>x&&x.title&&!x.hidden);
  const bn=ps.filter(x=>x.banner).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0];
  $("#noticeWrap").innerHTML=bn?`<div class="notice" role="status"><b>הודעה</b><span>${esc(bn.title)}${bn.text?" · "+esc(bn.text):""}</span></div>`:"";
  const list=ps.filter(x=>!x.banner).sort((a,b)=>(!!b.pin-!!a.pin)||String(b.date).localeCompare(String(a.date)));
  const img=u=>/^img\/[\w.-]+$/.test(u||"")?u:"";
  $("#newsRail").innerHTML=list.map(x=>`<button class="pcard" data-post="${esc(x.id)}">${img(x.img)?`<img src="${img(x.img)}" alt="" loading="lazy">`:""}<div class="in"><span class="dt">${x.date?new Date(x.date+"T12:00").toLocaleDateString("he-IL",{day:"numeric",month:"long"}):""}${x.pin?" · נעוץ":""}</span><h3>${esc(x.title)}</h3>${x.text?`<p>${esc(x.text)}</p>`:""}</div></button>`).join("");
  $("#newsSec").hidden=!list.length;
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-post]");if(!b)return;const x=POSTS.find(p=>p.id===b.dataset.post);if(!x)return;
  const img=/^img\/[\w.-]+$/.test(x.img||"")?x.img:"",link=/^https:\/\//.test(x.link||"")?x.link:"";
  openSheet(`${img?`<img class="post-img" src="${img}" alt="">`:""}<h2 class="post-h">${esc(x.title)}</h2>${x.text?`<div class="post-t">${esc(x.text)}</div>`:""}${link?`<a class="btn" style="margin-top:14px" href="${esc(link)}" target="_blank" rel="noopener">${esc(x.linkText||"לפרטים")}</a>`:""}`);track("post",x.title)});

/* ---------- leagues ---------- */
let LG=null,VIEW="table",ROUND={};
function renderLeagueTabs(){
  $("#lgSeg").innerHTML=D.leagues.map((l,i)=>`<button role="tab" data-lg="${l.id}" aria-selected="${i===0}">${esc(l.name.replace(" גברים",""))}</button>`).join("");
  LG=D.leagues[0];
  segment($("#lgSeg"),b=>{LG=D.leagues.find(l=>l.id===b.dataset.lg);renderLeague(0);track("league",LG.id)});
  segment($("#viewSeg"),b=>{const old=VIEW;VIEW=b.dataset.v;renderLeague(["table","rounds","ours","squad"].indexOf(VIEW)>["table","rounds","ours","squad"].indexOf(old)?1:-1);track("league",LG.id+":"+VIEW)});
}
function defaultRound(l){const now=new Date();const up=l.matches.filter(m=>!played(m)&&when(m.d,m.t)>now-3*3600e3).sort((a,b)=>when(a.d,a.t)-when(b.d,b.t));return up.length?up[0].r:Math.max(...l.matches.map(m=>m.r))}
function mrow(m){const mine=ours(m.h)||ours(m.a),nm=c=>`<span class="${ours(c)?"us":""} ${m.w===c?"wn":""}">${esc(short(c))}</span>`;
  return `<div class="mrow${mine?" mine":""}"><div class="h">${nm(m.h)}</div><div class="sc num">${played(m)?esc(m.res):m.t}</div><div class="a">${nm(m.a)}</div><div class="when num">${dshort(m.d)}</div></div>`}
function slideIn(el,dir){if(RM.matches||!dir)return;el.animate([{transform:`translateX(${-18*dir}px)`,opacity:0},{transform:"none",opacity:1}],{duration:280,easing:"cubic-bezier(.2,.8,.2,1)"})}
function renderLeague(dir){
  const l=LG,v=$("#lgView");
  $("#lgSrc").innerHTML=`${esc(l.name)} · ${esc(l.group)} · עונת 2026/27 · <a href="${esc(l.url)}" target="_blank" rel="noopener">באתר האיגוד</a>`;
  if(VIEW==="table"){
    v.innerHTML=`<div class="card"><table class="st"><thead><tr><th>#</th><th>קבוצה</th><th>מש׳</th><th>נצ׳</th><th>הפ׳</th><th>נק׳</th></tr></thead><tbody>${l.standings.map((r,i)=>`<tr class="${ours(r.t)?"us":""}"><td><span class="pos">${i+1}</span></td><td>${esc(short(r.t))}</td><td class="num">${r.p}</td><td class="num">${r.w}</td><td class="num">${r.l}</td><td class="num pts">${r.pts}</td></tr>`).join("")}</tbody></table></div>`;
  }else if(VIEW==="rounds"){
    const max=Math.max(...l.matches.map(m=>m.r));let r=ROUND[l.id]||(ROUND[l.id]=defaultRound(l));
    const ms=l.matches.filter(m=>m.r===r).sort((a,b)=>when(a.d,a.t)-when(b.d,b.t));
    v.innerHTML=`<div class="stepper"><button id="rPrev" aria-label="המחזור הקודם" ${r<=1?"disabled":""}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg></button>
      <div class="lbl"><b>מחזור ${r}</b><span>מתוך ${max}</span></div>
      <button id="rNext" aria-label="המחזור הבא" ${r>=max?"disabled":""}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 6-6 6 6 6"/></svg></button></div>
      <div class="card" id="rList">${ms.map(mrow).join("")||'<div class="empty">אין משחקים במחזור הזה</div>'}</div>`;
    $("#rPrev").onclick=()=>{ROUND[l.id]=r-1;renderLeague(-1);track("league",l.id+":r"+(r-1))};
    $("#rNext").onclick=()=>{ROUND[l.id]=r+1;renderLeague(1);track("league",l.id+":r"+(r+1))};
  }else if(VIEW==="ours"){
    const ms=l.matches.filter(m=>ours(m.h)||ours(m.a)).sort((a,b)=>when(a.d,a.t)-when(b.d,b.t));
    const now=new Date(),nextIdx=ms.findIndex(m=>!played(m)&&when(m.d,m.t)>now-3*3600e3);
    v.innerHTML=`<div class="card" id="oursList">${ms.map((m,i)=>mrow(m).replace('class="mrow',`data-i="${i}" class="mrow`)).join("")}</div>`;
    if(nextIdx>2){const el=v.querySelector(`[data-i="${nextIdx-1}"]`);el&&requestAnimationFrame(()=>el.scrollIntoView({block:"start"}))}
  }else{
    v.innerHTML=l.ourTeams.map(t=>`<div class="team-h">${esc(D.teams[t])}</div><div class="chips">${(D.rosters[t]||[]).map(id=>{const p=D.players.find(x=>x.id===id);return p?`<button class="chip" data-pid="${id}">${esc(dn(p))}<i class="num">${p.pts?Math.round(p.pts):"—"}</i></button>`:""}).join("")}</div>`).join("");
  }
  slideIn(v.firstElementChild&&VIEW==="rounds"?v.querySelector(".card"):v,dir);
}
document.addEventListener("click",e=>{const c=e.target.closest(".mcard[data-lg]");if(!c)return;
  const l=D.leagues.find(x=>x.id===c.dataset.lg);if(!l)return;LG=l;VIEW="rounds";ROUND[l.id]=+c.dataset.r;
  $$("#lgSeg button").forEach(b=>b.setAttribute("aria-selected",b.dataset.lg===l.id));$$("#viewSeg button").forEach(b=>b.setAttribute("aria-selected",b.dataset.v==="rounds"));renderLeague(0)},true);

/* ---------- ranking ---------- */
function renderRank(){
  $("#rankSub").textContent=`דירוג ארצי · מתעדכן בסוף כל חודש · הבא ב-${D.nextRanking}`;
  const r=D.players.filter(p=>p.pts>0).sort((a,b)=>b.pts-a.pts),max=r[0]?r[0].pts:1;
  const ini=n=>n.trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("");
  const pod=(p,i)=>p?`<button class="pod p${i}" data-pid="${p.id}"><span class="av">${esc(ini(dn(p)))}</span><span class="nm">${esc(dn(p))}</span><span class="pt num">${p.pts.toFixed(0)} נק׳</span><span class="blk num">${i}</span></button>`:"<div></div>";
  $("#podium").innerHTML=pod(r[1],2)+pod(r[0],1)+pod(r[2],3);
  const arrow=p=>p.ch==null?"":p.ch===0?'<small class="same">ללא שינוי</small>':p.ch>0?`<small class="up">▲ ${p.ch}</small>`:`<small class="down">▼ ${-p.ch}</small>`;
  $("#lb").innerHTML=r.slice(3).map((p,i)=>`<button class="lrow" data-pid="${p.id}"><span class="rk num">${i+4}</span><span class="nm"><b>${esc(dn(p))}</b><span>${esc(CAT[p.c]||p.c)}${p.rank?` · מקום ${p.rank} בארץ`:""}</span><div class="bar"><span style="width:${(p.pts/max*100).toFixed(1)}%"></span></div></span><span class="pt num">${p.pts.toFixed(0)}${arrow(p)}</span></button>`).join("");
  const un=D.players.filter(p=>!p.pts).length;$("#unrated").textContent=un?`עוד ${un} שחקנים יקבלו דירוג אחרי המשחקים הרשמיים הראשונים שלהם.`:"";
}
let podiumGrown=false;
function growPodium(){if(podiumGrown)return;podiumGrown=true;$("#lb").classList.add("grown");if(RM.matches)return;
  $$(".pod .blk").forEach((b,i)=>b.animate([{transform:"scaleY(0)"},{transform:"scaleY(1.06)",offset:.75},{transform:"scaleY(1)"}],{duration:620,delay:[120,0,220][i]||0,easing:"cubic-bezier(.2,.8,.2,1)",fill:"backwards"}));
  $$(".pod .av").forEach((b,i)=>b.animate([{transform:"translateY(14px)",opacity:0},{transform:"none",opacity:1}],{duration:500,delay:([120,0,220][i]||0)+260,easing:"cubic-bezier(.2,.8,.2,1)",fill:"backwards"}))}
function teamOf(id){for(const t in D.rosters)if(D.rosters[t].includes(id))return D.teams[t];return""}
function showPlayer(id){const p=D.players.find(x=>x.id===id);if(!p)return;
  const club=D.players.filter(x=>x.pts>0).sort((a,b)=>b.pts-a.pts).findIndex(x=>x.id===id)+1;
  const trend=p.ch==null?"—":p.ch===0?"יציב":p.ch>0?`▲ ${p.ch}`:`▼ ${-p.ch}`;
  openSheet(`<div class="pl-cat">${esc(CAT[p.c]||p.c)}${teamOf(id)?" · "+esc(teamOf(id)):""}</div><div class="pl-name">${esc(dn(p))}</div>
    <div class="pl-big"><b class="num" id="plRank">${p.rank?"#"+p.rank:"—"}</b><span>${p.rank?"מקום בדירוג הארצי":"עוד לא דורג. הדירוג נקבע אחרי משחקים רשמיים"}</span></div>
    <div class="pl-grid"><div><small>נקודות</small><b class="num">${p.pts?p.pts.toFixed(1):"0"}</b></div><div><small>במועדון</small><b class="num">${club||"—"}</b></div><div><small>החודש</small><b class="${p.ch>0?"up":p.ch<0?"down":""}">${trend}</b></div></div>
    <a class="link" href="https://www.tttm.co.il/p/${p.id}/" target="_blank" rel="noopener">כרטיס השחקן המלא באתר האיגוד</a>`);
  if(p.rank&&!RM.matches){const el=$("#plRank"),end=p.rank,t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/750),e=1-Math.pow(1-k,3);el.textContent="#"+Math.round(end+(1-e)*500);if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
  track("player",dn(p))}
document.addEventListener("click",e=>{const b=e.target.closest("[data-pid]");if(b)showPlayer(+b.dataset.pid)});
$("#q").addEventListener("input",e=>{const v=e.target.value.trim();clearTimeout(e.target.t);if(v.length<2)return;
  e.target.t=setTimeout(()=>{const p=D.players.find(x=>dn(x).includes(v));if(p){e.target.blur();showPlayer(p.id)}else toast("לא מצאנו שחקן בשם הזה")},450)});

/* ---------- club ---------- */
function renderClub(){
  $("#venueSeg").innerHTML=D.training.map((v,i)=>`<button role="tab" data-i="${i}" aria-selected="${i===0}">${esc(v.v)}</button>`).join("");
  const slots=i=>{$("#slots").innerHTML=D.training[i].g.map(([g,d,t,c])=>`<div class="slot"><b>${esc(g)}</b><span class="t num">${esc(t)}</span><span>ימים ${esc(d)}</span><span>מאמן: ${esc(c)}</span></div>`).join("")};
  slots(0);segment($("#venueSeg"),b=>{slots(+b.dataset.i);slideIn($("#slots"),1)});
  $("#ages").innerHTML=AGES.map(([t,s,f])=>{const ps=D.players.filter(p=>f(p.c)).sort((a,b)=>b.pts-a.pts);if(!ps.length)return"";
    return `<div class="age"><h3>${t}<span>${s?s+" · ":""}${ps.length} שחקנים</span></h3><div class="chips">${ps.map(p=>`<button class="chip" data-pid="${p.id}">${esc(dn(p))}</button>`).join("")}</div></div>`}).join("");
  const now=new Date(),ev=D.events.filter(e=>when(e[0],"23:59")>=now).slice(0,5);
  $("#evs").innerHTML=ev.map(([d,n,u])=>{const x=when(d);return `<a class="ev" href="${esc(u)}" target="_blank" rel="noopener"><span class="d num">${x.getDate()}<small>${x.toLocaleDateString("he-IL",{month:"short"})}</small></span><span>${esc(n)}</span></a>`}).join("");
  $("#evSec").hidden=!ev.length;
  $("#upd").textContent="עודכן "+new Date(D.updated).toLocaleString("he-IL",{day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"});
}
$("#copyPhone").addEventListener("click",async()=>{try{await navigator.clipboard.writeText("0504999149");toast("המספר הועתק")}catch(e){toast("050-4999149")}});
document.addEventListener("click",e=>{const a=e.target.closest("[data-soc]");if(a)track("social",a.dataset.soc)});

/* ---------- install to home screen ---------- */
let deferredInstall=null;
const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone;
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const inApp=/FBAN|FBAV|Instagram|Line\//i.test(navigator.userAgent);
addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("#installSec").hidden=standalone});
if(!standalone&&(isIOS||inApp)){$("#installSec").hidden=false;$("#installTxt").textContent=inApp?"פתחו את הקישור בדפדפן (⋯ ← פתיחה בדפדפן) ואז הוסיפו למסך הבית.":"בספארי: כפתור השיתוף ← הוספה למסך הבית.";$("#installBtn").hidden=!(!inApp&&isIOS);$("#installBtn").textContent="איך?"}
$("#installBtn").addEventListener("click",async()=>{track("click","install");
  if(deferredInstall){deferredInstall.prompt();const r=await deferredInstall.userChoice.catch(()=>null);deferredInstall=null;if(r&&r.outcome==="accepted"){$("#installSec").hidden=true;toast("נוסף למסך הבית")}}
  else if(isIOS)openSheet(`<h2 class="post-h">הוספה למסך הבית</h2><div class="post-t">1. לוחצים על כפתור השיתוף בתחתית ספארי (ריבוע עם חץ למעלה).
2. גוללים ובוחרים "הוספה למסך הבית".
3. לוחצים "הוסף". האייקון של המועדון יופיע לצד שאר האפליקציות.</div>`)});
if("serviceWorker" in navigator&&location.protocol==="https:")addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

/* ---------- opening: full intro once per visit, a quick fade when coming back in the same session ---------- */
const seen=(()=>{try{const v=sessionStorage.getItem("ttc_intro");sessionStorage.setItem("ttc_intro","1");return !!v}catch(e){return false}})();
if(seen)$("#splash").classList.add("quick");
const introDone=new Promise(r=>setTimeout(r,seen||RM.matches?150:1900));
function hideSplash(){introDone.then(()=>{$("#splash").classList.add("gone");$("#s-home").classList.add("enter-home")})}
/* ---------- boot ---------- */
function boot(){
  renderHome();renderPosts();renderLeagueTabs();renderLeague(0);renderRank();renderClub();
  const start=(location.hash||"").slice(1);
  moveBall("home",true);
  hideSplash();
  if(ORDER.includes(start)&&start!=="home")setTimeout(()=>go(start,{silent:true}),150);
}
Promise.all([
  fetch("data.json",{cache:"no-store"}).then(r=>r.json()),
  fetch("posts.json",{cache:"no-store"}).then(r=>r.ok?r.json():{}).catch(()=>({}))
]).then(([d,p])=>{D=cleanData(d);POSTS=Array.isArray(p.posts)?p.posts:[];boot()})
 .catch(()=>{hideSplash();$("#hero").innerHTML='<div class="hero"><div class="kick">אין חיבור כרגע. נסו לרענן בעוד רגע.</div></div>'});
