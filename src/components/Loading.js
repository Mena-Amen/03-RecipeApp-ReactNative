import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = (props) => {
  return (
    <View className="flex flex-1 justify-center items-center">
      <ActivityIndicator {...props} color="#ffc107" />
    </View>
  );
};

export default Loading;
