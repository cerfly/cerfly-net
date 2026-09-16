// Theme toggle with localStorage persistence
(function () {
    const toggleBtn = document.querySelector('.theme-toggle');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('cerfly-theme', theme);
    }

    function getSavedTheme() {
        const saved = localStorage.getItem('cerfly-theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    applyTheme(getSavedTheme());

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
})();

// Book carousel: one full cover at a time, arrows hide at the ends
(function () {
    const carousels = document.querySelectorAll('.book-carousel');

    carousels.forEach((carousel) => {
        const stage = carousel.querySelector('.book-stage');
        const books = Array.from(stage.querySelectorAll('.now-book'));
        const reviews = document.querySelectorAll('.book-reviews .book-review');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        let index = books.findIndex((b) => b.classList.contains('active'));
        if (index < 0) index = 0;

        function render() {
            books.forEach((book, bi) => {
                const offset = bi - index;
                book.classList.toggle('active', offset === 0);
                book.style.transform = offset === 0
                    ? 'none'
                    : `translateX(${offset < 0 ? '-' : ''}${Math.abs(offset) === 1 ? 110 : 220}%)`;
                book.style.opacity = offset === 0 ? '1' : '0';
            });
            reviews.forEach((review) => {
                review.classList.toggle('active', review.id === 'review-' + books[index].dataset.book);
            });
            updateButtons();
        }

        function updateButtons() {
            if (prevBtn) prevBtn.classList.toggle('hidden', index <= 0);
            if (nextBtn) nextBtn.classList.toggle('hidden', index >= books.length - 1);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (index > 0) { index -= 1; render(); }
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (index < books.length - 1) { index += 1; render(); }
        });

        render();
    });
})();