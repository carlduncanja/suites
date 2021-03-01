module.exports = function (api) {
    api.cache(true);

    const presets = ['babel-preset-expo'];
    const plugins = [
        [
            'inline-dotenv'
        ]
    ];

    return {
        presets,
        plugins
    };
};
