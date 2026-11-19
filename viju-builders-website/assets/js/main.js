(function(){
  const config = window.VIJU_CONFIG || {};
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if(menuButton && nav){
    menuButton.addEventListener("click", function(){
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); menuButton.setAttribute("aria-expanded","false");
    }));
  }
  document.querySelectorAll("[data-photo]").forEach(img => {
    const key = img.getAttribute("data-photo");
    if(config.images && config.images[key]) img.src = config.images[key];
  });
  const phone = (config.phone || "").replace(/\D/g,"");
  const email = config.email || "";
  const phoneLink = document.getElementById("phone-link");
  const emailLink = document.getElementById("email-link");
  if(phone && phoneLink){phoneLink.textContent = config.phone; phoneLink.href = "tel:+"+phone;}
  if(email && emailLink){emailLink.textContent = email; emailLink.href = "mailto:"+email;}
  const address = document.getElementById("address-text");
  if(address && config.address) address.textContent = config.address;
  const wa = phone ? "https://wa.me/"+phone+"?text="+encodeURIComponent(config.whatsappMessage || "Hello Viju Builders.") : "#contact";
  ["whatsapp-button","floating-whatsapp"].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.href = wa;
  });
  const year = document.getElementById("year");
  if(year) year.textContent = new Date().getFullYear();
})();