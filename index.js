<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ATESHU</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --sky:#e0f7ff;--sky2:#c7ecff;--sky3:#a8ddff;
  --cloud:#fff;
  --ground:#5cb85c;--ground2:#3d8b3d;--ground3:#8bc34a;
  --brick:#e8643c;--brick2:#c94c2a;
  --coin:#ffd600;--coin2:#ffb300;
  --hero:#4ecdc4;--hero2:#2ba8a0;
  --pixel1:#ff6b6b;--pixel2:#feca57;--pixel3:#48dbfb;--pixel4:#a29bfe;
  --star:#fff176;
  --txt-dark:#1a1a2e;
  --card-bg:rgba(255,255,255,0.92);
  --card-border:rgba(255,255,255,0.99);
  --shadow:0 4px 0 rgba(0,0,0,0.18);
}
html{scroll-behavior:smooth}
body{
  font-family:'Rajdhani',sans-serif;
  background:var(--sky);
  overflow-x:hidden;
  min-height:100vh;
  position:relative;
}

/* ── LOADING ───────────────────────────────────────── */
#loader{
  position:fixed;inset:0;z-index:9999;
  background:#0d0d1a;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
  transition:opacity .6s ease, visibility .6s ease;
}
#loader.out{opacity:0;visibility:hidden;pointer-events:none}
.ld-title{
  font-family:'Press Start 2P',monospace;
  font-size:clamp(10px,3.5vw,18px);
  color:#fff;
  letter-spacing:.12em;
  text-align:center;
  line-height:1.7;
  animation:ldBlink 1s step-end infinite;
}
@keyframes ldBlink{0%,100%{opacity:1}50%{opacity:.4}}
.ld-sub{
  font-family:'Press Start 2P',monospace;
  font-size:clamp(7px,2vw,10px);
  color:#48dbfb;
  letter-spacing:.2em;
}
.ld-track{
  width:min(300px,80vw);height:18px;
  background:#111;
  border:3px solid #333;
  image-rendering:pixelated;
  position:relative;overflow:hidden;
}
.ld-fill{
  height:100%;
  background:linear-gradient(90deg,#ffd600,#ff6b6b,#a29bfe);
  transition:width .3s steps(10);
  width:0%;
}
.ld-pct{
  font-family:'Press Start 2P',monospace;
  font-size:9px;color:#ffd600;letter-spacing:.1em;
  margin-top:4px;
}
.ld-msg{
  font-family:'Press Start 2P',monospace;
  font-size:clamp(6px,1.8vw,9px);
  color:#a0a0c0;
  letter-spacing:.12em;
  min-height:1.4em;
  text-align:center;
  padding:0 16px;
}
/* pixel scanlines */
#loader::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.18) 2px,rgba(0,0,0,.18) 4px);
}
/* pixel corners */
.ld-logo-wrap{
  position:relative;
  padding:20px 28px;
  border:4px solid #ffd600;
}
.ld-logo-wrap::before,.ld-logo-wrap::after{
  content:'★';
  font-size:18px;color:#ffd600;
  position:absolute;top:-14px;
}
.ld-logo-wrap::before{left:8px}
.ld-logo-wrap::after{right:8px}

/* ── SKY BACKGROUND ─────────────────────────────────── */
.sky-layer{
  position:fixed;inset:0;z-index:0;
  background:linear-gradient(180deg,#87ceeb 0%,#b8e8ff 55%,#d4f1c5 75%,#5cb85c 75%,#3d8b3d 100%);
  overflow:hidden;
}

/* Sun */
.sun{
  position:absolute;top:28px;right:60px;
  width:72px;height:72px;border-radius:50%;
  background:radial-gradient(circle at 40% 40%,#fff9c4,#ffd600 60%,#ffb300);
  box-shadow:0 0 0 8px rgba(255,214,0,.22),0 0 0 18px rgba(255,214,0,.10);
  animation:sunBob 8s ease-in-out infinite;
}
@keyframes sunBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.sun-ray{
  position:absolute;top:50%;left:50%;
  width:90px;height:3px;
  background:linear-gradient(90deg,rgba(255,214,0,.6),transparent);
  transform-origin:0 50%;
  border-radius:2px;
}

/* Clouds */
.cloud{
  position:absolute;
  border-radius:50px;
  background:rgba(255,255,255,0.88);
  animation:cloudDrift linear infinite;
}
.cloud::before,.cloud::after{
  content:'';position:absolute;
  background:rgba(255,255,255,0.88);
  border-radius:50%;
}
@keyframes cloudDrift{from{transform:translateX(110vw)}to{transform:translateX(-400px)}}

/* Pixel ground blocks */
.ground-strip{
  position:absolute;bottom:0;left:0;right:0;height:32px;
  background:repeating-linear-gradient(90deg,#5cb85c 0px,#5cb85c 31px,#3d8b3d 31px,#3d8b3d 32px);
}
.ground-strip2{
  position:absolute;bottom:32px;left:0;right:0;height:16px;
  background:repeating-linear-gradient(90deg,#8bc34a 0px,#8bc34a 31px,#6aaa2a 31px,#6aaa2a 32px);
}

/* Brick platform blocks */
.brick-row{
  position:absolute;
  display:flex;
}
.brick{
  width:48px;height:24px;
  background:var(--brick);
  border:2px solid var(--brick2);
  box-shadow:inset -3px -3px 0 rgba(0,0,0,.18);
  image-rendering:pixelated;
  flex-shrink:0;
}

/* Pixel trees */
.tree{
  position:absolute;bottom:48px;
  display:flex;flex-direction:column;align-items:center;
}
.tree-top{width:32px;height:32px;background:#2e7d32;clip-path:polygon(50% 0%,100% 100%,0% 100%)}
.tree-top2{width:24px;height:24px;background:#388e3c;clip-path:polygon(50% 0%,100% 100%,0% 100%);margin-top:-8px}
.tree-trunk{width:10px;height:14px;background:#795548}

/* Coins */
.coin-obj{
  position:absolute;
  width:20px;height:20px;border-radius:50%;
  background:radial-gradient(circle at 35% 35%,#fff9c4,var(--coin) 60%,var(--coin2));
  border:2px solid var(--coin2);
  animation:coinSpin 1.5s linear infinite, coinBob 2s ease-in-out infinite;
}
@keyframes coinSpin{0%,100%{transform:scaleX(1)}25%{transform:scaleX(.2)}50%{transform:scaleX(1)}75%{transform:scaleX(.2)}}
@keyframes coinBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

/* Question block */
.q-block{
  position:absolute;
  width:40px;height:40px;
  background:#f5a623;
  border:3px solid #c97c0c;
  box-shadow:inset -4px -4px 0 rgba(0,0,0,.2);
  display:flex;align-items:center;justify-content:center;
  font-family:'Press Start 2P',monospace;
  font-size:16px;color:#fff;
  text-shadow:1px 1px 0 #c97c0c;
  image-rendering:pixelated;
  animation:qBob 2.5s ease-in-out infinite;
}
@keyframes qBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

/* Floating pixel stars */
.px-star{
  position:absolute;
  font-size:14px;color:var(--star);
  animation:starFloat linear infinite;
  text-shadow:0 0 6px #ffd600;
  pointer-events:none;
}
@keyframes starFloat{
  0%{opacity:0;transform:translateY(0) rotate(0deg)}
  15%{opacity:1}
  85%{opacity:1}
  100%{opacity:0;transform:translateY(-70px) rotate(180deg)}
}

/* ── MAIN CONTENT ─────────────────────────────────── */
#app{
  position:relative;z-index:1;
  min-height:100vh;
  padding:24px 16px 80px;
  display:flex;flex-direction:column;align-items:center;
}

/* ── HEADER ────────────────────────────────────────── */
.header-card{
  width:100%;max-width:480px;
  background:var(--card-bg);
  backdrop-filter:blur(12px);
  border:3px solid var(--card-border);
  border-radius:0px;
  /* pixel-art box */
  box-shadow:
    var(--shadow),
    4px 4px 0 rgba(0,0,0,.12);
  padding:20px 20px 16px;
  margin-bottom:12px;
  position:relative;
  overflow:hidden;
  /* pixel border */
  outline:2px solid rgba(0,0,0,.08);
  outline-offset:-4px;
  animation:cardIn .5s cubic-bezier(.34,1.56,.64,1) both;
}
.header-card::before{
  content:'';
  position:absolute;top:0;left:0;right:0;height:4px;
  background:repeating-linear-gradient(90deg,
    #ff6b6b 0,#ff6b6b 12px,
    #ffd600 12px,#ffd600 24px,
    #48dbfb 24px,#48dbfb 36px,
    #a29bfe 36px,#a29bfe 48px,
    #6bcb77 48px,#6bcb77 60px
  );
}

.pixel-avatar{
  width:72px;height:72px;
  image-rendering:pixelated;
  position:relative;flex-shrink:0;
}
/* Draw pixel character face */
.pixel-avatar canvas{display:block;width:72px;height:72px}

.header-name{
  font-family:'Press Start 2P',monospace;
  font-size:clamp(9px,2.8vw,13px);
  color:var(--txt-dark);
  line-height:1.6;
  letter-spacing:.04em;
}
.header-tagline{
  font-family:'Rajdhani',sans-serif;
  font-size:14px;font-weight:600;
  color:#546e7a;
  letter-spacing:.08em;
  text-transform:uppercase;
  margin-top:4px;
}

/* health/stats bar */
.stat-bar-wrap{
  display:flex;align-items:center;gap:8px;
  margin-top:8px;
}
.stat-label{
  font-family:'Press Start 2P',monospace;
  font-size:7px;color:#78909c;letter-spacing:.1em;
  white-space:nowrap;
}
.stat-bar{
  flex:1;height:10px;
  background:#e0e0e0;
  border:2px solid #bdbdbd;
  border-radius:0;
  overflow:hidden;
  image-rendering:pixelated;
}
.stat-fill{
  height:100%;
  background:repeating-linear-gradient(90deg,
    #6bcb77 0,#6bcb77 6px,
    #4caf50 6px,#4caf50 8px
  );
  animation:statGrow .8s steps(20) forwards;
}
@keyframes statGrow{from{width:0}to{width:var(--w,100%)}}

.level-badge{
  font-family:'Press Start 2P',monospace;
  font-size:8px;
  background:#ffd600;
  color:#1a1a2e;
  padding:4px 8px;
  border:2px solid #c97c0c;
  box-shadow:2px 2px 0 rgba(0,0,0,.2);
  white-space:nowrap;
}
.online-pixel{
  display:inline-flex;align-items:center;gap:5px;
  font-family:'Press Start 2P',monospace;
  font-size:7px;color:#2e7d32;letter-spacing:.1em;
}
.online-pixel::before{
  content:'';width:8px;height:8px;
  background:#4caf50;border:2px solid #2e7d32;
  animation:onBlink .8s step-end infinite;
}
@keyframes onBlink{0%,100%{background:#4caf50}50%{background:#a5d6a7}}

/* ── SECTION LABEL ──────────────────────────────────── */
.section-label{
  width:100%;max-width:480px;
  display:flex;align-items:center;gap:8px;
  margin:14px 0 8px;
  animation:cardIn .5s cubic-bezier(.34,1.56,.64,1) both;
}
.section-label span{
  font-family:'Press Start 2P',monospace;
  font-size:8px;color:#546e7a;letter-spacing:.18em;
  white-space:nowrap;
}
.section-label::after{
  content:'';flex:1;height:2px;
  background:repeating-linear-gradient(90deg,#ccc 0,#ccc 4px,transparent 4px,transparent 8px);
}

/* ── JB HERO CARD ──────────────────────────────────── */
.jb-card{
  width:100%;max-width:480px;
  position:relative;overflow:hidden;
  border-radius:0;
  background:linear-gradient(135deg,#1a237e 0%,#283593 30%,#1565c0 60%,#0288d1 100%);
  border:3px solid #4fc3f7;
  box-shadow:
    0 0 0 1px rgba(255,255,255,.1),
    0 0 24px rgba(79,195,247,.5),
    0 0 48px rgba(79,195,247,.2),
    4px 4px 0 rgba(0,0,0,.3);
  text-decoration:none;
  display:block;
  cursor:pointer;
  animation:cardIn .5s .08s cubic-bezier(.34,1.56,.64,1) both;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s ease;
  margin-bottom:8px;
}
.jb-card:hover{
  transform:translateY(-5px) scale(1.015);
  box-shadow:
    0 0 0 2px rgba(255,255,255,.2),
    0 0 36px rgba(79,195,247,.8),
    0 0 72px rgba(79,195,247,.35),
    4px 8px 0 rgba(0,0,0,.25);
}
/* animated scanline sweep */
.jb-card::before{
  content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
  animation:cardSweep 3s ease-in-out infinite;
  pointer-events:none;
}
@keyframes cardSweep{0%{left:-100%}60%,100%{left:150%}}
/* pixel border top rainbow */
.jb-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:repeating-linear-gradient(90deg,
    #ff6b6b 0,#ff6b6b 16px,#ffd600 16px,#ffd600 32px,
    #48dbfb 32px,#48dbfb 48px,#a29bfe 48px,#a29bfe 64px,
    #6bcb77 64px,#6bcb77 80px);
}

.jb-inner{padding:18px 18px 16px;position:relative;z-index:1}
.jb-crown{
  font-size:32px;
  animation:crownBob 2s ease-in-out infinite;
  display:inline-block;
  filter:drop-shadow(0 0 8px rgba(255,214,0,.8));
}
@keyframes crownBob{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-6px) rotate(5deg)}}

.jb-rank{
  font-family:'Press Start 2P',monospace;
  font-size:8px;color:#90caf9;letter-spacing:.2em;
  margin-bottom:6px;
}
.jb-title{
  font-family:'Press Start 2P',monospace;
  font-size:clamp(9px,3.2vw,14px);
  color:#fff;
  line-height:1.7;
  letter-spacing:.06em;
  text-shadow:0 0 20px rgba(79,195,247,.8),2px 2px 0 rgba(0,0,0,.5);
}
.jb-desc{
  font-family:'Rajdhani',sans-serif;
  font-size:13px;font-weight:600;
  color:#b3e5fc;letter-spacing:.06em;
  margin-top:6px;
}
.jb-badge{
  display:inline-flex;align-items:center;gap:5px;
  background:rgba(255,214,0,.2);
  border:2px solid rgba(255,214,0,.5);
  color:#ffd600;
  font-family:'Press Start 2P',monospace;
  font-size:7px;letter-spacing:.1em;
  padding:4px 10px;
  margin-top:8px;
  box-shadow:0 0 10px rgba(255,214,0,.3);
  animation:badgePulse 2s ease-in-out infinite;
}
@keyframes badgePulse{0%,100%{box-shadow:0 0 8px rgba(255,214,0,.3)}50%{box-shadow:0 0 20px rgba(255,214,0,.7)}}

.jb-arrow{
  position:absolute;right:18px;top:50%;transform:translateY(-50%);
  width:36px;height:36px;
  background:rgba(255,255,255,.12);
  border:2px solid rgba(255,255,255,.25);
  display:flex;align-items:center;justify-content:center;
  transition:transform .2s ease,background .2s;
}
.jb-card:hover .jb-arrow{
  transform:translateY(-50%) translateX(4px);
  background:rgba(255,255,255,.22);
}

/* Pixel stars inside jb1 */
.jb-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.jb-star{
  position:absolute;width:3px;height:3px;
  background:#fff;
  animation:pxStar 2.5s step-end infinite;
}
@keyframes pxStar{0%,100%{opacity:0}40%,60%{opacity:1}}

/* ── GRUP CARDS ────────────────────────────────────── */
.grup-list{
  width:100%;max-width:480px;
  display:flex;flex-direction:column;gap:8px;
}

.grup-card{
  position:relative;overflow:hidden;
  background:var(--card-bg);
  backdrop-filter:blur(10px);
  border:3px solid var(--card-border);
  box-shadow:var(--shadow),3px 3px 0 rgba(0,0,0,.1);
  text-decoration:none;
  display:flex;align-items:center;gap:12px;
  padding:13px 14px;
  cursor:pointer;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s ease;
  animation:cardIn .5s cubic-bezier(.34,1.56,.64,1) both;
}
.grup-card:hover{
  transform:translateY(-3px) scale(1.012);
  box-shadow:0 8px 24px rgba(0,0,0,.12),4px 6px 0 rgba(0,0,0,.1);
  border-color:var(--accent,#4fc3f7);
}
/* left pixel accent */
.grup-card::before{
  content:'';
  position:absolute;left:0;top:0;bottom:0;width:5px;
  background:var(--accent,#4fc3f7);
  box-shadow:2px 0 0 rgba(0,0,0,.1);
}

/* icon box */
.card-icon{
  width:48px;height:48px;flex-shrink:0;
  border:3px solid var(--accent,#4fc3f7);
  background:var(--icon-bg,#e1f5fe);
  display:flex;align-items:center;justify-content:center;
  font-size:22px;
  box-shadow:3px 3px 0 rgba(0,0,0,.12);
  image-rendering:pixelated;
  position:relative;overflow:hidden;
}
/* shimmer on icon hover */
.grup-card:hover .card-icon::after{
  content:'';position:absolute;top:-100%;left:-50%;width:50%;height:300%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);
  animation:iconShimmer .4s ease;
}
@keyframes iconShimmer{from{left:-50%}to{left:150%}}

.card-num{
  font-family:'Press Start 2P',monospace;
  font-size:7px;
  color:var(--accent,#4fc3f7);
  letter-spacing:.1em;
  margin-bottom:3px;
}
.card-title{
  font-family:'Orbitron',sans-serif;
  font-size:clamp(10px,3vw,13px);
  font-weight:700;
  color:var(--txt-dark);
  letter-spacing:.04em;
  line-height:1.3;
}
.card-sub{
  font-family:'Rajdhani',sans-serif;
  font-size:12px;font-weight:600;
  color:#78909c;letter-spacing:.05em;
  margin-top:2px;
}
.card-arrow{
  margin-left:auto;flex-shrink:0;
  width:28px;height:28px;
  border:2px solid var(--accent,#4fc3f7);
  display:flex;align-items:center;justify-content:center;
  background:transparent;
  transition:background .2s,transform .2s;
}
.grup-card:hover .card-arrow{
  background:var(--accent,#4fc3f7);
  transform:translateX(2px);
}
.card-arrow svg{width:14px;height:14px;stroke:var(--accent,#4fc3f7);transition:stroke .2s}
.grup-card:hover .card-arrow svg{stroke:#fff}

/* ── MARKET CARD ─────────────────────────────────────── */
/* ── WA FOOTER ────────────────────────────────────── */
.wa-section{
  width:100%;max-width:480px;
  margin-top:20px;
  animation:cardIn .5s 1s cubic-bezier(.34,1.56,.64,1) both;
}
.wa-divider{
  display:flex;align-items:center;gap:8px;
  margin-bottom:10px;
}
.wa-divider span{
  font-family:'Press Start 2P',monospace;
  font-size:7px;color:#78909c;letter-spacing:.18em;
  white-space:nowrap;
}
.wa-divider::before,.wa-divider::after{
  content:'';flex:1;height:2px;
  background:repeating-linear-gradient(90deg,#ccc 0,#ccc 4px,transparent 4px,transparent 8px);
}

.wa-box{
  background:rgba(255,255,255,.88);
  backdrop-filter:blur(12px);
  border:3px solid rgba(255,255,255,.99);
  box-shadow:var(--shadow),3px 3px 0 rgba(0,0,0,.08);
  padding:16px;
  text-align:center;
}
.wa-box-txt{
  font-family:'Rajdhani',sans-serif;
  font-size:14px;font-weight:600;
  color:#546e7a;letter-spacing:.05em;
  margin-bottom:12px;
}
.wa-btn{
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,#43a047,#2e7d32);
  color:#fff;
  font-family:'Press Start 2P',monospace;
  font-size:clamp(7px,2.2vw,9px);
  letter-spacing:.1em;
  padding:13px 20px;
  border:3px solid #1b5e20;
  box-shadow:0 4px 0 #1b5e20,3px 6px 0 rgba(0,0,0,.18);
  text-decoration:none;
  cursor:pointer;
  transition:transform .1s,box-shadow .1s;
  position:relative;overflow:hidden;
}
.wa-btn::before{
  content:'';position:absolute;top:-50%;left:-75%;width:50%;height:200%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
  animation:waSweep 3s ease-in-out infinite;
}
@keyframes waSweep{0%{left:-75%}50%,100%{left:150%}}
.wa-btn:active{transform:translateY(3px);box-shadow:0 1px 0 #1b5e20,1px 2px 0 rgba(0,0,0,.18)}
.wa-btn:hover{background:linear-gradient(135deg,#4caf50,#388e3c)}

.wa-icon-svg{width:22px;height:22px;flex-shrink:0}


/* ── SOCIAL LINKS ───────────────────────────────── */
.social-section{
  width:100%;max-width:480px;
  margin-top:16px;
  animation:cardIn .5s 1.1s cubic-bezier(.34,1.56,.64,1) both;
}
.social-divider{
  display:flex;align-items:center;gap:8px;margin-bottom:10px;
}
.social-divider span{
  font-family:'Press Start 2P',monospace;font-size:7px;color:#78909c;
  letter-spacing:.18em;white-space:nowrap;
}
.social-divider::before,.social-divider::after{
  content:'';flex:1;height:2px;
  background:repeating-linear-gradient(90deg,#ccc 0,#ccc 4px,transparent 4px,transparent 8px);
}
.social-list{
  display:flex;flex-direction:column;gap:8px;
}
.social-card{
  --accent:#4fc3f7;--icon-bg:#e1f5fe;
  position:relative;overflow:hidden;
  background:var(--card-bg);backdrop-filter:blur(10px);
  border:3px solid var(--card-border);
  box-shadow:var(--shadow),3px 3px 0 rgba(0,0,0,.1);
  text-decoration:none;display:flex;align-items:center;gap:12px;
  padding:12px 14px;cursor:pointer;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s ease;
}
.social-card::before{
  content:'';position:absolute;left:0;top:0;bottom:0;width:5px;
  background:var(--accent);box-shadow:2px 0 0 rgba(0,0,0,.1);
}
.social-card:hover{
  transform:translateY(-3px) scale(1.012);
  box-shadow:0 8px 24px rgba(0,0,0,.12),4px 6px 0 rgba(0,0,0,.1);
  border-color:var(--accent);
}
.social-icon{
  width:46px;height:46px;flex-shrink:0;
  border:3px solid var(--accent);background:var(--icon-bg);
  display:flex;align-items:center;justify-content:center;
  box-shadow:3px 3px 0 rgba(0,0,0,.12);font-size:23px;
}
.social-title{
  font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;
  color:var(--txt-dark);letter-spacing:.04em;
}
.social-sub{
  font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;
  color:#78909c;letter-spacing:.05em;margin-top:2px;
}
.social-arrow{
  margin-left:auto;flex-shrink:0;width:28px;height:28px;
  border:2px solid var(--accent);display:flex;align-items:center;
  justify-content:center;transition:background .2s,transform .2s;
}
.social-card:hover .social-arrow{background:var(--accent);transform:translateX(2px)}
.social-arrow svg{width:14px;height:14px;stroke:var(--accent);transition:stroke .2s}
.social-card:hover .social-arrow svg{stroke:#fff}

/* ── FOOTER BOTTOM ──────────────────────────────── */
.footer-bottom{
  margin-top:20px;text-align:center;
  animation:cardIn .5s 1.2s cubic-bezier(.34,1.56,.64,1) both;
}
.footer-bottom p{
  font-family:'Press Start 2P',monospace;
  font-size:7px;color:#90a4ae;letter-spacing:.12em;
  line-height:2;
}

/* ── CARD ENTRANCE ANIMATION ──────────────────────── */
@keyframes cardIn{
  from{opacity:0;transform:translateY(20px) scale(.97)}
  to{opacity:1;transform:translateY(0) scale(1)}
}
.d1{animation-delay:.10s}.d2{animation-delay:.18s}
.d3{animation-delay:.26s}.d4{animation-delay:.34s}
.d5{animation-delay:.42s}.d6{animation-delay:.50s}
.d7{animation-delay:.58s}.d8{animation-delay:.66s}
.d9{animation-delay:.74s}

/* ── SCORE POPUP ───────────────────────────────────── */
.score-pop{
  position:fixed;z-index:500;
  font-family:'Press Start 2P',monospace;
  font-size:13px;color:#ffd600;
  pointer-events:none;
  text-shadow:1px 1px 0 rgba(0,0,0,.5),0 0 12px rgba(255,214,0,.8);
  animation:scorePop .8s ease forwards;
}
@keyframes scorePop{
  0%{opacity:1;transform:translateY(0) scale(1)}
  100%{opacity:0;transform:translateY(-60px) scale(1.4)}
}

/* Pixel cursor trail */
.cursor-pixel{
  position:fixed;pointer-events:none;z-index:9998;
  width:6px;height:6px;background:#ffd600;
  animation:pixelFade .4s ease forwards;
}
@keyframes pixelFade{from{opacity:.8;transform:scale(1)}to{opacity:0;transform:scale(.2)}}

/* ═══════════════════════════════════════════════════
   PREMIUM DESKTOP CURSOR + SCROLL REVEAL
═══════════════════════════════════════════════════ */
@media (pointer:fine){
  html,body,*{cursor:none !important}
  #custom-cursor{display:block}
}
@media (pointer:coarse){#custom-cursor{display:none}}
#custom-cursor{
  display:none;position:fixed;left:0;top:0;width:46px;height:46px;
  z-index:10000;pointer-events:none;transform:translate3d(-100px,-100px,0);
  will-change:transform;
}
.cursor-frame{
  position:absolute;inset:4px;border:1px solid rgba(72,219,251,.9);
  box-shadow:0 0 10px rgba(72,219,251,.55),inset 0 0 8px rgba(72,219,251,.08);
  clip-path:polygon(0 0,30% 0,30% 2px,70% 2px,70% 0,100% 0,100% 30%,calc(100% - 2px) 30%,calc(100% - 2px) 70%,100% 70%,100% 100%,70% 100%,70% calc(100% - 2px),30% calc(100% - 2px),30% 100%,0 100%,0 70%,2px 70%,2px 30%,0 30%);
  background:rgba(72,219,251,.035);
  transition:transform .18s ease,background .18s ease,box-shadow .18s ease;
}
.cursor-corner{position:absolute;width:9px;height:9px;border-color:#ffd600;border-style:solid;filter:drop-shadow(0 0 4px #ffd600)}
.cursor-corner.tl{left:0;top:0;border-width:2px 0 0 2px}.cursor-corner.tr{right:0;top:0;border-width:2px 2px 0 0}
.cursor-corner.bl{left:0;bottom:0;border-width:0 0 2px 2px}.cursor-corner.br{right:0;bottom:0;border-width:0 2px 2px 0}
.cursor-core{position:absolute;left:50%;top:50%;width:8px;height:8px;transform:translate(-50%,-50%);border:1px solid #fff;background:#48dbfb;box-shadow:0 0 8px #48dbfb,0 0 16px rgba(72,219,251,.65)}
.cursor-cross-x,.cursor-cross-y{position:absolute;background:rgba(255,255,255,.7)}
.cursor-cross-x{width:28px;height:1px;left:9px;top:22px}.cursor-cross-y{height:28px;width:1px;left:22px;top:9px}
.cursor-label{position:absolute;left:51px;top:-4px;font:700 7px 'Press Start 2P',monospace;letter-spacing:.12em;color:#fff;white-space:nowrap;text-shadow:0 0 7px #48dbfb;opacity:.8}
.cursor-ring{position:absolute;inset:-7px;border:1px dashed rgba(255,214,0,.42);border-radius:50%;animation:cursorSpin 4s linear infinite}
@keyframes cursorSpin{to{transform:rotate(360deg)}}
#custom-cursor.hover .cursor-frame{transform:scale(1.22) rotate(45deg);background:rgba(255,214,0,.08);box-shadow:0 0 18px rgba(255,214,0,.85),inset 0 0 10px rgba(255,214,0,.12)}
#custom-cursor.hover .cursor-core{background:#ffd600;box-shadow:0 0 10px #ffd600,0 0 22px rgba(255,214,0,.8)}
#custom-cursor.click .cursor-ring{animation:cursorClick .42s ease-out}
@keyframes cursorClick{0%{transform:scale(.4);opacity:1}100%{transform:scale(2.3);opacity:0}}
.cursor-spark{position:fixed;width:4px;height:4px;pointer-events:none;z-index:9999;background:#ffd600;box-shadow:0 0 8px #ffd600;animation:cursorSpark .5s ease-out forwards}
@keyframes cursorSpark{from{opacity:1;transform:translate(0,0) scale(1)}to{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.1)}}

/* Better circular logo frames */
.logo-circle{
  width:52px;height:52px;flex-shrink:0;border-radius:50%;position:relative;
  display:flex;align-items:center;justify-content:center;overflow:hidden;
  background:linear-gradient(145deg,#fff,#e8f7ff);
  border:3px solid var(--accent,#4fc3f7);
  box-shadow:0 0 0 3px rgba(255,255,255,.75),0 0 16px color-mix(in srgb,var(--accent,#4fc3f7) 55%,transparent),3px 3px 0 rgba(0,0,0,.12);
  transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease;
}
.logo-circle::before{content:'';position:absolute;inset:4px;border:1px dashed color-mix(in srgb,var(--accent,#4fc3f7) 70%,transparent);border-radius:50%;animation:logoOrbit 5s linear infinite}
.logo-circle svg{width:27px;height:27px;position:relative;z-index:1}
.grup-card:hover .logo-circle,.social-card:hover .logo-circle{transform:rotate(-7deg) scale(1.08)}
@keyframes logoOrbit{to{transform:rotate(360deg)}}

/* Scroll reveal: cards appear only as they enter the viewport */
.reveal{animation:none!important;opacity:0;transform:translateY(34px) scale(.96);filter:blur(3px);transition:opacity .65s ease,transform .65s cubic-bezier(.22,1,.36,1),filter .65s ease}
.reveal.is-visible{opacity:1!important;transform:none!important;filter:none!important}
.reveal:nth-child(2){transition-delay:.08s}.reveal:nth-child(3){transition-delay:.16s}.reveal:nth-child(4){transition-delay:.24s}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.001ms!important}
}


/* ═══════════════════════════════════════════════════
   ATESHU // PREMIUM TOP FRAME V2
═══════════════════════════════════════════════════ */
.header-card{max-width:500px;padding:18px 18px 16px;margin-bottom:16px;border:1px solid rgba(126,87,255,.55);border-radius:24px;background:radial-gradient(circle at 14% 0%,rgba(126,87,255,.22),transparent 34%),radial-gradient(circle at 100% 100%,rgba(72,219,251,.10),transparent 32%),linear-gradient(145deg,rgba(10,10,18,.96),rgba(20,17,35,.94) 56%,rgba(10,10,18,.97));box-shadow:0 20px 55px rgba(18,9,49,.28),0 0 0 1px rgba(255,255,255,.05) inset,0 0 36px rgba(107,63,255,.18);outline:0;overflow:visible;isolation:isolate}
.header-card::before{content:'';position:absolute;inset:-2px;height:auto;border-radius:26px;padding:2px;background:linear-gradient(115deg,#15151d 0%,#8d5cff 24%,#3d2388 48%,#48dbfb 72%,#15151d 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:-1;animation:frameHue 7s linear infinite}
.header-card::after{content:'ATESHU // MARKET OFFICIAL';position:absolute;right:16px;top:-9px;height:18px;padding:0 10px;display:flex;align-items:center;border:1px solid rgba(141,92,255,.7);border-radius:999px;background:#0d0c14;color:#bba4ff;font:700 6px 'Press Start 2P',monospace;letter-spacing:.09em;box-shadow:0 0 14px rgba(126,87,255,.35)}
@keyframes frameHue{50%{filter:hue-rotate(28deg) brightness(1.08)}}
.ateshu-logo-frame{width:86px;height:86px;flex:0 0 86px;position:relative;display:grid;place-items:center;border-radius:22px;background:linear-gradient(145deg,#08080d,#191326);border:1px solid rgba(170,138,255,.62);box-shadow:0 0 0 5px rgba(126,87,255,.07),0 12px 26px rgba(0,0,0,.42),0 0 30px rgba(126,87,255,.28),inset 0 0 22px rgba(126,87,255,.08);transform:rotate(-2deg);transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .28s ease}
.header-card:hover .ateshu-logo-frame{transform:rotate(0) translateY(-2px) scale(1.025);box-shadow:0 0 0 5px rgba(126,87,255,.10),0 16px 32px rgba(0,0,0,.42),0 0 42px rgba(126,87,255,.40),inset 0 0 22px rgba(126,87,255,.10)}
.ateshu-logo-img{width:72px;height:72px;display:block;object-fit:cover;border-radius:16px;filter:contrast(1.04) saturate(1.12);box-shadow:0 0 0 1px rgba(255,255,255,.1);position:relative;z-index:2}
.ateshu-logo-orbit{position:absolute;inset:-7px;border-radius:27px;border:1px dashed rgba(156,116,255,.55);animation:logoFrameSpin 9s linear infinite;pointer-events:none}.ateshu-logo-orbit.orbit-2{inset:-12px;border-color:rgba(72,219,251,.20);animation-duration:14s;animation-direction:reverse}@keyframes logoFrameSpin{to{transform:rotate(360deg)}}
.logo-glint{position:absolute;z-index:3;inset:7px;border-radius:16px;overflow:hidden;pointer-events:none}.logo-glint::after{content:'';position:absolute;width:28px;height:160%;top:-30%;left:-60%;transform:rotate(18deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent);animation:logoGlint 4.6s ease-in-out infinite}@keyframes logoGlint{0%,55%{left:-60%;opacity:0}65%{opacity:1}88%,100%{left:130%;opacity:0}}
.header-name{color:#fff;font-size:clamp(12px,3.4vw,16px);letter-spacing:.09em;text-shadow:0 0 16px rgba(145,101,255,.55)}.header-tagline{color:#a9a6b7;font-size:12px;letter-spacing:.10em;line-height:1.35;margin-top:6px}.header-chip-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.header-chip{padding:5px 7px;border-radius:999px;border:1px solid rgba(72,219,251,.25);background:rgba(72,219,251,.06);color:#83e8ff;font:700 7px 'Rajdhani',sans-serif;letter-spacing:.16em}.header-chip.purple{border-color:rgba(156,116,255,.32);background:rgba(156,116,255,.08);color:#c7b5ff}
.header-card .online-pixel{color:#7ef4b2}.header-card .online-pixel::before{border-radius:50%;border:0;box-shadow:0 0 10px #4caf50}.header-card .level-badge{border:1px solid rgba(255,214,0,.45);border-radius:999px;background:rgba(255,214,0,.09);color:#ffd95b;box-shadow:none}.header-card .stat-label{color:#918ca1}.header-card .stat-bar{height:8px;border:1px solid rgba(255,255,255,.10);border-radius:999px;background:rgba(255,255,255,.06)}.header-card .stat-fill{border-radius:999px}
@media(max-width:420px){.header-card{padding:17px 14px 14px;border-radius:21px}.ateshu-logo-frame{width:76px;height:76px;flex-basis:76px;border-radius:19px}.ateshu-logo-img{width:64px;height:64px;border-radius:14px}.header-card::after{right:11px;font-size:5px;padding:0 7px}}
/* CURSOR V3 */
@media (pointer:fine){html,body,*{cursor:none!important}}#custom-cursor{width:34px;height:34px;mix-blend-mode:normal;transition:opacity .15s ease;will-change:transform}.cursor-frame{inset:4px;border:1px solid rgba(161,126,255,.8);border-radius:9px;clip-path:none;background:rgba(126,87,255,.025);box-shadow:0 0 12px rgba(126,87,255,.45),inset 0 0 8px rgba(126,87,255,.05);transform:rotate(45deg);transition:transform .14s ease,border-color .14s ease,background .14s ease,box-shadow .14s ease}.cursor-ring{inset:-6px;border:1px solid rgba(72,219,251,.25);border-radius:50%;animation:cursorSpin 6s linear infinite;box-shadow:0 0 12px rgba(72,219,251,.08)}.cursor-core{width:5px;height:5px;border:0;border-radius:50%;background:#fff;box-shadow:0 0 4px #fff,0 0 12px #9c74ff,0 0 18px rgba(72,219,251,.55)}.cursor-cross-x{width:20px;left:7px;top:16.5px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.60),transparent)}.cursor-cross-y{height:20px;left:16.5px;top:7px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.60),transparent)}.cursor-corner{display:none}.cursor-label{left:40px;top:4px;color:#cab8ff;font-size:6px;text-shadow:0 0 8px rgba(126,87,255,.75);opacity:.66}#custom-cursor.hover .cursor-frame{transform:rotate(90deg) scale(1.22);border-color:#48dbfb;background:rgba(72,219,251,.06);box-shadow:0 0 18px rgba(72,219,251,.65),inset 0 0 9px rgba(72,219,251,.08)}#custom-cursor.hover .cursor-core{background:#48dbfb;box-shadow:0 0 5px #fff,0 0 14px #48dbfb}#custom-cursor.click .cursor-frame{transform:rotate(135deg) scale(.78)}#custom-cursor.click .cursor-ring{animation:cursorClick .32s ease-out}.cursor-spark{display:none!important}

</style>
</head>
<body>
<div id="custom-cursor" aria-hidden="true">
  <div class="cursor-ring"></div><div class="cursor-frame"></div>
  <span class="cursor-corner tl"></span><span class="cursor-corner tr"></span>
  <span class="cursor-corner bl"></span><span class="cursor-corner br"></span>
  <span class="cursor-cross-x"></span><span class="cursor-cross-y"></span><span class="cursor-core"></span>
  <span class="cursor-label">ATESHU</span>
</div>


<!-- ── LOADING ─────────────────────────────────────── -->
<div id="loader">
  <div class="ld-logo-wrap">
    <div class="ld-title">ATESHU</div>
  </div>
  <div class="ld-sub">ATESHU</div>
  <div class="ld-msg" id="ld-msg">MENYIAPKAN MARKET...</div>
  <div class="ld-track"><div class="ld-fill" id="ld-fill"></div></div>
  <div class="ld-pct" id="ld-pct">0%</div>
</div>

<!-- ── SKY WORLD ───────────────────────────────────── -->
<div class="sky-layer" id="sky-world">
  <div class="sun" id="sun">
    <!-- rays injected by JS -->
  </div>
  <!-- clouds injected by JS -->
  <!-- bricks injected by JS -->
  <!-- trees injected by JS -->
  <div class="ground-strip2"></div>
  <div class="ground-strip"></div>
</div>

<!-- ── APP ─────────────────────────────────────────── -->
<div id="app">

  <!-- HEADER -->
  <div class="header-card reveal" style="animation-delay:.05s">
    <div style="display:flex;align-items:center;gap:14px">
      <!-- Pixel avatar drawn on canvas -->
      <div class="ateshu-logo-frame" aria-label="Logo ATESHU">
        <div class="ateshu-logo-orbit"></div>
        <div class="ateshu-logo-orbit orbit-2"></div>
        <img src="./ateshu.jpg" alt="ATESHU" class="ateshu-logo-img">
        <span class="logo-glint"></span>
      </div>
      <div style="flex:1;min-width:0">
        <div class="header-name">ATESHU</div>
        <div class="header-tagline">JUAL BELI AKUN ALL GAME • FAST &amp; TRUSTED</div>
        <div class="header-chip-row"><span class="header-chip">SECURE MARKET</span><span class="header-chip purple">EST. ATESHU</span></div>
        <div style="margin-top:6px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div class="online-pixel">ONLINE</div>
          <div class="level-badge">LV.MAX ★</div>
        </div>
      </div>
    </div>
    <div style="margin-top:12px">
      <!-- BATTERY BAR -->
      <div class="stat-bar-wrap">
        <div class="stat-label" id="bat-icon">🔋</div>
        <div class="stat-bar"><div class="stat-fill" id="bat-fill" style="--w:100%"></div></div>
        <div class="stat-label" id="bat-label">---%</div>
      </div>
      <!-- CLOCK BAR -->
      <div class="stat-bar-wrap" style="margin-top:5px">
        <div class="stat-label">🕐</div>
        <div class="stat-bar"><div class="stat-fill" id="time-fill" style="--w:50%;background:repeating-linear-gradient(90deg,#48dbfb 0,#48dbfb 6px,#0288d1 6px,#0288d1 8px)"></div></div>
        <div class="stat-label" id="time-label">--:--</div>
      </div>
    </div>
  </div>

  <!-- SECTION: JB1 -->
  <div class="section-label d1">
    <span>★ SALURAN JB UTAMA</span>
  </div>
  <a href="https://whatsapp.com/channel/0029Vb926rc6hENvB0hOtl2j" target="_blank" rel="noopener" class="jb-card reveal d2" id="jb1">
    <div class="jb-stars" id="jb-stars"></div>
    <div class="jb-inner">
      <div style="display:flex;align-items:flex-start;gap:14px">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <div class="jb-crown">🛒</div>
          <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:#ffd600;text-align:center;line-height:1.8">#1</div>
        </div>
        <div style="flex:1;min-width:0">
          <div class="jb-rank">★ SALURAN UTAMA ATESHU ★</div>
          <div class="jb-title">JUAL BELI AKUN ALL GAME<br>INFO • STOCK • UPDATE</div>
          <div class="jb-desc">Pusat info, stok &amp; pengumuman marketplace</div>
          <div class="jb-badge">⬛ JOIN SALURAN JB</div>
        </div>
        <div class="jb-arrow">
          <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px" stroke="#fff" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 4l8 8-8 8M3 12h18"/>
          </svg>
        </div>
      </div>
    </div>
  </a>

  <div class="section-label d3" style="margin-top:8px">
    <span>▶ GRUP JB</span>
  </div>

  <div class="grup-list">
    <a href="https://chat.whatsapp.com/FeLKUb4kbHU7te6oDB9C1B?s=cl&p=i&mlu=4" target="_blank" rel="noopener"
       class="grup-card reveal d3"
       style="--accent:#29b6f6;--icon-bg:#e1f5fe">
      <div class="logo-circle" style="--accent:#25D366;--icon-bg:#eafff1" title="WhatsApp">
        <svg viewBox="0 0 64 64" aria-label="WhatsApp"><circle cx="32" cy="32" r="28" fill="#25D366"/><path fill="#fff" d="M44.6 19.4A17.8 17.8 0 0 0 16 41.1L13 51l10.1-2.9a17.8 17.8 0 0 0 21.5-28.7Zm-12.5 28a14.7 14.7 0 0 1-7.5-2.1l-.5-.3-6 1.7 1.7-5.8-.3-.6a14.8 14.8 0 1 1 12.6 7.1Zm8.1-11.1c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.6-.2.3-.5.3-.8.1-2.2-1.1-3.6-2-5.1-4.5-.4-.7.4-.6 1.2-2 .1-.3.1-.5 0-.8l-.8-2c-.2-.5-.5-.4-.8-.4h-.7c-.3 0-.8.1-1.2.5-.4.4-1.4 1.4-1.4 3.4s1.4 3.9 1.6 4.2c.2.3 2.8 4.3 6.8 6 2.5 1.1 3.5 1.2 4.8 1 .8-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.3-.3-.7-.5Z"/></svg>
      </div>
      <div style="flex:1;min-width:0">
        <div class="card-num">GRUP JB 01</div>
        <div class="card-title">ATESHU JB<br>MARKET AKUN ALL GAME</div>
        <div class="card-sub">JUAL BELI AKUN · AKTIF</div>
      </div>
      <div class="card-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 4l8 8-8 8M3 12h18"/></svg>
      </div>
    </a>
  </div><!-- end grup-list -->

  <!-- SOCIAL MEDIA -->
  <div class="social-section reveal">
    <div class="social-divider"><span>★ MEDIA &amp; KOMUNITAS</span></div>
    <div class="social-list">

      <a class="social-card reveal d4" href="https://www.tiktok.com/" target="_blank" rel="noopener"
         style="--accent:#111;--icon-bg:#f3f3f3">
        <div class="logo-circle" style="--accent:#111;--icon-bg:#f3f3f3" title="TikTok"><svg viewBox="0 0 64 64" aria-label="TikTok"><path fill="#111" d="M39 12h8c.6 5.1 3.3 8.4 8 9v8.2c-3.1.1-5.8-.7-8-2.2v14.5c0 8.5-6.3 14.3-14 14.3-7 0-12.7-5.2-12.7-12.2 0-7.2 5.9-12.4 13.2-12.4 1.1 0 2.1.1 3.1.4v8.3a7.1 7.1 0 0 0-3.1-.7c-2.8 0-5.1 1.8-5.1 4.4 0 2.5 2 4.2 4.7 4.2 3 0 5.1-2.1 5.1-5.9V12Z"/><path fill="#25F4EE" d="M34 31.7v3.8a7.1 7.1 0 0 0-3.1-.7c-2.8 0-5.1 1.8-5.1 4.4 0 1.2.5 2.2 1.3 3-1.5-.8-2.5-2.2-2.5-4 0-3.5 3.1-5.7 6.6-5.7 1 0 1.9.1 2.8.4Z" opacity=".8"/><path fill="#FE2C55" d="M39 12h4c.4 4 2.1 7 5.2 8.5-1.5-.3-2.8-.8-4-1.6V34c0 8.5-6.3 14.3-14 14.3-2.1 0-4-.4-5.7-1.2 1.1.4 2.2.6 3.5.6 7.7 0 14-5.8 14-14.3V12Z" opacity=".75"/></svg></div>
        <div style="flex:1;min-width:0">
          <div class="social-title">TIKTOK ATESHU</div>
          <div class="social-sub">FOLLOW • VIDEO • UPDATE</div>
        </div>
        <div class="social-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 4l8 8-8 8M3 12h18"/>
          </svg>
        </div>
      </a>

      <a class="social-card d5 reveal" href="https://www.facebook.com/61593801847465/?http_ref=eyJ0cyI6MTc4ODA4NDAyODAwMCwiciI6IiJ9" target="_blank" rel="noopener"
         style="--accent:#1877f2;--icon-bg:#e8f1ff">
        <div class="logo-circle" style="--accent:#1877F2;--icon-bg:#e8f1ff" title="Facebook"><svg viewBox="0 0 64 64" aria-label="Facebook"><circle cx="32" cy="32" r="28" fill="#1877F2"/><path fill="#fff" d="M35.5 53V34.7h6.1l.9-7.1h-7v-4.5c0-2.1.6-3.6 3.7-3.6h3.7v-6.4c-.6-.1-2.8-.3-5.4-.3-5.4 0-9.1 3.3-9.1 9.4v5.4h-6.1v7.1h6.1V53h7.1Z"/></svg></div>
        <div style="flex:1;min-width:0">
          <div class="social-title">FACEBOOK ATESHU</div>
          <div class="social-sub">INFO • PROMO • UPDATE</div>
        </div>
        <div class="social-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 4l8 8-8 8M3 12h18"/>
          </svg>
        </div>
      </a>

      <a class="social-card d6 reveal" href="https://www.facebook.com/groups/1116086390774879/?hpir=1" target="_blank" rel="noopener"
         style="--accent:#4267b2;--icon-bg:#eaf0ff">
        <div class="logo-circle" style="--accent:#4267B2;--icon-bg:#eaf0ff" title="Facebook Group"><svg viewBox="0 0 64 64" aria-label="Facebook Group"><circle cx="32" cy="32" r="28" fill="#4267B2"/><path fill="#fff" d="M39 30a7 7 0 1 0-6-10.6A7 7 0 0 0 39 30Zm-14 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm14.5 3c-2.4 0-4.6.8-6.3 2.2 3 1.7 5 4.5 5.4 7.8H49v-2c0-4.4-4.3-8-9.5-8ZM25 33c-5.8 0-10.5 3.8-10.5 8.5V44h21v-2.5C35.5 36.8 30.8 33 25 33Z"/></svg></div>
        <div style="flex:1;min-width:0">
          <div class="social-title">GRUP FACEBOOK JB</div>
          <div class="social-sub">KOMUNITAS • JUAL BELI AKUN</div>
        </div>
        <div class="social-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 4l8 8-8 8M3 12h18"/>
          </svg>
        </div>
      </a>

    </div>
  </div>

  <!-- WA SECTION -->
  <div class="wa-section reveal">
    <div class="wa-divider"><span>★ HUBUNGI ADMIN JB</span></div>
    <div class="wa-box">
      <div class="wa-box-txt">Jual / beli akun all game? Pilih admin WhatsApp di bawah.</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <a class="wa-btn" href="https://wa.me/6285704107334?text=Halo%20Admin%201%20ATESHU" target="_blank" rel="noopener">
          <svg class="wa-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M20.5 3.5A11.6 11.6 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7c1.8 1 3.8 1.5 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.4-6.2-3.9-8.5Z" fill="#fff"/>
  <path d="M17.4 14.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.1.2 2.2 3.4 5.4 4.7 2 .8 2.8.9 3.8.7.6-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" fill="#2e7d32"/>
</svg> ADMIN 1
        </a>
        <a class="wa-btn" href="https://wa.me/6283194717386?text=Halo%20Admin%202%20ATESHU" target="_blank" rel="noopener">
          <svg class="wa-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M20.5 3.5A11.6 11.6 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7c1.8 1 3.8 1.5 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.4-6.2-3.9-8.5Z" fill="#fff"/>
  <path d="M17.4 14.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.1.2 2.2 3.4 5.4 4.7 2 .8 2.8.9 3.8.7.6-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" fill="#2e7d32"/>
</svg> ADMIN 2
        </a>
      </div>
      <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:#90a4ae;margin-top:10px;letter-spacing:.1em">
        CONTACT ADMIN
      </div>
    </div>
  </div>

</div><!-- end #app -->

<script>
/* ═══════════════════════════════════════════════════
   LOADING SEQUENCE
═══════════════════════════════════════════════════ */
const msgs=[
  'LOADING MARKET...',
  'CONNECTING TO MARKET...',
  'FETCHING MARKET DATA...',
  'LOADING MARKET LINKS...',
  'OPENING MARKET...',
  'CHECKING MARKET...',
  'MARKET SIAP...',
  'MARKET READY! ★'
];
const steps=[
  {p:5,m:0,t:150},{p:18,m:1,t:500},{p:33,m:2,t:900},
  {p:50,m:3,t:1300},{p:67,m:4,t:1700},{p:82,m:5,t:2200},
  {p:95,m:6,t:2700},{p:100,m:7,t:3200}
];
const fill=document.getElementById('ld-fill');
const pct=document.getElementById('ld-pct');
const msg=document.getElementById('ld-msg');
steps.forEach(s=>setTimeout(()=>{
  fill.style.width=s.p+'%';
  pct.textContent=s.p+'%';
  msg.textContent=msgs[s.m];
},s.t));
setTimeout(()=>{
  document.getElementById('loader').classList.add('out');
},3900);

/* ═══════════════════════════════════════════════════
   PIXEL AVATAR CANVAS
═══════════════════════════════════════════════════ */
window.addEventListener('load',()=>{
  const cv=document.getElementById('avatar-canvas');
  if(!cv)return;
  cv.style.width='72px';cv.style.height='72px';
  const ctx=cv.getContext('2d');
  // 18×18 pixel art: simple smiley hero face
  const P=['#0288d1','#01579b','#ffd600','#ffb300','#ff6b6b','#fff','#1a1a2e','#43a047','#29b6f6'];
  const grid=[
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0],
    [1,2,2,0,0,2,2,2,2,2,2,0,0,2,2,2,1,0],
    [1,2,2,0,6,0,2,2,2,2,0,6,0,2,2,2,1,0],
    [1,2,2,0,0,2,2,2,2,2,2,0,0,2,2,2,1,0],
    [1,2,2,2,2,2,4,2,2,4,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,4,4,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0],
    [0,0,1,7,7,7,7,7,7,7,7,7,7,7,1,0,0,0],
    [0,0,1,7,8,8,8,8,8,8,8,8,8,7,1,0,0,0],
    [0,0,0,1,7,7,7,7,7,7,7,7,7,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];
  const s=1;
  grid.forEach((row,y)=>row.forEach((c,x)=>{
    if(c===0)return;
    ctx.fillStyle=P[c];
    ctx.fillRect(x*s,y*s,s,s);
  }));
});

/* ═══════════════════════════════════════════════════
   BUILD SKY WORLD
═══════════════════════════════════════════════════ */
const sky=document.getElementById('sky-world');

// Sun rays
const sun=document.getElementById('sun');
for(let i=0;i<8;i++){
  const r=document.createElement('div');
  r.className='sun-ray';
  r.style.transform=`rotate(${i*45}deg)`;
  r.style.opacity=0.5+Math.random()*0.3;
  sun.appendChild(r);
}

// Clouds
function makeCloud(top,size,dur,delay){
  const c=document.createElement('div');
  c.className='cloud';
  c.style.cssText=`top:${top}%;width:${size*2.5}px;height:${size*0.9}px;
    animation-duration:${dur}s;animation-delay:${delay}s;`;
  c.style.transform=`translateX(110vw)`;
  const b1=document.createElement('div');
  b1.style.cssText=`width:${size*1.4}px;height:${size*1.3}px;top:-${size*.5}px;left:${size*.3}px;`;
  const b2=document.createElement('div');
  b2.style.cssText=`width:${size}px;height:${size*1.1}px;top:-${size*.3}px;left:${size*1.1}px;`;
  c.appendChild(b1);c.appendChild(b2);
  sky.appendChild(c);
}
makeCloud(5,55,28,-5);makeCloud(12,40,35,-15);makeCloud(8,65,22,-2);
makeCloud(18,35,30,-20);makeCloud(3,45,40,-10);makeCloud(22,30,25,-8);

// Brick rows
const brickData=[
  {bottom:180,left:60,count:5},
  {bottom:200,left:220,count:4},
  {bottom:160,left:400,count:6},
  {bottom:200,left:600,count:3},
];
brickData.forEach(bd=>{
  const row=document.createElement('div');
  row.className='brick-row';
  row.style.cssText=`bottom:${bd.bottom}px;left:${bd.left}px;`;
  for(let i=0;i<bd.count;i++){
    const b=document.createElement('div');b.className='brick';
    row.appendChild(b);
  }
  sky.appendChild(row);
});

// Question blocks
[[130,320],[155,500],[120,700]].forEach(([b,l])=>{
  const qb=document.createElement('div');
  qb.className='q-block';qb.textContent='?';
  qb.style.cssText=`bottom:${b}px;left:${l}px;`;
  qb.style.animationDelay=Math.random()*2+'s';
  sky.appendChild(qb);
});

// Coins
for(let i=0;i<6;i++){
  const coin=document.createElement('div');
  coin.className='coin-obj';
  coin.style.cssText=`left:${10+i*14}%;bottom:${130+Math.random()*60}px;
    animation-delay:${Math.random()*1.5}s;`;
  sky.appendChild(coin);
}

// Trees
const treePosX=[5,15,25,55,70,82,92];
treePosX.forEach(lp=>{
  const t=document.createElement('div');
  t.className='tree';t.style.left=lp+'%';
  t.style.transform=`scale(${0.8+Math.random()*.5})`;
  t.innerHTML='<div class="tree-top"></div><div class="tree-top2"></div><div class="tree-trunk"></div>';
  sky.appendChild(t);
});

// Pixel stars background
for(let i=0;i<18;i++){
  const s=document.createElement('div');
  s.className='px-star';s.textContent='★';
  s.style.cssText=`left:${Math.random()*100}%;bottom:${60+Math.random()*200}px;
    animation-duration:${3+Math.random()*4}s;animation-delay:${Math.random()*5}s;
    font-size:${8+Math.random()*8}px;`;
  sky.appendChild(s);
}

// Stars inside JB card
const jbstars=document.getElementById('jb-stars');
for(let i=0;i<30;i++){
  const s=document.createElement('div');
  s.className='jb-star';
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;
    animation-delay:${(Math.random()*3).toFixed(2)}s;
    animation-duration:${(1.5+Math.random()*2).toFixed(2)}s;`;
  jbstars.appendChild(s);
}

/* ═══════════════════════════════════════════════════
   LIVE CLOCK
═══════════════════════════════════════════════════ */
function updateClock(){
  const now=new Date();
  const h=now.getHours().toString().padStart(2,'0');
  const m=now.getMinutes().toString().padStart(2,'0');
  const s=now.getSeconds().toString().padStart(2,'0');
  document.getElementById('time-label').textContent=`${h}:${m}:${s}`;
  // bar = seconds progress in a minute (0–59 → 0–100%)
  const pct=Math.round((now.getSeconds()/59)*100);
  document.getElementById('time-fill').style.setProperty('--w',pct+'%');
  document.getElementById('time-fill').style.width=pct+'%';
}
updateClock();
setInterval(updateClock,1000);

/* ═══════════════════════════════════════════════════
   LIVE BATTERY
═══════════════════════════════════════════════════ */
function setBattery(level,charging){
  const pct=Math.round(level*100);
  const fill=document.getElementById('bat-fill');
  const label=document.getElementById('bat-label');
  const icon=document.getElementById('bat-icon');
  fill.style.width=pct+'%';
  fill.style.setProperty('--w',pct+'%');
  label.textContent=pct+'%';
  // color: green>50, yellow 20-50, red <20
  const col = charging ? '#48dbfb'
    : pct>50 ? '#6bcb77'
    : pct>20 ? '#ffd600'
    : '#ff6b6b';
  fill.style.background=`repeating-linear-gradient(90deg,${col} 0,${col} 6px,${adjustHex(col)} 6px,${adjustHex(col)} 8px)`;
  icon.textContent=charging?'⚡':(pct>50?'🔋':(pct>20?'🪫':'🔴'));
}
function adjustHex(c){
  // darken slightly for stripe
  return c==='#6bcb77'?'#4caf50':c==='#ffd600'?'#ffa000':c==='#ff6b6b'?'#e53935':'#0288d1';
}
if(navigator.getBattery){
  navigator.getBattery().then(b=>{
    setBattery(b.level,b.charging);
    b.addEventListener('levelchange',()=>setBattery(b.level,b.charging));
    b.addEventListener('chargingchange',()=>setBattery(b.level,b.charging));
  }).catch(()=>{
    document.getElementById('bat-label').textContent='N/A';
    document.getElementById('bat-icon').textContent='🔋';
  });
} else {
  document.getElementById('bat-label').textContent='N/A';
}

/* ═══════════════════════════════════════════════════
   SCORE POP ON CLICK
═══════════════════════════════════════════════════ */
const scoreVals=['+100','+50','+200','★ TERHUBUNG!','+EXP','+75'];
document.querySelectorAll('a[href]').forEach(a=>{
  a.addEventListener('click',e=>{
    const pop=document.createElement('div');
    pop.className='score-pop';
    const rect=a.getBoundingClientRect();
    pop.textContent=scoreVals[Math.floor(Math.random()*scoreVals.length)];
    pop.style.cssText=`left:${rect.left+rect.width/2-30}px;top:${rect.top+window.scrollY+10}px;`;
    document.body.appendChild(pop);
    setTimeout(()=>pop.remove(),900);
  });
});

/* ═══════════════════════════════════════════════════
   PREMIUM DESKTOP CURSOR V3
═══════════════════════════════════════════════════ */
const customCursor=document.getElementById('custom-cursor');
const finePointer=window.matchMedia('(pointer:fine)').matches;
if(finePointer && customCursor){
  let visible=false;
  const moveCursor=(e)=>{
    customCursor.style.transform=`translate3d(${e.clientX-17}px,${e.clientY-17}px,0)`;
    if(!visible){customCursor.style.opacity='1';visible=true}
  };
  window.addEventListener('pointermove',moveCursor,{passive:true});
  document.addEventListener('pointerover',e=>{
    if(e.target.closest('a,button,[role="button"],input,select,textarea,label')) customCursor.classList.add('hover');
  },{passive:true});
  document.addEventListener('pointerout',e=>{
    const fromInteractive=e.target.closest?.('a,button,[role="button"],input,select,textarea,label');
    const toInteractive=e.relatedTarget?.closest?.('a,button,[role="button"],input,select,textarea,label');
    if(fromInteractive&&!toInteractive) customCursor.classList.remove('hover');
  },{passive:true});
  document.addEventListener('pointerdown',()=>customCursor.classList.add('click'),{passive:true});
  document.addEventListener('pointerup',()=>setTimeout(()=>customCursor.classList.remove('click'),90),{passive:true});
  document.addEventListener('mouseleave',()=>{customCursor.style.opacity='0';visible=false});
  document.addEventListener('mouseenter',()=>{customCursor.style.opacity='1';visible=true});
}

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════ */
const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -35px 0px'});
  revealItems.forEach(el=>io.observe(el));
}else revealItems.forEach(el=>el.classList.add('is-visible'));
</script>
</body>
</html>
