const { getDefaultConfig } = require('metro-config');
module.exports = (async () => {
    const defaultConfig = await getDefaultConfig();
    const { assetExts } = defaultConfig.resolver;
    return {
        resolver: {
            // Add bin, obj to assetExts
            assetExts: [...assetExts, 'bin', 'obj'],
        }
    };
})();