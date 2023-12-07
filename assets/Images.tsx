/// IMPORT NEW IMAGES HERE
export const logoIcon = require("./images/logo.png")
import BackIcon from "./images/arrow_back_ios_new.svg"

const Images = {
    BackIcon,
} as const;

type ImagesType = typeof Images;

export default Images as ImagesType;