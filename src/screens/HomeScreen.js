import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={s.container}>
        <Text style={s.title}>역할을 선택하세요</Text>

        {/* 멘토 카드 */}
        <Pressable
          style={({ pressed }) => [s.card, pressed && s.pressed]}
          onPress={() => navigation.navigate("RegisterStep1")}
        >
          <Ionicons name="school-outline" size={28} color="#2563EB" />
          <Text style={s.cardTitle}>멘토</Text>
          <Text style={s.cardDesc}>경험을 등록하고 멘티를 만나보세요</Text>
        </Pressable>

        {/* 멘티 카드 */}
        <Pressable
          style={({ pressed }) => [s.card, pressed && s.pressed]}
          onPress={() => navigation.navigate("MenteeLanding")}
        >
          <Ionicons name="people-outline" size={28} color="#2563EB" />
          <Text style={s.cardTitle}>멘티</Text>
          <Text style={s.cardDesc}>관심 분야의 멘토를 찾아보세요</Text>
        </Pressable>

        {/* 로그아웃 버튼 */}
        <Pressable
          style={s.logoutBtn}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={s.logoutText}>로그아웃</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  card: {
    backgroundColor: "#F9FAFB",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },
  pressed: { opacity: 0.9 },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardDesc: { color: "#6B7280" },

  // 로그아웃 버튼 스타일
  logoutBtn: {
    marginTop: "auto", // 화면 하단으로 밀림
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#EF4444", // 빨간색 버튼
  },
  logoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
