function toggleSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu.style.width === '250px') {
        sideMenu.style.width = '0';
    } else {
        sideMenu.style.width = '250px';
    }
}

const API_KEY = 'AIzaSyCCzzbY3RRVYorlQrdQf6ubECP_B5ltS5Y'; // Ваш ключ API
const CHANNEL_IDS = {
    KEMO: 'UCWLxarOxx4Aeh959lrV31Lg', // Идентификатор канала Кемо
    SHOMER: 'UCELCPjx3rq0d-G6WfhjwXyA' // Замените на идентификатор канала Shomer TV
};

const getYouTubeApiUrl = (channelId) => 
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&eventType=live&type=video&maxResults=5`;

document.addEventListener('DOMContentLoaded', () => {
    const streamsContainer = document.getElementById('streams-container');
    const requests = [
        fetch(getYouTubeApiUrl(CHANNEL_IDS.KEMO)),
        fetch(getYouTubeApiUrl(CHANNEL_IDS.SHOMER))
    ];

    Promise.all(requests)
        .then(responses => {
            // Проверка успешности запросов
            if (!responses.every(response => response.ok)) {
                throw new Error(`Ошибка HTTP: ${responses.map(response => response.status).join(', ')}`);
            }
            return Promise.all(responses.map(response => response.json()));
        })
        .then(dataArray => {
            const allItems = dataArray.flatMap(data => data.items);
            const liveStreams = allItems.filter(item => item.snippet.liveBroadcastContent === 'live');

            if (liveStreams.length > 0) {
                liveStreams.forEach(item => {
                    const streamElement = document.createElement('div');
                    streamElement.className = 'live-stream';
                    streamElement.innerHTML = `<iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
                    streamsContainer.appendChild(streamElement);
                });
            } else {
                streamsContainer.innerHTML = '<p>Нет активных трансляций.</p>';
            }
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
});
