const ts = require('ts-node');
const reportersSetup = require('./reporters-setup');

exports.config = {
  allScriptsTimeout: 30000,
  specs: ['test-suite/test-spec.ts'],
  capabilities: {
    browserName: 'chrome',
  },
  directConnect: true,
  framework: 'jasmine',
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    includeStackTrace: true,
  },
  onPrepare() {
    ts.register({
      project: 'e2e/tsconfig.e2e.json',
    });
    reportersSetup.htmlReportersSetup();
  },
  baseUrl: 'http://localhost:3000',
};
