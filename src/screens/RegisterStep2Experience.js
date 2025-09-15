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
const GRAY = "#6B7280";
const BORDER = "#E5E7EB";

const YEARS = ["1-", "1~3", "3~5", "5~7", "7+"]; // 예시 칩

export default function RegisterStep2Experience({ navigation, route }) {
  const category = route?.params?.category;

  const [years, setYears] = useState(""); // 연차
  const [role, setRole] = useState(""); // 직무
  const [company, setCompany] = useState(""); // 회사
  const [intro, setIntro] = useState(""); // 간단 소개

  const onNext = () => {
    if (!years) return alert("경력 연차를 선택해 주세요.");
    if (!role.trim()) return alert("직무(포지션)를 입력해 주세요.");
    if (!company.trim()) return alert("회사 또는 활동명을 입력해 주세요.");

    navigation.navigate("RegisterStep3", {
      category,
      years,
      role,
      company,
      intro,
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
        {/* 스텝 표시 (2단계 활성) */}
        <View style={s.steps}>
          <StepDot checked />
          <StepBar />
          <StepDot checked />
          <StepBar />
          <StepDot active />
          <StepBar />
          <StepDot active />
        </View>

        {/* 안내 */}
        <Text style={s.sectionTitle}>
          기본 <Text style={{ color: BLUE }}>경력 정보</Text>를 입력해주세요.
        </Text>
        <Text style={s.sub}>
          선택한 분야:{" "}
          <Text style={{ fontWeight: "700" }}>{category ?? "-"}</Text>
        </Text>

        {/* 경력 연차 칩 */}
        <Text style={s.label}>경력 연차</Text>
        <View style={s.chips}>
          {YEARS.map((y) => {
            const sel = years === y;
            return (
              <Pressable
                key={y}
                onPress={() => setYears(y)}
                style={[s.chip, sel && s.chipActive]}
              >
                <Text style={[s.chipText, sel && s.chipTextActive]}>{y}년</Text>
              </Pressable>
            );
          })}
        </View>

        {/* 직무 */}
        <Text style={[s.label, { marginTop: 16 }]}>직무 / 포지션</Text>
        <TextInput
          style={s.input}
          placeholder="예: 백엔드 개발자"
          value={role}
          onChangeText={setRole}
        />

        {/* 회사 */}
        <Text style={[s.label, { marginTop: 16 }]}>회사 / 활동명</Text>
        <TextInput
          style={s.input}
          placeholder="예: OO테크(주), 프리랜서"
          value={company}
          onChangeText={setCompany}
        />

        {/* 소개 */}
        <Text style={[s.label, { marginTop: 16 }]}>한 줄 소개 (선택)</Text>
        <TextInput
          style={[s.input, { height: 80 }]}
          placeholder="예: 대규모 트래픽 백엔드 운영 경험 공유"
          value={intro}
          onChangeText={setIntro}
          multiline
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

  sectionTitle: { fontSize: 18, fontWeight: "800" },
  sub: { marginTop: 6, fontSize: 13, color: GRAY, lineHeight: 20 },

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

  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
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
