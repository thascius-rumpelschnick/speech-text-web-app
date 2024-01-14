import type { StorybookConfig } from "@storybook/react-webpack5";
import * as path from "path";

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
        "../tsx/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/preset-scss",
        "@storybook/addon-mdx-gfm",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            path.resolve(__dirname, "./../tsx"),
            path.resolve(__dirname, "./../scss"),
        ];

        return config;
    },
};
export default config;
