import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BLUE = '#2563EB';
const GRAY = '#6B7280';

export default function BottomTab({ navigation, active }) {
  return (
    <View style={s.bar}>
      <TabButton label="홈" icon="home" active={active === 'Home'} onPress={() => navigation.navigate('Main')} />
      <TabButton label="채팅" icon="chatbubbles" active={active === 'Chat'} onPress={() => navigation.navigate('Chat')} />
      <TabButton label="게시판" icon="document-text" active={active === 'Board'} onPress={() => navigation.navigate('Board')} />
      <TabButton label="마이페이지" icon="person" active={active === 'MyPage'} onPress={() => navigation.navigate('MyPage')} />
    </View>
  );
}

function TabButton({ label, icon, active, onPress }) {
  return (
    <Pressable style={s.btn} onPress={onPress}>
      <Ionicons name={icon} size={22} color={active ? BLUE : GRAY} />
      <Text style={[s.label, { color: active ? BLUE : GRAY }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  btn: { alignItems: 'center', gap: 2 },
  label: { fontSize: 11, marginTop: 2 },
});
