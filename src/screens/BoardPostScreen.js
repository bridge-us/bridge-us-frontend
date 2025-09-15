import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

export default function BoardPostScreen({ navigation, route }) {
  const { post } = route.params || {};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={s.header}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={s.title}>게시글</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={s.body}>
        <Text style={s.postTitle}>{post?.title}</Text>
        <Text style={s.meta}>
          {post?.author} · {post?.time}
        </Text>
        <View style={s.content}>
          <Text style={{ lineHeight: 22 }}>
            데모 화면입니다. 여기서 본문 렌더링/댓글 등을 구현하세요.
          </Text>
        </View>
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
  body: { padding: 16, gap: 8 },
  postTitle: { fontSize: 18, fontWeight: "800" },
  meta: { color: GRAY },
  content: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
});
