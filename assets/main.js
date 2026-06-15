(function () {
  const progress = document.querySelector(".reading-progress");
  const title = document.title;
  const text = document.querySelector("meta[name='description']")?.content || "深圳大学 2026 届毕业寄语";

  function updateProgress() {
    if (!progress) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
    progress.style.width = percent + "%";
  }

  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("链接已复制");
    } catch (error) {
      showToast("请复制浏览器地址栏链接");
    }
  }

  async function sharePage() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href });
        return;
      } catch (error) {
        if (error && error.name === "AbortError") return;
      }
    }
    await copyLink();
  }

  async function printPage() {
    showToast("正在打开打印窗口");
    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    } catch (error) {
      // Font readiness is a nice-to-have; printing should still continue.
    }

    if (typeof window.print === "function") {
      window.setTimeout(() => {
        window.print();
        window.setTimeout(() => showToast("在打印窗口中选择“保存为 PDF”"), 450);
      }, 120);
      return;
    }

    showToast("当前浏览器不支持直接打印，请使用浏览器菜单保存 PDF");
  }

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", sharePage);
  });

  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", printPage);
  });

  updateProgress();
  window.setTimeout(updateProgress, 250);
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  window.visualViewport?.addEventListener("resize", updateProgress);
})();
