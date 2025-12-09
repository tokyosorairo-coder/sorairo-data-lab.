// MicroCMSとの連携に必要な設定 (list.jsと同じ)
const SERVICE_ID = 'sdltokyo'; 
const API_KEY = 'ezNTmjVFsUfBTMKo6uu6c25lRhvRQ0QaD9vO';
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

function renderArticle(data) {
    const container = document.getElementById('article-container');
    if (!container) return;

    // ★★★ カテゴリ名取得のロジックを修正 ★★★
    // 1. data.category や data.category.category が存在するか安全にチェック (?. を使用)
    // 2. 存在しない場合は必ず「未分類」を返す (|| '未分類' を使用)
    const categoryName = data.category?.category || '未分類'; 

    // HTMLを組み立てる
    container.innerHTML = `
        <h1 class="article-title">${data.title}</h1>
        <p class="article-meta">
            <span class="article-date">${data.date}</span>
            <span class="article-category">[${categoryName}]</span>  
        </p>
        <div class="article-body">
            ${data.content}
        </div>
    `;

    // ページタイトルも変更
    document.title = `${data.title} | Sorairo Data Lab.`;
}

// ※ ページ読み込み時に実行される部分は省略しています

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
