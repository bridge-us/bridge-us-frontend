// src/screens/ApplyCompleteScreen.js
import React from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";

export default function ApplyCompleteScreen({ navigation, route }) {
  const mentor = route?.params?.mentor;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={s.wrap}>
        <View style={s.iconWrap}>
          <Ionicons name="checkmark-circle" size={64} color={BLUE} />
        </View>

        <Text style={s.title}>신청이 완료되었습니다</Text>
        {mentor?.name ? (
          <Text style={s.sub}>
            {mentor.name} 멘토에게 신청 내역이 전달되었어요.
          </Text>
        ) : (
          <Text style={s.sub}>멘토에게 신청 내역이 전달되었어요.</Text>
        )}

        <View style={s.buttons}>
          <Pressable
            style={[s.btn, s.gray]}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={[s.btnText, { color: "#111" }]}>홈으로</Text>
          </Pressable>
          <Pressable
            style={[s.btn, s.blue]}
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={[s.btnText, { color: "#fff" }]}>채팅으로</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
    textAlign: "center",
  },
  sub: { color: "#6B7280", textAlign: "center" },
  buttons: { flexDirection: "row", gap: 10, marginTop: 22 },
  btn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  gray: { backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB" },
  blue: { backgroundColor: BLUE },
  btnText: { fontWeight: "800", fontSize: 16 },
});
