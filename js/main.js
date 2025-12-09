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

// ▼▼ News 自動生成 ▼▼
fetch("csv/news.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").map(r => r.split(","));

    const header = rows.shift(); // 1行目削除
    const newsData = rows.map(r => {
      return {
        date: r[0],
        category: r[1],
        title: r[2],
        url: r[3] || ""
      };
    });

    // ▼ 日付でソート（新しい順）
    newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const list = document.getElementById("newsList");

    newsData.forEach(item => {
      const div = document.createElement("div");
      div.className = "news-item";

      div.innerHTML = `
        <div class="news-meta">${item.date}｜${item.category}</div>
        <div class="news-title">
          ${item.url ? `<a href="${item.url}">${item.title}</a>` : item.title}
        </div>
      `;

      list.appendChild(div);
    });
  });
