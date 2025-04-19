// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:sonarjs/recommended-legacy"],
  ignorePatterns: ["/dist/*"],
  plugins: ["sonarjs"],
};
