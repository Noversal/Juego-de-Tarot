(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var a=e.g.document;if(!t&&a&&(a.currentScript&&(t=a.currentScript.src),!t)){var r=a.getElementsByTagName("script");r.length&&(t=r[r.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=(e,t,a)=>{const{name:r,desc:c,img:n}=e,{player1:l,player2:s}=a;let o;return console.log({player1:l,player2:s}),0===t?o="active":t="",t<3?`<div class="carousel-item ${o}">\n                <h4>Cartas de ${l}</h4>\n                <img src="${n}" class="d-block w-100" alt="${r}">\n                <div class="carousel-caption d-md-block">\n                    <p class="desc-carta">${c}</p>\n                </div>\n            </div>`:`<div class="carousel-item ${o}">\n            <h4>Cartas de ${s}</h4>\n            <img src="${n}" class="d-block w-100" alt="${r}">\n            <div class="carousel-caption d-md-block">\n                <p class="desc-carta">${c}</p>\n            </div>\n        </div>`},a=(e,t)=>`   <button type="button" class="salirMatch" id="salirMatch">X</button>\n        <div class="resMatch">\n          <div class="resMatch-img">\n            <img src="${t[0].img}">\n            <img src="${t[1].img}">\n            <img src="${t[2].img}">\n          </div>\n          <h3>Resultado del Match</h3>\n          <p>${e?"Si":"No"}</p>\n          <div class="resMatch-img">\n            <img src="${t[3].img}">\n            <img src="${t[4].img}">\n            <img src="${t[5].img}">\n          </div>\n        </div>\n        `,r=e.p+"public/src/assets/img/loader.gif",c=document.getElementById("play"),n=document.querySelector("#volverAtirar"),l=document.querySelector("#save"),s=document.querySelector("#verMatch"),o=document.querySelectorAll(".buttons-carousel"),d=document.querySelectorAll("container"),i=document.querySelector("#menu"),u=document.querySelector("#load"),m=document.querySelector("#cards"),g=document.querySelector("#match");let p=document.querySelector("#jugada");const h=document.querySelector("#match_result"),y=document.querySelector("#partidasGuardadas");let v;console.log(o);const $=e=>{o.forEach((e=>{e.style.display="none"})),o[e].style.display="block"},b=e=>{d.forEach((e=>{e.style.display="none",console.log(e)})),e.style.display="block",e===u&&setTimeout((()=>{b(m)}),3e3)},f=e=>{for(;e.firstChild;)console.log(e.firstChild),e.removeChild(e.firstChild)},E=()=>(async()=>{const e=await fetch("./src/cartas.json"),{data:t}=await e.json();return console.log({data:t}),t})().then((e=>(e=>{let t=[];for(let a=0;a<6;a++){let r=Math.round(21*Math.random()),c=e[r];t.includes(c)?(console.log(`${c.name} this letter was repeated`),a--):t.push(e[r])}return t})(e))),M=({cards:e,players:a},c="Obteniendo Cartas...")=>{for(;p.childNodes.length<7;){if(!(p.childNodes.length>0)){let n=0;e.forEach((e=>{p.innerHTML+=t(e,n,a),n++})),console.log(p.childNodes.length),u.innerHTML=`        \n      <div class="load" >\n      <img src="${r}" alt="">\n      <h4>${c}</h4>    \n      </div>`,b(u);break}f(p)}};let S=[];b(i),(()=>{let e=[],t={players:[],cards:[]};c.addEventListener("click",(async()=>{let a=document.getElementById("player1").value,r=document.getElementById("player2").value;""!==a&&""!==r&&(e=await E(),t.cards=e,t.players={player1:a,player2:r},a=document.getElementById("player1").value="",r=document.getElementById("player2").value="",M(t),b(u),console.log(t.cards),$(0))})),n.addEventListener("click",(async()=>{e=await E(),t.cards=e,M(t),b(u),console.log(t.cards)})),l.addEventListener("click",(()=>{const e=(e=>{let t=0;return e.forEach((e=>{t+=e.score})),t%2==0})(t.cards);h.innerHTML+=a(e,t.cards);let r=S.map((e=>e.id??0));t={...t,result:e,id:r.length>0?Math.max(...r)+1:1},0===r.length&&(y.innerHTML='            \n      <h4>Partidas Guardadas</h4>\n      <div class="partidasJugadas" id="partidaJugada"></div>\n      '),v=document.querySelector("#partidaJugada"),v.innerHTML+=(e=>{const{players:t,id:a}=e;return`\n       <div class="partida">\n        <div class="jugadores">\n        <p>${t.player1} & ${t.player2}</p>\n        </div>\n        <button value=${a} type="button">Ver Partida</button>\n        </div>\n        `})(t),S.push(t),console.log(S),b(g)})),g.addEventListener("click",(e=>{t={players:[],cards:[]},"salirMatch"===e.target.id&&(f(h),b(i))}))})(),y.addEventListener("click",(e=>{S.forEach((t=>{console.log(t.id),t.id===Number(e.target.value)&&(M(t,"Cargando Partida..."),$(1),s.addEventListener("click",(()=>{h.innerHTML+=a(t.res,t.cards),b(g)})))}))}))})();