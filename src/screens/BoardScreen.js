// src/screens/BoardScreen.js
import React, { useMemo, useState } from "react";
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

const TABS = ["커뮤니티", "취준생 게시판", "멘토링 후기"];

const MOCK_POSTS = {
  커뮤니티: [
    {
      id: "c1",
      title: "새로 합류하신 분들 환영해요!",
      author: "운영자",
      time: "1일 전",
      comments: 5,
    },
  ],
  "취준생 게시판": [
    {
      id: "j1",
      title: "코테 대비 추천 자료 공유합니다",
      author: "박지수",
      time: "어제",
      comments: 7,
    },
    {
      id: "j2",
      title: "CS 정리 노트(운영체제/네트워크) pdf 공유",
      author: "강윤아",
      time: "4일 전",
      comments: 18,
    },
  ],
  "멘토링 후기": [
    {
      id: "r1",
      title: "iOS 멘토링 듣고 포트폴리오 완성했습니다!",
      author: "김민재",
      time: "3시간 전",
      comments: 3,
    },
  ],
};

export default function BoardScreen({ navigation }) {
  const [tab, setTab] = useState("취준생 게시판");
  const data = useMemo(() => MOCK_POSTS[tab] ?? [], [tab]);

  const renderItem = ({ item }) => (
    <Pressable
      style={s.post}
      onPress={() => navigation.navigate("BoardPost", { post: item })}
    >
      <Text style={s.postTitle}>{item.title}</Text>
      <Text style={s.meta}>
        {item.author} · {item.time} ·{" "}
        <Ionicons name="chatbubble-ellipses-outline" size={13} />{" "}
        {item.comments}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 바 */}
      <View style={s.header}>
        <Text style={s.headerTitle}>게시판</Text>
        <Pressable hitSlop={10} onPress={() => alert("검색 준비중")}>
          <Ionicons name="search" size={22} color="#111" />
        </Pressable>
      </View>

      {/* 카테고리 탭 */}
      <View style={s.tabs}>
        {TABS.map((t) => {
          const active = t === tab;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[s.tab, active && s.tabActive]}
            >
              <Text style={[s.tabText, active && s.tabTextActive]}>{t}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* 리스트 */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      {/* 글쓰기 FAB */}
      <Pressable
        style={s.fab}
        onPress={() => navigation.navigate("BoardWrite", { category: tab })}
      >
        <Ionicons name="create-outline" size={18} color="#fff" />
        <Text style={s.fabText}>글쓰기</Text>
      </Pressable>

      {/* 하단 4탭 바: 홈 → 채팅 → 게시판(현재) → 마이페이지 */}
      <View style={s.tabbar}>
        <Pressable hitSlop={10} onPress={() => navigation.navigate("Main")}>
          <Ionicons name="home-outline" size={22} color="#111" />
        </Pressable>

        <Pressable hitSlop={10} onPress={() => alert("채팅방 준비중")}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#9CA3AF"
          />
        </Pressable>

        <Pressable
          hitSlop={10}
          onPress={() => {
            /* 현재 화면 */
          }}
        >
          <Ionicons name="newspaper-outline" size={22} color={BLUE} />
        </Pressable>

        <Pressable hitSlop={10} onPress={() => navigation.navigate("MyPage")}>
          <Ionicons name="person-circle-outline" size={24} color="#9CA3AF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 20, fontWeight: "800" },

  tabs: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  tabActive: {
    backgroundColor: "#E6EEFF",
    borderWidth: 1,
    borderColor: "#D6E4FF",
  },
  tabText: { color: "#111827", fontWeight: "600" },
  tabTextActive: { color: BLUE },

  post: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
  },
  postTitle: { fontWeight: "800", fontSize: 16, marginBottom: 6 },
  meta: { color: GRAY, fontSize: 13 },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 76,
    backgroundColor: BLUE,
    height: 52,
    paddingHorizontal: 18,
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
