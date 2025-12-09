// MicroCMSとの連携に必要な設定 (リストページと共通)
const SERVICE_ID = 'sdltokyo'; 
const API_KEY = 'ezNTmjVFsUfBTMKo6uu6c25lRhvRQ0QaD9vO';
const BASE_ENDPOINT = `https://${SERVICE_ID}.microcms.io/api/v1/news`;

// URLから記事IDを取得する
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); 
}

// 特定の記事データをAPIから取得する関数
async function fetchArticleData(articleId) {
    if (!articleId) return null;

    const ENDPOINT = `${BASE_ENDPOINT}/${articleId}`; 

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

// 記事データをHTMLにレンダリングする関数
function renderArticle(data) {
    const container = document.getElementById('article-container');
    if (!container) return;

    // ★★★ カテゴリ名の安全な取得：data.category.category を使用し、無ければ「未分類」★★★
    // これにより [undefined] の表示を防ぎます。
    const categoryName = data.category?.category || '未分類'; 

    // HTMLを組み立てる
    container.innerHTML = `
        <h1 class="article-title">${data.title}</h1>
        <p class="article-meta">
            <span class="article-date">${data.date}</span>
            <span class="article-category">[${categoryName}]</span> 
        </p>
        <div class="article-body">
            ${data.content} </div>
    `;

    // ページタイトルも変更
    document.title = `${data.title} | Sorairo Data Lab.`;
}

// ページ読み込み時に実行
window.onload = async function() {
    const articleId = getArticleIdFromUrl(); 
    const article = await fetchArticleData(articleId);
    
    if (article) {
        renderArticle(article);
    } else {
        document.getElementById('article-container').innerHTML = '記事が見つかりませんでした。';
    }
};
