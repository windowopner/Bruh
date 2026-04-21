// 🌙 다크 모드
const btn = document.getElementById("toggleTheme");

btn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    btn.textContent = "🌞 Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
});


// 🔍 검색 필터
const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  cards.forEach(card => {
    const name = card.getAttribute("data-name");

    if (name.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});


// ⚡ 로딩 제거
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");

  loading.style.opacity = "0";

  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});


// 💥 카드 클릭 효과
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.style.transform = "scale(0.98)";
    setTimeout(() => {
      card.style.transform = "";
    }, 150);
  });
});
