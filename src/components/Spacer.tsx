import React, { memo } from "react";
import { View } from "react-native";

type SpacerProps = {
  height?: number;
  width?: number;
};

const Spacer: React.FC<SpacerProps> = ({ height, width }) => (
  <View style={{ width: width ? width : 0, height: height ? height : 0 }} />
);

export default memo(Spacer);
