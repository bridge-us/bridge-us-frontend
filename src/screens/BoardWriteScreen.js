import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";

export default function BoardWriteScreen({ navigation, route }) {
  const { cat } = route.params || {};
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = () => {
    if (!title.trim()) return alert("제목을 입력해 주세요.");
    // TODO: API 업로드
    alert(`'${title}' 글이 임시 저장되었습니다. (카테고리: ${cat})`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={s.header}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={s.title}>글쓰기</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={{ padding: 16, gap: 12 }}>
        <TextInput
          style={s.input}
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[s.input, { height: 200 }]}
          multiline
          textAlignVertical="top"
          placeholder="내용을 입력하세요"
          value={body}
          onChangeText={setBody}
        />

        <Pressable style={s.submit} onPress={onSubmit}>
          <Text style={{ color: "#fff", fontWeight: "800" }}>등록</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 52,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  title: { fontSize: 16, fontWeight: "800" },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  submit: {
    height: 48,
    borderRadius: 14,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
});
