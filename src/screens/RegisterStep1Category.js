import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const GRAY = "#6B7280";
const BORDER = "#E5E7EB";

const CATEGORIES = [
  "IT / 개발",
  "금융",
  "경영",
  "마케팅 / 브랜딩",
  "영업 / 고객관리",
  "인사 / 조직관리",
  "제조 / 생산",
  "교육 / 컨설팅",
];

export default function RegisterStep1Category({ navigation }) {
  const [selected, setSelected] = useState(null); // 단일 선택

  const goNext = () => {
    if (!selected) return alert("멘토링 분야를 선택해 주세요.");
    navigation.navigate("RegisterStep2", { category: selected });
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
        {/* 스텝 표시 */}
        <View style={s.steps}>
          <StepDot active checked />
          <StepBar />
          <StepDot active />
          <StepBar />
          <StepDot active />
          <StepBar />
          <StepDot active />
        </View>
        <View style={{ height: 8 }} />

        {/* 안내 문구 */}
        <Text style={s.thanks}>
          <Text style={{ color: BLUE, fontWeight: "800" }}>지식</Text>을
          나눠주셔서 감사합니다.
        </Text>
        <Text style={s.sub}>
          멘토분들의 소중한 경험은 청년들에게 큰 힘이 됩니다.{"\n"}
          성공적인 멘토링 시작을 위해 몇 가지를 입력해주세요.
        </Text>

        <Text style={s.sectionTitle}>
          멘토링 <Text style={{ color: BLUE }}>분야</Text>를 선택해주세요.
        </Text>

        {/* 카테고리 버튼 목록 */}
        <View style={{ gap: 12, marginTop: 8 }}>
          {CATEGORIES.map((label) => {
            const isSelected = selected === label;
            return (
              <Pressable
                key={label}
                onPress={() => setSelected(label)}
                style={({ pressed }) => [
                  s.catBtn,
                  isSelected && s.catBtnActive,
                  pressed && { opacity: 0.9 },
                ]}
              >
                <Text style={[s.catText, isSelected && s.catTextActive]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={s.bottomBar}>
        <Pressable style={s.outlineBtn} onPress={() => navigation.goBack()}>
          <Text style={s.outlineText}>이전</Text>
        </Pressable>
        <Pressable style={s.primaryBtn} onPress={goNext}>
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
    marginBottom: 10,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: BORDER,
    backgroundColor: "#fff",
  },
  bar: {
    width: 40,
    height: 2,
    backgroundColor: BORDER,
    marginHorizontal: 4,
  },

  thanks: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 6,
    textAlign: "left",
  },
  sub: { marginTop: 6, fontSize: 13, color: GRAY, lineHeight: 20 },
  sectionTitle: { marginTop: 16, fontSize: 18, fontWeight: "800" },

  catBtn: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  catBtnActive: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },
  catText: { fontSize: 16, fontWeight: "700", color: "#111827" },
  catTextActive: { color: "#fff" },

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
