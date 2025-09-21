// src/screens/OpenChatRoomScreen.js
import React, { useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2563EB";
const BORDER = "#E5E7EB";
const GRAY = "#6B7280";

// 더미 메시지
const INITIAL = [
  {
    id: "m1",
    user: "홍길동",
    text: "안녕하세요! 취준 팁 공유해요 🙌",
    me: false,
    time: "오전 10:11",
  },
  {
    id: "m2",
    user: "Me",
    text: "반가워요! 코테 자료 어디서 보셨어요?",
    me: true,
    time: "오전 10:12",
  },
  {
    id: "m3",
    user: "박지수",
    text: "백준/프로그래머스 문제집 추천 드려요.",
    me: false,
    time: "오전 10:13",
  },
];

export default function OpenChatRoomScreen({ navigation, route }) {
  const roomTitle = route?.params?.title ?? "취준생 오픈 채팅";
  const [messages, setMessages] = useState(INITIAL);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  const data = useMemo(() => messages, [messages]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const newMsg = {
      id: String(Date.now()),
      user: "Me",
      text: t,
      me: true,
      time: "지금",
    };
    setMessages((prev) => [...prev, newMsg]);
    setText("");
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  };

  const renderItem = ({ item }) => {
    const mine = item.me;
    return (
      <View style={[s.row, mine ? s.rowMe : s.rowOther]}>
        {!mine && (
          <View style={s.avatar}>
            <Text style={s.avatarText}>{item.user?.[0] ?? "유"}</Text>
          </View>
        )}
        <View style={[s.bubble, mine ? s.bubbleMe : s.bubbleOther]}>
          {!mine && <Text style={s.name}>{item.user}</Text>}
          <Text style={[s.msg, mine && { color: "#fff" }]}>{item.text}</Text>
          <Text style={[s.time, mine && { color: "rgba(255,255,255,0.9)" }]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 헤더 */}
      <View style={s.header}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={s.headerTitle}>{roomTitle}</Text>
          <Text style={s.headerSub}>지금 128명 참여중</Text>
        </View>
        <Pressable hitSlop={10} onPress={() => {}}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#111" />
        </Pressable>
      </View>

      {/* 메시지 리스트 */}
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* 입력 바 */}
      <KeyboardAvoidingKeyboardBar
        text={text}
        setText={setText}
        onSend={send}
      />
    </SafeAreaView>
  );
}

/** 입력 바(키보드 회피 포함) */
function KeyboardAvoidingKeyboardBar({ text, setText, onSend }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
    >
      <View style={s.inputWrap}>
        <TextInput
          style={s.input}
          placeholder="메시지를 입력하세요"
          value={text}
          onChangeText={setText}
          multiline
        />
        <Pressable style={s.send} onPress={onSend}>
          <Ionicons name="send" size={18} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 54,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  headerTitle: { fontSize: 16, fontWeight: "800", color: "#111" },
  headerSub: { fontSize: 12, color: GRAY, marginTop: 2 },

  row: { flexDirection: "row", marginBottom: 12, alignItems: "flex-end" },
  rowOther: { justifyContent: "flex-start" },
  rowMe: { justifyContent: "flex-end" },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarText: { color: "#fff", fontWeight: "800" },

  bubble: {
    maxWidth: "78%",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
  },
  bubbleOther: { backgroundColor: "#fff", borderColor: BORDER },
  bubbleMe: { backgroundColor: BLUE, borderColor: BLUE },

  name: { color: GRAY, marginBottom: 2, fontSize: 12 },
  msg: { fontSize: 15, color: "#111827" },
  time: { marginTop: 4, fontSize: 11, color: GRAY, alignSelf: "flex-end" },

  inputWrap: {
    flexDirection: "row",
    gap: 8,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
  },
  send: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BLUE,
  },
});
