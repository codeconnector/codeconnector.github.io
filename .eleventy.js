module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        public: '.'
    });
    eleventyConfig.setTemplateFormats(['njk', 'html']);

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};
