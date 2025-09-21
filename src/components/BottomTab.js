import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";

export default function BottomTab({ navigation, active }) {
  return (
    <View style={s.tabbar}>
      <Pressable onPress={() => navigation.navigate("Main")} hitSlop={10}>
        <Ionicons
          name="home-outline"
          size={22}
          color={active === "home" ? BLUE : "#9CA3AF"}
        />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Chat")} hitSlop={10}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={22}
          color={active === "chat" ? BLUE : "#9CA3AF"}
        />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Board")} hitSlop={10}>
        <Ionicons
          name="newspaper-outline"
          size={22}
          color={active === "board" ? BLUE : "#9CA3AF"}
        />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("MyPage")} hitSlop={10}>
        <Ionicons
          name="person-circle-outline"
          size={24}
          color={active === "mypage" ? BLUE : "#9CA3AF"}
        />
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  tabbar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
