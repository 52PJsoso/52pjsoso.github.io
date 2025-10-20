document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('demoVideo');
    const closeButton = document.querySelector('.close-button');
    const featureCards = document.querySelectorAll('.feature-card');

    // Tab 切换
    const tabButtons = document.querySelectorAll('.tab-button');
    const body = document.body;
    // 默认显示无界
    body.classList.add('tab-wujie');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            if (target === 'wujie') {
                body.classList.remove('tab-tlx');
                body.classList.add('tab-wujie');
            } else {
                body.classList.remove('tab-wujie');
                body.classList.add('tab-tlx');
            }
        });
    });

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