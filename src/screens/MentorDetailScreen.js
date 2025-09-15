// src/screens/MentorDetailScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

export default function MentorDetailScreen({ navigation, route }) {
  const m = route?.params?.mentor || {};

  // detail 필드가 비어있어도 안전하게 기본값을 보여주도록 처리
  const intro = m.intro || "멘토 소개입니다.";
  const highlights = m.highlights || [
    "이런 것에 대해 멘토링합니다.",
    "저런 것에 대해 멘토링합니다.",
  ];
  const prepares = m.prepares || [
    "이런 걸 준비해주세요.",
    "저런 걸 미리 준비해주세요.",
  ];

  const duration = m.duration || "30분";
  const price = m.price || "16,500원";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 헤더 */}
      <View style={s.header}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111" />
        </Pressable>
        <Text style={s.headerTitle}>멘토링 상세</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {/* 상단 카드 */}
        <View style={s.card}>
          <View style={s.cardTop}>
            <Text style={s.smallTag}>{m.category || "-"}</Text>
            <View style={s.avatar}>
              <Text style={s.avatarText}>
                {(m.avatarInitial || (m.name || "?")[0]) ?? "?"}
              </Text>
            </View>
          </View>

          <Text style={s.name}>{m.name || "-"}</Text>
          <Text style={s.headline}>{m.headline || "-"}</Text>

          <View style={s.hr} />

          <Row k="경력" v={m.career || "-"} />
          <Row k="분야" v={m.category || "-"} />
          <Row k="진행방식" v={m.mode || "-"} />
        </View>

        {/* 섹션: 멘토 소개 */}
        <Section title="멘토 소개">
          <Text style={s.p}>{intro}</Text>
        </Section>

        {/* 섹션: 멘토링은 이렇게 진행돼요 */}
        <Section title="멘토링은 이렇게 진행돼요">
          {highlights.map((t, i) => (
            <Bullet key={i} text={t} />
          ))}
        </Section>

        {/* 섹션: 이런 걸 준비해주세요 */}
        <Section title="이런 걸 준비해주세요">
          {prepares.map((t, i) => (
            <Bullet key={i} text={t} />
          ))}
        </Section>

        {/* 가격/시간 정보 */}
        <View style={s.footerBox}>
          <Text style={s.footerLabel}>멘토링 1회</Text>
          <View style={{ height: 8 }} />
          <Row k="시간" v={duration} />
          <Row k="가격" v={price} />
        </View>
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View style={s.bottomBar}>
        <Pressable style={s.primaryBtn} onPress={() => alert("신청하기!")}>
          <Text style={s.primaryText}>신청하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* 재사용 뷰들 */
function Row({ k, v }) {
  return (
    <View style={s.row}>
      <Text style={s.key}>{k}</Text>
      <Text style={s.val}>{v}</Text>
    </View>
  );
}
function Section({ title, children }) {
  return (
    <View style={s.section}>
      <View style={s.sectionTitleRow}>
        <Ionicons name="alert-circle-outline" size={18} color={BLUE} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
function Bullet({ text }) {
  return (
    <View style={s.bulletRow}>
      <View style={s.bulletDot} />
      <Text style={s.p}>{text}</Text>
    </View>
  );
}

/* styles */
const s = StyleSheet.create({
  header: {
    height: 52,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "800" },

  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
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
  avatarText: { color: "#fff", fontWeight: "800" },
  name: { marginTop: 8, fontSize: 18, fontWeight: "800" },
  headline: { marginTop: 6, fontSize: 16, fontWeight: "700" },
  hr: {
    marginVertical: 12,
    height: 1,
    backgroundColor: BORDER,
  },
  row: {
    marginTop: 8,
    flexDirection: "row",
    gap: 10,
  },
  key: { width: 64, color: GRAY },
  val: { flex: 1, fontWeight: "600" },

  section: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  sectionTitle: { fontSize: 15, fontWeight: "800" },
  p: { marginTop: 8, lineHeight: 20 },

  bulletRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  bulletDot: {
    marginTop: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#111",
  },

  footerBox: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  footerLabel: { fontWeight: "800" },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: "#fff",
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
