// MicroCMSとの連携に必要な設定
// サービスIDとAPIキーは他のJSファイルと共通の値を使用します
const SERVICE_ID = 'sdltokyo'; 
const API_KEY = 'ezNTmjVFsUfBTMKo6uu6c25lRhvRQ0QaD9vO';
const ENDPOINT = `https://${SERVICE_ID}.microcms.io/api/v1/news`;

// APIから全データを取得する関数 (news_list.jsと共通)
async function fetchAllNews() {
    try {
        const response = await fetch(ENDPOINT, {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        // 取得したコンテンツ配列（全件）を返す
        return json.contents; 
        
    } catch (error) {
        console.error("トップページAPIデータの取得中にエラーが発生しました:", error);
        return []; // エラー時は空の配列を返す
    }
}

// HTML要素にニュースを自動で挿入する機能
async function displayNews() {
    const newsListElement = document.getElementById('news-list');
    if (!newsListElement) return;
    
    // APIからデータを取得
    const allNewsData = await fetchAllNews(); 

    // ★★★ 取得したニュースデータを最新の4件に制限 ★★★
    const limitedNews = allNewsData.slice(0, 4); 

    // ニュースデータを一つずつ処理し、HTMLを生成
    limitedNews.forEach(news => { 
        const listItem = document.createElement('li');
        listItem.classList.add('news-item'); 
        
        // CMSのデータにはIDが含まれます
        listItem.innerHTML = `
            <span class="news-date">${news.date}</span>
            <span class="news-category">[${news.category.category}]</span>
            <span class="news-title">
                <a href="news_detail.html?id=${news.id}">${news.title}</a>
            </span>
        `;
        
        newsListElement.appendChild(listItem);
    });
}

// ページが読み込まれたらニュースを表示する関数を実行
window.onload = displayNews;
