import { BiSolidFactory } from "react-icons/bi"
import { FaAngular } from "react-icons/fa"
import { FaPython } from "react-icons/fa"
import { FaMapMarkedAlt } from "react-icons/fa"
import { GiPolarBear } from "react-icons/gi"
import { HiOutlineLightBulb } from "react-icons/hi"
import { IoLogoJavascript } from "react-icons/io"
import { IoLanguage } from "react-icons/io5"
import { IconType } from "react-icons/lib"
import { MdModelTraining } from "react-icons/md"
import { MdOutlineSecurity } from "react-icons/md"

export const iconMap: Record<string, IconType> = {
  studies: HiOutlineLightBulb,
  js: IoLogoJavascript,
  bear: GiPolarBear,
  language: IoLanguage,
  angular: FaAngular,
  python: FaPython,
  ai: MdModelTraining,
  map: FaMapMarkedAlt,
  security: MdOutlineSecurity,
  production: BiSolidFactory,
}
