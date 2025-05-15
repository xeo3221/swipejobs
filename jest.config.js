module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|react-navigation|@react-navigation/.*|@expo/.*|expo|expo-.*|@unimodules/.*|unimodules|native-base|react-native-svg)",
  ],
};
