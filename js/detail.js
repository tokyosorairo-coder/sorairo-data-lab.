// 【CMS連携を想定した特定の記事データ】
// 実際には、URLパラメータ（例: ?id=123）からIDを取得し、
// そのIDでCMSのAPIを叩いて、このデータを取得します。
function fetchArticleData(articleId) {
    console.log(`Fetching article ID: ${articleId}`);
    // ここはAPIから取得したと仮定した固定データです
    return {
        title: "双葉社「EX大衆 1・2月合併号」に柳堀花怜が掲載されます！",
        date: "2025.12.09",
        category: "MAGAZINE",
        body: `
            <p>12月15日(月)発売の双葉社「EX大衆 1・2月合併号」に柳堀花怜が登場します！</p>
            <p><strong>セブンネット限定ポストカード付き</strong>はこちらから <a href="https://7net.omni7.jp/detail/1107666348" target="_blank">https://7net.omni7.jp/detail/1107666348</a></p>
            <p>ぜひチェックしてください！</p>
        `,
        // 僕青サイトのようにSNSシェアリンクなどを表示する場合のデータも追加可能
    };
}

// 記事データをHTMLにレンダリングする関数
function renderArticle(data) {
    const container = document.getElementById('article-container');
    if (!container) return;

    // タイトル、メタ情報、本文のHTMLを組み立てる
    container.innerHTML = `
        <h1 class="article-title">${data.title}</h1>
        <p class="article-meta">
            <span class="article-date">${data.date}</span>
            <span class="article-category">[${data.category}]</span>
        </p>
        <div class="article-body">
            ${data.body}
        </div>
    `;

    // ページタイトルも変更
    document.title = `${data.title} | Sorairo Data Lab.`;
}

// ページ読み込み時に実行
window.onload = function() {
    // 実際はURLからIDを取得しますが、ここでは仮のID '1' で実行します
    const articleId = 1; 
    const article = fetchArticleData(articleId);
    renderArticle(article);
};
