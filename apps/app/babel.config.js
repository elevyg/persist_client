module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "module:metro-react-native-babel-preset",
        { useTransformReactJSXExperimental: true },
      ],
      ["babel-preset-expo"],
    ],
    plugins: [
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
        },
      ],
      [
        "transform-inline-environment-variables",
        {
          include: ["APP_ENV"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
