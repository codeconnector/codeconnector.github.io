module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("content");
    eleventyConfig.setTemplateFormats([
      "njk",
      "html"
    ]);
  };
