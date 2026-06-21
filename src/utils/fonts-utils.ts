import { moderateScale } from "./scaling-utils";

export const fontFamily = {
  InterBlack: "Inter-Black",
  InterBold: "Inter-Bold",
  InterExtraBold: "Inter-ExtraBold",
  InterExtraLight: "Inter-ExtraLight",
  InterLight: "Inter-Light",
  InterMedium: "Inter-Medium",
  InterRegular: "Inter-Regular",
  InterSemiBold: "Inter-SemiBold",
  InterThin: "Inter-Thin",
  RobotoBlack: "Roboto-Black",
  RobotoBlackItalic: "Roboto-BlackItalic",
  RobotoBold: "Roboto-Bold",
  RobotoBoldItalic: "Roboto-BoldItalic",
  RobotoItalic: "Roboto-Italic",
  RobotoLight: "Roboto-Light",
  RobotoLightItalic: "Roboto-LightItalic",
  RobotoMedium: "Roboto-Medium",
  RobotoMediumItalic: "Roboto-MediumItalic",
  RobotoRegular: "Roboto-Regular",
  RobotoThin: "Roboto-Thin",
  RobotoThinItalic: "Roboto-ThinItalic"
};

export type FontWeight = keyof typeof fontFamily;
export type FontProps =
  | "h32"
  | "h30"
  | "h28"
  | "h26"
  | "h24"
  | "h22"
  | "h20"
  | "p18"
  | "p16"
  | "p15"
  | "p14"
  | "p13"
  | "p12"
  | "p10"
  | "p8";

type FontFunction = (weight?: FontWeight) => { fontSize: number; fontFamily: string };

type FontsType = Record<FontProps, FontFunction>;

const fonts: FontsType = {
  h32: (weight = "InterRegular") => ({ fontSize: moderateScale(32), fontFamily: fontFamily[weight] }),
  h30: (weight = "InterRegular") => ({ fontSize: moderateScale(30), fontFamily: fontFamily[weight] }),
  h28: (weight = "InterRegular") => ({ fontSize: moderateScale(28), fontFamily: fontFamily[weight] }),
  h26: (weight = "InterRegular") => ({ fontSize: moderateScale(26), fontFamily: fontFamily[weight] }),
  h24: (weight = "InterRegular") => ({ fontSize: moderateScale(24), fontFamily: fontFamily[weight] }),
  h22: (weight = "InterRegular") => ({ fontSize: moderateScale(22), fontFamily: fontFamily[weight] }),
  h20: (weight = "InterRegular") => ({ fontSize: moderateScale(20), fontFamily: fontFamily[weight] }),
  p18: (weight = "InterRegular") => ({ fontSize: moderateScale(18), fontFamily: fontFamily[weight] }),
  p16: (weight = "InterRegular") => ({ fontSize: moderateScale(16), fontFamily: fontFamily[weight] }),
  p15: (weight = "InterRegular") => ({ fontSize: moderateScale(15), fontFamily: fontFamily[weight] }),
  p14: (weight = "InterRegular") => ({ fontSize: moderateScale(14), fontFamily: fontFamily[weight] }),
  p13: (weight = "InterRegular") => ({ fontSize: moderateScale(13), fontFamily: fontFamily[weight] }),
  p12: (weight = "InterRegular") => ({ fontSize: moderateScale(12), fontFamily: fontFamily[weight] }),
  p10: (weight = "InterRegular") => ({ fontSize: moderateScale(10), fontFamily: fontFamily[weight] }),
  p8: (weight = "InterRegular") => ({ fontSize: moderateScale(8), fontFamily: fontFamily[weight] })
};

export default fonts;

// export const fontProps = Object.keys(fonts).map(font => font);
