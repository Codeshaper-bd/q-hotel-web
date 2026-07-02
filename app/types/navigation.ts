export interface NavLink {
  label: string
  href: string
}

export interface NavMegaMenuColumn {
  title: string
  items: NavLink[]
}

export type NavSocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube'

export interface NavMegaSocial {
  platform: NavSocialPlatform
  href: string
  ariaLabel: string
}

export interface NavMegaMenuContact {
  address: string[]
  phones: { label: string; value: string }[]
  emails: string[]
  social: NavMegaSocial[]
}

export interface NavMegaMenuData {
  columns: NavMegaMenuColumn[]
  contact?: NavMegaMenuContact
  imageSrc?: string
  imageAlt?: string
}

export interface NavItemData {
  id: string
  label: string
  href: string
  badge?: string
  dropdown?: NavLink[]
  megaMenu?: NavMegaMenuData
}
