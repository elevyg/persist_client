const modulesToTranspile = ["@bliks/server"];

module.exports = {
  transpilePackages: modulesToTranspile,
  experimental: {
    forceSwcTransforms: true,
  },
  async redirects() {
    return [
      {
        source: "/ar/:slug*",
        destination: "/en/:slug*",
        permanent: true,
      },
      {
        source: "/es/:slug*",
        destination: "/en/:slug*",
        permanent: true,
      },
      {
        source: "/fr/:slug*",
        destination: "/en/:slug*",
        permanent: true,
      },
    ];
  },
};
