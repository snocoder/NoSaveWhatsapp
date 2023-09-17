export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
) {
  let timeoutId: NodeJS.Timeout | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
