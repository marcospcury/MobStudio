module.exports = function(config) {
  config.set({
    basePath: "./",
    files: [
      "../front/public/assets/js/deps.min.js",
      "../test/app/app.test.js",
      "../node_modules/bardjs/bard.js",
      "../node_modules/angular-mocks/angular-mocks.js",
      "../test/test-helpers/*.js",
      "../test/controllers/*.js"
    ],
    browsers: ["PhantomJS"],
    reporters: ["mocha", "coverage"],
    coverage: {
      dir: "./report/coverage",
      reporters: [
        { type: "html", subdir: "report-html" },
        { type: "lcov", subdir: "report-lcov" },
        { type: "text" }
      ]
    },
    frameworks: ["mocha", "chai", "sinon", "chai-sinon"],
    logLevel: config.LOG_INFO,
    preprocessors: {
      '../test/app/app.test.js': ['coverage']
    }
  });
};
