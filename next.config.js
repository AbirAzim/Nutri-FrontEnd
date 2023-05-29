module.exports = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  trailingSlash: true,
  staticPageGenerationTimeout: 1500,
  images: {
    domains: [
      "source.unsplash.com",
      "./theme/wiki/WikiCenter/Assets/cardiogram.svg",
      "blending.s3.us-east-1.amazonaws.com",
      "j88wgcjqa6.execute-api.us-east-1.amazonaws.com",
      "www.fivehearthome.com",
      "www.inspiredtaste.net",
      "imagesvc.meredithcorp.io",
      "blending101.com",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
