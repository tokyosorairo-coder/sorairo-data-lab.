// MicroCMSとの連携に必要な設定 (list.jsと同じ)
const SERVICE_ID = 'your-service-id'; 
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_ENDPOINT = `https://${SERVICE_ID}.microcms.io/api/v1/news`;

// URLから記事ID（例: ?id=abc12345）を取得する
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // URLから id の値を取得
}

// 特定の記事IDの記事データをAPIから取得する関数
async function fetchArticleData(articleId) {
    if (!articleId) return null;

    const ENDPOINT = `${BASE_ENDPOINT}/${articleId}`; // 特定の記事のエンドポイントを構築

    try {
        const response = await fetch(ENDPOINT, {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const article = await response.json();
        return article; 
        
    } catch (error) {
        console.error(`記事ID ${articleId} の取得中にエラーが発生しました:`, error);
        return null;
    }
}

// 記事データをHTMLにレンダリングする関数 (ここは以前と同じ)
function renderArticle(data) {
    // ... レンダリング処理（中略）...
}

// ページ読み込み時に実行
window.onload = async function() {
    // URLからIDを取得
    const articleId = getArticleIdFromUrl(); 
    
    // APIからデータを取得
    const article = await fetchArticleData(articleId);
    
    if (article) {
        renderArticle(article);
    } else {
        // 記事が見つからなかった場合の処理
        document.getElementById('article-container').innerHTML = '記事が見つかりませんでした。';
    }
};
