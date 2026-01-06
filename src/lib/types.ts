export interface NavLink {
  title: string;
  href: string;
  description: string;
  hidden?: boolean;     // Hidden in navigation
}

export interface ServiceEntry {
  title: string;
  href: string;
  description: string;
  internal?: boolean;   // Hidden in sitemap
  hidden?: boolean;     // Hidden in navigation
}
