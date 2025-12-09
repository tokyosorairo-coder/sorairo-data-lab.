// 【CMS連携を想定した仮のデータ】
// トップページより多い、全件データと仮定します
const allNewsData = [
    { id: 1, date: "2025.12.09", category: "MAGAZINE", title: "Webサイト構築、デザイン意図の翻訳が成功！", link: "#" },
    { id: 2, date: "2025.12.08", category: "TV", title: "柳堀花怜が~ちゃんねるに出演", link: "#" },
    { id: 3, date: "2025.12.08", category: "RADIO", title: "NHKさいたまのラジオ番組に出演", link: "#" },
    { id: 4, date: "2025.12.07", category: "NEWS", title: "新しいデータ分析レポートを公開", link: "#" },
    { id: 5, date: "2025.12.06", category: "MAGAZINE", title: "これが5件目の記事です。全リストには表示されます。", link: "#" },
    { id: 6, date: "2025.12.05", category: "OTHER", title: "これが6件目の記事です。", link: "#" },
    // ... さらに多くのニュース ...
];

// 全ニュースをHTML要素に挿入する機能
function displayAllNews() {
    const newsListElement = document.getElementById('news-list-full');
    if (!newsListElement) return;

    // ★★★ 制限をかけず、全てのニュースデータを表示 ★★★
    allNewsData.forEach(news => {
        const listItem = document.createElement('li');
        listItem.classList.add('news-item'); 

        // 詳細ページへのリンク（idを渡す）
        listItem.innerHTML = `
            <span class="news-date">${news.date}</span>
            <span class="news-category">[${news.category}]</span> 
            <span class="news-title">
                <a href="news_detail.html?id=${news.id}">${news.title}</a>
            </span>
        `;
        
        newsListElement.appendChild(listItem);
    });
}

// ページが完全に読み込まれたらニュースを表示する関数を実行
window.onload = displayAllNews;
