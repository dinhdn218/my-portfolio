export const profile = {
  name: "Đinh Ngọc Định",
  nameLines: ["Đinh Ngọc", "Định"] as const,
  shortName: "Định",
  role: "Fullstack Developer",
  roleNote: "frontend-first · React · Next.js · TypeScript",
  location: "Hà Nội, Việt Nam",
  /** First professional role (MISA internship). Used to compute years of experience. */
  careerStart: "2021-06-01",
  email: "dinhdn218@gmail.com",
  phone: "0394466363",
  phoneDisplay: "0394 466 363",
  links: {
    github: "https://github.com/dinhdn218",
    linkedin: "https://www.linkedin.com/in/dinhdn218/",
    facebook: "https://facebook.com/dinhdn218",
  },
  /** Put an exported CV at public/cv.pdf and set this to "/cv.pdf" to show a download button. */
  cvPath: "/cv.pdf" as string | null,
  company: {
    name: "NetSpace",
    legalName: "Công ty CP Công nghệ & Truyền thông Không gian số",
    since: "Apr 2025",
  },
};

export function yearsOfExperience(now = new Date()): number {
  const start = new Date(profile.careerStart);
  return Math.floor((now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000));
}
