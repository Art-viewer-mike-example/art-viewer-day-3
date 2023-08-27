(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();const p="https://api.artic.edu",m="/api/v1/artworks",f=async(n,o={})=>{try{const t=await fetch(n,o),{ok:i,status:e,statusText:a}=t;if(!i)throw new Error(`Fetch failed: ${e}, ${a||"no statusText"}`);return[null,await t.json()]}catch(t){return console.warn(t.message),[t,null]}},g=async({keyword:n="landscape",maxCount:o=10}={})=>{const t=new URL(p);t.pathname=`${m}/search`,t.searchParams.append("q",n),t.searchParams.append("limit",o),t.searchParams.append("query[term][is_public_domain]","true"),t.searchParams.append("fields","id,title,image_id,artwork_type_title");const[i,e]=await f(t);return i?[]:e.data},v=async n=>{const[o,t]=await f(`${p}${m}/${n}`);return o?[o,null]:[null,t.data]},E=n=>{n.innerHTML=`
    <h1>ArtViewer App</h1>

    <form id="search-form" aria-labelledby="form-heading">
      <h2 id="form-heading">Search For Paintings By Keyword</h2>
      <label for="search-input">Keyword:</label>
      <input type="text" id="search-input" name="keyword" />
      <fieldset>
        <legend>Select the number of results you'd like</legend>
        <input type="radio" id="option-10" name="maxCount" value="10" aria-label="Return up to 10 artworks" checked>
        <label for="option-10">10</label><br>
        <input type="radio" id="option-25" name="maxCount" value="25" aria-label="Return up to 25 artworks">
        <label for="option-25">25</label><br>
        <input type="radio" id="option-50" name="maxCount" value="50" aria-label="Return up to 50 artworks">
        <label for="option-50">50</label>
      </fieldset>
      <button type="submit">Search!</button>
    </form>

    <dialog id="selected-painting-modal">
      <form id="close-modal" aria-label="Close modal" method="dialog"><button>X</button></form>
      <div id="painting-preload-info"></div>
      <div id="painting-info"></div>
    </dialog>

    <div id="paintings">
      <h2>Paintings</h2>
      <div id="paintings-container"></div>
    </div>
  `;const o=document.getElementById("paintings-container"),t=document.getElementById("search-form"),i=document.getElementById("selected-painting-modal");return{searchForm:t,paintingsContainer:o,selectedPaintingModal:i}},h=(n,o,t=400)=>{const i=new Set;n.innerHTML="",o.forEach(({id:e,title:a,image_id:r,artwork_type_title:l})=>{if(l!=="Painting"||i.has(a.toLowerCase()))return;i.add(a.toLowerCase());const s=document.createElement("div");s.classList.add("painting-card");const u=document.createElement("h3");u.textContent=a;const c=document.createElement("img");c.src=`https://www.artic.edu/iiif/2/${r}/full/${t},/0/default.jpg`,c.onerror=()=>s.remove(),c.alt=a;const d=document.createElement("button");d.textContent="More Info",d.setAttribute("aria-label",`Learn more info about "${a}"`),d.dataset.imageId=r,d.dataset.title=a,d.dataset.artworkId=e,s.append(u,c,d),n.append(s)})},k=async n=>{n.preventDefault();const o=new FormData(n.target),t=Object.fromEntries(o.entries()),i=await g(t);h(document.querySelector("#paintings-container"),i),n.target.reset()},M=async n=>{if(!n.target.matches("button"))return;const o=document.querySelector("#selected-painting-modal"),t=document.querySelector("#painting-preload-info");t.innerHTML="";const{imageId:i,artworkId:e,title:a}=n.target.dataset,r=document.createElement("h2");r.textContent=a,t.append(r);const l=document.createElement("img");l.src=`https://www.artic.edu/iiif/2/${i}/full/843,/0/default.jpg`,l.alt=a,l.onload=()=>{t.append(l),o.showModal()};const s=document.querySelector("#painting-info");s.innerHTML=`
    <p>Artist: Loading...</p>
    <p>Date: Loading...</p>
    <p>Place of Origin: Loading...</p>
    <p>Medium: Loading...</p>
    <p>Classifications: Loading...</p>
    <p>Dimensions: Loading...</p>
  `;const[u,c]=await v(e);if(u)return s.innerHTML="Sorry, we could not find more information about this painting.";const{artist_title:d,classification_titles:y,date_display:w,place_of_origin:b,medium_display:L,dimensions:P}=c;s.innerHTML=`
    <p>Artist: ${d}</p>
    <p>Date: ${w}</p>
    <p>Place of Origin: ${b}</p>
    <p>Medium: ${L}</p>
    <p>Classifications: ${(y||[]).join(", ")}</p>
    <p>Dimensions: ${P}</p>
  `,console.log("artworkInfo:",c)},O=n=>{const o=document.querySelector("#selected-painting-modal");if(!n.target.id===o.id)return;const t=n.target.getBoundingClientRect(),i={x:n.clientX,y:n.clientY};(t.top>=i.y||i.y>=t.top+t.height||t.left>=i.x||i.x>=t.left+t.width)&&o.close()};async function S(n){const{paintingsContainer:o,searchForm:t,selectedPaintingModal:i}=E(n),e=await g();h(o,e),t.addEventListener("submit",k),o.addEventListener("click",M),i.addEventListener("click",O)}const C=document.querySelector("main");S(C);
