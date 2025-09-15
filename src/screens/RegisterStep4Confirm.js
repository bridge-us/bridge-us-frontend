import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

export default function RegisterStep4Confirm({ navigation, route }) {
  const params = route?.params || {};
  const {
    category,
    years,
    role,
    company,
    intro,
    title,
    mode,
    days = [],
    duration,
    description,
  } = params;

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      // TODO: 실제 API 연동
      // await api.post('/mentorings', params)
      await new Promise((r) => setTimeout(r, 800));
      setLoading(false);

      // 방금 입력한 값으로 메인에 표시할 카드 데이터 구성
      const newMentor = {
        id: Date.now(), // 임시 고유값
        name: "내 프로필", // 실제 로그인 사용자명으로 대체 가능
        headline: title || "멘토링 제목",
        career: company
          ? `${company}${years ? ` (${years})` : ""}`
          : years || "",
        category: category || "-",
        mode: mode || "-",
        avatarInitial: "나",
        // 필요하면 상세 화면에서 쓸 필드 보존
        role,
        intro,
        days,
        duration,
        description,
      };

      // 메인 피드로 이동 + 파라미터로 신규 카드 전달
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main", params: { newMentor } }],
        })
      );
    } catch (e) {
      setLoading(false);
      alert("등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 헤더 */}
      <View style={s.header}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111" />
        </Pressable>
        <Text style={s.headerTitle}>멘토링 등록</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 28 }}>
        {/* 스텝: 마지막 단계 체크 */}
        <View style={s.steps}>
          <StepDot checked />
          <StepBar />
          <StepDot checked />
          <StepBar />
          <StepDot checked />
          <StepBar />
          <StepDot checked />
        </View>

        <View style={s.successBox}>
          <Ionicons name="checkmark-circle" size={36} color={BLUE} />
          <Text style={s.successTitle}>입력 내용을 확인해 주세요</Text>
          <Text style={s.successSub}>아래 내용으로 멘토링이 등록됩니다.</Text>
        </View>

        {/* 요약 카드들 */}
        <Card title="기본 정보">
          <Row k="분야" v={category} />
          <Row k="경력" v={years} />
          <Row k="직무" v={role} />
          <Row k="회사/활동" v={company} />
          {intro ? <Row k="한 줄 소개" v={intro} /> : null}
        </Card>

        <Card title="멘토링 내용">
          <Row k="제목" v={title} />
          <Row k="진행 방식" v={mode} />
          <Row k="가능 요일" v={days.join(" · ")} />
          <Row k="1회 소요 시간" v={duration} />
          {description ? <Row k="설명" v={description} /> : null}
        </Card>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={s.bottomBar}>
        <Pressable style={s.outlineBtn} onPress={() => navigation.goBack()}>
          <Text style={s.outlineText}>이전</Text>
        </Pressable>
        <Pressable style={s.primaryBtn} onPress={onSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.primaryText}>등록 완료</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* 재사용 컴포넌트들 */
function StepDot({ active, checked }) {
  return (
    <View
      style={[
        s.dot,
        active && { borderColor: BLUE },
        checked && { backgroundColor: BLUE, borderColor: BLUE },
      ]}
    />
  );
}
function StepBar() {
  return <View style={s.bar} />;
}

function Card({ title, children }) {
  return (
    <View style={s.card}>
      <Text style={s.cardTitle}>{title}</Text>
      <View style={{ gap: 8 }}>{children}</View>
    </View>
  );
}
function Row({ k, v }) {
  if (!v) return null;
  return (
    <View style={s.row}>
      <Text style={s.key}>{k}</Text>
      <Text style={s.val}>{v}</Text>
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

  steps: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 18,
    marginTop: 4,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: BORDER,
    backgroundColor: "#fff",
  },
  bar: { width: 40, height: 2, backgroundColor: BORDER, marginHorizontal: 4 },

  successBox: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    marginBottom: 8,
  },
  successTitle: { fontSize: 18, fontWeight: "800" },
  successSub: { fontSize: 13, color: GRAY },

  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    backgroundColor: "#fff",
  },
  cardTitle: { fontSize: 15, fontWeight: "800", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  key: { color: GRAY },
  val: { flex: 1, textAlign: "right", fontWeight: "600" },

  bottomBar: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: "#fff",
  },
  outlineBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineText: { fontWeight: "700", color: "#111827" },
  primaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { color: "#fff", fontWeight: "800" },
});
