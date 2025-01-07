import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1 mb-6">
              Hello I&apos;m <br />{" "}
              <span className="text-accent">Dinh Ngoc Dinh</span>
            </h1>
            <p className="max-w-[500px] mb-6 text-white/80">
              I am a Frontend Developer with over 3 years of experience,
              specializing in building and optimizing user interfaces (UI) for
              web applications. I am proficient in technologies such as HTML,
              CSS, JavaScript, and modern frameworks like React and Vue.js.
            </p>
            <p className="max-w-[500px] mb-6 text-white/80">
              Additionally, I am skilled in version control tools like Git. I
              have a strong passion for improving user experience (UX) and
              constantly strive to optimize website performance for efficiency
              and responsiveness. With a problem-solving mindset and the ability
              to work both independently and as part of a team, I am eager to
              contribute to the development of high-quality web projects while
              continuously expanding my knowledge and skills in frontend
              development.
            </p>
            {/* btn and socials */}

            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <Link
                  href={"/assets/cv-dinhngocdinh.pdf"}
                  download={"cv-dinhngocdinh.pdf"}
                  target="_blank"
                >
                  Download CV
                </Link>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}
