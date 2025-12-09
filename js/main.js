// MicroCMSとの連携に必要な設定
const SERVICE_ID = 'sdltokyo'; 
const API_KEY = 'ezNTmjVFsUfBTMKo6uu6c25lRhvRQ0QaD9vO';
const ENDPOINT = `https://${SERVICE_ID}.microcms.io/api/v1/news`;

// APIから全データを取得する関数
async function fetchAllNews() {
    try {
        const response = await fetch(ENDPOINT, {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        return json.contents; // 取得したコンテンツ配列（全件）を返す
        
    } catch (error) {
        console.error("トップページAPIデータの取得中にエラーが発生しました:", error);
        return [];
    }
}

// HTML要素にニュースを自動で挿入する機能
async function displayNews() {
    const newsListElement = document.getElementById('news-list');
    if (!newsListElement) return;
    
    const allNewsData = await fetchAllNews(); 

    // ★ 最新の4件に制限
    const limitedNews = allNewsData.slice(0, 4); 

    limitedNews.forEach(news => { 
        const listItem = document.createElement('li');
        listItem.classList.add('news-item'); 
        
        // カテゴリの安全な取得：news.category.category を使用
        const categoryName = news.category?.category || news.category?.title || '未分類';
        
        listItem.innerHTML = `
            <span class="news-date">${news.date}</span>
            <span class="news-category">[${categoryName}]</span> 
            <span class="news-title">
                <a href="news_detail.html?id=${news.id}">${news.title}</a>
            </span>
        `;
        
        newsListElement.appendChild(listItem);
    });
}

// ページが読み込まれたらニュースを表示する関数を実行
window.onload = displayNews;
