interface Link {
  href: string;
  text: string;
  exact?: boolean;
}

const defaultLinks: Link[] = [
  { href: "/library/books", text: "Books" },
  { href: "/library/antibooks", text: "Anti-Library" },
  { href: "/library/films", text: "Films" },
  { href: "/library/lindy", text: "Lindy Library" },
];

export default defaultLinks;
