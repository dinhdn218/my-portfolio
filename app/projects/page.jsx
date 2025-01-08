"use client";

import React, { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProjectSliderBtns from "@/components/ProjectSliderBtns";

const projects = [
  {
    num: "01",
    category: "frontend",
    title: "Yoom App",
    description:
      "The Video Conference application aims to provide an efficient and flexible communication platform, enabling users to connect from anywhere in the world through video, audio, and messaging.",
    href: "",
    stack: [
      {
        name: "NextJS",
      },
      {
        name: "TypeScript",
      },
      {
        name: "Tailwind",
      },
      {
        name: "Radix UI",
      },
      {
        name: "Stream React",
      },
      {
        name: "Clerk React",
      },
    ],
    image: "/assets/project/yoom-thumb.png",
    live: "https://yoom-conferencing.vercel.app/",
    github: "https://github.com/dinhdn218/Yoom",
  },
  {
    num: "02",
    category: "fullstack",
    title: "Learning Management",
    description: "Keep track of what you are learning.",
    href: "",
    stack: [
      {
        name: "ReactJS",
      },
      {
        name: "NodeJS",
      },
      {
        name: "ExpressJS",
      },
      {
        name: "React Bootstrap",
      },
      {
        name: "MongoDB",
      },
    ],
    image: "/assets/project/learnit-thumb.png",
    live: "",
    github: "https://github.com/dinhdn218/mern-app",
  },
  {
    num: "03",
    category: "frontend",
    title: "PSD2HTML",
    description:
      "Converting a PSD (Photoshop) file to an HTML file is the process of transforming a graphic design into HTML and CSS code for rendering in a web browser.",
    href: "",
    stack: [
      {
        name: "HTML",
      },
      {
        name: "CSS",
      },
      {
        name: "JavaScript",
      },
    ],
    image: "/assets/project/psd2html-thumb.png",
    live: "https://psd-2-html.vercel.app/",
    github: "https://github.com/dinhdn218/PSD2HTML",
  },
  {
    num: "04",
    category: "frontend",
    title: "MP3 Player",
    description:
      "The MP3 Player application is software that allows users to play and manage MP3 audio files. It offers basic features such as creating playlists, adjusting volume, skipping tracks, shuffle playback, and repeat mode. The interface is typically user-friendly and easy to navigate, making it suitable for all types of users.",
    href: "",
    stack: [
      {
        name: "HTML",
      },
      {
        name: "CSS",
      },
      {
        name: "JavaScript",
      },
    ],
    image: "/assets/project/mp3player-thumb.png",
    live: "https://mp-3-player.vercel.app/",
    github: "https://github.com/dinhdn218/MP3-Player",
  },
];

const Projects = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.4,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row xl:gap-[30px]">
            <div className="w-full xl:w-[50%] xl:h-[460px flex flex-col xl:justify-between order-2 xl:order-none">
              <div className="flex flex-col gap-[30px] h-[50%]">
                <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                  {project?.num}
                </div>
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                  {project.title}
                </h2>
                <p className="text-white/60">{project.description}</p>
                <ul className="flex gap-4 flex-wrap">
                  {project.stack.map((item, index) => {
                    return (
                      <li key={index} className="text-xl text-accent">
                        {item.name}
                        {index !== project.stack.length - 1 && ","}
                      </li>
                    );
                  })}
                </ul>
                <div className="border border-white/20"></div>
                <div className="flex items-center gap-4">
                  <Link href={project.live} target="_blank">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>live project</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                  <Link href={project.github} target="_blank">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsGithub className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>Github repository</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-[50%]">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                className="xl:h-[520px] mb-12"
                onSlideChange={handleSlideChange}
              >
                {projects.map((item, index) => {
                  return (
                    <SwiperSlide key={index} className="w-full">
                      <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                        {/* overlay */}
                        <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                        {/* image */}
                        <div className="relative w-full h-full">
                          <Image
                            src={project.image}
                            quality={100}
                            fill
                            className="object-cover"
                            alt=""
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                {/* slider buttons */}
                <ProjectSliderBtns
                  containerStyles={
                    "flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                  }
                  btnStyles={
                    "bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
                  }
                />
              </Swiper>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
