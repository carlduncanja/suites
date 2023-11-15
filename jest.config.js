module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|rn-sliding-up-panel|react-native-simple-animations|native-base|react-native-svg)",
    ],
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.svg": "<rootDir>/test-utils/__mocks__/svgMock.js",
    },
    setupFilesAfterEnv: ["<rootDir>/test-utils/setup-jest.js"],
};
