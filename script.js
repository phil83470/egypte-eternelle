document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("sh-burger");
  const nav = document.getElementById("sh-nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // Fermer automatiquement le menu lorsqu'on clique sur un lien (sauf le menu déroulant principal)
    nav.querySelectorAll(".sh-nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        // Si ce n'est pas le lien "Portails" qui déroule le sous-menu
        if (!link.parentElement.classList.contains("has-drop")) {
          nav.classList.remove("active");
        }
      });
    });
  }
});
