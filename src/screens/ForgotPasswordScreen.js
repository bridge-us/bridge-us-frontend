import { View, Text, StyleSheet } from "react-native";
export default function ForgotPasswordScreen() {
  return (
    <View style={s.c}>
      <Text style={s.t}>비밀번호 찾기</Text>
      {/* 이메일 입력 → 재설정 링크 발송(모킹) */}
    </View>
  );
}
const s = StyleSheet.create({
  c: { flex: 1, justifyContent: "center", alignItems: "center" },
  t: { fontSize: 20, fontWeight: "bold" },
});
