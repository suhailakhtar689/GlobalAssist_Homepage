/* ── HAMBURGER MENU ── */
const ham=document.getElementById('ham');
const mobileNav=document.getElementById('mobileNav');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mobileNav.classList.toggle('open');});
function closeNav(){ham.classList.remove('open');mobileNav.classList.remove('open');}

/* ── CURSOR (desktop only) ── */
const cur=document.getElementById('cur'),curf=document.getElementById('curf');
let mx=0,my=0,fx=0,fy=0;
if(window.innerWidth>900){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function af(){fx+=(mx-fx)*.1;fy+=(my-fy)*.1;curf.style.left=fx+'px';curf.style.top=fy+'px';requestAnimationFrame(af);})();
  document.querySelectorAll('a,button,.svc,.wi,.tc,.ip,.hire-cta').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.width='20px';cur.style.height='20px';curf.style.width='60px';curf.style.height='60px';curf.style.opacity='.25';});
    el.addEventListener('mouseleave',()=>{cur.style.width='12px';cur.style.height='12px';curf.style.width='36px';curf.style.height='36px';curf.style.opacity='.5';});
  });
}

/* ── SCROLL REVEAL ── */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const sibs=[...en.target.parentElement.querySelectorAll('.reveal')];
      const idx=sibs.indexOf(en.target);
      setTimeout(()=>en.target.classList.add('visible'),idx*100);
      ro.unobserve(en.target);
    }
  });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* Section headings reveal */
document.querySelectorAll('.sh2,.slbl,.ssub,.hire-h,.hire-lbl,.hire-p,.cta-sec h2,.cta-sec>p').forEach(el=>{
  el.style.cssText+='opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .8s ease;';
  new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}},{threshold:.15}).observe(el);
});

/* ── COUNTER ── */
function countUp(el,target,suf){
  let s=null;
  (function step(ts){if(!s)s=ts;const p=Math.min((ts-s)/2000,1),v=1-Math.pow(1-p,3);el.textContent=Math.floor(v*target)+suf;if(p<1)requestAnimationFrame(step);})(performance.now());
}
const co=new IntersectionObserver(entries=>{
  entries.forEach(en=>{if(en.isIntersecting){countUp(en.target,+en.target.dataset.count,en.target.dataset.suf||'+');co.unobserve(en.target);}});
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

/* ── METRIC BARS ── */
document.querySelectorAll('.wf').forEach(f=>{
  new IntersectionObserver(([e])=>{if(e.isIntersecting){setTimeout(()=>{f.style.transition='width 1.6s cubic-bezier(.25,1,.5,1)';f.style.width=f.dataset.w;},200);}},{threshold:.5}).observe(f);
});

/* ── NAV SHADOW ── */
window.addEventListener('scroll',()=>{document.getElementById('nav').style.boxShadow=window.scrollY>60?'0 4px 40px rgba(0,0,0,.07)':'none';},{passive:true});

/* ── HERO FLY-IN ── */
const heroImgs=[
  {sel:'.f1',startX:500,startY:-80, rot:-12,rotStart:25, delay:0,   phase:0.0},
  {sel:'.f2',startX:460,startY:20,  rot:8,  rotStart:20, delay:80,  phase:0.9},
  {sel:'.f3',startX:480,startY:-40, rot:-6, rotStart:-22,delay:140, phase:1.7},
  {sel:'.f4',startX:500,startY:30,  rot:13, rotStart:28, delay:50,  phase:0.4},
  {sel:'.f5',startX:520,startY:60,  rot:9,  rotStart:18, delay:190, phase:1.3},
  {sel:'.f6',startX:470,startY:80,  rot:-10,rotStart:-20,delay:110, phase:2.1},
  {sel:'.f7',startX:490,startY:40,  rot:6,  rotStart:24, delay:170, phase:0.7},
];
heroImgs.forEach(c=>{
  c.el=document.querySelector(c.sel);
  if(c.el){c.el.style.cssText+=`transition:none;opacity:0;transform:translate(${c.startX}px,${c.startY}px) rotate(${c.rotStart}deg);`;}
});
window.addEventListener('load',()=>{
  heroImgs.forEach(c=>{
    if(!c.el)return;
    setTimeout(()=>{
      c.el.style.transition='transform 1.1s cubic-bezier(0.34,1.3,0.64,1),opacity 0.7s ease';
      c.el.style.opacity='1';
      c.el.style.transform=`translate(0px,0px) rotate(${c.rot}deg)`;
      setTimeout(()=>{
        let t0=null;const spd=0.0006+Math.random()*0.0004,amp=13+Math.random()*9;
        (function tick(ts){
          if(!t0)t0=ts;const e=(ts-t0)*spd;
          c.el.style.transition='none';
          c.el.style.transform=`translate(0px,${Math.sin(e+c.phase)*amp}px) rotate(${c.rot+Math.sin(e*.6+c.phase)*2.5}deg)`;
          requestAnimationFrame(tick);
        })(performance.now());
      },1300);
    },c.delay);
  });
});

/* ── CAROUSEL (scroll-driven) ── */
const scene=document.getElementById('carouselScene');
const cCards=scene?[...scene.querySelectorAll('.c-card')]:[];
const N=cCards.length,RADIUS=300;
let masterAngle=146;
function setCarousel(a){
  if(!scene)return;
  scene.style.transform=`rotate(${a}deg)`;
  cCards.forEach((c,i)=>{c.style.transform=`translate(-50%,-50%) rotate(${i*(360/N)}deg) translateY(-${RADIUS}px)`;});
}
setCarousel(masterAngle);
const hireSec=document.getElementById('about');
window.addEventListener('scroll',()=>{
  if(!hireSec)return;
  const r=hireSec.getBoundingClientRect();
  masterAngle=146+Math.max(0,Math.min(1,(window.innerHeight-r.top)/(hireSec.offsetHeight+window.innerHeight)))*200;
  setCarousel(masterAngle);
},{passive:true});

/* ── 3D SCROLL — SCATTERED CARDS (image-matched) ── */
/* ── 3D SCROLL — SCATTERED CARDS (RISE IN + EXIT OUT) ── */
(function(){
  const sec   = document.getElementById('grid3d');
  const stage = document.getElementById('g3Stage');
  if(!sec || !stage) return;

  const IMGS = [
    'photo-1573496359142-b8d87734a5a2',
    'photo-1580489944761-15a19d654956',
    'photo-1600880292203-757bb62b4baf',
    'photo-1497366216548-37526070297c',
    'photo-1560250097-0b93528c311a',
    'photo-1551836022-deb4988cc6c0',
    'photo-1611532736597-de2d4265fba3',
    'photo-1552664730-d307ca884978',
    'photo-1519085360753-af0119f7cbe7',
    'photo-1522071820081-009f0129c71c',
    'photo-1494790108377-be9c29b29330',
    'photo-1507003211169-0a1dd7228f2d',
  ];

  const LAYOUT = [
    { x: 40,  y: 30,  w: 280, h: 210, d: 1, rz: -5  },
    { x: 580, y: 15,  w: 190, h: 140, d: 2, rz:  2  },
    { x: 1160,y: 60,  w: 150, h: 112, d: 3, rz: -4  },
    { x: 1330,y: 45,  w: 140, h: 105, d: 4, rz:  6  },
    { x: 170, y: 250, w: 235, h: 175, d: 1, rz:  4  },
    { x: 320, y: 235, w: 195, h: 145, d: 2, rz: -7  },
    { x: 690, y: 240, w: 110, h:  82, d: 3, rz: -5  },
    { x: 780, y: 250, w: 155, h: 115, d: 3, rz:  3  },
    { x: 960, y: 230, w: 165, h: 123, d: 3, rz: -4  },
    { x: 1120,y: 255, w: 155, h: 115, d: 3, rz:  5  },
    { x: 320, y: 420, w: 120, h:  90, d: 3, rz:  5  },
    { x: 430, y: 430, w: 105, h:  79, d: 4, rz: -6  },
    { x: 530, y: 400, w: 110, h:  82, d: 4, rz:  3  },
    { x: 620, y: 440, w: 120, h:  90, d: 4, rz: -4  },
    { x: 720, y: 410, w: 130, h:  97, d: 4, rz:  6  },
    { x: 870, y: 425, w: 150, h: 112, d: 4, rz: -5  },
    { x: 1040,y: 415, w: 145, h: 108, d: 4, rz:  4  },
    { x: 440, y: 560, w: 108, h:  81, d: 4, rz: -3  },
    { x: 555, y: 550, w: 118, h:  88, d: 5, rz:  5  },
    { x: 650, y: 565, w: 108, h:  81, d: 5, rz: -5  },
    { x: 780, y: 555, w: 105, h:  79, d: 5, rz:  4  },
    { x: 870, y: 575, w: 115, h:  86, d: 5, rz: -6  },
    { x: 990, y: 560, w: 108, h:  81, d: 5, rz:  3  },
    { x: -20, y: 570, w: 128, h:  96, d: 5, rz: -4  },
    { x: 1260,y: 540, w: 110, h:  82, d: 5, rz:  5  },
  ];

  const depthZ = { 1: 2000, 2: 3000, 3: 4000, 4: 5000, 5: 6000 };
  const REF_W = 1440, REF_H = 720;

  LAYOUT.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = 'g3-item';
    const lPct = (card.x / REF_W * 100).toFixed(2);
    const tPct = (card.y / REF_H * 100).toFixed(2);
    el.style.cssText = `width:${card.w}px;height:${card.h}px;left:${lPct}%;top:${tPct}%;`;
    const img = IMGS[i % IMGS.length];
    el.innerHTML = `<img src="https://images.unsplash.com/${img}?w=${card.w*2}&h=${card.h*2}&fit=crop&crop=top" loading="lazy" alt="">`;
    el.dataset.bz  = depthZ[card.d];
    el.dataset.rz  = card.rz;
    stage.appendChild(el);
  });

  const items = [...stage.querySelectorAll('.g3-item')];

  function easeInOutCubic(x) {
    return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2,3)/2;
  }

  function update(){
    const rect = sec.getBoundingClientRect();
    const vh   = window.innerHeight;
    const secH = sec.offsetHeight; // 400vh

    // Raw scroll progress: 0 = section enters viewport, 1 = section fully scrolled past
    let raw = (vh - rect.top) / (secH + vh);
    raw = Math.max(0, Math.min(1, raw));

    // Phase 1: 0→0.5 → images rise from bottom (entry)
    // Phase 2: 0.5→1 → images exit upward (exit)
    // Map to a -1 → 0 → 1 triangle:
    //   entryProgress: 0→1 during first half
    //   exitProgress:  0→1 during second half

    let entryP, exitP;
    if(raw <= 0.5){
      entryP = raw / 0.5;  // 0 to 1
      exitP  = 0;
    } else {
      entryP = 1;
      exitP  = (raw - 0.5) / 0.5; // 0 to 1
    }

    const eEntry = easeInOutCubic(entryP);
    const eExit  = easeInOutCubic(exitP);

    items.forEach(el => {
      const startZ   = parseFloat(el.dataset.bz);
      const baseRotZ = parseFloat(el.dataset.rz);

      // ENTRY: cards come from bottom (large +yOffset) and z shoots in
      const entryY = (1 - eEntry) * vh * 1.2;    // niche se upar
      const entryZ = startZ - eEntry * (startZ - 200); // far to near
      const entryRx = -22 * (1 - eEntry);
      const entryRz = baseRotZ * (1 - eEntry * 0.8);
      const entryBr = 0.2 + eEntry * 0.8;
      const entryOp = Math.min(1, entryP * 3);

      // EXIT: cards fly upward (negative Y) and zoom past
      const exitY  = eExit * -vh * 1.4;           // upar ki traf
      const exitZ  = 200 + eExit * 1800;          // zoom forward/past
      const exitOp = 1 - eExit;
      const exitBr = 1 - eExit * 0.7;

      // Combined
      const finalY  = entryY + exitY;
      const finalZ  = entryZ + (exitZ - 200) * exitP;
      const finalRx = entryRx - eExit * 15;       // slight tilt on exit
      const finalRz = entryRz + eExit * baseRotZ * 0.5;
      const finalBr = entryBr * exitBr;
      const finalOp = entryOp * exitOp;

      el.style.transform = `translateY(${finalY}px) translateZ(${finalZ}px) rotateX(${finalRx}deg) rotateZ(${finalRz}deg)`;
      el.style.filter    = `brightness(${Math.max(0.05, finalBr)})`;
      el.style.opacity   = Math.max(0, finalOp);
    });
  }

  window.addEventListener('scroll', update, {passive:true});
  update();
})();

/* ── WORD SWAP ── */
const words=['Teams.','Results.','Growth.','Success.'];
let wi=0; const sw=document.getElementById('swapWord');
if(sw){
  setInterval(()=>{
    sw.style.cssText+='opacity:0;transform:translateY(10px);transition:opacity .35s,transform .35s;';
    setTimeout(()=>{
      wi=(wi+1)%words.length;
      sw.textContent=words[wi];
      sw.style.opacity='1';
      sw.style.transform='translateY(0)';
    },380);
  },2800);
}

/* ===== CAROUSEL FUNCTIONALITY ===== */
let currentSlide = 0; 
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }
function goToSlide(n) { showSlide(n); }

// Auto-play every 5 seconds (optional)
let autoPlay = setInterval(nextSlide, 5000);
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
carousel.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 5000));




// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const carouselSection = document.querySelector('.support-carousel');
  const headingElement = document.querySelector('.support-header h2'); // The h2 we want to change
  let currentSlide = 0;

  // Define background colors for each slide
  const slideColors = [
    '#ffedd0', // Slide 0
    '#e0f2fe', // Slide 1
    '#f1f0ff', // Slide 2
    '#fff4e6'  // Slide 3
  ];

  // Define headings for each slide (customize as needed)
  const slideHeadings = [
    'Plan Selection',      // Slide 0
    'Personalized Guidance', // Slide 1
    'Dedicated Expertise',   // Slide 2
    'Track Progress'         // Slide 3
  ];

  // Function to show a specific slide
  window.showSlide = function(index) {
    // Wrap around if out of bounds
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    // Update active slide class
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    // Update active dot class
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // Change background color of the carousel section
    carouselSection.style.backgroundColor = slideColors[index];

    // Change the main heading text
    if (headingElement) {
      headingElement.textContent = slideHeadings[index];
    }

    currentSlide = index;
  };

  // Define navigation functions globally
  window.prevSlide = function() {
    showSlide(currentSlide - 1);
  };

  window.nextSlide = function() {
    showSlide(currentSlide + 1);
  };

  window.goToSlide = function(index) {
    showSlide(index);
  };

  // Initialize: show first slide
  showSlide(0);
});