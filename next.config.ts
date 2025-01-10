import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web", // Alias for react-native to react-native-web
      ...(isServer
        ? {} // Avoid server-side alias conflicts
        : {
            // Add additional Webpack aliases for client-side (optional)
            "react-native-svg": "react-native-web/dist/modules/ReactNativeSVG",
            "react-native-web": "react-native-web",
          }),
    };

    return config;
  },
  /* other config options here */
};

export default nextConfig;
