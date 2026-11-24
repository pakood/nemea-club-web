const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ic=n=>`<svg class="i"><use href="#i-${n}"/></svg>`;
const PLANS=[
 {n:'BÁSICO',p:349,pill:'',items:['1 sucursal','Horario de 6:00 a 16:00','2 clases por semana','1 valoración corporal al inscribirse']},
 {n:'INTERMEDIO',p:499,pill:'MÁS POPULAR',pop:1,items:['Todas las sucursales de tu ciudad','Todo el horario','Clases ilimitadas','Sillones de masaje','2 invitados al mes','1 sesión con entrenador al inscribirse']},
 {n:'PREMIUM',p:799,pill:'TODO INCLUIDO',items:['Todas las sucursales del país','Sauna y vapor','Zona de recuperación','2 sesiones con entrenador al mes','1 asesoría de nutrición al mes','Locker y toalla','5 invitados al mes']}];
const CLS=[['ZUMBA','music',45,2,'Media','clase de zumba'],['FUNCIONAL EN CIRCUITO','loop',40,3,'Alta','clase de funcional en circuito'],['SPINNING','bike',45,3,'Alta','clase de spinning'],['BOX FITNESS','box',50,3,'Alta','clase de box fitness']];
const TEST=[['Ana Martínez','Socia Intermedio','Por $499 tengo clases ilimitadas y puedo entrenar en cualquier sucursal de mi ciudad.'],['Luis Hernández','Socio Premium','El sauna después de pierna es lo mejor. Y sin permanencia, sin letras chiquitas.'],['Daniela Ortiz','Socia Intermedio','Empecé con el plan básico y en un mes me cambié a Intermedio por las clases.']];
const SERV=[['SAUNA SECO','sauna','Calor seco a alta temperatura para soltar los músculos y aliviar la tensión después de entrenar.',[0,0,1]],['CUARTO DE VAPOR','steam','Vapor húmedo que te ayuda a relajarte y a descansar mejor después de tu entrenamiento.',[0,0,1]],['ZONA DE RECUPERACIÓN','chair','Sillones de masaje y espacio para estirar y recuperarte. Zona completa en el plan Premium.',[0,1,1]],['ENTRENADOR PERSONAL','weights','Sesiones con un entrenador que arma tu rutina y corrige tu técnica para avanzar con seguridad.',[0,1,1]],['NUTRICIÓN','food','Asesoría con un especialista para ajustar tu alimentación a tu objetivo.',[0,0,1]],['ANÁLISIS DE COMPOSICIÓN CORPORAL','scale','Mide grasa, músculo y agua para conocer tu punto de partida y seguir tu progreso.',[1,0,0]],['TIENDA Y BEBIDAS','bag','Suplementos, accesorios y bebidas para antes y después de entrenar. Se pagan aparte.',[1,1,1]]];
const FAQ=[['¿Hay permanencia o plazo forzoso?','No. Todos los planes son sin permanencia: puedes cancelar cuando quieras.'],['¿Qué incluye el primer mes con descuento?','Es una promoción de bienvenida con precio reducido en tu primer mes de cualquier plan. Los detalles se confirman al inscribirte.'],['¿Puedo cambiar de plan?','Sí. Puedes subir o bajar de plan cuando lo necesites; el cambio aplica a partir de tu siguiente pago.'],['¿Cómo funcionan los invitados?','Los planes Intermedio y Premium incluyen invitados al mes. Cada invitado entra contigo y se registra en recepción.'],['¿Qué métodos de pago aceptan?','Aceptamos tarjeta de crédito y débito. Confirma las opciones disponibles en tu sucursal.'],['¿Puedo entrenar en otra sucursal?','Depende de tu plan: Básico incluye 1 sucursal, Intermedio todas las de tu ciudad y Premium todas las del país.']];
/* plans */
const planCard=(p,i)=>`<div class="pc rv ${p.pop?'pop':''}" style="--d:${i*.1}s">${p.pill?`<span class="pill ${p.pop?'':'o'}">${p.pill}</span>`:'<span style="height:40px"></span>'}<h3>${p.n}</h3><div class="price">$${p.p}<small>MXN/mes</small></div><div class="d">Primer mes con descuento</div><div class="np">${ic('chk')} Sin permanencia</div><ul>${p.items.map(x=>`<li>${ic('chk')}${x}</li>`).join('')}</ul><button class="btn block" data-join="${p.n}">¡Inscríbete ya!</button></div>`;
$$('.plan-grid').forEach(g=>{const s=g.hasAttribute('data-short');g.innerHTML=PLANS.map((p,i)=>planCard(s?{...p,items:p.items.slice(0,3)}:p,i)).join('')});
/* classes */
$('#cls').innerHTML=CLS.map((c,i)=>`<div class="cc rv" style="--d:${i*.08}s" data-class="${c[0]}"><div class="ph"><svg class="i"><use href="#i-img"/></svg>Foto: ${c[5]}</div><div class="ic">${ic(c[1])}</div><h3>${c[0]}</h3><div class="m">${ic('clk')}Duración: ${c[2]} min</div><div class="int">Intensidad ${[0,1,2].map(k=>`<i style="--k:${k}" class="${k<c[3]?'on':''}"></i>`).join('')}<b>${c[4]}</b></div></div>`).join('');
/* comparison */
const ROWS=[['Sucursales','1 sucursal','Todas las de tu ciudad','Todas del país'],['Horario','6:00 a 16:00','Todo el horario','Todo el horario'],['Clases','2 por semana','Ilimitadas','Ilimitadas'],['Valoración corporal','1 al inscribirse','—','—'],['Sillones de masaje','—','✓','✓'],['Sauna y vapor','—','—','✓'],['Zona de recuperación','—','—','✓'],['Invitados al mes','—','2','5'],['Sesiones con entrenador','—','1 al inscribirse','2 al mes'],['Asesoría de nutrición','—','—','1 al mes'],['Locker y toalla','—','—','✓']];
$('#cmp').innerHTML=`<thead><tr><th></th>${PLANS.map((p,i)=>`<th data-c="${i}"><h3>${p.n}</h3><small>$${p.p} MXN/mes</small></th>`).join('')}</tr></thead><tbody>${ROWS.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map((v,i)=>`<td data-c="${i}" class="${v==='—'?'n':''}">${v==='✓'?ic('chk').replace('class="i"','class="i" style="color:var(--red);stroke-width:2.6"'):v}</td>`).join('')}</tr>`).join('')}</tbody>`;
$$('#cmp [data-c]').forEach(c=>{c.onmouseenter=()=>$$(`#cmp [data-c="${c.dataset.c}"]`).forEach(x=>x.classList.add('col'));c.onmouseleave=()=>$$('#cmp .col').forEach(x=>x.classList.remove('col'))});
/* faq */
$('#faq').innerHTML=FAQ.map(f=>`<div class="q rv"><button>${f[0]}${ic('plus')}</button><div class="a"><div><p>${f[1]}</p></div></div></div>`).join('');
$$('.q button').forEach(b=>b.onclick=()=>{const q=b.parentNode,o=q.classList.contains('o');$$('.q.o').forEach(x=>x.classList.remove('o'));if(!o)q.classList.add('o')});
/* services */
$('#sg').innerHTML=SERV.map((s,i)=>`<div class="sv rv" data-inc="${s[3].join('')}" style="--d:${(i%3)*.08}s"><div class="ph"><svg class="i"><use href="#i-img"/></svg>Foto: servicio: ${s[0].toLowerCase()}</div><h3>${s[0]}</h3><p>${s[2]}</p><div class="inc">INCLUIDO EN ${['BÁSICO','INTERMEDIO','PREMIUM'].map((n,k)=>`<b class="${s[3][k]?'y':''}">${n}</b>`).join('')}</div></div>`).join('')+`<div class="sv cta rv"><h3>¿NO SABES QUÉ<em>PLAN ELEGIR?</em></h3><p>Compara los tres planes y elige el que mejor se adapte a ti. Todos son sin permanencia.</p><a class="btn" href="#planes">¡Inscríbete ya!</a></div>`;
$$('#tabs button').forEach(b=>b.onclick=()=>{$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));const t=b.dataset.t;$$('.sv[data-inc]').forEach(c=>c.classList.toggle('dim',t!=='all'&&c.dataset.inc[t]!=='1'))});
/* testimonials */
$('#tt').innerHTML=TEST.map(t=>`<div class="tc"><div class="stars">${'<svg class="i"><use href="#i-star"/></svg>'.repeat(5)}</div><q>${t[2]}</q><div class="who"><div class="av">${ic('user')}</div><div><b>${t[0]}</b><small>${t[1]}</small></div></div></div>`).join('');
let ti=0,tmr;const per=()=>innerWidth>1100?3:innerWidth>600?2:1,pages=()=>TEST.length-per()+1;
function slide(i){const n=pages();ti=(i+n)%Math.max(n,1);const w=$('.tc').offsetWidth+32;$('#tt').style.transform=`translateX(${-ti*w}px)`;$('#dots').innerHTML=Array.from({length:n},(_,k)=>`<button class="${k===ti?'on':''}" aria-label="Testimonio ${k+1}"></button>`).join('');$$('#dots button').forEach((b,k)=>b.onclick=()=>{slide(k);auto()})}
function auto(){clearInterval(tmr);tmr=setInterval(()=>pages()>1&&slide(ti+1),4500)}
addEventListener('resize',()=>slide(0));
/* router */
const R=['inicio','planes','sucursales','servicios'];let cur=null;
function route(first){let h=location.hash.slice(1);if(!R.includes(h))h='inicio';if(h===cur)return;const go=()=>{$$('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+h));cur=h;scrollTo({top:0,behavior:'instant'});$$('.links a').forEach(a=>a.classList.toggle('on',a.dataset.r===h));$('#main').classList.remove('out');document.title=`NEMEA CLUB · ${h[0].toUpperCase()+h.slice(1)}`;observe();if(h==='inicio')slide(0)};if(first)go();else{$('#main').classList.add('out');setTimeout(go,280)}}
addEventListener('hashchange',()=>{closeMob();route()});
let io;function observe(){io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.view.on .rv:not(.in)').forEach(e=>io.observe(e))}
/* nav */
addEventListener('scroll',()=>$('#nav').classList.toggle('sc',scrollY>20),{passive:true});
const closeMob=()=>{$('#mob').classList.remove('o');$('#burger').classList.remove('o')};
$('#burger').onclick=()=>{$('#mob').classList.toggle('o');$('#burger').classList.toggle('o')};
/* modals & toast */
const openM=id=>$(id).classList.add('o'),closeM=()=>$$('.ov.o').forEach(o=>o.classList.remove('o'));
$$('.ov').forEach(o=>o.addEventListener('click',e=>{if(e.target===o||e.target.closest('[data-close]'))closeM()}));
addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
let tt;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('s');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('s'),2600)};
const INFO={'Quiénes somos':'NEMEA CLUB es una comunidad de entrenamiento: fuerza que inspira, comunidad que transforma.','Contacto':'Escríbenos o visita tu sucursal. En esta demostración aún no hay datos de contacto reales.','Trabaja con nosotros':'Pronto abriremos vacantes para entrenadores, recepción y operación.','Contratos':'Aquí se mostrará el contrato de membresía. Todos los planes son sin permanencia.','Aviso de privacidad':'Aquí se mostrará el aviso de privacidad completo. Contenido de ejemplo para la demostración.','Términos y condiciones':'Aquí se mostrarán los términos y condiciones. Contenido de ejemplo para la demostración.'};
document.addEventListener('click',e=>{
 const j=e.target.closest('[data-join]');if(j){const v=j.dataset.join;$('#join-form').style.display='';$('#join-ok').style.display='none';$$('#f-join .bad').forEach(x=>x.classList.remove('bad'));if(v){const i=['BÁSICO','INTERMEDIO','PREMIUM'].indexOf(v.toUpperCase());if(i>=0)$('#j-plan').selectedIndex=i}closeMob();openM('#ov-join')}
 const f=e.target.closest('[data-info]');if(f){$('#info-t').textContent=f.dataset.info.toUpperCase();$('#info-p').textContent=INFO[f.dataset.info];openM('#ov-info')}
 const s=e.target.closest('[data-soc]');if(s)toast(`${s.dataset.soc}: enlace de demostración`);
 const c=e.target.closest('[data-class]');if(c)toast(`${c.dataset.class}: ver horarios en tu sucursal`);
 const b=e.target.closest('.btn');if(b){const r=document.createElement('span'),d=Math.max(b.offsetWidth,b.offsetHeight),q=b.getBoundingClientRect();r.className='rp';r.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-q.left-d/2}px;top:${e.clientY-q.top-d/2}px`;b.appendChild(r);setTimeout(()=>r.remove(),600)}
});
$$('[data-sw]').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
$('#f-join').onsubmit=e=>{e.preventDefault();const f=e.target;let ok=true;const chk=(n,fn)=>{const l=f[n].closest('label'),v=f[n].value.trim(),g=fn(v);l.classList.toggle('bad',!g);if(!g)ok=false};chk('n',v=>v.length>1);chk('e',v=>/^\S+@\S+\.\S+$/.test(v));chk('t',v=>v.replace(/\D/g,'').length===10);if(!ok)return;$('#ok-n').textContent=f.n.value.trim().split(' ')[0].toUpperCase();$('#ok-p').textContent=f.p.value.split(' · ')[0];$('#join-form').style.display='none';$('#join-ok').style.display='';f.reset()};
/* cookies */
const hideCk=()=>{$('#ck').classList.remove('s');try{localStorage.setItem('nemea-ck','1')}catch(_){}};
$('#ck-ok').onclick=()=>{hideCk();toast('Cookies aceptadas')};$('#ck-cfg').onclick=()=>openM('#ov-ck');$('#ck-save').onclick=()=>{closeM();hideCk();toast('Preferencias guardadas')};
let seen=false;try{seen=localStorage.getItem('nemea-ck')}catch(_){}if(!seen)setTimeout(()=>$('#ck').classList.add('s'),900);
/* search */
const match=q=>{q=q.trim().toLowerCase();return !q||/(ciudad de m|cdmx|mexico|méxico|df|^0\d{4}$|^06|^03|^11)/.test(q)};
$('#f-search').onsubmit=e=>{e.preventDefault();const q=$('#q-home').value;$('#q-suc').value=q.trim()||'Ciudad de México, CDMX';location.hash='sucursales';setTimeout(()=>doSuc(),320)};
function doSuc(){const q=$('#q-suc').value,m=match(q);$('#sc2').style.display=m?'':'none';$('#emp').style.display=m?'none':'block';$('#cnt').textContent=m?'1 sucursal en Ciudad de México':'0 sucursales para tu búsqueda'}
$('#f-suc').onsubmit=e=>{e.preventDefault();doSuc()};$('#reset-suc').onclick=()=>{$('#q-suc').value='Ciudad de México, CDMX';doSuc()};
$('#ver-suc').onclick=function(){const d=$('#det'),o=d.classList.toggle('o');this.textContent=o?'Ocultar sucursal':'Ver sucursal'};
route(true);auto();
