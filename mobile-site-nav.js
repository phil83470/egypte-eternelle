(() => {
  const header =
    document.querySelector("nav.main-nav") ||
    document.querySelector("nav.navbar") ||
    document.querySelector("body > nav") ||
    document.querySelector("body > header:not(.site-header)");
  const navInner = header?.querySelector(".nav-inner") || header;
  if (!header || !navInner || document.getElementById("site-mobile-menu")) return;

  const siteLinks = [
    ["Accueil — Portail", "index.html#accueil"],
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

  // Récupération automatique des ancres internes de la page courante (#chapitre, #eveil, etc.)
  const pageAnchors = Array.from(header.querySelectorAll('a[href^="#"]'))
    .map((a) => [a.textContent.trim(), a.getAttribute("href")])
    .filter(([label, href]) => label && href && href !== "#" && href !== "#accueil");

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
  panel.setAttribute("aria-label", "Navigation mobile du site");

  let menuHtml = "";
  if (pageAnchors.length > 0) {
    menuHtml += `<div class="site-mobile-section">Sur cette page</div>`;
    menuHtml += pageAnchors
      .map(([label, href]) => `<a href="${href}" class="site-mobile-anchor">${label}</a>`)
      .join("");
  }
  menuHtml += `<div class="site-mobile-section">Portail Égypte Éternelle</div>`;
  menuHtml += siteLinks
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join("");
  menuHtml += `<div class="site-mobile-section">Site partenaire</div>`;
  menuHtml += `<a href="https://webetpassion.fr" target="_blank" rel="noopener noreferrer" class="site-mobile-webetpassion">🌐 Retour sur Web &amp; Passion ↗</a>`;

  panel.innerHTML = menuHtml;
  header.insertAdjacentElement("afterend", panel);

  const style = document.createElement("style");
  style.textContent = `
    .mobile-nav-toggle { display:none; border:2px solid #e8bf6a; background:rgba(232,191,106,.16); width:46px; height:46px; padding:10px; border-radius:4px; box-shadow:0 0 12px rgba(232,191,106,.24); margin-left:auto; flex-direction:column; align-items:center; justify-content:center; gap:5px; cursor:pointer; flex-shrink:0; }
    .mobile-nav-toggle span { display:block; width:24px; height:2.5px; background:#ffd873; transition:transform .2s, opacity .2s; }
    .mobile-nav-toggle.open span:nth-child(1) { transform:translateY(7.5px) rotate(45deg); }
    .mobile-nav-toggle.open span:nth-child(2) { opacity:0; }
    .mobile-nav-toggle.open span:nth-child(3) { transform:translateY(-7.5px) rotate(-45deg); }
    .site-mobile-menu { display:none; position:fixed; top:60px; left:0; right:0; bottom:0; z-index:1500; overflow-y:auto; padding:12px 20px 36px; background:rgba(12,9,5,.98); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border-top:1px solid rgba(200,151,58,.3); }
    .site-mobile-menu.open { display:flex; flex-direction:column; }
    .mobile-nav-toggle:focus-visible { outline:3px solid #ffd873; outline-offset:3px; }
    .site-mobile-section { font:700 .7rem 'Cinzel',serif; letter-spacing:.35em; text-transform:uppercase; color:#c8973a; opacity:.65; padding:16px 8px 6px; }
    .site-mobile-menu a { display:block; padding:12px 8px; border-bottom:1px solid rgba(200,151,58,.12); color:#d4c49a; text-decoration:none; font:600 .82rem 'Cinzel',serif; letter-spacing:.06em; text-transform:uppercase; }
    .site-mobile-menu a.site-mobile-anchor { color:#e8bf6a; font-size:.78rem; padding:10px 12px; }
    .site-mobile-menu a.site-mobile-webetpassion { color:#00f3ff; border:1px solid rgba(0,243,255,.45); border-radius:25px; text-align:center; margin-top:10px; padding:11px 14px; background:rgba(0,243,255,.08); box-shadow:0 0 12px rgba(0,243,255,.2); }
    .site-mobile-menu a:hover, .site-mobile-menu a:focus-visible { color:#e8bf6a; background:rgba(200,151,58,.08); }
    @media (max-width:860px) {
      nav.main-nav, nav.navbar, body > nav, body > header:not(.site-header) { padding-left:16px !important; padding-right:16px !important; display:flex !important; align-items:center !important; justify-content:space-between !important; flex-direction:row !important; }
      .nav-inner { width:100%; display:flex; align-items:center; justify-content:space-between; }
      .nav-logo { font-size:.95rem !important; }
      .nav-links, nav.navbar > .nav-link, body > header:not(.site-header) > nav { display:none !important; }
      .mobile-nav-toggle { display:flex; }
    }
  `;
  document.head.append(style);

  const setOpen = (open) => {
    panel.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    toggle.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();
