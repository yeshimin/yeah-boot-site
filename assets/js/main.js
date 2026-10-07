function initNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const navigation = document.querySelector("[data-nav]");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = navigation?.classList.toggle("is-open") || false;
    toggle.setAttribute("aria-expanded", String(open));
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  nodes.forEach((node) => observer.observe(node));
}

function initCopyButton() {
  document
    .querySelector("[data-copy-command]")
    ?.addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const defaultText = button.textContent;
      const command = document.querySelector("[data-command]")?.textContent || "";

      try {
        await navigator.clipboard.writeText(command);
        button.textContent = "已复制";
        window.setTimeout(() => {
          button.textContent = defaultText;
        }, 1400);
      } catch {
        button.textContent = "请手动复制";
      }
    });
}

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

initNavigation();
initReveal();
initCopyButton();
