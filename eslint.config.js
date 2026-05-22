// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config'); // Import the defineConfig function from the eslint/config module, which is used to define the ESLint configuration for the project. This function allows for better type checking and autocompletion when creating the ESLint configuration object, ensuring that the configuration is valid and follows the expected structure for ESLint configurations. By using defineConfig, developers can take advantage of improved developer experience when setting up and maintaining their ESLint configuration in the project.
const expoConfig = require('eslint-config-expo/flat');  // Import the flat ESLint configuration from the eslint-config-expo package, which provides a set of predefined ESLint rules and settings that are optimized for Expo projects. This configuration includes rules for React, React Native, and general JavaScript best practices, making it a great starting point for ensuring code quality and consistency in an Expo project. By using this configuration as a base, developers can easily customize and extend the ESLint rules to fit the specific needs of their project while still benefiting from the solid foundation provided by the expo-config.

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);
