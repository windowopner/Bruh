document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const search = document.getElementById("search");
  const blocks = Array.from(document.querySelectorAll(".project-block"));
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const fileSlots = Array.from(document.querySelectorAll(".file-slot"));
  const socialLinks = Array.from(document.querySelectorAll(".social-link"));
  const emptyState = document.getElementById("empty-state");
  const toast = document.getElementById("action-toast");
  const viewer = document.getElementById("viewer");
  const frame = document.getElementById("frame");
  const title = document.getElementById("title");
  const back = document.getElementById("back");
  let toastTimer;

  const hideLoading = () => {
    if (!loading) {
      return;
    }

    window.setTimeout(() => {
      loading.classList.add("is-hidden");
    }, 180);
  };

  const showToast = (message) => {
    if (!toast) {
      return;
    }

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");

    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  };

  const closeViewer = () => {
    if (!viewer || !frame) {
      return;
    }

    viewer.classList.remove("is-visible");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("viewer-open");
    frame.src = "about:blank";
  };

  const openViewerWithUrl = (url, name) => {
    if (!viewer || !frame || !title || !url) {
      return;
    }

    const separator = url.includes("?") ? "&" : "?";
    frame.src = `${url}${separator}v=${Date.now()}`;
    title.textContent = name || "Project";
    viewer.classList.add("is-visible");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("viewer-open");
  };

  const openProjectBlock = (block) => {
    if (!block) {
      return;
    }

    openViewerWithUrl(
      block.dataset.url,
      block.querySelector(".project-title")?.textContent || "Project"
    );
  };

  const triggerDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    link.target = "_blank";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealItems.forEach((item) => {
      if (!item.classList.contains("is-visible")) {
        revealObserver.observe(item);
      }
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (search) {
    search.addEventListener("input", () => {
      const value = search.value.trim().toLowerCase();
      let visibleCount = 0;

      blocks.forEach((block) => {
        const haystack =
          `${block.textContent} ${block.dataset.search || ""}`.toLowerCase();
        const matches = value ? haystack.includes(value) : true;

        block.hidden = !matches;

        if (matches) {
          visibleCount += 1;
          block.classList.add("is-visible");
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    });
  }

  blocks.forEach((block) => {
    const trigger = block.querySelector("[data-open-project]");

    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", () => {
      openProjectBlock(block);
    });
  });

  socialLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href")?.trim();

      if (href) {
        return;
      }

      event.preventDefault();

      const name = link.dataset.linkName || "This link";
      showToast(`${name} URL is not connected yet. Send it and I can wire it in.`);
    });
  });

  fileSlots.forEach((slot) => {
    const trigger = slot.querySelector(".slot-trigger");
    const actions = slot.querySelectorAll("[data-slot-action]");

    if (trigger) {
      trigger.addEventListener("click", () => {
        const nextState = !slot.classList.contains("is-open");

        fileSlots.forEach((item) => item.classList.remove("is-open"));

        if (nextState) {
          slot.classList.add("is-open");
        }
      });
    }

    actions.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();

        const action = button.dataset.slotAction;
        const slotTitle = slot.dataset.slotTitle || "This slot";
        const runUrl = slot.dataset.runUrl?.trim();
        const downloadUrl = slot.dataset.downloadUrl?.trim();

        if (action === "run") {
          if (!runUrl) {
            showToast(`${slotTitle} is not connected yet. Add a repo file later.`);
            return;
          }

          openViewerWithUrl(runUrl, slotTitle);
          return;
        }

        if (!downloadUrl) {
          showToast(`${slotTitle} has no download file yet. Link it later.`);
          return;
        }

        triggerDownload(downloadUrl);
      });
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element) || !target.closest(".file-slot")) {
      fileSlots.forEach((slot) => slot.classList.remove("is-open"));
    }
  });

  if (back) {
    back.addEventListener("click", closeViewer);
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      fileSlots.forEach((slot) => slot.classList.remove("is-open"));

      if (viewer?.classList.contains("is-visible")) {
        closeViewer();
      }
    }
  });

  hideLoading();
});
