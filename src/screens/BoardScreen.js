// src/screens/BoardScreen.js
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "../components/BottomTab";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

/** 탭 */
const TABS = ["취업정보", "취준생 게시판", "멘토링 후기"];

/** 취업정보(뉴스) 더미 – summary 포함 */
const JOB_NEWS = [
  {
    id: "n1",
    title: "네이버·카카오 2025 채용 계획…상반기 인턴 전환 확대",
    source: "매일경제",
    time: "방금",
    comments: 12,
    summary:
      "빅테크가 상반기 인턴십을 확대하고 전환 비율을 높일 예정. AI/클라우드 직군 중심으로 채용 기회가 늘어날 전망.",
  },
  {
    id: "n2",
    title: "금융권, 디지털 인재 채용 늘린다…개발자 우대 정책",
    source: "한국경제",
    time: "2시간 전",
    comments: 8,
    summary:
      "은행·카드사에서 데이터/모바일 개발 직군 증원. 하이브리드 근무와 보상 테이블 개선 등 우대책 검토.",
  },
  {
    id: "n3",
    title: "대기업 하반기 공채 키워드: AI·클라우드·보안",
    source: "조선비즈",
    time: "어제",
    comments: 21,
    summary:
      "대다수 기업이 AI 활용 능력, 클라우드·보안 역량을 핵심 요구로 제시. 관련 프로젝트 경험 보유 시 가점.",
  },
];

/** 취준생/후기 더미 */
const MOCK_POSTS = {
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
};

/** 멘토링 후기 – 멘토 프로필 목록 */
const MENTOR_PROFILES = [
  {
    id: "m1",
    name: "김재헌",
    role: "iOS 개발자",
    career: "네이버 · 쿠팡 17년",
    avatar: "https://i.pravatar.cc/150?img=12",
    reviewCount: 12,
    latest: "포트폴리오 정리 방향 잡아주셨어요!",
    reviews: [
      {
        id: "mr1",
        title: "iOS 멘토링 듣고 포트폴리오 완성했습니다!",
        author: "김민재",
        time: "3시간 전",
        body: "실무 기준으로 섹션을 재배치하고 성과 지표를 적는 방법을 배웠습니다. 면접 준비 팁도 많이 얻었어요.",
      },
      {
        id: "mr2",
        title: "아키텍처 리뷰가 큰 도움",
        author: "이서윤",
        time: "어제",
        body: "클린 아키텍처로 리팩터링 가이드 주셔서 구조가 깔끔해졌어요. 코드 리뷰도 디테일하게 해주셨습니다.",
      },
    ],
  },
  {
    id: "m2",
    name: "김현진",
    role: "금융 개발/기획",
    career: "국민은행 28년",
    avatar: "https://i.pravatar.cc/150?img=33",
    reviewCount: 9,
    latest: "금융권 이직 전략 컨설팅 최고!",
    reviews: [
      {
        id: "mr3",
        title: "금융권 이직 목표가 뚜렷해졌어요",
        author: "박지수",
        time: "2일 전",
        body: "경력기술서 문구를 실제 채용 시선에서 다듬어 주셨고 면접 질문 리스트까지 제공해주셨어요.",
      },
    ],
  },
  {
    id: "m3",
    name: "김도현",
    role: "고객관리 코칭",
    career: "포스코 30년",
    avatar: "https://i.pravatar.cc/150?img=5",
    reviewCount: 7,
    latest: "커뮤니케이션 피드백이 인상적",
    reviews: [
      {
        id: "mr4",
        title: "현장 실무 팁이 현실적이었어요",
        author: "강윤아",
        time: "3일 전",
        body: "상황별 대화 스크립트와 KPI 만들기를 배웠습니다. 바로 업무에 적용 중이에요.",
      },
    ],
  },
];

export default function BoardScreen({ navigation }) {
  const [tab, setTab] = useState("취업정보");

  const data = useMemo(() => {
    if (tab === "취업정보") return JOB_NEWS;
    if (tab === "멘토링 후기") return MENTOR_PROFILES;
    return MOCK_POSTS[tab] ?? [];
  }, [tab]);

  /** 취업정보 카드 */
  const renderNews = ({ item }) => (
    <Pressable style={s.newsCard} onPress={() => alert("기사 보기 (준비중)")}>
      <View style={s.cardTopRow}>
        <Text style={s.smallTag}>취업정보</Text>
        <Ionicons name="document-text-outline" size={18} color={BLUE} />
      </View>
      <Text style={s.title}>{item.title}</Text>
      {!!item.summary && <Text style={s.summary}>{item.summary}</Text>}
      <Text style={s.meta}>
        {item.source} · {item.time} ·{" "}
        <Ionicons name="chatbubble-ellipses-outline" size={12} />{" "}
        {item.comments}
      </Text>
    </Pressable>
  );

  /** 취준생/후기 일반 게시물 카드 */
  const renderPost = ({ item }) => (
    <Pressable
      style={s.card}
      onPress={() => navigation.navigate("BoardPost", { post: item })}
    >
      <View style={s.cardTopRow}>
        <Text style={s.smallTag}>취준생 게시판</Text>
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </View>
      <Text style={s.title}>{item.title}</Text>
      <Text style={s.meta}>
        {item.author} · {item.time} ·{" "}
        <Ionicons name="chatbubble-ellipses-outline" size={12} />{" "}
        {item.comments}
      </Text>
    </Pressable>
  );

  /** 멘토 프로필 카드 (후기 진입용) */
  const renderMentor = ({ item }) => (
    <Pressable
      style={s.mentorCard}
      onPress={() => navigation.navigate("MentorReviews", { mentor: item })}
    >
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Image source={{ uri: item.avatar }} style={s.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={s.mentorName}>{item.name}</Text>
          <Text style={s.mentorSub}>
            {item.role} · {item.career}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <View style={s.badge}>
              <Ionicons name="star" size={12} color={BLUE} />
              <Text style={s.badgeText}>후기 {item.reviewCount}</Text>
            </View>
            <Text style={s.latest} numberOfLines={1}>
              {item.latest}
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단바: Bridge • Us + 검색 */}
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

      {/* 탭 */}
      <View style={s.tabs}>
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[s.tabBtn, active && s.tabActive]}
            >
              <Text style={[s.tabText, active && s.tabTextActive]}>{t}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* 오픈채팅 배너 (취준생 게시판) */}
      {tab === "취준생 게시판" && (
        <Pressable
          style={s.openChatBanner}
          onPress={() => navigation.navigate("OpenChatRoom")}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="people-outline" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "800" }}>
              취준생 그룹 채팅 입장
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </Pressable>
      )}

      {/* 리스트 */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        data={data}
        keyExtractor={(it) => String(it.id)}
        renderItem={
          tab === "취업정보"
            ? renderNews
            : tab === "멘토링 후기"
            ? renderMentor
            : renderPost
        }
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      {/* 글쓰기 FAB (취업정보/멘토후기 탭에서는 숨김) */}
      {tab === "취준생 게시판" && (
        <Pressable
          style={s.fab}
          onPress={() => navigation.navigate("BoardWrite", { category: tab })}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={s.fabText}>글쓰기</Text>
        </Pressable>
      )}

      <BottomTab navigation={navigation} active="board" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  /* 상단바/브랜드 */
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

  /* 탭 */
  tabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  tabActive: { backgroundColor: BLUE },
  tabText: { color: "#111827", fontWeight: "700" },
  tabTextActive: { color: "#fff" },

  /* 취업정보 카드 */
  newsCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  /* 일반 카드 */
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

  /* 멘토 프로필 카드 */
  mentorCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#eee" },
  mentorName: { fontSize: 17, fontWeight: "900", color: "#111" },
  mentorSub: { marginTop: 2, color: "#374151" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E6EEFF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: { color: BLUE, fontWeight: "800", fontSize: 12 },
  latest: { color: "#6B7280", flexShrink: 1 },

  /* 공통 */
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  smallTag: { color: "#9CA3AF", fontSize: 13 },
  title: { fontWeight: "800", fontSize: 16, marginBottom: 6, color: "#111" },
  summary: { color: "#374151", lineHeight: 20, marginTop: 4, marginBottom: 10 },
  meta: { color: GRAY, fontSize: 13 },

  /* 오픈채팅 배너 */
  openChatBanner: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BLUE,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  /* FAB */
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
});
