import { View, Text, StyleSheet, Pressable } from "react-native";

export default function MenteeLandingScreen({ navigation }) {
  return (
    <View style={s.c}>
      <Text style={s.t}>멘티 랜딩</Text>
      {/* 예: 멘토 둘러보기로 이동 */}
      <Pressable
        style={s.btn}
        onPress={() => alert("멘토 둘러보기 화면으로 이동 (추가 예정)")}
      >
        <Text style={s.btnText}>멘토 둘러보기</Text>
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  c: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  t: { fontSize: 22, fontWeight: "bold", marginBottom: 14 },
  btn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
