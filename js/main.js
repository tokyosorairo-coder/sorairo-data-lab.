// 【CMS連携を想定した仮のデータ】
const newsData = [
    { id: 1, date: "2025.12.09", category: "MAGAZINE", title: "Webサイト構築、デザイン意図の翻訳が成功！", link: "#" },
    { id: 2, date: "2025.12.08", category: "TV", title: "柳堀花怜が~ちゃんねるに出演", link: "#" },
    { id: 3, date: "2025.12.08", category: "RADIO", title: "NHKさいたまのラジオ番組に出演", link: "#" },
    { id: 4, date: "2025.12.07", category: "NEWS", title: "新しいデータ分析レポートを公開", link: "#" },
    { id: 5, date: "2025.12.06", category: "MAGAZINE", title: "★これはトップページでは非表示になる記事です", link: "#" } // 5件目
];

// HTML要素にニュースを自動で挿入する機能
function displayNews() {
    const newsListElement = document.getElementById('news-list');
    if (!newsListElement) return;

    // ★★★ ニュースデータを最初の4件に制限 ★★★
    const limitedNews = newsData.slice(0, 4); 

    // ニュースデータを一つずつ処理し、HTMLを生成
    limitedNews.forEach(news => { // limitedNews を使用
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

// ページが完全に読み込まれたら、すべての機能を実行する
window.onload = function() {
    displayNews();
    // 他のトップページ専用のJS機能があればここに追加します
};
