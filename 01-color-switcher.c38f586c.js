const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let d=null;function o(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}e.addEventListener("click",(()=>{document.body.style.backgroundColor=o(),e.disabled=!0,t.disabled=!1,d=setInterval((()=>{document.body.style.backgroundColor=o()}),1e3)})),t.addEventListener("click",(()=>{clearInterval(d),t.disabled=!0,e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.c38f586c.js.map
