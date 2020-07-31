export interface IEncriptService {
    encript(text: string): Promise<string>;
}