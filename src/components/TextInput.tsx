import React from "react";
import { commonColors } from "@/utils/theme";
import { moderateScale, verticalScale } from "@/utils/scaling-utils";
import { StyleSheet, TextInput as RNTextInput, TextInputProps } from "react-native";

interface RNTextInputProps extends TextInputProps {
  inputRef?: React.RefObject<RNTextInput>;
}

const TextInput: React.FC<RNTextInputProps> = ({
  inputRef,
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  autoFocus,
  ...props
}) => {
  return (
    <RNTextInput
      style={{
        width: "90%",
        height: verticalScale(40),
        backgroundColor: commonColors.gray700,
        borderRadius: moderateScale(4)
      }}
      ref={inputRef}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
      autoFocus={autoFocus}
      {...props}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({});
