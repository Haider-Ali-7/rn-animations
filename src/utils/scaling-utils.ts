import { S_HEIGHT, S_WIDTH } from "./platforms-utils";

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (S_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (S_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export { moderateScale, scale, verticalScale };
