module.exports = {
  testPathIgnorePatterns: ["/node_modules", "/.next"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(scss|css|sas)$": "identity-obj-proxy",
    '@/(.*)': '<rootDir>/src/$1'
  },
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/pages/_app.tsx",
    "!src/pages/_document.tsx",
    "!src/**/styles.ts",
    "!src/styles/**",
  ],
  coverageReporters: ['lcov', 'json']
}