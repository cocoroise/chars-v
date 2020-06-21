const isProd = process.env.NODE_ENV === "production";
let p = [];
if (isProd) {
  p = [["transform-remove-console", { exclude: ["error", "warn"] }]];
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ...p,
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }],
    "@babel/plugin-proposal-nullish-coalescing-operator", // 双问号
    "@babel/plugin-proposal-optional-chaining", // 可选链
  ],
};
