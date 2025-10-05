import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleUpdate = () => {
    alert("회원정보가 수정되었습니다.");
    navigation.goBack(); // 수정 후 마이페이지로 돌아가기
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 로고 */}
      <View style={s.header}>
        <Text style={s.brandBridge}>Bridge</Text>
        <Text style={s.brandDot}> · </Text>
        <Text style={s.brandUs}>Us</Text>
      </View>

      {/* 타이틀 */}
      <Text style={s.title}>회원정보 수정</Text>

      {/* 입력 폼 */}
      <View style={s.form}>
        <Text style={s.label}>이름</Text>
        <TextInput
          style={s.input}
          placeholder="이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />

        <Text style={s.label}>비밀번호</Text>
        <TextInput
          style={s.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={s.label}>이메일</Text>
        <TextInput
          style={s.input}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={s.label}>전화번호</Text>
        <TextInput
          style={s.input}
          placeholder="전화번호를 입력하세요"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* 버튼 영역 */}
      <View style={s.btnRow}>
        <Pressable style={s.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={s.cancelText}>이전</Text>
        </Pressable>

        <Pressable style={s.updateBtn} onPress={handleUpdate}>
          <Text style={s.updateText}>수정하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  brandBridge: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
  },
  brandDot: {
    fontSize: 26,
    fontWeight: "900",
    color: BLUE,
  },
  brandUs: {
    fontSize: 26,
    fontWeight: "900",
    color: BLUE,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 20,
  },

  form: {
    marginTop: 24,
    marginHorizontal: 28,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 28,
    marginTop: 12,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    marginRight: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "700",
  },
  updateBtn: {
    flex: 1,
    backgroundColor: BLUE,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    marginLeft: 8,
  },
  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
