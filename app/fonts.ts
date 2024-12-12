import localFont from "next/font/local"

export const poppins = localFont({
  src: [
    {
      path: "../public/font/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/Poppins-Bold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
})
