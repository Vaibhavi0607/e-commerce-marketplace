declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGOURL: string
            NODE_ENV: 'development' | 'production';
        }
    }
}

export {};