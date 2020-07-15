module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px2rem-exclude": {
      "remUnit": 16,
      "exclude": /reset.css|element-ui/
    }
  }
}