// src/screens/MyPageScreen.js
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "../components/BottomTab";
import { useRole } from "../context/RoleContext";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

// 더미 데이터
const MOCK_PROGRESS = [
  {
    id: "p1",
    name: "김현진",
    headline: "28년 금융권 경력 노하우",
    career: "국민은행 (28년)",
    category: "금융",
    mode: "온라인",
  },
];
const MOCK_WAITING = [];

// 신규: 신청 관리(멘티 신청서)
const MOCK_REQUESTS = [
  {
    id: "r1",
    mentee: "박지수",
    topic: "면접 대비 1:1 코칭 요청",
    memo: "이력서/자소서 체크와 예상 질문 준비 부탁드려요.",
    wantMethod: "온라인",
    requestedAt: "어제",
  },
  {
    id: "r2",
    mentee: "강윤아",
    topic: "iOS 포트폴리오 점검",
    memo: "아키텍처/코드 리뷰 받고 싶습니다.",
    wantMethod: "오프라인",
    requestedAt: "3일 전",
  },
];

export default function MyPageScreen({ navigation }) {
  const { role } = useRole();
  const isMentee = role === 'MENTEE';

  // progress | waiting | inbox(신청 관리)
  const [tab, setTab] = useState("progress");
  const [progress, setProgress] = useState(MOCK_PROGRESS);
  const [waiting] = useState(MOCK_WAITING);
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  React.useEffect(() => {
    if (isMentee && tab === 'inbox') {
      setTab('progress');
    }
  }, [isMentee, tab]);

  const data = useMemo(() => {
    if (tab === "progress") return progress;
    if (tab === "waiting") return waiting;
    return requests;
  }, [tab, progress, waiting, requests]);

  /** ---------- 진행/대기 카드 ---------- */
  const renderCommonCard = ({ item }) => (
    <View style={s.card}>
      <Text style={s.smallTag}>{item.category}</Text>
      <Text style={s.name}>{item.name}</Text>
      <Text style={s.headline}>{item.headline}</Text>
      <View style={s.row}>
        <Text style={s.key}>경력</Text>
        <Text style={s.val}>{item.career || "-"}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.key}>진행방식</Text>
        <Text style={s.val}>{item.mode}</Text>
      </View>
    </View>
  );

  /** ---------- 신청 관리 카드 ---------- */
  const onApprove = (req) => {
    // 승인: 신청함에서 제거 + 진행중에 추가
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setProgress((prev) => [
      {
        id: `p-${Date.now()}`,
        name: req.mentee,
        headline: req.topic,
        career: "",
        category: "멘토링",
        mode: req.wantMethod,
      },
      ...prev,
    ]);
    Alert.alert("승인 완료", `${req.mentee} 님 신청을 승인했어요.`);
  };

  const onReject = (req) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    Alert.alert("거절 완료", `${req.mentee} 님 신청을 거절했어요.`);
  };

  const renderRequestCard = ({ item }) => (
    <View style={s.card}>
      <View style={s.reqHeader}>
        <Text style={s.reqBadge}>신청</Text>
        <Text style={s.reqTime}>{item.requestedAt}</Text>
      </View>

      <Text style={s.reqTitle}>{item.topic}</Text>

      <View style={{ marginTop: 8 }}>
        <View style={s.row}>
          <Text style={s.key}>신청자</Text>
          <Text style={s.val}>{item.mentee}</Text>
        </View>
        <View style={s.row}>
          <Text style={s.key}>방식</Text>
          <Text style={s.val}>{item.wantMethod}</Text>
        </View>
      </View>

      {!!item.memo && (
        <View style={{ marginTop: 10 }}>
          <Text style={s.key}>메모</Text>
          <Text style={[s.val, { marginTop: 4 }]}>{item.memo}</Text>
        </View>
      )}

      <View style={s.reqActions}>
        <Pressable style={[s.btn, s.btnOutline]} onPress={() => onReject(item)}>
          <Text style={[s.btnText, s.btnTextOutline]}>거절</Text>
        </Pressable>
        <Pressable style={[s.btn, s.btnFill]} onPress={() => onApprove(item)}>
          <Text style={[s.btnText, s.btnTextFill]}>승인</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderItem = (props) =>
    tab === 'inbox' && !isMentee ? renderRequestCard(props) : renderCommonCard(props);

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
        {!isMentee && (
          <Pressable
            style={[s.tabBtn, tab === 'inbox' && s.tabActive]}
            onPress={() => setTab('inbox')}
          >
            <Text style={[s.tabText, tab === 'inbox' && s.tabTextActive]}>신청 관리</Text>
          </Pressable>
        )}
      </View>

      {/* 리스트 */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
        data={data}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ marginTop: 60, alignItems: "center" }}>
            <Text style={{ color: GRAY }}>데이터가 없습니다.</Text>
          </View>
        }
      />

      <BottomTab navigation={navigation} active="MyPage" />
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

  // 신청 관리 전용
  reqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reqBadge: {
    backgroundColor: "#EEF2FF",
    color: BLUE,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "700",
  },
  reqTime: { color: GRAY, fontSize: 13 },
  reqTitle: { marginTop: 10, fontSize: 16, fontWeight: "800" },

  reqActions: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  btn: {
    height: 40,
    minWidth: 84,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
  },
  btnFill: {
    backgroundColor: BLUE,
  },
  btnText: { fontWeight: "800" },
  btnTextOutline: { color: "#111" },
  btnTextFill: { color: "#fff" },
});
