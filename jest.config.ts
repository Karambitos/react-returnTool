import type { Config } from '@jest/types';
import * as path from 'path';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  setupFiles: [
    '<rootDir>/src/setupTests.tsx',
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest', // Use babel-jest for TypeScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Transform axios and other ES modules in node_modules
  ],
  collectCoverage: true,
  testMatch: ['**/?*.test.ts', '**/?*.test.tsx'],
  coverageReporters: ['text', 'html', 'html-spa', 'lcov'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      statements: 25,
      branches: 10,
      lines: 25,
      functions: 20,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/src/config.ts',
    '/src/ironman-integration/',
  ],
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
};

export default config;
