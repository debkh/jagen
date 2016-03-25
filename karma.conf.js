// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'client/bower_components/angular-lodash/angular-lodash.js',
      'client/bower_components/ng-lodash/build/ng-lodash.js',
      'client/bower_components/angular-acl/angular-acl.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/angular-material/angular-material.js',
      'client/bower_components/angular-material-data-table/dist/md-data-table.js',
      'client/bower_components/rangy/rangy-core.js',
      'client/bower_components/rangy/rangy-classapplier.js',
      'client/bower_components/rangy/rangy-highlighter.js',
      'client/bower_components/rangy/rangy-selectionsaverestore.js',
      'client/bower_components/rangy/rangy-serializer.js',
      'client/bower_components/rangy/rangy-textrange.js',
      'client/bower_components/textAngular/dist/textAngular.js',
      'client/bower_components/textAngular/dist/textAngular-sanitize.js',
      'client/bower_components/textAngular/dist/textAngularSetup.js',
      'client/bower_components/angular-file-upload/dist/angular-file-upload.min.js',
      'client/bower_components/ng-file-upload/ng-file-upload.js',
      'client/bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.js',
      'client/bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.min.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'client/app/app.js',
      'client/{app,components}/**/*.module.js',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'client/{app,components}/**/*.js': 'babel'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
