// src/screens/ChatScreen.js
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
import { useRole } from "../context/RoleContext";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

const TABS = { PROGRESS: "progress", REQUESTS: "requests" };

const MOCK_PROGRESS = [
  {
    id: "p1",
    name: "김현진",
    headline: "28년 금융권 경력 노하우",
    career: "국민은행 (28년)",
    category: "금융",
    mode: "온라인",
    avatarInitial: "김",
  },
  {
    id: "p2",
    name: "김재헌",
    headline: "iOS 개발 경력 주니어분들에게 가르쳐드립니다",
    career: "네이버, 쿠팡 (17년)",
    category: "iOS 개발자",
    mode: "온라인",
    avatarInitial: "김",
  },
  {
    id: "p3",
    name: "김도현",
    headline: "신입을 위한 성장 코칭",
    career: "포스코 (30년)",
    category: "고객관리",
    mode: "오프라인",
    avatarInitial: "김",
  },
];

const MOCK_REQUESTS = [
  {
    id: "r1",
    title: "면접 대비 1:1 코칭 요청",
    applicant: "박지수",
    mode: "온라인",
    memo: "이력서/자소서 체크와 예상 질문 준비 부탁드려요.",
    time: "어제",
  },
  {
    id: "r2",
    title: "iOS 포트폴리오 점검",
    applicant: "강윤아",
    mode: "오프라인",
    memo: "아키텍처/코드 리뷰 받고 싶습니다.",
    time: "3일 전",
  },
];

export default function ChatScreen({ navigation }) {
  const { role } = useRole();
  const isMentee = role === 'MENTEE';

  const [tab, setTab] = useState(TABS.PROGRESS);

  React.useEffect(() => {
    if (isMentee && tab === TABS.REQUESTS) {
      setTab(TABS.PROGRESS);
    }
  }, [isMentee, tab]);

  const data = useMemo(
    () => (tab === TABS.PROGRESS ? MOCK_PROGRESS : MOCK_REQUESTS),
    [tab]
  );

  // 진행 중 카드 → 채팅방으로 이동
  const renderProgress = ({ item }) => (
    <Pressable
      style={s.card}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          peer: {
            name: item.name,
            avatarInitial: item.avatarInitial,
            category: item.category,
          },
        })
      }
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
        <Text style={s.key}>진행방식</Text>
        <Text style={s.val}>{item.mode}</Text>
      </View>
    </Pressable>
  );

  const renderRequest = ({ item }) => (
    <View style={s.requestCard}>
      <View style={s.badgeRow}>
        <Text style={s.badge}>신청</Text>
        <Text style={s.timeText}>{item.time}</Text>
      </View>
      <Text style={s.reqTitle}>{item.title}</Text>
      <View style={{ marginTop: 8, gap: 6 }}>
        <View style={s.reqRow}>
          <Text style={s.reqKey}>신청자</Text>
          <Text style={s.reqVal}>{item.applicant}</Text>
        </View>
        <View style={s.reqRow}>
          <Text style={s.reqKey}>방식</Text>
          <Text style={s.reqVal}>{item.mode}</Text>
        </View>
        <View style={s.reqRow}>
          <Text style={s.reqKey}>메모</Text>
          <Text style={s.reqVal}>{item.memo}</Text>
        </View>
      </View>
      <View style={s.reqBtns}>
        {/* 승인(왼쪽) / 거절(오른쪽) */}
        <Pressable style={[s.reqBtn, s.acceptBtn]} onPress={() => {}}>
          <Text style={[s.reqBtnText, { color: "#fff" }]}>승인</Text>
        </Pressable>
        <Pressable style={[s.reqBtn, s.rejectBtn]} onPress={() => {}}>
          <Text style={[s.reqBtnText, { color: "#111" }]}>거절</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 바 - MainScreen과 동일 */}
      <View style={s.topBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            hitSlop={10}
            onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
            style={{ marginRight: 12 }}
            accessibilityLabel="뒤로가기"
            accessibilityRole="button"
          >
            <Ionicons name="chevron-back" size={28} color="#111" />
          </Pressable>
          <View style={s.brand}>
            <Text style={s.brandBridge}>Bridge</Text>
            <Text style={s.brandDot}> · </Text>
            <Text style={s.brandUs}>Us</Text>
          </View>
        </View>
        <Pressable hitSlop={10} onPress={() => alert('검색 준비중')}>
          <Ionicons name="search" size={28} color="#111" />
        </Pressable>
      </View>

      {/* 탭 */}
      <View style={[s.tabs, { marginTop: 6 }]}>
        <Pressable
          style={[s.tabBtn, tab === TABS.PROGRESS && s.tabActive]}
          onPress={() => setTab(TABS.PROGRESS)}
        >
          <Text style={[s.tabText, tab === TABS.PROGRESS && s.tabTextActive]}>
            진행 중인 멘토링
          </Text>
        </Pressable>
        {!isMentee && (
          <Pressable
            style={[s.tabBtn, tab === TABS.REQUESTS && s.tabActive]}
            onPress={() => setTab(TABS.REQUESTS)}
          >
            <Text style={[s.tabText, tab === TABS.REQUESTS && s.tabTextActive]}>
              신청 관리
            </Text>
          </Pressable>
        )}
      </View>

      {/* 리스트 */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
        data={data}
        keyExtractor={(it) => String(it.id)}
        renderItem={tab === TABS.PROGRESS ? renderProgress : renderRequest}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        ListEmptyComponent={
          <View style={{ marginTop: 60, alignItems: "center" }}>
            <Text style={{ color: GRAY }}>데이터가 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  topBar: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  brand: { flexDirection: "row", alignItems: "baseline" },
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

  tabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  tabActive: { backgroundColor: BLUE },
  tabText: { color: "#111827", fontWeight: "700" },
  tabTextActive: { color: "#fff" },

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
  key: { width: 64, color: GRAY },
  val: { flex: 1, fontWeight: "600", color: "#111" },

  requestCard: {
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
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#E6EEFF",
    color: BLUE,
    fontWeight: "800",
    fontSize: 12,
  },
  timeText: { color: GRAY, fontSize: 12 },
  reqTitle: { fontSize: 18, fontWeight: "900", marginBottom: 8 },
  reqRow: { flexDirection: "row", gap: 10 },
  reqKey: { width: 56, color: GRAY },
  reqVal: { flex: 1, color: "#111", fontWeight: "600" },
  reqBtns: { flexDirection: "row", gap: 10, marginTop: 14 },
  reqBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  rejectBtn: { backgroundColor: "#F3F4F6", borderColor: BORDER },
  acceptBtn: { backgroundColor: BLUE, borderColor: BLUE },
  reqBtnText: { fontWeight: "800" },
});
