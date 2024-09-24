/** JSON.parse that returns a fallback when it fails */
export const safeParse = <T>(item: any, fallback?: any): T => {
  try {
    return JSON.parse(item);
  } catch {
    return fallback !== undefined ? fallback : item;
  }
};
