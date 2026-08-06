/* ========================
   contact.js
======================== */

// ── 햄버거 메뉴 ─────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
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
    if (
      !hamburger.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    }
  });
}


// ── 문의 폼 ─────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const msg = document.getElementById("successMsg");
  const btn = document.querySelector(".submit-btn");

  if (!form) {
    console.error("contactForm 못찾음");
    return;
  }

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    btn.textContent = "전송 중...";
    btn.disabled = true;

    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbxD1I9mJ78XMUdukct6uvaZXnwLOgmFQEAxIrmL9pZV8lSv6d-xag4J_8K8n4zYIAyU3Q/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          mode: "no-cors",
        }
      );

   const modal = document.getElementById("successModal");

if(modal){
  modal.classList.add("show");
}

form.reset();

    } catch (err) {

      console.error(err);

      alert("전송 중 오류가 발생했습니다.");

    } finally {

      btn.textContent = "Send";
      btn.disabled = false;

      setTimeout(() => {
        if (msg) {
          msg.style.display = "none";
        }
      }, 5000);
    }

  });
const closeBtn = document.getElementById("closeModal");

if(closeBtn){
  closeBtn.addEventListener("click", () => {
    document
      .getElementById("successModal")
      .classList.remove("show");
  });
}
});