// src/screens/BoardScreen.js
import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTab from '../components/BottomTab';

const BLUE = '#2563EB';
const BORDER = '#E5E7EB';
const GRAY = '#6B7280';

export default function BoardScreen({ navigation }) {
  // NOTE: Replace with API data later
  const news = useMemo(
    () => [
      { id: 'n1', title: '하반기 공채 일정 총정리', summary: '대기업/공기업 채용 캘린더 모음', time: '2시간 전', source: 'Bridge 뉴스' },
      { id: 'n2', title: '자소서 트렌드 5가지', summary: '핵심 경험 정리법과 금지어 체크', time: '어제', source: 'Bridge 뉴스' },
    ],
    []
  );

  const community = useMemo(
    () => [
      { id: 'c1', title: '면접 망했어요 ㅠ', body: '기술 질문에서 버벅였는데 대처법 있을까요?', author: '익명', time: '1시간 전' },
      { id: 'c2', title: '포트폴리오 피드백 부탁', body: '프로젝트 3개 정리했는데 방향성 확인 바랍니다.', author: '재준', time: '3시간 전' },
    ],
    []
  );

  const renderNews = ({ item }) => (
    <Pressable
      style={s.card}
      onPress={() =>
        navigation.navigate('BoardPost', {
          post: {
            ...item,
            category: '취업정보',
            commentsList: [
              { id: '1', author: '익명', body: '좋은 정보 감사합니다!', time: '1시간 전' },
              { id: '2', author: '김유진', body: '이거 진짜 유용했어요', time: '30분 전' },
            ],
          },
        })
      }
    >
      <View style={s.cardTop}>
        <Text style={s.smallTag}>취업정보 · {item.time}</Text>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
      <Text style={s.title}>{item.title}</Text>
      <Text style={s.body} numberOfLines={2}>{item.summary}</Text>
    </Pressable>
  );

  const renderCommunity = ({ item }) => (
    <Pressable
      style={s.card}
      onPress={() =>
        navigation.navigate('BoardPost', {
          post: {
            ...item,
            category: '취준게시판',
            commentsList: [
              { id: '3', author: '재헌', body: '저도 이런 경험 있었어요', time: '2시간 전' },
              { id: '4', author: '익명', body: '힘내세요! 다음엔 잘될거에요!', time: '1시간 전' },
            ],
          },
        })
      }
    >
      <View style={s.cardTop}>
        <Text style={s.smallTag}>{item.author ?? '익명'} · {item.time}</Text>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
      <Text style={s.title}>{item.title}</Text>
      <Text style={s.body} numberOfLines={2}>{item.body}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 헤더 */}
      <View style={s.topBar}>
        <Text style={s.brand}>
          <Text style={{ fontWeight: '900', color: '#111827' }}>Bridge</Text>
          <Text style={{ color: BLUE, fontWeight: '900' }}> · Us</Text>
        </Text>
        <Pressable hitSlop={10} onPress={() => alert('검색 준비중')}>
          <Ionicons name="search" size={24} color="#111" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 110 }}>
        {/* 섹션: 취업정보 */}
        <View style={s.sectionHead}>
          <Text style={s.sectionTitle}>취업정보</Text>
          <Pressable hitSlop={8} onPress={() => alert('더보기 준비중')}>
            <Text style={s.more}>더보기</Text>
          </Pressable>
        </View>
        <FlatList
          data={news}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderNews}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          scrollEnabled={false}
        />

        {/* 섹션: 취준생 게시판 */}
        <View style={[s.sectionHead, { marginTop: 24 }]}>
          <Text style={s.sectionTitle}>취준생 게시판</Text>
          <Pressable hitSlop={8} onPress={() => alert('더보기 준비중')}>
            <Text style={s.more}>더보기</Text>
          </Pressable>
        </View>
        <FlatList
          data={community}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderCommunity}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* 하단 탭 */}
      <BottomTab navigation={navigation} active="Board" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  topBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#fff',
  },
  brand: { fontSize: 22 },
  sectionHead: {
    marginTop: 4,
    marginBottom: 10,
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111' },
  more: { fontSize: 13, color: GRAY, fontWeight: '700' },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  smallTag: { color: '#9CA3AF', fontSize: 13 },
  title: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 6 },
  body: { fontSize: 14, color: '#374151' },
});