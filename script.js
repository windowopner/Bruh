
document.addEventListener("DOMContentLoaded", () => {

  // 🔥 로딩 제거
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";

  const search = document.getElementById("search");
  const cards = document.querySelectorAll(".card");

  // 🔍 검색
  if (search) {
    search.addEventListener("input", () => {
      const v = search.value.toLowerCase();

      cards.forEach(c => {
        c.style.display =
          c.textContent.toLowerCase().includes(v) ? "flex" : "none";
      });
    });
  }

  // 🚀 앱 실행
  const viewer = document.getElementById("viewer");
  const frame = document.getElementById("frame");
  const title = document.getElementById("title");
  const back = document.getElementById("back");

  cards.forEach(card => {
    card.addEventListener("click", () => {

      const url = card.dataset.url;

      // ❌ 비어있거나 #이면 차단
      if (!url || url === "#") {
        alert("Coming soon 🚧");
        return;
      }

      // 🔥 핵심: 캐시 완전 무시 (중요 추가)
      const cacheBustedUrl = url + "?v=" + Date.now();

      frame.src = cacheBustedUrl;

      title.innerText =
        card.querySelector("h2")?.innerText || "Project";

      viewer.style.display = "flex";
    });
  });

  // ⬅ 뒤로가기
  if (back) {
    back.addEventListener("click", () => {
      viewer.style.display = "none";
      frame.src = "about:blank";
    });
  }

});
