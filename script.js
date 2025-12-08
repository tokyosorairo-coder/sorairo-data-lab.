// ▼▼ CSV読み込み ▼▼
fetch("csv/stage.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").map(row => row.split(","));
    processCSV(rows);
  });



// ▼▼ プルダウン生成 ▼▼
function processCSV(rows) {
  // A列＝イベント名 → メンバーは1列目以降
  const members = rows[0].slice(1);

  const memberSelect = document.getElementById("memberSelect");
  memberSelect.innerHTML = "";

  members.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    memberSelect.appendChild(opt);
  });

  // 何も表示されないとき用の安全対策
  if (members.length === 0) {
    console.error("メンバー名が取得できなかったニダ… CSVの列ズレが激しい可能性があるニダ。");
    return;
  }

  memberSelect.addEventListener("change", () => {
    updateDisplay(memberSelect.value, rows);
  });

  updateDisplay(members[0], rows);
}


// ▼▼ 出演回数の計算 ▼▼
function updateDisplay(member, rows) {
  const col = rows[0].indexOf(member);

  let stageCount = 0;

  for (let i = 1; i < rows.length; i++) {
    const val = rows[i][col];

    // ✕ → 欠席 → ノーカウント
    // ─ → 非対象 → ノーカウント
    // ""（空白） → 出演 → カウント
    if (val !== "✕" && val !== "─") {
      stageCount++;
    }
  }

  document.getElementById("stageCount").textContent = stageCount;
}


// ▼▼ タブ切り替え ▼▼
document.querySelectorAll(".tabs a").forEach(tab => {
  tab.addEventListener("click", () => {

    document.querySelectorAll(".tabs a")
      .forEach(t => t.classList.remove("currentTab"));
    tab.classList.add("currentTab");

    const target = tab.getAttribute("data-tab");

    document.querySelectorAll(".tabContent")
      .forEach(c => c.classList.remove("active"));

    document.querySelector(target).classList.add("active");
  });
});
