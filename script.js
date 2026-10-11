const shoes = [
  {name:"Drift 1",type:"run",price:89,color:"#ff5a1f",tint:"#ffe3d6",desc:"Cushioned daily runner"},
  {name:"Alley Low",type:"street",price:79,color:"#1c1a19",tint:"#e8e6e3",desc:"Plain, clean, goes with everything"},
  {name:"Ridge Trail",type:"trail",price:109,color:"#2f7d4f",tint:"#d9efe2",desc:"Grippy sole for mud and gravel"},
  {name:"Pulse Tempo",type:"run",price:99,color:"#1f5bff",tint:"#dbe5ff",desc:"Light and springy for fast days"},
  {name:"Corner Court",type:"street",price:85,color:"#c8374b",tint:"#fadde1",desc:"Retro court shape, soft knit"},
  {name:"Summit Mid",type:"trail",price:129,color:"#7a2e7e",tint:"#f1dcf2",desc:"Water-resistant, ankle support"}
];

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
let cart = 0;

function render(filter = "all") {
  const list = filter === "all" ? shoes : shoes.filter(s => s.type === filter);
  $("#grid").innerHTML = list.map(s => `
    <article class="card" style="--col:${s.color};--tint:${s.tint}">
      <div class="pic"><svg viewBox="0 0 400 200" role="img" aria-label="${s.name}"><use href="#shoe"/></svg></div>
      <div class="info">
        <h3>${s.name}</h3>
        <p class="meta">${s.desc}</p>
        <div class="row">
          <span class="price">$${s.price}</span>
          <button class="add" data-name="${s.name}">Add to cart</button>
        </div>
      </div>
    </article>`).join("");
}

let toastTimer;
function toast(text) {
  const t = $("#toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
}

$("#grid").addEventListener("click", e => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  cart++;
  $("#cartCount").textContent = cart;
  toast(`${btn.dataset.name} added to cart`);
});

$$(".filter").forEach(b => b.addEventListener("click", () => {
  $$(".filter").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  render(b.dataset.f);
}));

$$(".swatch").forEach(b => b.addEventListener("click", () => {
  $$(".swatch").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  const root = document.documentElement.style;
  root.setProperty("--accent", b.dataset.color);
  root.setProperty("--bg", b.dataset.bg);
  $("#colourName").textContent = b.dataset.name;
  const svg = $(".hero-shoe svg");
  svg.classList.remove("pop");
  void svg.getBoundingClientRect();
  svg.classList.add("pop");
}));

$("#cartBtn").addEventListener("click", () =>
  toast(cart ? `${cart} pair${cart > 1 ? "s" : ""} in your cart` : "Your cart is empty. Add a pair from the lineup."));

$("#form").addEventListener("submit", e => {
  e.preventDefault();
  $("#msg").textContent = `Thanks! We'll write to ${$("#email").value} when new colours drop.`;
  e.target.reset();
});

render();