// src/screens/MentorReviewsScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

export default function MentorReviewsScreen({ navigation, route }) {
  const mentor = route?.params?.mentor;

  const renderItem = ({ item }) => (
    <View style={s.card}>
      <Text style={s.title}>{item.title}</Text>
      <Text style={s.meta}>
        {item.author} · {item.time}
      </Text>
      <Text style={s.body}>{item.body}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 바 */}
      <View style={s.topBar}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </Pressable>
        <Text style={s.headerTitle}>{mentor?.name} 멘토 후기</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* 멘토 요약 */}
      <View style={s.headerCard}>
        <Text style={s.name}>{mentor?.name}</Text>
        <Text style={s.sub}>
          {mentor?.role} · {mentor?.career}
        </Text>
        <Text style={s.count}>총 후기 {mentor?.reviewCount}개</Text>
      </View>

      {/* 후기 리스트 */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        data={mentor?.reviews ?? []}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  topBar: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "800" },

  headerCard: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  name: { fontSize: 18, fontWeight: "900", color: "#111" },
  sub: { marginTop: 4, color: "#374151" },
  count: { marginTop: 6, color: BLUE, fontWeight: "800" },

  card: {
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  title: { fontSize: 16, fontWeight: "900", marginBottom: 6 },
  meta: { color: GRAY, marginBottom: 8 },
  body: { color: "#111827", lineHeight: 20 },
});
