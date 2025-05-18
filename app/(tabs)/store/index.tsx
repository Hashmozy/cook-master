import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const barData = [
  { value: 250, label: "M", frontColor: "#9ca3af" },
  { value: 500, label: "T", frontColor: "#33230d" },
  { value: 745, label: "W", frontColor: "#33230d" },
  { value: 320, label: "T", frontColor: "#9ca3af" },
  { value: 600, label: "F", frontColor: "#33230d" },
  { value: 256, label: "S", frontColor: "#9ca3af" },
  { value: 300, label: "S", frontColor: "#9ca3af" },
];

export default function Index() {
  return (
    <View className="flex-1 bg-[#ab690c] justify-center items-center p-4">
      <Text className="text-gray-300 text-2xl font-bold mb-4">
        Monthly Sales
      </Text>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        color={"#177AD5"}
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: "#d1d5db" }}
        yAxisTextStyle={{ color: "#d1d5db" }}
      />
    </View>
  );
}
