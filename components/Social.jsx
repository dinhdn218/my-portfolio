import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn, FaFacebookSquare } from "react-icons/fa";

const socials = [
  {
    icon: <FaGithub />,
    path: "https://github.com/dinhdn218",
  },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/dinhdn218/",
  },
  {
    icon: <FaFacebookSquare />,
    path: "https://facebook.com/dinhdn218",
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials?.map((social, index) => {
        return (
          <Link
            target="_blank"
            key={index}
            href={social.path}
            className={iconStyles}
          >
            {social.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
