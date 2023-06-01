interface Link {
  href: string;
  text: string;
  exact?: boolean;
}

const defaultLinks: Link[] = [
  {
    href: "/blog",
    text: "All",
    exact: true,
  },
  {
    href: "/blog/newsletter",
    text: "Newsletter",
    exact: false,
  },
  {
    href: "/blog/essay",
    text: "Essay",
    exact: false,
  },
  {
    href: "/blog/learning",
    text: "Learning",
    exact: false,
  },
  {
    href: "/blog/archive",
    text: "Archive",
    exact: false,
  },
];

export default defaultLinks;
