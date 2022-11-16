module.exports = function (api) {
    api.cache(true);

    const presets = ["module:metro-react-native-babel-preset"];
    const plugins = [
        [
            'inline-dotenv'
        ],
        ["transform-inline-environment-variables", {
            "include": [
                "NODE_ENV"
            ]}
        ],
        "react-native-reanimated/plugin"
    ];

    return {
        presets,
        plugins
    };
};
