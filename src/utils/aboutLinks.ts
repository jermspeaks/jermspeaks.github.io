interface Link {
  href: string;
  text: string;
  exact?: boolean;
}

const defaultLinks: Link[] = [
  { href: "/about", text: "About Me", exact: true },
  { href: "/about/resume", text: "Resume", exact: false },
  { href: "/about/now", text: "Now", exact: false },
];

export default defaultLinks;
