/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
  verbose: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/mocks/fileMock.ts",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/test/mocks/styleMock.ts",
    "(assets|models|services)": "<rootDir>/test/mocks/fileMock.ts",
  },
  testMatch: ["<rootDir>/test/**/*.test.ts", "<rootDir>/test/**/*.test.tsx"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["node_modules", "src/database", "src/test", "src/types"],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  reporters: ["default", "jest-junit"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
};

export default config;
