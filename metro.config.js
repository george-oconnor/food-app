const { withNativeWind } = require('nativewind/metro');
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");
 
const config = getSentryExpoConfig(__dirname);

// Add ttf font support explicitly (keep existing extensions)
config.resolver.assetExts = [...config.resolver.assetExts, 'ttf'];

// Apply NativeWind after adjusting resolver
module.exports = withNativeWind(config, { input: './app/globals.css' });