module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@constants": "./src/constants",
          "@screens": "./src/screens",
          "@components": "./src/components",
          "@hooks": "./src/hooks",
          "@store": "./src/store",
          "@api": "./src/api",
          "@theme": "./src/theme",
          "@utils": "./src/utils",
          "@types": "./src/types",
        },
      },
    ],
  ],
};
