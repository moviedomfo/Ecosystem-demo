/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(false);
  let presets = ["@babel/preset-env", "@babel/preset-typescript"];

  let plugins = [
    "@babel/plugin-transform-typescript",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { legacy: true }],
    //  ["@babel/plugin-syntax-decorators", {legacy: false}],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@common": "./src/common",
          "@infra": "./src/infra",
          "@domain": "./src/domain",
          "@services": "./src/services",
          "@application": "./src/application",
        },
      },
    ],
  ];


  return {
    presets,
    plugins,
    sourceMaps: "inline",
    retainLines: true,
    ignore: [
      "src/**/*.test.js",
      "src/__test__",
      "**/__test__",
      "**/*.test.js"
    ]
  };

};
