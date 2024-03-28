declare namespace NodeJS {
  interface ProcessEnv {
    // App
    PORT: number,
    // Database
    DB_PORT: number
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    // Env
    NODE_ENV: string;
  }
}
