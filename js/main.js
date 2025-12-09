// 日付と時間の文字列を受け取り、「YYYY.MM.DD」形式に変換する関数
function formatMicroCmsDate(dateString) {
    if (!dateString) return '';
    
    // Dateオブジェクトを作成
    const date = new Date(dateString);

    // 日本時間（JST）で年月日を取得（これで時差が解消される）
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
}
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
        const categoryObject = news.category;
        let categoryName = '未分類'; 
        if (categoryObject) {
             categoryName = categoryObject.category ||   
                            categoryObject.name ||       
                            categoryObject.title ||      
                            '未分類';
        }

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
