// src/screens/ChatRoomScreen.js
import React, { useState, useRef } from "react";
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

export default function ChatRoomScreen({ route, navigation }) {
  const { peer } = route.params || {}; // { name, avatarInitial, category }
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    // 최신이 아래로 쌓이는 구조
    {
      id: "m1",
      me: false,
      body: "안녕하세요. 멘토링 진행 도와드릴게요 :)",
      time: "오후 3:10",
    },
    {
      id: "m2",
      me: true,
      body: "안녕하세요! 잘 부탁드립니다.",
      time: "오후 3:11",
    },
  ]);
  const listRef = useRef(null);

  const send = () => {
    if (!text.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      me: true,
      body: text.trim(),
      time: new Date().toLocaleTimeString().slice(0, 7),
    };
    setMessages((prev) => [...prev, newMsg]);
    setText("");
    requestAnimationFrame(() =>
      listRef.current?.scrollToEnd({ animated: true })
    );
  };

  const renderItem = ({ item }) => {
    const bubbleStyle = item.me ? s.bubbleMe : s.bubblePeer;
    const textStyle = item.me ? s.msgMe : s.msgPeer;
    return (
      <View
        style={[
          s.row,
          item.me
            ? { justifyContent: "flex-end" }
            : { justifyContent: "flex-start" },
        ]}
      >
        <View style={[s.bubbleBase, bubbleStyle]}>
          <Text style={textStyle}>{item.body}</Text>
          <Text style={s.time}>{item.time}</Text>
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
        <View style={{ alignItems: "center" }}>
          <Text style={s.title}>{peer?.name ?? "채팅"}</Text>
          {!!peer?.category && <Text style={s.subtitle}>{peer.category}</Text>}
        </View>
        <View style={{ width: 26 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        {/* 메시지 리스트 */}
        <FlatList
          ref={listRef}
          contentContainerStyle={{ padding: 16, paddingBottom: 12 }}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* 입력창 */}
        <View style={s.inputBar}>
          <TextInput
            style={s.input}
            placeholder="메시지를 입력하세요"
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable style={s.sendBtn} onPress={send}>
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: { fontSize: 16, fontWeight: "800", color: "#111" },
  subtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  row: { flexDirection: "row", marginVertical: 6 },
  bubbleBase: {
    maxWidth: "78%",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bubblePeer: { backgroundColor: "#F3F4F6" },
  bubbleMe: { backgroundColor: BLUE },
  msgPeer: { color: "#111" },
  msgMe: { color: "#fff" },
  time: { fontSize: 10, color: "#9CA3AF", marginTop: 4 },

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
});
