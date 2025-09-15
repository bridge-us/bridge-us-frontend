import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email.trim()) return alert("이메일을 입력해 주세요.");
    if (!/\S+@\S+\.\S+/.test(email))
      return alert("이메일 형식이 올바르지 않습니다.");
    if (pw.length < 4) return alert("비밀번호는 4자 이상 입력해 주세요.");

    try {
      setLoading(true);
      setTimeout(() => {
        navigation.replace("Home"); // 로그인 성공 가정
        setLoading(false);
      }, 500);
    } catch (e) {
      setLoading(false);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.container}>
          <Text style={s.title}>로그인</Text>

          <View style={s.form}>
            <Text style={s.label}>이메일</Text>
            <TextInput
              style={s.input}
              placeholder="example@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />

            <Text style={[s.label, { marginTop: 14 }]}>비밀번호</Text>
            <TextInput
              style={s.input}
              placeholder="비밀번호"
              secureTextEntry
              value={pw}
              onChangeText={setPw}
              returnKeyType="done"
              onSubmitEditing={onLogin}
            />

            <Pressable style={s.button} onPress={onLogin} disabled={loading}>
              <Text style={s.buttonText}>
                {loading ? "로그인 중..." : "로그인"}
              </Text>
            </Pressable>

            {/* ↓↓↓ 추가한 링크 영역 ↓↓↓ */}
            <View style={s.linksRow}>
              <Pressable
                onPress={() => navigation.navigate("Signup")}
                hitSlop={8}
              >
                <Text style={s.linkText}>회원가입</Text>
              </Pressable>
              <Text style={s.dot}>·</Text>
              <Pressable
                onPress={() => navigation.navigate("ForgotPassword")}
                hitSlop={8}
              >
                <Text style={s.linkText}>비밀번호 찾기</Text>
              </Pressable>
            </View>

            <Text style={s.help}>
              * 테스트용: 아무 이메일 형식 + 4자 이상 비밀번호 입력
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const BLUE = "#2563EB";
const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 24,
  },
  form: { gap: 6 },
  label: { fontSize: 13, color: "#6B7280" },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: BLUE,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  linksRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  linkText: { color: BLUE, fontSize: 14, fontWeight: "600" },
  dot: { color: "#9CA3AF", marginHorizontal: 4 },
  help: { marginTop: 10, fontSize: 12, color: "#9CA3AF", textAlign: "center" },
});
