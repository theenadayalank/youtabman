module.exports = {
  root: true,
  env: {
    node: false,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
   },
   globals: {
    module : true,
    require: false,
    chrome: false,
    browser: false
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "rules": {
    "indent": [
        "error",
        2
    ],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "always"
    ],
    "no-alert": "error",
    eqeqeq: ["error", "always"],
    "no-eval": "error",
    "no-caller": "error",
    "no-undef": "error",
    "no-eq-null": "error",
    'space-unary-ops': ['error', {
      'words': true,
      'nonwords': false
    }]
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  overrides: [
    // node files
    {
      files: [
        'deploy.js',
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
