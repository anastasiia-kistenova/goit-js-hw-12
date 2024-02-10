import{S as w,i as d,a as u}from"./assets/vendor-5401a4b0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();let g=new w(".image-card a",{captionsData:"alt"});const f="42176661-60cd7e02e4c469a287416d2c6",m=document.querySelector(".photo-container-js"),l=document.querySelector(".load-btn");let c=1,y="";function b(){const t=document.createElement("div");t.className="loader",m.appendChild(t)}function p(){const t=m.querySelector(".loader");t&&t.remove()}function h(t){const s=t.map(o=>`
            <li class="image-card">
                <a class="image-link" href="${o.largeImageURL}">
                    <img src="${o.webformatURL}" alt="${o.tags}">
                </a>
                <div class="image-details">
                    <p class="detail">Likes ${o.likes}</p>
                    <p class="detail">Views ${o.views}</p>
                    <p class="detail">Comments ${o.comments}</p>
                    <p class="detail">Downloads ${o.downloads}</p>
                </div>
            </li>
        `).join("");m.insertAdjacentHTML("beforeend",s)}async function v(t){b(),y=t,c=1;const a="photo",s="horizontal",o=!0;try{const e=await u.get("https://pixabay.com/api/",{params:{key:f,q:t,image_type:a,orientation:s,safesearch:o,per_page:15,page:c}});p();const r=e.data,i=document.getElementById("gallery");if(i.innerHTML="",parseInt(r.totalHits)>0){const L=r.hits.map(n=>({webformatURL:n.webformatURL,tags:n.tags,likes:n.likes,views:n.views,comments:n.comments,downloads:n.downloads,largeImageURL:n.largeImageURL}));h(L),g.refresh(),l.style.display="block"}else d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"})}catch(e){p(),console.error("Error during fetch:",e.message)}}async function I(){c++;try{const a=(await u.get("https://pixabay.com/api/",{params:{key:f,q:y,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:c}})).data;if(parseInt(a.totalHits)>0){const s=a.hits.map(e=>({webformatURL:e.webformatURL,tags:e.tags,likes:e.likes,views:e.views,comments:e.comments,downloads:e.downloads,largeImageURL:e.largeImageURL}));h(s),g.refresh(),c*15>=parseInt(a.totalHits)&&(document.querySelector(".load-btn").style.display="none",d.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const o=document.querySelector(".image-card").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}catch(t){console.error("Error during fetch:",t.message)}}l.addEventListener("click",I);document.addEventListener("DOMContentLoaded",function(){document.querySelector(".js-search-form").addEventListener("submit",function(t){t.preventDefault();const a=document.querySelector(".input").value;a.trim()!==""?(v(a),l.style.display="none"):d.error({message:"Please enter a valid search query.",position:"topRight"}),t.target.reset()}),l.style.display="none"});
//# sourceMappingURL=commonHelpers.js.map