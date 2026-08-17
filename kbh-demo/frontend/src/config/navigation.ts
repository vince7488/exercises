export type NavigationItem =
  | { kind: 'scope'; label: string }
  | { kind: 'route'; label: string; to: string }

// The homepage mirrors the source navigation while keeping unbuilt destinations inside the shared demo dialog.
export const navigation: NavigationItem[] = [
  { kind: 'scope', label: 'Kitchen' },
  { kind: 'scope', label: 'Bath' },
  { kind: 'scope', label: 'The Showroom' },
  { kind: 'scope', label: 'Design' },
  { kind: 'scope', label: 'About Us' },
  { kind: 'route', label: 'Contact Us', to: '/contact-us/' },
]
