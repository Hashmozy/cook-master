import React from "react";
import { View, Text } from "react-native";

// Define the props interface
interface IndexProps {
  title: string;
}

export default function Index({ title }: IndexProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
