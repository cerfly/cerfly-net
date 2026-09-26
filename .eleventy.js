module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css');
    eleventyConfig.addPassthroughCopy('src/js');
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/favicon.svg');
    eleventyConfig.addPassthroughCopy('src/robots.txt');
    eleventyConfig.addPassthroughCopy('src/sitemap.xml');

    eleventyConfig.addFilter('dateEn', (date) =>
        new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
    );

    eleventyConfig.addFilter('dateZh', (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    });

    eleventyConfig.addFilter('dateISO', (date) =>
        new Date(date).toISOString()
    );

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ['njk', 'md'],
        markdownTemplateEngine: 'njk',
    };
};