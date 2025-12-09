// MicroCMSとの連携に必要な設定
// 実際には、MicroCMSの管理画面で取得できる値を設定します
const SERVICE_ID = 'sdltokyo'; 
const API_KEY = 'ezNTmjVFsUfBTMKo6uu6c25lRhvRQ0QaD9vO';
const ENDPOINT = `https://${SERVICE_ID}.microcms.io/api/v1/news`;

// APIからデータを取得する関数
async function fetchAllNews() {
    try {
        const response = await fetch(ENDPOINT, {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        });
        
        // データの取得に失敗した場合
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        // 取得したコンテンツ配列（全件）を返す
        return json.contents; 
        
    } catch (error) {
        console.error("APIデータの取得中にエラーが発生しました:", error);
        return []; // エラー時は空の配列を返す
    }
}

// 全ニュースをHTML要素に挿入する機能
async function displayAllNews() {
    const newsListElement = document.getElementById('news-list-full');
    if (!newsListElement) return;
    
    // 仮のデータではなく、APIからデータを取得
    const allNewsData = await fetchAllNews(); 

    // ニュースデータを一つずつ処理し、HTMLを生成 (ここは以前と同じ)
    allNewsData.forEach(news => {
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

window.onload = displayAllNews;
