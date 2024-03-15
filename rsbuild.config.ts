import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Todo App',
    appIcon: './public/favicon.ico',
    meta: {
      description: 'Todo application',
    },
  },
  output: {
    assetPrefix: 'https://mikhailsulim.github.io/test_chatapp/',
    distPath: {
      root: 'build',
      js: 'static',
      css: 'static',
      image: 'static',
    },
  },
});
