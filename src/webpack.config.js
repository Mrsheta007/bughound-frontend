module.exports = {
  // ... other webpack configuration options ...
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      net: require.resolve("net-browserify"),
      tls: require.resolve("tls-browserify"),
      stream: require.resolve("stream-browserify"),
      timers: require.resolve("timers-browserify"),
      fs: false, // if you don't need to use the fs module
    },
  },
};
