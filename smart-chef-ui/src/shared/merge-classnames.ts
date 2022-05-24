export function classNames(...args: (string | undefined | null)[]): string {
  return args.filter(Boolean).join(" ");
}
