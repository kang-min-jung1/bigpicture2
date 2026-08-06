document.addEventListener("DOMContentLoaded", function () {

  // ——— 탭 전환 ———
  const tabBtns = document.querySelectorAll(".tab-btn");
  const galleries = document.querySelectorAll(".gallery");

  function activateTab(target) {
    tabBtns.forEach((b) => b.classList.remove("active"));
    galleries.forEach((gallery) => {
      if (gallery.id === `tab-${target}`) {
        gallery.classList.remove("hidden");
      } else {
        gallery.classList.add("hidden");
      }
    });
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${target}"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateTab(btn.dataset.tab);
    });
  });

  // ★ 뒤로가기로 돌아왔을 때 탭 복원
  const savedTab = sessionStorage.getItem("portfolioTab");
  if (savedTab) {
    activateTab(savedTab);
    sessionStorage.removeItem("portfolioTab");
  }

  // ★ 갤러리 사진 클릭 시 어느 탭에서 클릭했는지 저장
  galleries.forEach((gallery) => {
    const tabId = gallery.id.replace("tab-", ""); // "commercial" / "experience" / "public"
    gallery.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        sessionStorage.setItem("portfolioTab", tabId);
      });
    });
  });

  // ——— 햄버거 메뉴 ———
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    }
  });

});