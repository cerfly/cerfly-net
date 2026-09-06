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