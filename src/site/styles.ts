export const CSS = `
.ns-root{font-family:"Google Sans Flex",ui-sans-serif,system-ui,sans-serif;font-optical-sizing:auto}
.ns-root button:not(:disabled),.ns-root [role=button]{cursor:pointer}
.ns-ibox{display:grid;place-items:center;border:1px solid #e5e5e5;border-radius:2px;background:#f5f5f5;color:#0A0A0A;transition:background-color .35s ease,color .35s ease,border-color .35s ease}
.ns-ibox [pathLength]{stroke-dasharray:1;stroke-dashoffset:0}
.ns-hover:hover .ns-ibox{background:#0A0A0A;color:#fff;border-color:#0A0A0A}
.ns-hover:hover .ns-ibox [pathLength]{animation:ns-draw .9s cubic-bezier(.65,0,.35,1) both}
.ns-hover:hover .ns-ibox svg>:nth-child(2){animation-delay:90ms}
.ns-hover:hover .ns-ibox svg>:nth-child(3){animation-delay:180ms}
.ns-hover:hover .ns-ibox svg>:nth-child(4){animation-delay:270ms}
.ns-hover:hover .ns-ibox svg>:nth-child(n+5){animation-delay:360ms}
@keyframes ns-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@media (hover:none){.ns-hover:hover .ns-ibox{background:#f5f5f5;color:#0A0A0A;border-color:#e5e5e5}.ns-hover:hover .ns-ibox [pathLength]{animation:none}}
.ns-noscroll{scrollbar-width:none;-ms-overflow-style:none}
.ns-noscroll::-webkit-scrollbar{display:none}
.ns-mono{font-family:"Geist Mono",ui-monospace,monospace}
@keyframes ns-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
.ns-marquee{animation:ns-marquee 70s linear infinite}
.ns-marquee:hover{animation-play-state:paused}
@keyframes ns-dash{to{stroke-dashoffset:-12}}
.ns-dash{animation:ns-dash .9s linear infinite}
@keyframes ns-glow{0%,100%{opacity:.65}50%{opacity:1}}
.ns-glow{animation:ns-glow 3.2s ease-in-out infinite}
@keyframes ns-ping{0%{transform:scale(.7);opacity:.55}100%{transform:scale(2.1);opacity:0}}
.ns-ping{animation:ns-ping 2.4s cubic-bezier(.23,1,.32,1) infinite}
@keyframes ns-wave{0%{transform:scale(1);opacity:.35}100%{transform:scale(2.6);opacity:0}}
.ns-wave{animation:ns-wave 2.4s cubic-bezier(.23,1,.32,1) infinite}
@keyframes ns-life{0%{opacity:0;transform:translateY(2px)}10%{opacity:1;transform:none}85%{opacity:1}100%{opacity:0}}
.ns-life{animation:ns-life 3.6s ease forwards}
@keyframes ns-drift{0%{opacity:0;transform:translateX(-5px)}25%{opacity:1}75%{opacity:1}100%{opacity:0;transform:translateX(7px)}}
.ns-drift{animation:ns-drift 2.6s linear infinite}
@keyframes ns-fade{from{opacity:0}to{opacity:1}}
@keyframes ns-typing{0%,60%,100%{transform:none}30%{transform:translateY(-3px)}}
.ns-typing{animation:ns-typing 1s ease-in-out infinite}
@keyframes ns-fade-up{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.ns-fade-up{animation:ns-fade-up .45s cubic-bezier(.23,1,.32,1) both}
.ns-fade{animation:ns-fade .35s ease both}
@keyframes ns-nf-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.ns-nf-draw{stroke-dasharray:1 1;animation:ns-nf-draw 1.1s cubic-bezier(.65,0,.35,1) both}
.ns-nf-logo{animation:ns-fade .9s ease 2.4s both}
.ns-nf-guides{animation:ns-fade-out 1s ease 3.3s forwards}
@keyframes ns-nf-lift{to{transform:translateY(-68px)}}
@keyframes ns-nf-word{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.ns-nf-lift{animation:ns-nf-lift .9s cubic-bezier(.65,0,.35,1) 4.2s forwards}
.ns-nf-word{animation:ns-nf-word .9s cubic-bezier(.23,1,.32,1) 4.45s both}
.ns-line{transform:translateY(120%);transition:transform .7s cubic-bezier(.22,1,.36,1)}
.ns-line-in{transform:none}
@keyframes ns-pill-in{from{opacity:0;transform:translateY(14px);filter:blur(4px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes ns-pill-out{from{opacity:1;transform:none;filter:blur(0)}to{opacity:0;transform:translateY(-14px);filter:blur(4px)}}
.ns-pill-in{animation:ns-pill-in .7s cubic-bezier(.23,1,.32,1) .12s both}
.ns-pill-out{animation:ns-pill-out .4s cubic-bezier(.55,0,.75,.4) forwards}
@keyframes ns-skel{from{background-position:100% 0}to{background-position:-100% 0}}
.ns-skel,.ns-skel-dark{color:transparent;background-size:200% 100%;animation:ns-skel 1.4s ease-in-out infinite}
.ns-skel{background-image:linear-gradient(90deg,#F2F2F2 25%,#E8E8E8 50%,#F2F2F2 75%)}
.ns-skel-dark{background-image:linear-gradient(90deg,#D4D4D4 25%,#C8C8C8 50%,#D4D4D4 75%)}
@keyframes ns-img-in{from{opacity:0}}
.ns-img-in{animation:ns-img-in .4s ease backwards}
@keyframes ns-silk-a{0%{transform:translate3d(0,-85%,0) scaleY(.9)}50%{transform:translate3d(0,0,0) scaleY(1.25)}100%{transform:translate3d(0,80%,0) scaleY(.95)}}
@keyframes ns-silk-b{from{transform:translate3d(0,-60%,0)}to{transform:translate3d(0,70%,0)}}
@keyframes ns-silk-c{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(-9%,7%,0) scale(1.12)}}
@keyframes ns-silk-d{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(10%,6%,0) scale(1.08)}}
.ns-silk-a{animation:ns-silk-a 10s ease-in-out infinite alternate}
.ns-silk-b{animation:ns-silk-b 11s ease-in-out infinite alternate}
.ns-silk-c{animation:ns-silk-c 13s ease-in-out infinite alternate}
.ns-silk-d{animation:ns-silk-d 10s ease-in-out infinite alternate}
.ns-grain{position:relative;isolation:isolate}
.ns-grain::before{content:"";position:absolute;inset:0;z-index:-1;opacity:.12;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
@keyframes ns-sheet-in{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes ns-sheet-out{from{transform:translateX(0)}to{transform:translateX(100%)}}
@keyframes ns-fade-out{from{opacity:1}to{opacity:0}}
.ns-sheet[data-state=open]{animation:ns-sheet-in .5s cubic-bezier(.23,1,.32,1)}
.ns-sheet[data-state=closed]{animation:ns-sheet-out .3s cubic-bezier(.4,0,1,1) forwards}
.ns-overlay[data-state=open]{animation:ns-fade .3s ease}
.ns-overlay[data-state=closed]{animation:ns-fade-out .3s ease forwards}
@media (prefers-reduced-motion:reduce){.ns-wave,.ns-typing,.ns-fade-up,.ns-ibox [pathLength],.ns-marquee,.ns-dash,.ns-glow,.ns-ping,.ns-drift,.ns-fade,.ns-sheet,.ns-overlay,.ns-nf-draw,.ns-nf-logo,.ns-nf-lift,.ns-nf-word,.ns-pill-in,.ns-skel,.ns-skel-dark,.ns-img-in,.ns-silk-a,.ns-silk-b,.ns-silk-c,.ns-silk-d{animation:none!important}.ns-life{animation:none!important;opacity:1}.ns-pill-out{display:none}.ns-line{transform:none;transition:none}.ns-nf-guides{display:none}}
`;
