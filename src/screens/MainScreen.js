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

  // 등록 완료 후 넘어온 새 카드 반영
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
        <View style={{ width: 24 }} />
        <Pressable hitSlop={10} onPress={() => alert("검색 준비중")}>
          <Ionicons name="search" size={22} color="#111" />
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
        <Ionicons name="create-outline" size={18} color="#fff" />
        <Text style={s.fabText}>멘토링 등록하기</Text>
      </Pressable>

      {/* 하단 탭: 1 홈, 2 채팅방, 3 게시판, 4 마이페이지 */}
      <View style={s.tabbar}>
        {/* 1. 홈 */}
        <Pressable hitSlop={10} onPress={() => navigation.navigate("Main")}>
          <Ionicons name="home-outline" size={22} color="#111" />
        </Pressable>

        {/* 2. 채팅방 */}
        <Pressable hitSlop={10} onPress={() => alert("채팅 기능 준비중")}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#9CA3AF"
          />
        </Pressable>

        {/* 3. 게시판 */}
        <Pressable hitSlop={10} onPress={() => navigation.navigate("Board")}>
          <Ionicons name="newspaper-outline" size={22} color="#9CA3AF" />
        </Pressable>

        {/* 4. 마이페이지 */}
        <Pressable hitSlop={10} onPress={() => navigation.navigate("MyPage")}>
          <Ionicons name="person-circle-outline" size={24} color="#9CA3AF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  topBar: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 16,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallTag: { color: "#9CA3AF", fontSize: 13, marginBottom: 8 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "800" },
  name: { marginTop: 8, fontSize: 18, fontWeight: "800" },
  headline: { marginTop: 6, fontSize: 16, fontWeight: "700" },
  row: { marginTop: 8, flexDirection: "row", gap: 10 },
  key: { width: 56, color: GRAY },
  val: { flex: 1, fontWeight: "600" },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 76,
    backgroundColor: BLUE,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabText: { color: "#fff", fontWeight: "800" },
  tabbar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
