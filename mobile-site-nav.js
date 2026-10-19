(() => {
  const header = document.querySelector("nav.main-nav") || document.querySelector("body > nav");
  const navInner = header?.querySelector(".nav-inner");
  if (!header || !navInner || document.getElementById("site-mobile-menu")) return;

  const links = [
    ["Accueil", "index.html#accueil"],
    ["Pyramides & monuments", "egypte-pyramides.html"],
    ["Société & quotidien", "egypte-societe.html"],
    ["Dynasties & pharaons", "egypte-dynasties.html"],
    ["Panthéon divin", "egypte-pantheon.html"],
    ["Mythes & objets sacrés", "egypte-mythes-objets.html"],
    ["Magie & Douat", "egypte-magie-rituels.html"],
    ["L’Art du Tarot", "tarot.html"],
    ["L’Odyssée des Guides", "odyssee_des_guides_fusion.html"],
    ["À propos", "egypte-a-propos.html"],
    ["Contact", "egypte-a-contact.html"],
  ];

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "mobile-nav-toggle";
  toggle.setAttribute("aria-label", "Ouvrir le menu");
  toggle.setAttribute("aria-controls", "site-mobile-menu");
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = "<span></span><span></span><span></span>";
  navInner.append(toggle);

  const panel = document.createElement("nav");
  panel.className = "site-mobile-menu";
  panel.id = "site-mobile-menu";
  panel.setAttribute("aria-label", "Navigation du site");
  panel.innerHTML = links
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join("");
  header.insertAdjacentElement("afterend", panel);

  const style = document.createElement("style");
  style.textContent = `
    .mobile-nav-toggle { display:none; border:2px solid #e8bf6a; background:rgba(232,191,106,.16); width:48px; height:48px; padding:10px; box-shadow:0 0 12px rgba(232,191,106,.24); margin-left:auto; flex-direction:column; justify-content:center; gap:5px; cursor:pointer; }
    .mobile-nav-toggle span { display:block; width:26px; height:3px; background:#ffd873; transition:transform .2s, opacity .2s; }
    .mobile-nav-toggle.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
    .mobile-nav-toggle.open span:nth-child(2) { opacity:0; }
    .mobile-nav-toggle.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
    .site-mobile-menu { display:none; position:fixed; top:64px; left:0; right:0; bottom:0; z-index:99; overflow-y:auto; padding:12px 20px 28px; background:rgba(14,10,5,.98); border-top:1px solid rgba(200,151,58,.3); }
    .site-mobile-menu.open { display:flex; flex-direction:column; }
    .mobile-nav-toggle:focus-visible { outline:3px solid #ffd873; outline-offset:3px; }
    .site-mobile-menu a { display:block; padding:13px 8px; border-bottom:1px solid rgba(200,151,58,.12); color:#d4c49a; text-decoration:none; font:600 .82rem 'Cinzel',serif; letter-spacing:.05em; text-transform:uppercase; }
    .site-mobile-menu a:hover, .site-mobile-menu a:focus-visible { color:#e8bf6a; background:rgba(200,151,58,.08); }
    @media (max-width:860px) {
      nav.main-nav, body > nav { padding-left:16px !important; padding-right:16px !important; }
      .nav-inner { justify-content:space-between; }
      .nav-logo { font-size:.95rem !important; }
      .nav-links { display:none !important; }
      .mobile-nav-toggle { display:flex; }
    }
  `;
  document.head.append(style);

  const setOpen = (open) => {
    panel.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    toggle.classList.toggle("open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();
