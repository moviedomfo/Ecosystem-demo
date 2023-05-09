/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(false);
  let presets = ["@babel/preset-env", "@babel/preset-typescript"];

  let plugins = [
    "@babel/plugin-transform-typescript",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@common": "./src/common",
          "@domain": "./src/domain",
          "@infra": "./src/infra",
          "@services": "./src/services",
          "@application": "./src/application",
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
