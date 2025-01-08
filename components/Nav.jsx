"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
  },
  // {
  //   name: "services",
  //   path: "/services",
  // },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "projects",
    path: "/projects",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const Nav = () => {
  const pathName = usePathname();
  return (
    <nav className="flex items-center gap-8">
      {links?.map((link, index) => {
        return (
          <Link
            key={index}
            href={link?.path}
            className={`${
              link?.path === pathName && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent translation-all`}
          >
            {link?.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
