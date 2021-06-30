module.exports = function (api) {
    api.cache(true);

    const presets = ['babel-preset-expo'];
    const plugins = [
        [
            'inline-dotenv'
        ],
        ["transform-inline-environment-variables", {
            "include": [
                "NODE_ENV"
            ]}
        ]
    ];

    return {
        presets,
        plugins
    };
};
