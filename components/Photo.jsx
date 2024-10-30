"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative">
      {/* image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2.4,
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        >
          <Image
            src={"/assets/photo5.jpg"}
            priority
            quality={100}
            fill
            alt=""
            className="object-contain rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </motion.div>

      {/* circle */}
      <motion.svg
        className="w-[306px] xl:w-[516px] h-[306px] xl:h-[516px]"
        fill="transparent"
        viewBox={"0 0 506 506"}
        xmlns={"http://w3.org/2000/svg"}
      >
        <motion.circle
          cx={"253"}
          cy={"253"}
          r={"250"}
          stroke="#00ff99"
          strokeWidth={4}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          initial={{ strokeDasharray: "24 10 0 0", opacity: 0 }}
          animate={{
            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
            rotate: [120, 360],
            opacity: 1,
          }}
          transition={{
            duration: 20,
            rotate: { duration: 20, repeat: Infinity, repeatType: "reverse" },
            opacity: { duration: 0.4, delay: 2 },
          }}
        />
        <motion.circle />
      </motion.svg>
    </div>
  );
};

export default Photo;
