// src/screens/MentorDetailScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";
const LIGHT = "#F3F4F6";

export default function MentorDetailScreen({ route, navigation }) {
  const mentor = route?.params?.mentor ?? {
    name: "김재헌",
    headline: "iOS 개발 경력 주니어분들에게 가르쳐드립니다",
    career: "네이버, 쿠팡 (17년)",
    category: "iOS 개발자",
    mode: "온라인",
    avatarInitial: "김",
  };

  const [openGuide, setOpenGuide] = useState(false);

  // ✅ 신청 확인 → 완료 화면으로 이동
  const onConfirmApply = () => {
    setOpenGuide(false);
    navigation.navigate("ApplyComplete", { mentor });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 헤더 */}
      <View style={s.header}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </Pressable>
        <Text style={s.headerTitle}>멘토링 상세</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 상단 프로필 카드 */}
        <View style={s.card}>
          <View style={s.cardTop}>
            <Text style={s.smallTag}>{mentor.category}</Text>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{mentor.avatarInitial || "멘"}</Text>
            </View>
          </View>

          <Text style={s.name}>{mentor.name}</Text>
          <Text style={s.headline}>{mentor.headline}</Text>

          <View style={s.row}>
            <Text style={s.key}>경력</Text>
            <Text style={s.val}>{mentor.career}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.key}>분야</Text>
            <Text style={s.val}>{mentor.category}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.key}>진행방식</Text>
            <Text style={s.val}>{mentor.mode}</Text>
          </View>
        </View>

        {/* 설명 카드들 */}
        <View style={s.section}>
          <View style={s.sectionTitleWrap}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={BLUE}
            />
            <Text style={s.sectionTitle}>멘토 소개</Text>
          </View>
          <Text style={s.bodyText}>멘토 소개입니다.</Text>
        </View>

        <View style={s.section}>
          <View style={s.sectionTitleWrap}>
            <Ionicons name="list-outline" size={18} color={BLUE} />
            <Text style={s.sectionTitle}>멘토링은 이렇게 진행돼요</Text>
          </View>
          <View style={{ gap: 8, marginTop: 6 }}>
            <View style={s.dotRow}>
              <Text style={s.dot}>•</Text>
              <Text style={s.bodyText}>이런 것에 대해 멘토링합니다.</Text>
            </View>
            <View style={s.dotRow}>
              <Text style={s.dot}>•</Text>
              <Text style={s.bodyText}>저런 것에 대해 멘토링합니다.</Text>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.sectionTitleWrap}>
            <Ionicons name="checkmark-circle-outline" size={18} color={BLUE} />
            <Text style={s.sectionTitle}>이런 걸 준비해주세요</Text>
          </View>
          <View style={{ gap: 8, marginTop: 6 }}>
            <View style={s.dotRow}>
              <Text style={s.dot}>•</Text>
              <Text style={s.bodyText}>이런 걸 준비해주세요.</Text>
            </View>
            <View style={s.dotRow}>
              <Text style={s.dot}>•</Text>
              <Text style={s.bodyText}>저런 걸 미리 준비해주세요.</Text>
            </View>
          </View>
        </View>

        {/* 가격/시간 카드 */}
        <View style={s.priceCard}>
          <Text style={s.priceTitle}>멘토링 1회</Text>
          <View style={{ marginTop: 10, gap: 10 }}>
            <View style={s.row}>
              <Text style={s.key}>시간</Text>
              <Text style={[s.val, { fontWeight: "800" }]}>30분</Text>
            </View>
            <View style={s.row}>
              <Text style={s.key}>가격</Text>
              <Text style={[s.val, { fontWeight: "800" }]}>16,500원</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 하단 신청 버튼 */}
      <Pressable style={s.applyBtn} onPress={() => setOpenGuide(true)}>
        <Text style={s.applyText}>신청하기</Text>
      </Pressable>

      {/* 신청 유의사항 모달 */}
      <Modal visible={openGuide} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setOpenGuide(false)}>
          <View style={s.backdrop} />
        </TouchableWithoutFeedback>

        <View style={s.modalWrap}>
          <Text style={s.modalTitle}>멘토링 신청</Text>
          <Text style={s.modalSubTitle}>※ 신청 시 유의사항 ※</Text>

          <View style={{ marginTop: 10, gap: 8 }}>
            <GuideItem text="멘토에게 예의를 지켜주세요." />
            <GuideItem text="신청 시 멘토에게 멘티 정보가 이메일로 전달됩니다." />
            <GuideItem text="멘토 수락 후, 멘토의 연락 정보가 멘티 이메일로 발송됩니다." />
            <GuideItem text="이메일을 확인하여 멘토와 일정 및 진행을 조율해주세요." />
            <GuideItem text="세부 일정과 진행 방식은 멘토와 협의해주세요." />
          </View>

          <View style={s.modalBtns}>
            <Pressable
              style={[s.modalBtn, s.cancelBtn]}
              onPress={() => setOpenGuide(false)}
            >
              <Text style={[s.modalBtnText, { color: "#111" }]}>취소</Text>
            </Pressable>
            <Pressable
              style={[s.modalBtn, s.confirmBtn]}
              onPress={onConfirmApply} // ✅ 여기서 완료 화면으로 이동
            >
              <Text style={[s.modalBtnText, { color: "#fff" }]}>신청하기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function GuideItem({ text }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
      <Text style={{ color: BLUE, marginTop: 2 }}>•</Text>
      <Text style={{ color: "#111827", lineHeight: 20 }}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 20, fontWeight: "800" },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallTag: { color: "#9CA3AF", fontSize: 13, marginBottom: 8 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "800" },

  name: { marginTop: 8, fontSize: 18, fontWeight: "800" },
  headline: { marginTop: 6, fontSize: 16, fontWeight: "700" },
  row: { marginTop: 8, flexDirection: "row", gap: 10 },
  key: { width: 64, color: GRAY },
  val: { flex: 1, fontWeight: "600" },

  section: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitleWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  sectionTitle: { fontWeight: "800", fontSize: 15 },
  bodyText: { color: "#111827" },
  dotRow: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  dot: { color: GRAY, marginTop: 1 },

  priceCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  priceTitle: { fontWeight: "800", fontSize: 16 },

  applyBtn: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    height: 56,
    borderRadius: 16,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  applyText: { color: "#fff", fontWeight: "800", fontSize: 17 },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalWrap: {
    position: "absolute",
    left: 24,
    right: 24,
    top: "18%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  modalTitle: { fontSize: 20, fontWeight: "900", marginBottom: 8 },
  modalSubTitle: { color: GRAY, fontWeight: "700" },

  modalBtns: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  modalBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: { backgroundColor: LIGHT, borderWidth: 1, borderColor: BORDER },
  confirmBtn: { backgroundColor: BLUE },
  modalBtnText: { fontWeight: "800", fontSize: 16 },
});
