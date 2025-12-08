// ▼▼ CSV読み込み ▼▼
fetch("data.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").map(row => row.split(","));
    processCSV(rows);
  });


function processCSV(rows) {
  const members = rows[0].slice(1);
  const memberSelect = document.getElementById("memberSelect");

  // ▼メンバー名をプルダウンに追加
  members.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    memberSelect.appendChild(opt);
  });

  memberSelect.addEventListener("change", () => {
    updateDisplay(memberSelect.value, rows);
  });

  updateDisplay(members[0], rows); // 初期表示
}


// ▼▼ 表示更新 ▼▼
function updateDisplay(member, rows) {

  let stageCount = 0;
  const col = rows[0].indexOf(member);

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][col] === "1") stageCount++;
  }

  document.getElementById("stageCount").textContent = stageCount;
}


// ▼▼ タブ切替 ▼▼
document.querySelectorAll(".tabs a").forEach(tab => {
  tab.addEventListener("click", () => {

    document.querySelectorAll(".tabs a").forEach(t => t.classList.remove("currentTab"));
    tab.classList.add("currentTab");

    const target = tab.getAttribute("data-tab");

    document.querySelectorAll(".tabContent")
      .forEach(c => c.classList.remove("active"));

    document.querySelector(target).classList.add("active");
  });
});
