export interface Chat {
    type: 'system' | 'text';
    message: string;
    participant: number;
    name: string;
}