
// 🔥 완전 안전 실행
document.addEventListener("DOMContentLoaded", () => {

  // 🔥 로딩 제거 (안전)
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";

  // 🔍 search
  const search = document.getElementById("search");
  const cards = document.querySelectorAll(".card");

  if (search && cards.length > 0) {

    search.addEventListener("input", () => {

      const value = search.value.toLowerCase();

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
      });

    });

  }

  // 🚀 viewer
  const viewer = document.getElementById("viewer");
  const frame = document.getElementById("frame");
  const title = document.getElementById("title");
  const back = document.getElementById("back");

  if (viewer && frame && title) {

    cards.forEach(card => {

      card.addEventListener("click", () => {

        const url = card.dataset.url;

        if (!url) return;

        frame.src = url;
        title.innerText = card.querySelector("h2").innerText;

        viewer.style.display = "flex";

      });

    });

  }

  // ⬅ 뒤로가기
  if (back && viewer && frame) {

    back.addEventListener("click", () => {
      viewer.style.display = "none";
      frame.src = "";
    });

  }

});
