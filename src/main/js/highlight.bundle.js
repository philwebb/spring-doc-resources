;(function () {
  'use strict'
  const hljs = require('highlight.js/lib/core');
  hljs.registerLanguage('asciidoc', require('highlight.js/lib/languages/asciidoc'));
  hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
  hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
  hljs.registerLanguage('diff', require('highlight.js/lib/languages/diff'));
  hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'));
  hljs.registerLanguage('gradle', require('highlight.js/lib/languages/gradle'));
  hljs.registerLanguage('groovy', require('highlight.js/lib/languages/groovy'));
  hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
  hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
  hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
  hljs.registerLanguage('kotlin', require('highlight.js/lib/languages/kotlin'));
  hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
  hljs.registerLanguage('nix', require('highlight.js/lib/languages/nix'));
  hljs.registerLanguage('properties', require('highlight.js/lib/languages/properties'));
  hljs.registerLanguage('scala', require('highlight.js/lib/languages/scala'));
  hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
  hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
  hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
  hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));
  [].slice.call(document.querySelectorAll('pre code.hljs')).forEach(function (node) {
    hljs.highlightBlock(node)
  })
})()
