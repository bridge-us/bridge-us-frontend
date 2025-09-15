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

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    // 간단 검증
    if (!name.trim()) return alert("이름을 입력해 주세요.");
    if (!email.trim()) return alert("이메일을 입력해 주세요.");
    if (!/\S+@\S+\.\S+/.test(email))
      return alert("이메일 형식이 올바르지 않습니다.");
    if (pw.length < 6) return alert("비밀번호는 6자 이상 입력해 주세요.");
    if (pw !== pw2) return alert("비밀번호가 일치하지 않습니다.");

    try {
      setLoading(true);
      // TODO: 실제 가입 API 호출 전까지 모킹
      // await api.post("/auth/signup", { name, email, password: pw });
      setTimeout(() => {
        alert("회원가입 완료! (모킹)");
        // 흐름에 맞춰 라우팅 변경하세요.
        // 예: 정보입력 단계가 있다면 navigation.replace("InfoInput")
        // 지금은 일단 홈으로 이동:
        navigation.replace("Home");
        setLoading(false);
      }, 500);
    } catch (e) {
      setLoading(false);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.container}>
          <Text style={s.title}>회원가입</Text>

          <View style={s.form}>
            <Text style={s.label}>이름</Text>
            <TextInput
              style={s.input}
              placeholder="홍길동"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
            />

            <Text style={[s.label, { marginTop: 14 }]}>이메일</Text>
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
              returnKeyType="next"
            />

            <Text style={[s.label, { marginTop: 14 }]}>비밀번호 확인</Text>
            <TextInput
              style={s.input}
              placeholder="비밀번호 재입력"
              secureTextEntry
              value={pw2}
              onChangeText={setPw2}
              returnKeyType="done"
              onSubmitEditing={onSignup}
            />

            <Pressable style={s.button} onPress={onSignup} disabled={loading}>
              <Text style={s.buttonText}>
                {loading ? "가입 중..." : "회원가입"}
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Login")} hitSlop={8}>
              <Text style={s.linkText}>이미 계정이 있나요? 로그인</Text>
            </Pressable>
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
  linkText: {
    marginTop: 14,
    color: BLUE,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
