import type { Config } from "jest";

const config: Config = {
    coverageProvider: "v8",
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/(unit|integration)/**/*.test.[jt]s"],
    setupFilesAfterEnv: ["./src/__tests__/utils/reflectMetadata.ts"],
};

export default config;
