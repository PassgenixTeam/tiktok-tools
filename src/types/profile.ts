export interface TikTokProfile {
    id: string;
    name: string;
    username: string;
    createdAt: Date;
}

export interface TikTokFunction {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface FunctionConfig {
    [key: string]: string | number | boolean;
}
