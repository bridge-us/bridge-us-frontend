// App.js 
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";

// Role context
import { RoleProvider, useRole } from "./src/context/RoleContext";

// Auth / 기본
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MainScreen from "./src/screens/MainScreen";
import MyPageScreen from "./src/screens/MyPageScreen";

// Mentor 등록 플로우
import RegisterStep1Category from "./src/screens/RegisterStep1Category";
import RegisterStep2Experience from "./src/screens/RegisterStep2Experience";
import RegisterStep3Details from "./src/screens/RegisterStep3Details";
import RegisterStep4Confirm from "./src/screens/RegisterStep4Confirm";

// 기타
import MentorDetailScreen from "./src/screens/MentorDetailScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ChatRoomScreen from "./src/screens/ChatRoomScreen";
import ApplyCompleteScreen from "./src/screens/ApplyCompleteScreen";
import MentorReviewsScreen from "./src/screens/MentorReviewsScreen";
import OpenChatRoomScreen from "./src/screens/OpenChatRoomScreen";

// 게시판
import BoardScreen from "./src/screens/BoardScreen";
import BoardPostScreen from "./src/screens/BoardPostScreen";
import BoardWriteScreen from "./src/screens/BoardWriteScreen";

// 멘티 랜딩 & 신청 목록
import MenteeLandingScreen from "./src/screens/MenteeLandingScreen";
import AppliedMentoring from "./src/screens/AppliedMentoring";

// ✅ 마이페이지 관련 (외부 파일)
import EditProfileScreen from "./src/screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

function RoleSelectScreen({ navigation }) {
  const { setRole } = useRole();
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>역할을 선택하세요</Text>
      <Pressable onPress={() => setRole("MENTOR")} style={btnS.btn}><Text style={btnS.txt}>멘토</Text></Pressable>
      <Pressable onPress={() => setRole("MENTEE")} style={btnS.btn}><Text style={btnS.txt}>멘티</Text></Pressable>
      <Pressable onPress={() => navigation.replace("Main")} style={[btnS.btn, { backgroundColor: "#2A62F4", borderColor: "#2A62F4" }]}>
        <Text style={[btnS.txt, { color: "#fff" }]}>진입</Text>
      </Pressable>
    </View>
  );
}

const btnS = {
  btn: { paddingVertical: 14, alignItems: "center", borderRadius: 12, borderWidth: 1, borderColor: "#E0E0E0", backgroundColor: "#FFF" },
  txt: { fontSize: 16, fontWeight: "600", color: "#111" }
};

export default function App() {
  return (
    <RoleProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          {/* 역할 선택 */}
          <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />

          {/* Auth / 기본 */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="MyPage" component={MyPageScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />

          {/* Mentor 등록 플로우 */}
          <Stack.Screen name="RegisterStep1" component={RegisterStep1Category} />
          <Stack.Screen name="RegisterStep2" component={RegisterStep2Experience} />
          <Stack.Screen name="RegisterStep3" component={RegisterStep3Details} />
          <Stack.Screen name="RegisterStep4" component={RegisterStep4Confirm} />

          {/* 기타 */}
          <Stack.Screen name="MentorDetail" component={MentorDetailScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
          <Stack.Screen name="ApplyComplete" component={ApplyCompleteScreen} />
          <Stack.Screen name="MentorReviews" component={MentorReviewsScreen} />
          <Stack.Screen name="OpenChatRoom" component={OpenChatRoomScreen} />

          {/* 게시판 */}
          <Stack.Screen name="Board" component={BoardScreen} />
          <Stack.Screen name="BoardPost" component={BoardPostScreen} />
          <Stack.Screen name="BoardWrite" component={BoardWriteScreen} />

          {/* 멘티 */}
          <Stack.Screen name="MenteeLanding" component={MenteeLandingScreen} />
          <Stack.Screen name="AppliedMentoring" component={AppliedMentoring} />
        </Stack.Navigator>
      </NavigationContainer>
    </RoleProvider>
  );
}
