module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px2rem-exclude": {
      "remUnit": 19.2,
      "exclude": /reset.css|element-ui/
    }
  }
}