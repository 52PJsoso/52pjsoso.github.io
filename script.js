document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('demoVideo');
    const closeButton = document.querySelector('.close-button');
    const featureCards = document.querySelectorAll('.feature-card');

    // 点击功能卡片打开视频
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            video.src = videoSrc;
            modal.style.display = 'block';
            video.play();
        });
    });

    // 点击关闭按钮关闭视频
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        video.pause();
        video.src = '';
    });

    // 点击模态框外部关闭视频
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            video.pause();
            video.src = '';
        }
    });

    // ESC键关闭视频
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            video.pause();
            video.src = '';
        }
    });
}); 