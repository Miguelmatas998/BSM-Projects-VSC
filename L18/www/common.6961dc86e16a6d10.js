"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{7693:(C,m,l)=>{l.d(m,{c:()=>i});var u=l(4083),r=l(7864),c=l(1898);const i=(s,n)=>{let e,t;const a=(g,w,_)=>{if(typeof document>"u")return;const E=document.elementFromPoint(g,w);E&&n(E)?E!==e&&(v(),d(E,_)):v()},d=(g,w)=>{e=g,t||(t=e);const _=e;(0,u.w)(()=>_.classList.add("ion-activated")),w()},v=(g=!1)=>{if(!e)return;const w=e;(0,u.w)(()=>w.classList.remove("ion-activated")),g&&t!==e&&e.click(),e=void 0};return(0,c.createGesture)({el:s,gestureName:"buttonActiveDrag",threshold:0,onStart:g=>a(g.currentX,g.currentY,r.a),onMove:g=>a(g.currentX,g.currentY,r.b),onEnd:()=>{v(!0),(0,r.h)(),t=void 0}})}},2225:(C,m,l)=>{l.d(m,{g:()=>u});const u=(n,e,t,a,d)=>c(n[1],e[1],t[1],a[1],d).map(v=>r(n[0],e[0],t[0],a[0],v)),r=(n,e,t,a,d)=>d*(3*e*Math.pow(d-1,2)+d*(-3*t*d+3*t+a*d))-n*Math.pow(d-1,3),c=(n,e,t,a,d)=>s((a-=d)-3*(t-=d)+3*(e-=d)-(n-=d),3*t-6*e+3*n,3*e-3*n,n).filter(g=>g>=0&&g<=1),s=(n,e,t,a)=>{if(0===n)return((n,e,t)=>{const a=e*e-4*n*t;return a<0?[]:[(-e+Math.sqrt(a))/(2*n),(-e-Math.sqrt(a))/(2*n)]})(e,t,a);const d=(3*(t/=n)-(e/=n)*e)/3,v=(2*e*e*e-9*e*t+27*(a/=n))/27;if(0===d)return[Math.pow(-v,1/3)];if(0===v)return[Math.sqrt(-d),-Math.sqrt(-d)];const g=Math.pow(v/2,2)+Math.pow(d/3,3);if(0===g)return[Math.pow(v/2,.5)-e/3];if(g>0)return[Math.pow(-v/2+Math.sqrt(g),1/3)-Math.pow(v/2+Math.sqrt(g),1/3)-e/3];const w=Math.sqrt(Math.pow(-d/3,3)),_=Math.acos(-v/(2*Math.sqrt(Math.pow(-d/3,3)))),E=2*Math.pow(w,1/3);return[E*Math.cos(_/3)-e/3,E*Math.cos((_+2*Math.PI)/3)-e/3,E*Math.cos((_+4*Math.PI)/3)-e/3]}},5062:(C,m,l)=>{l.d(m,{i:()=>u});const u=r=>r&&""!==r.dir?"rtl"===r.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},6602:(C,m,l)=>{l.r(m),l.d(m,{startFocusVisible:()=>i});const u="ion-focused",c=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],i=s=>{let n=[],e=!0;const t=s?s.shadowRoot:document,a=s||document.body,d=M=>{n.forEach(h=>h.classList.remove(u)),M.forEach(h=>h.classList.add(u)),n=M},v=()=>{e=!1,d([])},g=M=>{e=c.includes(M.key),e||d([])},w=M=>{if(e&&void 0!==M.composedPath){const h=M.composedPath().filter(f=>!!f.classList&&f.classList.contains("ion-focusable"));d(h)}},_=()=>{t.activeElement===a&&d([])};return t.addEventListener("keydown",g),t.addEventListener("focusin",w),t.addEventListener("focusout",_),t.addEventListener("touchstart",v),t.addEventListener("mousedown",v),{destroy:()=>{t.removeEventListener("keydown",g),t.removeEventListener("focusin",w),t.removeEventListener("focusout",_),t.removeEventListener("touchstart",v),t.removeEventListener("mousedown",v)},setFocus:d}}},6555:(C,m,l)=>{l.d(m,{c:()=>r});var u=l(6655);const r=n=>{const e=n;let t;return{hasLegacyControl:()=>{if(void 0===t){const d=void 0!==e.label||c(e),v=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")&&null===e.shadowRoot,g=(0,u.h)(e);t=!0===e.legacy||!d&&!v&&null!==g}return t}}},c=n=>null!==n.shadowRoot&&!!(i.includes(n.tagName)&&null!==n.querySelector('[slot="label"]')||s.includes(n.tagName)&&""!==n.textContent),i=["ION-RANGE"],s=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},7864:(C,m,l)=>{l.d(m,{a:()=>i,b:()=>s,c:()=>c,d:()=>e,h:()=>n});const u={getEngine(){var t;const a=window;return a.TapticEngine||(null===(t=a.Capacitor)||void 0===t?void 0:t.isPluginAvailable("Haptics"))&&a.Capacitor.Plugins.Haptics},available(){var t;const a=window;return!!this.getEngine()&&("web"!==(null===(t=a.Capacitor)||void 0===t?void 0:t.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(t){const a=this.getEngine();if(!a)return;const d=this.isCapacitor()?t.style.toUpperCase():t.style;a.impact({style:d})},notification(t){const a=this.getEngine();if(!a)return;const d=this.isCapacitor()?t.style.toUpperCase():t.style;a.notification({style:d})},selection(){this.impact({style:"light"})},selectionStart(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},r=()=>u.available(),c=()=>{r()&&u.selection()},i=()=>{r()&&u.selectionStart()},s=()=>{r()&&u.selectionChanged()},n=()=>{r()&&u.selectionEnd()},e=t=>{r()&&u.impact(t)}},7366:(C,m,l)=>{l.d(m,{a:()=>u,b:()=>w,c:()=>e,d:()=>_,e:()=>x,f:()=>n,g:()=>E,h:()=>c,i:()=>r,j:()=>p,k:()=>y,l:()=>t,m:()=>v,n:()=>M,o:()=>d,p:()=>s,q:()=>i,r:()=>o,s:()=>O,t:()=>g,u:()=>h,v:()=>f,w:()=>a});const u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",x="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},4862:(C,m,l)=>{l.d(m,{I:()=>n,a:()=>d,b:()=>s,c:()=>w,d:()=>E,f:()=>v,g:()=>a,i:()=>t,p:()=>_,r:()=>M,s:()=>g});var u=l(5861),r=l(6655),c=l(1178);const s="ion-content",n=".ion-content-scroll-host",e=`${s}, ${n}`,t=h=>"ION-CONTENT"===h.tagName,a=function(){var h=(0,u.Z)(function*(f){return t(f)?(yield new Promise(o=>(0,r.c)(f,o)),f.getScrollElement()):f});return function(o){return h.apply(this,arguments)}}(),d=h=>h.querySelector(n)||h.querySelector(e),v=h=>h.closest(e),g=(h,f)=>t(h)?h.scrollToTop(f):Promise.resolve(h.scrollTo({top:0,left:0,behavior:f>0?"smooth":"auto"})),w=(h,f,o,p)=>t(h)?h.scrollByPoint(f,o,p):Promise.resolve(h.scrollBy({top:o,left:f,behavior:p>0?"smooth":"auto"})),_=h=>(0,c.b)(h,s),E=h=>{if(t(h)){const o=h.scrollY;return h.scrollY=!1,o}return h.style.setProperty("overflow","hidden"),!0},M=(h,f)=>{t(h)?h.scrollY=f:h.style.removeProperty("overflow")}},9240:(C,m,l)=>{l.d(m,{g:()=>r});var u=l(1178);const r=(i,s,n)=>{const e=null==i?0:i.toString().length,t=c(e,s);if(void 0===n)return t;try{return n(e,s)}catch(a){return(0,u.a)("Exception in provided `counterFormatter`.",a),t}},c=(i,s)=>`${i} / ${s}`},5234:(C,m,l)=>{l.r(m),l.d(m,{KEYBOARD_DID_CLOSE:()=>r,KEYBOARD_DID_OPEN:()=>u,copyVisualViewport:()=>f,keyboardDidClose:()=>_,keyboardDidOpen:()=>g,keyboardDidResize:()=>w,resetKeyboardAssist:()=>e,setKeyboardClose:()=>v,setKeyboardOpen:()=>d,startKeyboardAssist:()=>t,trackViewportChanges:()=>h});const u="ionKeyboardDidShow",r="ionKeyboardDidHide";let i={},s={},n=!1;const e=()=>{i={},s={},n=!1},t=o=>{a(o),o.visualViewport&&(s=f(o.visualViewport),o.visualViewport.onresize=()=>{h(o),g()||w(o)?d(o):_(o)&&v(o)})},a=o=>{o.addEventListener("keyboardDidShow",p=>d(o,p)),o.addEventListener("keyboardDidHide",()=>v(o))},d=(o,p)=>{E(o,p),n=!0},v=o=>{M(o),n=!1},g=()=>!n&&i.width===s.width&&(i.height-s.height)*s.scale>150,w=o=>n&&!_(o),_=o=>n&&s.height===o.innerHeight,E=(o,p)=>{const O=new CustomEvent(u,{detail:{keyboardHeight:p?p.keyboardHeight:o.innerHeight-s.height}});o.dispatchEvent(O)},M=o=>{const p=new CustomEvent(r);o.dispatchEvent(p)},h=o=>{i=Object.assign({},s),s=f(o.visualViewport)},f=o=>({width:Math.round(o.width),height:Math.round(o.height),offsetTop:o.offsetTop,offsetLeft:o.offsetLeft,pageTop:o.pageTop,pageLeft:o.pageLeft,scale:o.scale})},8034:(C,m,l)=>{l.d(m,{K:()=>c,a:()=>i,c:()=>e});var u=l(5861),r=l(4110),c=(()=>((c=c||{}).Body="body",c.Ionic="ionic",c.Native="native",c.None="none",c))();const i={getEngine(){var t;return(null===(t=null==r.w?void 0:r.w.Capacitor)||void 0===t?void 0:t.isPluginAvailable("Keyboard"))&&(null==r.w?void 0:r.w.Capacitor.Plugins.Keyboard)},getResizeMode(){const t=this.getEngine();return null!=t&&t.getResizeMode?t.getResizeMode().catch(a=>{if("UNIMPLEMENTED"!==a.code)throw a}):Promise.resolve(void 0)}},s=t=>{if(void 0===r.d||t===c.None||void 0===t)return null;const a=r.d.querySelector("ion-app");return null!=a?a:r.d.body},n=t=>{const a=s(t);return null===a?0:a.clientHeight},e=function(){var t=(0,u.Z)(function*(a){let d,v,g,w;const _=function(){var o=(0,u.Z)(function*(){const p=yield i.getResizeMode(),y=void 0===p?void 0:p.mode;d=()=>{void 0===w&&(w=n(y)),g=!0,E(g,y)},v=()=>{g=!1,E(g,y)},null==r.w||r.w.addEventListener("keyboardWillShow",d),null==r.w||r.w.addEventListener("keyboardWillHide",v)});return function(){return o.apply(this,arguments)}}(),E=(o,p)=>{a&&a(o,M(p))},M=o=>{if(0===w||w===n(o))return;const p=s(o);return null!==p?new Promise(y=>{const x=new ResizeObserver(()=>{p.clientHeight===w&&(x.disconnect(),y())});x.observe(p)}):void 0};return yield _(),{init:_,destroy:()=>{null==r.w||r.w.removeEventListener("keyboardWillShow",d),null==r.w||r.w.removeEventListener("keyboardWillHide",v),d=v=void 0},isKeyboardVisible:()=>g}});return function(d){return t.apply(this,arguments)}}()},6690:(C,m,l)=>{l.d(m,{S:()=>r});const r={bubbles:{dur:1e3,circles:9,fn:(c,i,s)=>{const n=c*i/s-c+"ms",e=2*Math.PI*i/s;return{r:5,style:{top:32*Math.sin(e)+"%",left:32*Math.cos(e)+"%","animation-delay":n}}}},circles:{dur:1e3,circles:8,fn:(c,i,s)=>{const n=i/s,e=c*n-c+"ms",t=2*Math.PI*n;return{r:5,style:{top:32*Math.sin(t)+"%",left:32*Math.cos(t)+"%","animation-delay":e}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(c,i)=>({r:6,style:{left:32-32*i+"%","animation-delay":-110*i+"ms"}})},lines:{dur:1e3,lines:8,fn:(c,i,s)=>({y1:14,y2:26,style:{transform:`rotate(${360/s*i+(i<s/2?180:-180)}deg)`,"animation-delay":c*i/s-c+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(c,i,s)=>({y1:12,y2:20,style:{transform:`rotate(${360/s*i+(i<s/2?180:-180)}deg)`,"animation-delay":c*i/s-c+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(c,i,s)=>({y1:17,y2:29,style:{transform:`rotate(${30*i+(i<6?180:-180)}deg)`,"animation-delay":c*i/s-c+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(c,i,s)=>({y1:12,y2:20,style:{transform:`rotate(${30*i+(i<6?180:-180)}deg)`,"animation-delay":c*i/s-c+"ms"}})}}},4805:(C,m,l)=>{l.r(m),l.d(m,{createSwipeBackGesture:()=>s});var u=l(6655),r=l(5062),c=l(1898);l(4349);const s=(n,e,t,a,d)=>{const v=n.ownerDocument.defaultView;let g=(0,r.i)(n);const _=o=>g?-o.deltaX:o.deltaX;return(0,c.createGesture)({el:n,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:o=>(g=(0,r.i)(n),(o=>{const{startX:y}=o;return g?y>=v.innerWidth-50:y<=50})(o)&&e()),onStart:t,onMove:o=>{const y=_(o)/v.innerWidth;a(y)},onEnd:o=>{const p=_(o),y=v.innerWidth,O=p/y,x=(o=>g?-o.velocityX:o.velocityX)(o),L=x>=0&&(x>.2||p>y/2),D=(L?1-O:O)*y;let b=0;if(D>5){const k=D/Math.abs(x);b=Math.min(k,540)}d(L,O<=0?.01:(0,u.l)(0,O,.9999),b)}})}},4762:(C,m,l)=>{l.d(m,{Z:()=>r});var u=l(3020);let r=(()=>{class c{}return c.\u0275fac=function(s){return new(s||c)},c.\u0275cmp=u.Xpm({type:c,selectors:[["app-explore-container"]],inputs:{name:"name"},decls:7,vars:1,consts:[["id","container"],["target","_blank","rel","noopener noreferrer","href","https://ionicframework.com/docs/components"]],template:function(s,n){1&s&&(u.TgZ(0,"div",0)(1,"strong"),u._uU(2),u.qZA(),u.TgZ(3,"p"),u._uU(4,"Explore "),u.TgZ(5,"a",1),u._uU(6,"UI Components"),u.qZA()()()),2&s&&(u.xp6(2),u.Oqu(n.name))},styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}"]}),c})()},581:(C,m,l)=>{l.d(m,{e:()=>s});var u=l(4755),r=l(5030),c=l(7002),i=l(3020);let s=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[u.ez,r.u5,c.Pc]}),n})()}}]);