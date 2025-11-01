import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BLUE = '#2563EB';
const BORDER = '#E5E7EB';
const GRAY = '#6B7280';

export default function BoardPostScreen({ navigation, route }) {
  const { post = {} } = route.params || {};
  const isNews = post?.category === '취업정보' || !!post?.source;

  // 초기 댓글: 전달된 commentsList 사용 (없으면 빈 배열)
  const [comments, setComments] = useState(Array.isArray(post?.commentsList) ? post.commentsList : []);
  const [text, setText] = useState('');
  const listRef = useRef(null);

  const headerContent = useMemo(() => (
    <View style={{ padding: 16, paddingBottom: 8 }}>
      {/* 메타 */}
      <Text style={s.metaRow}>
        {isNews ? `${post?.source ?? '뉴스'} · ${post?.time ?? ''}` : `${post?.author ?? '작성자'} · ${post?.time ?? ''}`}
      </Text>
      {/* 제목 */}
      <Text style={s.postTitle}>{post?.title ?? '제목 없음'}</Text>
      {/* 본문 */}
      <View style={s.content}>
        <Text style={{ lineHeight: 22, color: '#111' }}>
          {isNews ? (post?.summary ?? '요약 정보가 없습니다.') : (post?.body ?? '본문 내용은 준비 중입니다.')}
        </Text>
      </View>
      <View style={s.hr} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Ionicons name="chatbubble-ellipses-outline" size={16} color={GRAY} />
        <Text style={{ color: GRAY, fontSize: 13 }}>댓글 {comments.length}</Text>
      </View>
    </View>
  ), [comments.length, isNews, post?.author, post?.body, post?.summary, post?.time, post?.title, post?.source]);

  const renderComment = ({ item }) => (
    <View style={s.commentItem}>
      <View style={s.avatar}>
        <Ionicons name="person-outline" size={16} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
          <Text style={s.commentAuthor}>{item.author ?? '익명'}</Text>
          <Text style={s.commentTime}>{item.time ?? ''}</Text>
        </View>
        <Text style={s.commentBody}>{item.body}</Text>
      </View>
    </View>
  );

  const onSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newCmt = { id: Date.now().toString(), author: '나', time: '방금', body: trimmed };
    setComments((prev) => [...prev, newCmt]);
    setText('');
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollToEnd({ animated: true });
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 헤더 */}
      <View style={s.header}>
        <Pressable hitSlop={10} onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Board'))}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={s.title}>{isNews ? '취업정보' : '게시글'}</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* 본문 + 댓글 목록 */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <FlatList
          ref={listRef}
          data={comments}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderComment}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={headerContent}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
        />

        {/* 입력 박스 */}
        <View style={s.inputWrap}>
          <TextInput
            style={s.input}
            value={text}
            onChangeText={setText}
            placeholder="댓글을 입력하세요"
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          <Pressable style={[s.sendBtn, !text.trim() && { opacity: 0.5 }]} disabled={!text.trim()} onPress={onSubmit}>
            <Ionicons name="paper-plane" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 52,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: '#fff',
  },
  title: { fontSize: 16, fontWeight: '800' },
  postTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginTop: 4 },
  metaRow: { color: GRAY },
  content: { marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: BORDER },
  hr: { height: 1, backgroundColor: BORDER, marginTop: 16, marginBottom: 8 },

  // 댓글
  commentItem: { flexDirection: 'row', gap: 10, paddingVertical: 8 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  commentAuthor: { fontWeight: '800', color: '#111' },
  commentTime: { color: GRAY, fontSize: 12 },
  commentBody: { color: '#374151', marginTop: 2, lineHeight: 20 },

  // 입력 박스
  inputWrap: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    padding: 12,
    flexDirection: 'row', alignItems: 'flex-end', gap: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: BORDER,
  },
  input: {
    flex: 1,
    minHeight: 40, maxHeight: 120,
    paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: BORDER, borderRadius: 12,
    backgroundColor: '#fff', color: '#111',
  },
  sendBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
});
