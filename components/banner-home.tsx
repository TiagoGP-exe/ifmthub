"use client"

import Image from 'next/image'

export const BannerHome = () => {
  return (
    <div className="relative w-full ">
      <Image
        src="/images/banner-mobile.png"
        quality={100}
        width={1280}
        height={832}
        alt="banner desktop"
        className="relative z-10  h-auto w-full pl-10 sm:hidden sm:w-auto"
      />

      <Image
        src="/images/banner.png"
        quality={100}
        width={1280}
        height={832}
        alt="banner desktop"
        className="relative z-10 hidden h-auto w-full px-10 sm:block sm:w-auto"
      />

      <div className="absolute left-0 top-0 h-full  w-full blur-3xl ">
        <div className="clip-trapezoid h-full w-full dark:bg-primary "></div>
      </div>
    </div>
  )
}