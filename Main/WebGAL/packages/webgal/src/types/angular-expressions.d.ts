declare module 'angular-expressions' {
  export function compile(src: string, lexerOptions?: any): () => number | boolean;
}
