/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**"],
  setupFilesAfterEnv: ["./testers/jest.js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  transform: {
    "\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
