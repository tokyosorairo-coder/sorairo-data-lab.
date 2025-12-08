// ▼▼ CSV読み込み ▼▼
fetch("csv/data.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text
      .trim()
      .split("\n")
      .map(row => row.split(","));
    processCSV(rows);
  });


// ▼▼ プルダウン生成 ▼▼
function processCSV(rows) {
  const members = rows[0].slice(1); // A列以外がメンバー名
  const memberSelect = document.getElementById("memberSelect");

  members.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    memberSelect.appendChild(opt);
  });

  memberSelect.addEventListener("change", () => {
    updateDisplay(memberSelect.value, rows);
  });

  updateDisplay(members[0], rows); // 初期表示
}


// ▼▼ 表示更新（出演回数の計算） ▼▼
function updateDisplay(member, rows) {
  let stageCount = 0;

  // メンバーの列番号
  const col = rows[0].indexOf(member);

  for (let i = 1; i < rows.length; i++) {
    const raw = rows[i][col];
    const val = raw ? raw.trim() : "";

    // ✕ = 欠席 → カウントしない
    // ─ = そもそも対象外 → カウントしない
    // それ以外（空白含む）は出演としてカウント
    if (val !== "✕" && val !== "─") {
      stageCount++;
    }
  }

  document.getElementById("stageCount").textContent = stageCount;
}


// ▼▼ タブ切替 ▼▼
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
