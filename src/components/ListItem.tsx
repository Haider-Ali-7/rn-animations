import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { moderateScale } from "@/utils/scaling-utils";
import Text from "./Text";
import Divider from "./Divider";

interface ListItemProps {
  item?: any;
  onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onPress }) => {
  const { theme } = useUnistyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Text font="p14" weight="InterMedium" textStyle={styles.title}>
          {item?.title}
        </Text>
        <Entypo name="chevron-right" size={moderateScale(18)} color={theme.colors.btn} />
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create(theme => ({
  row: {
    marginHorizontal: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "left",
    textTransform: "uppercase",
    color: theme.colors.text,
  },
}));
