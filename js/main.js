/* ============================
   Sorairo Data Lab.  main.js
   ----------------------------
   ・タブ切り替え
   ・スマホメニュー（必要な場合）
   ・共通UIの初期化
=============================== */

// ▼▼ タブ切り替え（全ページ共通で使える仕様） ▼▼
document.querySelectorAll("[data-tab]").forEach(tab => {
  tab.addEventListener("click", () => {

    const target = tab.dataset.tab;

    // タブボタンの状態を更新
    document.querySelectorAll("[data-tab]")
      .forEach(t => t.classList.remove("currentTab"));
    tab.classList.add("currentTab");

    // タブコンテンツを更新
    document.querySelectorAll(".tabContent")
      .forEach(c => c.classList.remove("active"));

    document.querySelector(target).classList.add("active");
  });
});


// ▼▼ メニュー（必要になった時用のテンプレ） ▼▼
const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}


// ▼▼ ページ読み込み時に動かす処理 ▼▼
document.addEventListener("DOMContentLoaded", () => {
  console.log("Sorairo Data Lab. loaded ✔");
});
