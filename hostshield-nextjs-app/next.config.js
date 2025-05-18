const path = require("path");
module.exports = {
  distDir: "build",
  trailingSlash: false,
  images: {
    domains: ["images.unsplash.com","www.facebook.com"],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
