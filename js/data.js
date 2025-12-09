// ▼▼ CSV読み込み ▼▼
fetch("csv/stage.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").map(row => row.split(","));
    processCSV(rows);
  });

// ▼▼ プルダウン生成 ▼▼
function processCSV(rows) {
  const members = rows[0].slice(1);   // 1行目（ヘッダー）の A列以外がメンバー名
  const memberSelect = document.getElementById("memberSelect");

  // メンバー追加
  members.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    memberSelect.appendChild(opt);
  });

  // メンバー変更時
  memberSelect.addEventListener("change", () => {
    updateDisplay(memberSelect.value, rows);
  });

  // 初期表示
  updateDisplay(members[0], rows);
}

// ▼▼ 表示更新（出演回数の計算） ▼▼
function updateDisplay(member, rows) {
  let stageCount = 0;
  const col = rows[0].indexOf(member);

  for (let i = 1; i < rows.length; i++) {
    const val = rows[i][col]?.trim();

    // 空白 = 出演
    if (val === "") {
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
