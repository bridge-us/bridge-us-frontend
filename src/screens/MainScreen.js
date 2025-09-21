// src/screens/MainScreen.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "../components/BottomTab";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

const MOCK = [
  {
    id: 1,
    name: "김재헌",
    headline: "iOS 개발 경력 주니어분들에게 가르쳐드립니다",
    career: "네이버, 쿠팡 (17년)",
    category: "iOS 개발자",
    mode: "온라인",
    avatarInitial: "김",
  },
  {
    id: 2,
    name: "김현진",
    headline: "28년 금융권 경력 노하우",
    career: "국민은행 (28년)",
    category: "금융",
    mode: "온라인",
    avatarInitial: "김",
  },
  {
    id: 3,
    name: "김도현",
    headline: "신입을 위한 성장 코칭",
    career: "포스코 (30년)",
    category: "고객관리",
    mode: "온라인",
    avatarInitial: "김",
  },
];

export default function MainScreen({ navigation, route }) {
  const [list, setList] = useState(MOCK);

  useEffect(() => {
    const incoming = route?.params?.newMentor;
    if (incoming) {
      setList((prev) =>
        prev.some((m) => m.id === incoming.id) ? prev : [incoming, ...prev]
      );
      navigation.setParams({ newMentor: undefined });
    }
  }, [route?.params?.newMentor]);

  const renderItem = ({ item }) => (
    <Pressable
      style={s.card}
      onPress={() => navigation.navigate("MentorDetail", { mentor: item })}
    >
      <View style={s.cardTop}>
        <Text style={s.smallTag}>{item.category}</Text>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{item.avatarInitial}</Text>
        </View>
      </View>

      <Text style={s.name}>{item.name}</Text>
      <Text style={s.headline}>{item.headline}</Text>

      <View style={s.row}>
        <Text style={s.key}>경력</Text>
        <Text style={s.val}>{item.career}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.key}>분야</Text>
        <Text style={s.val}>{item.category}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.key}>진행방식</Text>
        <Text style={s.val}>{item.mode}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 바 */}
      <View style={s.topBar}>
        <View style={s.brand}>
          <Text style={s.brandBridge}>Bridge</Text>
          <Text style={s.brandDot}> · </Text>
          <Text style={s.brandUs}>Us</Text>
        </View>

        <Pressable hitSlop={10} onPress={() => alert("검색 준비중")}>
          <Ionicons name="search" size={28} color="#111" />
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      />

      {/* 플로팅 등록 버튼 */}
      <Pressable
        style={s.fab}
        onPress={() => navigation.navigate("RegisterStep1")}
      >
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={s.fabText}>멘토링 등록하기</Text>
      </Pressable>

      {/* 공용 하단 탭 */}
      <BottomTab navigation={navigation} active="home" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  topBar: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* 브랜드 로고 (Bridge · Us) */
  brand: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  brandBridge: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -0.3,
  },
  brandDot: {
    fontSize: 30,
    fontWeight: "900",
    color: BLUE,
    marginHorizontal: 2,
  },
  brandUs: {
    fontSize: 30,
    fontWeight: "900",
    color: BLUE,
    letterSpacing: -0.3,
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallTag: { color: "#9CA3AF", fontSize: 13, marginBottom: 8 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  name: { marginTop: 8, fontSize: 19, fontWeight: "800", color: "#111" },
  headline: { marginTop: 6, fontSize: 15, fontWeight: "600", color: "#333" },
  row: { marginTop: 8, flexDirection: "row", gap: 10 },
  key: { width: 56, color: GRAY },
  val: { flex: 1, fontWeight: "600", color: "#111" },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 76,
    backgroundColor: BLUE,
    height: 54,
    paddingHorizontal: 18,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
