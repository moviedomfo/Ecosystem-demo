/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testTimeout: 60000,
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  modulePaths: ['<rootDir>/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@common(.*)$': '<rootDir>/src/common/$1',
    '^@domain(.*)$': '<rootDir>/src/domain/$1',
    '^@application(.*)$': '<rootDir>/src/application/$1',
    '^@infra(.*)$': '<rootDir>/src/infra/$1',
    '^@/(.*)': '<rootDir>/{.**}/$1',
  },
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ["<rootDir>/src/__test__/jest.setup.ts"]

};