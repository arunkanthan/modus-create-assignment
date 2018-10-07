const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

const reportersConfigSetup = {
  htmlReportersSetup() {
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './e2e/reports/',
      })
    );
  },
};
module.exports = reportersConfigSetup;
