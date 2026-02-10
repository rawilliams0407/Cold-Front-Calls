const path = require("path");
const luxon = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
    // Passthrough copy for assets (excluding CSS which is handled by Tailwind)
    // We copy subdirectories individually to avoid the css folder
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/products");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/hero-slideshow");
    eleventyConfig.addPassthroughCopy("src/assets/categories");
    // Also copy files in the root of assets
    eleventyConfig.addPassthroughCopy("src/assets/*.{png,jpg,jpeg,gif,svg,txt,xml}");
    eleventyConfig.addPassthroughCopy("admin");

    eleventyConfig.addFilter("limit", (array, limit) => {
        return array.slice(0, limit);
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
        return luxon.DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
    });

    // Collections
    eleventyConfig.addCollection("products", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/products/*.md");
    });

    // Customize Markdown library
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.ariaHidden({
            placement: "after",
            class: "direct-link",
            symbol: "#",
        }),
        level: [1, 2, 3, 4],
        slugify: (s) => s.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[-\s]+/g, '-')
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
    };
};
