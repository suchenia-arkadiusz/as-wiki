require("dotenv").config();

process.env["DB_NAME"] = "aswiki_test";

const config = {
  verbose: true,
  testMatch: ["<rootDir>/test/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/migrations/"],
  coverageDirectory: "./coverage/",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/migrations/"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  coverageReporters: ["json", "text", "clover", "html"],
  reporters: ["default", "jest-junit"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  moduleFileExtensions: ["js"],
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};

module.exports = config;
