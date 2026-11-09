// O link do checkout e o rastreamento ficam em config.js.
const CONFIG = window.SITE_CONFIG || {};
const CHECKOUT_URL = CONFIG.checkoutUrl || "#oferta";

// Parâmetros de campanha com que o visitante chegou (utm_*, fbclid...).
const forwarded = new URLSearchParams();
if (CONFIG.forwardParams) {
  const here = new URLSearchParams(location.search);
  (CONFIG.paramsToForward || []).forEach((k) => {
    if (here.has(k)) forwarded.set(k, here.get(k));
  });
}
const checkoutHref = () => {
  if (CHECKOUT_URL === "#oferta" || ![...forwarded].length) return CHECKOUT_URL;
  const url = new URL(CHECKOUT_URL);
  forwarded.forEach((v, k) => { if (!url.searchParams.has(k)) url.searchParams.set(k, v); });
  return url.toString();
};

document.querySelectorAll("[data-checkout]").forEach((a) => {
  if (CHECKOUT_URL !== "#oferta") a.href = checkoutHref();
  a.addEventListener("click", () => {
    if (window.fbq) fbq("track", "InitiateCheckout");
    if (window.gtag) gtag("event", "begin_checkout");
  });
});

// Barra de compra fixa: aparece depois do topo e some quando a oferta está na tela.
const bar = document.querySelector(".buybar");
const hero = document.querySelector(".hero");
const offer = document.querySelector("#oferta");
let heroVisible = true;
let offerVisible = false;
const sync = () => bar.classList.toggle("show", !heroVisible && !offerVisible);
new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; sync(); }).observe(hero);
new IntersectionObserver(([e]) => { offerVisible = e.isIntersecting; sync(); }, { threshold: 0.15 }).observe(offer);

// Trecho da aula: toca ao clicar e quando aparece na tela.
const player = document.querySelector(".player");
const video = player.querySelector("video");
const start = () => {
  video.play().then(() => player.classList.add("is-playing")).catch(() => {});
};
player.querySelector(".play").addEventListener("click", start);
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) start();
    else video.pause();
  }, { threshold: 0.6 }).observe(player);
}

// Letras da palavra em destaque balançando, uma de cada vez.
document.querySelectorAll(".wave").forEach((el) => {
  const text = el.textContent;
  el.setAttribute("aria-label", text);
  el.textContent = "";
  [...text].forEach((c, i) => {
    const s = document.createElement("span");
    s.className = "ch";
    s.setAttribute("aria-hidden", "true");
    s.style.setProperty("--i", i);
    s.textContent = c;
    el.appendChild(s);
  });
});

// Rastreamento opcional: só carrega se houver ID em config.js.
if (CONFIG.metaPixelId) {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,"script","https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", CONFIG.metaPixelId);
  fbq("track", "PageView");
}
if (CONFIG.googleAnalyticsId) {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CONFIG.googleAnalyticsId);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", CONFIG.googleAnalyticsId);
}
