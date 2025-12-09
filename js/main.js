// 【CMS連携を想定した仮のデータ】
// 実際にはAPI通信でこのデータを取得します
const newsData = [
    { date: "2025.12.09", category: "MAGAZINE", title: "Webサイト構築、デザイン意図の翻訳が成功！", link: "#" },
    { date: "2025.12.08", category: "TV", title: "柳堀花怜が~ちゃんねるに出演", link: "#" },
    { date: "2025.12.08", category: "RADIO", title: "NHKさいたまのラジオ番組に出演", link: "#" },
    { date: "2025.12.07", category: "NEWS", title: "新しいデータ分析レポートを公開", link: "#" }
];

// HTML要素にニュースを自動で挿入する機能
function displayNews() {
    const newsListElement = document.getElementById('news-list');
    if (!newsListElement) return;

    // ニュースデータを一つずつ処理し、HTMLを生成
    newsData.forEach(news => {
        const listItem = document.createElement('li');
        listItem.classList.add('news-item'); 

        // 日付、カテゴリ、タイトルを含むHTMLを組み立てる
        listItem.innerHTML = `
            <span class="news-date">${news.date}</span>
            <span class="news-category">[${news.category}]</span> 
            <span class="news-title">
                <a href="${news.link}">${news.title}</a>
            </span>
        `;
        
        newsListElement.appendChild(listItem);
    });
}

// ページが完全に読み込まれたら、すべての機能を実行する
window.onload = function() {
    displayNews();
    // 他のトップページ専用のJS機能があればここに追加します
};
