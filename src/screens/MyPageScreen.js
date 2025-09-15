// src/screens/MyPageScreen.js
import React, { useState } from "react";
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

// 더미 데이터
const MOCK_PROGRESS = [
  {
    id: 1,
    name: "김현진",
    headline: "28년 금융권 경력 노하우",
    career: "국민은행 (28년)",
    category: "금융",
    mode: "온라인",
  },
];

const MOCK_WAITING = [];

export default function MyPageScreen({ navigation }) {
  const [tab, setTab] = useState("progress"); // progress | waiting

  const data = tab === "progress" ? MOCK_PROGRESS : MOCK_WAITING;

  const renderItem = ({ item }) => (
    <View style={s.card}>
      <Text style={s.smallTag}>{item.category}</Text>
      <Text style={s.name}>{item.name}</Text>
      <Text style={s.headline}>{item.headline}</Text>
      <View style={s.row}>
        <Text style={s.key}>경력</Text>
        <Text style={s.val}>{item.career}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.key}>진행방식</Text>
        <Text style={s.val}>{item.mode}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 */}
      <View style={s.topBar}>
        <Text style={s.title}>마이페이지</Text>
        <Pressable hitSlop={10} onPress={() => alert("검색 준비중")}>
          <Ionicons name="search" size={20} color="#111" />
        </Pressable>
      </View>

      {/* 탭 */}
      <View style={s.tabs}>
        <Pressable
          style={[s.tabBtn, tab === "progress" && s.tabActive]}
          onPress={() => setTab("progress")}
        >
          <Text style={[s.tabText, tab === "progress" && s.tabTextActive]}>
            진행 중인 멘토링
          </Text>
        </Pressable>
        <Pressable
          style={[s.tabBtn, tab === "waiting" && s.tabActive]}
          onPress={() => setTab("waiting")}
        >
          <Text style={[s.tabText, tab === "waiting" && s.tabTextActive]}>
            대기 중인 멘토링
          </Text>
        </Pressable>
      </View>

      {/* 리스트 */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        data={data}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ marginTop: 60, alignItems: "center" }}>
            <Text style={{ color: GRAY }}>데이터가 없습니다.</Text>
          </View>
        }
      />

      {/* 하단 탭바 */}
      <View style={s.tabbar}>
        {/* 홈 */}
        <Pressable hitSlop={10} onPress={() => navigation.navigate("Main")}>
          <Ionicons name="home-outline" size={22} color="#9CA3AF" />
        </Pressable>

        {/* 채팅 (2번째) */}
        <Pressable hitSlop={10} onPress={() => alert("채팅방 준비중")}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#9CA3AF"
          />
        </Pressable>

        {/* 게시판 (3번째) */}
        <Pressable hitSlop={10} onPress={() => navigation.navigate("Board")}>
          <Ionicons name="newspaper-outline" size={22} color="#9CA3AF" />
        </Pressable>

        {/* 현재 페이지 강조 */}
        <Pressable hitSlop={10}>
          <Ionicons name="person-circle-outline" size={24} color={BLUE} />
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
  title: { fontSize: 20, fontWeight: "800" },

  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
  },
  tabActive: {
    backgroundColor: BLUE,
  },
  tabText: { color: "#111827", fontWeight: "600" },
  tabTextActive: { color: "#fff" },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  smallTag: { color: "#9CA3AF", fontSize: 13, marginBottom: 6 },
  name: { fontSize: 18, fontWeight: "800" },
  headline: { marginTop: 6, fontSize: 15, fontWeight: "700" },
  row: { marginTop: 6, flexDirection: "row", gap: 10 },
  key: { width: 56, color: GRAY },
  val: { flex: 1, fontWeight: "600" },

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
