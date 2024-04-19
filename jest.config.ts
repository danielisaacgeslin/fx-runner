import type { Config } from 'jest';

const config: Config = {
  // testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false,
  collectCoverageFrom: [],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  coverageReporters: ['lcov', 'text', 'text-summary'],
  reporters: ['default'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};

export default config;
