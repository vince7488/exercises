// Prefixes public resources and raw browser links with Vite's mode-specific deployment base.
export function withBasePath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
