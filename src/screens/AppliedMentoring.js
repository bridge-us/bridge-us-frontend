import React from 'react';
import { useRole } from '../context/RoleContext';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTab from '../components/BottomTab';

const BLUE = '#2A62F4';
const BORDER = '#E5E7EB';
const GRAY = '#6B7280';

//더미 데이터 
const list = [
  { id: 1, name: '김재헌', headline: 'iOS 개발 멘토링', career: '네이버, 쿠팡 (17년)', role: 'iOS 개발자', mode: '온라인', status: '진행중' },
  { id: 2, name: '김현진', headline: '금융권 멘토링', career: '국민은행 (2년차)', role: '영업관리', mode: '온라인', status: '대기중' },
];

export default function AppliedMentoring({ navigation }) {
  const { setRole } = useRole();

  const renderItem = ({ item }) => (
    <Pressable style={s.card} onPress={() => navigation.navigate('MentorDetail', { id: item.id, name: item.name, fromApplied: true })}>
      {/* 상단 (카테고리 텍스트 자리 대신 작은 정보) */}
      <View style={s.cardTop}>
        <Text style={[s.smallTag, item.status === '진행중' ? s.statusActive : s.statusPending]}>{item.status}</Text>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{item.name.slice(0,1)}</Text>
        </View>
      </View>

      <Text style={s.name}>{item.name}</Text>
      <Text style={s.headline}>{item.headline}</Text>

      <View style={s.row}>
        <Text style={s.key}>경력</Text>
        <Text style={s.val}>{item.career}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.key}>분야</Text>
        <Text style={s.val}>{item.role}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.key}>방식</Text>
        <Text style={s.val}>{item.mode}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 상단 바 */}
      <View style={s.topBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            hitSlop={12}
            accessibilityLabel="뒤로가기"
            accessibilityRole="button"
            onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('MyPage'))}
            style={s.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#111" />
            <Text style={s.backTxt}>뒤로가기</Text>
          </Pressable>
          <View style={s.brand}>
            <Text style={s.brandBridge}>Bridge</Text>
            <Text style={s.brandDot}> · </Text>
            <Text style={s.brandUs}>Us</Text>
          </View>
        </View>
        <Pressable hitSlop={10} onPress={() => alert('검색 준비중')}>
          <Ionicons name="search" size={28} color="#111" />
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
      />

      {/* 공용 하단 탭 */}
      <BottomTab navigation={navigation} active="home" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  topBar: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 12, gap: 4 },
  backTxt: { fontSize: 13, color: '#111' },

  /* 브랜드 로고 (Bridge · Us) */
  brand: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandBridge: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.3,
  },
  brandDot: {
    fontSize: 30,
    fontWeight: '900',
    color: BLUE,
    marginHorizontal: 2,
  },
  brandUs: {
    fontSize: 30,
    fontWeight: '900',
    color: BLUE,
    letterSpacing: -0.3,
  },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallTag: { color: '#9CA3AF', fontSize: 13, marginBottom: 8 },
  statusActive: { color: '#16A34A' }, 
  statusPending: { color: '#D97706' }, 
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  name: { marginTop: 8, fontSize: 19, fontWeight: '800', color: '#111' },
  headline: { marginTop: 6, fontSize: 15, fontWeight: '600', color: '#333' },
  row: { marginTop: 8, flexDirection: 'row', gap: 10 },
  key: { width: 56, color: GRAY },
  val: { flex: 1, fontWeight: '600', color: '#111' },
});