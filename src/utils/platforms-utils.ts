import { Dimensions, Platform } from "react-native";
import * as DeviceInfo from "expo-device";

const W_WIDTH = Dimensions.get("window").width;
const W_HEIGHT = Dimensions.get("window").height;
const S_WIDTH = Dimensions.get("screen").width;
const S_HEIGHT = Dimensions.get("screen").height;

const ios = Platform.OS === "ios";
const isd = ios && W_HEIGHT < 675;
const android = Platform.OS === "android";

const MODEL = DeviceInfo.modelName;
const OS_VERSION = DeviceInfo.osVersion as string;
const OS_VERSION_PARSED = parseFloat(OS_VERSION).toFixed(1);

export { W_WIDTH, W_HEIGHT, S_WIDTH, S_HEIGHT, ios, isd, android, MODEL, OS_VERSION, OS_VERSION_PARSED };
