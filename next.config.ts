import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		deviceSizes: [640, 750, 828, 1080, 1280],
		imageSizes: [16, 32, 40, 64, 80, 96, 128, 256],
		loader: "custom",
		loaderFile: "./lib/image-loader.ts",
	},
	output: "export",
};

export default nextConfig;
