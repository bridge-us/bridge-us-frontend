// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth / 기본
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MainScreen from "./src/screens/MainScreen";

// Mentor 등록 플로우
import RegisterStep1Category from "./src/screens/RegisterStep1Category";
import RegisterStep2Experience from "./src/screens/RegisterStep2Experience";
import RegisterStep3Details from "./src/screens/RegisterStep3Details";
import RegisterStep4Confirm from "./src/screens/RegisterStep4Confirm";

// 기타
import MentorDetailScreen from "./src/screens/MentorDetailScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ApplyCompleteScreen from "./src/screens/ApplyCompleteScreen";
import ChatRoomScreen from "./src/screens/ChatRoomScreen";

// 추가된 화면
import MentorReviewsScreen from "./src/screens/MentorReviewsScreen";
import OpenChatRoomScreen from "./src/screens/OpenChatRoomScreen";

// 게시판
import BoardScreen from "./src/screens/BoardScreen";
import BoardPostScreen from "./src/screens/BoardPostScreen";
import BoardWriteScreen from "./src/screens/BoardWriteScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Auth / 기본 */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />

        {/* Mentor 등록 플로우 */}
        <Stack.Screen name="RegisterStep1" component={RegisterStep1Category} />
        <Stack.Screen
          name="RegisterStep2"
          component={RegisterStep2Experience}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
