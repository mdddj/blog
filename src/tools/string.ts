
export function removeMdExtension(name: string): string {
  if (name.endsWith('.md')) {
    return name.slice(0, -3);
  }
  return name;
}
