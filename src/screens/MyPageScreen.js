// src/screens/MyPageScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "../components/BottomTab";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";

export default function MyPageScreen({ navigation }) {
  /** 로그아웃 */
  const handleLogout = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "확인", onPress: () => navigation.navigate("Login") },
    ]);
  };

  /** 회원탈퇴 */
  const handleWithdraw = () => {
    Alert.alert("회원탈퇴", "정말 회원탈퇴를 진행하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "탈퇴", onPress: () => alert("회원탈퇴 완료되었습니다.") },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 상단 로고 (왼쪽 정렬) */}
      <View style={s.header}>
        <Text style={s.brandBridge}>Bridge</Text>
        <Text style={s.brandDot}> · </Text>
        <Text style={s.brandUs}>Us</Text>
      </View>

      {/* 프로필 영역 */}
      <View style={s.profileArea}>
        <View style={s.avatar}>
          <Ionicons name="person-outline" size={60} color="#444" />
        </View>
        <Text style={s.userName}>강홍구</Text>
      </View>

      {/* 메뉴 버튼 영역 */}
      <View style={s.menuBox}>
        {/* 회원정보 수정 버튼 */}
        <Pressable
          style={s.menuItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons name="person-outline" size={20} color="#111" />
          <Text style={s.menuText}>회원정보 수정</Text>
        </Pressable>

        {/* 내 멘토링 관리 */}
        <Pressable
          style={s.menuItem}
          onPress={() => alert("내 멘토링 관리 화면으로 이동")}
        >
          <Ionicons name="chatbubbles-outline" size={20} color="#111" />
          <Text style={s.menuText}>내 멘토링 관리</Text>
        </Pressable>

        {/* 회원탈퇴 */}
        <Pressable style={s.menuItem} onPress={handleWithdraw}>
          <Ionicons name="alert-circle-outline" size={20} color="red" />
          <Text style={[s.menuText, { color: "red" }]}>회원탈퇴</Text>
        </Pressable>
      </View>

      {/* 로그아웃 버튼 */}
      <Pressable style={s.logoutBtn} onPress={handleLogout}>
        <Text style={s.logoutText}>로그아웃</Text>
      </Pressable>

      {/* 하단 탭 */}
      <BottomTab navigation={navigation} active="mypage" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  /** 상단 로고 영역 */
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  brandBridge: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
  },
  brandDot: {
    fontSize: 26,
    fontWeight: "900",
    color: BLUE,
  },
  brandUs: {
    fontSize: 26,
    fontWeight: "900",
    color: BLUE,
  },

  /** 프로필 영역 */
  profileArea: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  /** 메뉴 버튼 */
  menuBox: {
    marginHorizontal: 28,
    marginTop: 10,
    gap: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },

  /** 로그아웃 버튼 */
  logoutBtn: {
    backgroundColor: BLUE,
    marginTop: 36,
    marginHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
