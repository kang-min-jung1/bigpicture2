/* ========================
   DETAIL PAGE JS
   파일 위치: js/detail/style.js
======================== */

document.addEventListener("DOMContentLoaded", function () {

  // ——— 이미지 lazy load 후 페이드인 ———
  const imgs = document.querySelectorAll(".detail-img-wrap img");
  imgs.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("loaded"));
    }
  });

  // ——— 라이트박스 ———
  const lightbox     = document.getElementById("lightbox");
  const lightboxImg  = document.getElementById("lightboxImg");
  const closeBtn     = document.getElementById("lightboxClose");
  const prevBtn      = document.getElementById("lightboxPrev");
  const nextBtn      = document.getElementById("lightboxNext");

  const imgWraps = Array.from(document.querySelectorAll(".detail-img-wrap"));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const src = imgWraps[index].querySelector("img").src;
    const alt = imgWraps[index].querySelector("img").alt;
    lightboxImg.src  = src;
    lightboxImg.alt  = alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + imgWraps.length) % imgWraps.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % imgWraps.length;
    openLightbox(currentIndex);
  }

  // 이미지 클릭 → 라이트박스 오픈
  imgWraps.forEach((wrap, index) => {
    wrap.addEventListener("click", () => openLightbox(index));
  });

  // 닫기
  closeBtn.addEventListener("click", closeLightbox);

  // 라이트박스 배경 클릭 시 닫기
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // 이전/다음
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // 키보드 단축키
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape")      closeLightbox();
    if (e.key === "ArrowLeft")   showPrev();
    if (e.key === "ArrowRight")  showNext();
  });

  // ——— 햄버거 메뉴 (기존 portfolio/style.js와 동일, 중복 방지용) ———
  // portfolio/style.js 를 함께 로드하면 이 블록은 없어도 됩니다.
  // 만약 detail 페이지에서 portfolio/style.js 를 로드하지 않는다면 아래 주석을 해제하세요.

  /*
  const hamburger  = document.getElementById("hamburger");
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
  */

});