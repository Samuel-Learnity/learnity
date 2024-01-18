/// IMPORT NEW IMAGES HERE
export const logoIcon = require("./images/logo.png")
import BackIcon from "./images/arrow_back_ios_new.svg"
import LoupeIcon from "./images/loupe.svg"

const Images = {
    BackIcon,
    LoupeIcon
} as const;

type ImagesType = typeof Images;

export default Images as ImagesType;