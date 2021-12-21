import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    transform: {
        '.ts': 'ts-jest',
    },
    testMatch: ['<rootDir>/tests/**/*.test.[jt]s'],
};

export default config;
