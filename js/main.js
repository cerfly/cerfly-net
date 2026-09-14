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

// Reading carousel: click a cover to show its review, no layout shift
(function () {
    const tracks = document.querySelectorAll('.book-track');

    tracks.forEach((track) => {
        const books = track.querySelectorAll('.now-book');
        const reviews = document.querySelectorAll('.book-reviews .book-review');
        const prevBtn = track.parentElement.querySelector('.carousel-btn.prev');
        const nextBtn = track.parentElement.querySelector('.carousel-btn.next');

        function updateButtons() {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (prevBtn) prevBtn.disabled = track.scrollLeft <= 0;
            if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
        }

        function scrollByBook(dir) {
            const book = books[0];
            const step = book ? book.offsetWidth + 20 : 140;
            track.scrollBy({ left: dir * step, behavior: 'smooth' });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => scrollByBook(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollByBook(1));

        track.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);
        updateButtons();

        books.forEach((book) => {
            book.addEventListener('click', () => {
                books.forEach((b) => b.classList.remove('active'));
                book.classList.add('active');
                const id = 'review-' + book.dataset.book;
                reviews.forEach((review) => {
                    review.classList.toggle('active', review.id === id);
                });
            });
        });
    });
})();