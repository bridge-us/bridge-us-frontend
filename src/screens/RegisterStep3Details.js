import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const MODES = ["온라인", "오프라인"];
const DURATIONS = ["30분", "60분", "90분"];

export default function RegisterStep3Details({ navigation, route }) {
  const { category, years, role, company, intro } = route?.params || {};

  // 폼 상태
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("온라인");
  const [days, setDays] = useState([]); // ["월","수"] 형태
  const [duration, setDuration] = useState("60분");
  const [description, setDescription] = useState("");

  const toggleDay = (d) =>
    setDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  const onNext = () => {
    if (!title.trim()) return alert("멘토링 제목을 입력해 주세요.");
    if (days.length === 0) return alert("가능 요일을 1개 이상 선택해 주세요.");

    navigation.navigate("RegisterStep4", {
      // 이전 단계 데이터
      category,
      years,
      role,
      company,
      intro,
      // 이번 단계 데이터
      title,
      mode,
      days,
      duration,
      description,
    });
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
        {/* 스텝 표시: 1,2단계 완료 → 3단계 활성 */}
        <View style={s.steps}>
          <StepDot checked />
          <StepBar />
          <StepDot checked />
          <StepBar />
          <StepDot checked />
          <StepBar />
          <StepDot active />
        </View>

        {/* 안내 */}
        <Text style={s.title}>
          멘토링 <Text style={{ color: BLUE }}>내용</Text>을 입력해주세요.
        </Text>
        <Text style={s.sub}>
          분야: {category ?? "-"} / 경력: {years ?? "-"} / {company ?? "-"}{" "}
          {role ? `· ${role}` : ""}
        </Text>

        {/* 제목 */}
        <Text style={s.label}>멘토링 제목</Text>
        <TextInput
          style={s.input}
          placeholder="예: 취준생을 위한 금융권 면접 코칭"
          value={title}
          onChangeText={setTitle}
        />

        {/* 진행 방식 */}
        <Text style={[s.label, { marginTop: 16 }]}>진행 방식</Text>
        <View style={s.rowWrap}>
          {MODES.map((m) => {
            const sel = mode === m;
            return (
              <Pressable
                key={m}
                onPress={() => setMode(m)}
                style={[s.chip, sel && s.chipActive]}
              >
                <Text style={[s.chipText, sel && s.chipTextActive]}>{m}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* 가능 요일 */}
        <Text style={[s.label, { marginTop: 16 }]}>가능 요일</Text>
        <View style={s.rowWrap}>
          {DAYS.map((d) => {
            const sel = days.includes(d);
            return (
              <Pressable
                key={d}
                onPress={() => toggleDay(d)}
                style={[s.chip, sel && s.chipActive]}
              >
                <Text style={[s.chipText, sel && s.chipTextActive]}>{d}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* 소요 시간 */}
        <Text style={[s.label, { marginTop: 16 }]}>1회 소요 시간</Text>
        <View style={s.rowWrap}>
          {DURATIONS.map((t) => {
            const sel = duration === t;
            return (
              <Pressable
                key={t}
                onPress={() => setDuration(t)}
                style={[s.chip, sel && s.chipActive]}
              >
                <Text style={[s.chipText, sel && s.chipTextActive]}>{t}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* 소개/설명 */}
        <Text style={[s.label, { marginTop: 16 }]}>소개 / 설명</Text>
        <TextInput
          style={[s.input, { height: 120 }]}
          multiline
          placeholder="멘토링에서 다룰 주제, 대상, 진행 방식 등을 자유롭게 적어주세요."
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={s.bottomBar}>
        <Pressable style={s.outlineBtn} onPress={() => navigation.goBack()}>
          <Text style={s.outlineText}>이전</Text>
        </Pressable>
        <Pressable style={s.primaryBtn} onPress={onNext}>
          <Text style={s.primaryText}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/** 🔁 이름만 변경: Dot → StepDot, Bar → StepBar */
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

  title: { fontSize: 18, fontWeight: "800" },
  sub: { marginTop: 6, fontSize: 13, color: GRAY },

  label: { marginTop: 12, marginBottom: 8, fontSize: 13, color: GRAY },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },
  chipActive: { backgroundColor: BLUE, borderColor: BLUE },
  chipText: { fontSize: 14, color: "#111827", fontWeight: "600" },
  chipTextActive: { color: "#fff" },

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
