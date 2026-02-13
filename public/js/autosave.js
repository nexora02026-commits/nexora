
const form = document.getElementById("contactForm");
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');
const packageInputs = form.querySelectorAll('input[name="package"]');
const messageInput = document.getElementById("message");
const userId = "user123"; // ممكن تستخدم session أو أي معرف ثابت مؤقتًا

// حفظ المسودة كل ثانيتين على السيرفر
setInterval(() => {
  const selectedPackage = Array.from(packageInputs).find(p => p.checked)?.value || "";
  fetch("/save-draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      name: nameInput.value,
      email: emailInput.value,
      package: selectedPackage,
      message: messageInput.value
    })
  });
}, 2000);

// جلب المسودة عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(`/draft/${userId}`);
  const data = await res.json();
  const draft = data.draft || {};
  nameInput.value = draft.name || "";
  emailInput.value = draft.email || "";
  messageInput.value = draft.message || "";
  packageInputs.forEach(p => {
    if (p.value === draft.package) p.checked = true;
  });
});
