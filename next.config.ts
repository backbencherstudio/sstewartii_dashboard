// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['dev.sstewartii.com', 'i.pravatar.cc', 'randomuser.me'],
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.sstewartii.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "affirmable-uncongruously-kensley.ngrok-free.dev",
      },

      // {
      //   protocol: "https",
      //   hostname: "affirmable-uncongruously-kensley.ngrok-free.dev",
      // },


    ],
  },
};

export default nextConfig;