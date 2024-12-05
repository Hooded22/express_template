module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
  setupFiles: ["dotenv/config"],
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // Specify files to collect coverage from
    "!src/**/*.d.ts", // Exclude declaration files
  ],
  coverageDirectory: "coverage", // Specify output directory for coverage
  coverageReporters: ["json", "lcov", "text", "clover"], // Choose your desired reporters
};
