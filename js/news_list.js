// MicroCMSとの連携に必要な設定 (main.jsと共通)
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
        return json.contents; 
        
    } catch (error) {
        console.error("リストページAPIデータの取得中にエラーが発生しました:", error);
        return [];
    }
}

// 全ニュースをHTML要素に挿入する機能
async function displayAllNews() {
    const newsListElement = document.getElementById('news-list-full');
    if (!newsListElement) return;
    
    const allNewsData = await fetchAllNews(); 

    allNewsData.forEach(news => {
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

window.onload = displayAllNews;
