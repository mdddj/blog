import { nextui } from "@nextui-org/react";
export const content = [
  './src/pages/**/*.tsx',
  './src/components/**/*.tsx',
  './src/layouts/**/*.tsx',
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
];
export const plugins = [
  nextui()
];
