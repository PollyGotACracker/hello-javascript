const btnIndi = document.querySelector("#reg_btn_box .btn_indi");
const btnBusi = document.querySelector("#reg_btn_box .btn_busi");
const forms = document.querySelectorAll("#reg_form_box form");
const section = document.querySelector("#reg_form_box");

btnBusi?.addEventListener("click", () => {
  section.classList.add("active");
});

btnIndi?.addEventListener("click", () => {
  section.classList.remove("active");
});
