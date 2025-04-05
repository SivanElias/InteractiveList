export type ValidationFunction =
  | ((value: string) => Promise<boolean>) // async function support
  | ((value: string) => boolean) // sync function support
  | RegExp; // regex support

export function isPromise(obj: any) {
  return obj instanceof Object && typeof obj.then === "function";
}
