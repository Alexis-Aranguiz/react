module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      "node_modules/bootstrap/dist/js/bootstrap.bundle.js",

      // helpers de lógica (exponen funciones globales)
      "test-bundle/**/*.js",

      // TODOS los tests jasmine
      "karma-tests/**/*.spec.js"
    ],

    reporters: ["progress", "kjhtml"],
    browsers: ["ChromeHeadless"],

    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-jasmine-html-reporter"
    ],

    jasmineHtmlReporter: {
      suppressAll: true,
    },

    singleRun: true,
  });
};
