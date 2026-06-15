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

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", sharePage);
  });

  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
})();
