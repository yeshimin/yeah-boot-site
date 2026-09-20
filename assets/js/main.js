const THEME_KEY = "site-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // 部分浏览器会限制 file:// 页面访问本地存储，不影响本次主题切换。
  }
}

function initTheme() {
  const root = document.documentElement;
  const storedTheme = getStoredTheme();
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";
  root.dataset.theme = storedTheme || preferredTheme;

  document
    .querySelector("[data-theme-toggle]")
    ?.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      storeTheme(nextTheme);
    });
}

function initNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const navigation = document.querySelector("[data-nav]");

  const updateHeader = () =>
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
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

function initPreview() {
  const previews = {
    users: {
      image: "./assets/images/admin-console.svg",
      alt: "YeahBoot 用户管理界面示意图",
      title: "用户、角色与组织关系集中维护",
      text: "查询、导入导出、状态控制和权限关联形成完整闭环。",
    },
    resources: {
      image: "./assets/images/permission-console.svg",
      alt: "YeahBoot 资源权限界面示意图",
      title: "视图资源与接口资源分层管理",
      text: "管理交互保持分层，角色授权与后端鉴权仍然简单直接。",
    },
    config: {
      image: "./assets/images/config-console.svg",
      alt: "YeahBoot 系统参数界面示意图",
      title: "业务参数运行时调整",
      text: "数据库维护、Redis 缓存、自动刷新与手动加载保持一致。",
    },
  };
  const image = document.querySelector("[data-preview-image]");
  const title = document.querySelector("[data-preview-title]");
  const text = document.querySelector("[data-preview-text]");
  document.querySelectorAll("[data-preview-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const preview = previews[button.dataset.previewTab];
      if (!preview || !image) return;
      document
        .querySelectorAll("[data-preview-tab]")
        .forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      image.src = preview.image;
      image.alt = preview.alt;
      if (title) title.textContent = preview.title;
      if (text) text.textContent = preview.text;
    });
  });
}

function initCopyButton() {
  document
    .querySelector("[data-copy-command]")
    ?.addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const command =
        document.querySelector("[data-command]")?.textContent || "";
      try {
        await navigator.clipboard.writeText(command);
        button.textContent = "已复制";
        window.setTimeout(() => {
          button.textContent = "复制";
        }, 1400);
      } catch {
        button.textContent = "请手动复制";
      }
    });
}

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
initTheme();
initNavigation();
initReveal();
initPreview();
initCopyButton();
