module.exports = {
  root: true,
  parserOptions: {
   ecmaVersion: 8,
   sourceType: 'module'
  },
  "env": {
    "browser": true,
    "node": false
  },
  "extends": "eslint:recommended",
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
  overrides: [
    // node files
    {
      files: [
        'gulpfile.js',
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
