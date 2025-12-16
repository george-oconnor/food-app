const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);

// Add ttf font support explicitly (keep existing extensions)
config.resolver.assetExts = [...config.resolver.assetExts, 'ttf'];

// Apply NativeWind after adjusting resolver
module.exports = withNativeWind(config, { input: './app/globals.css' });