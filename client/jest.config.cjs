module.exports = {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".jsx"],

  transformIgnorePatterns: [
    "/node_modules/"
  ],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], 

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/fileMock.js"
  }
};



