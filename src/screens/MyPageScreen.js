// src/screens/MyPageScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import BottomTab from '../components/BottomTab';

const BLUE = '#2563EB';
const BORDER = '#E5E7EB';
const GRAY = '#6B7280';

export default function MyPageScreen({ navigation }) {
  
  const userName = '김재헌';

  const [avatarUri, setAvatarUri] = useState(null);

  /** 로그아웃 */
  const handleLogout = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: () => navigation.navigate('Login') },
    ]);
  };

  /** 회원탈퇴 */
  const handleWithdraw = () => {
    Alert.alert('회원탈퇴', '정말 회원탈퇴를 진행하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '탈퇴', onPress: () => Alert.alert('완료', '회원탈퇴가 완료되었습니다.') },
    ]);
  };

  async function ensureLibraryPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '앨범 접근 권한이 필요합니다. 설정에서 허용해주세요.');
      return false;
    }
    return true;
  }

  async function ensureCameraPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '카메라 접근 권한이 필요합니다. 설정에서 허용해주세요.');
      return false;
    }
    return true;
  }

  async function pickFromLibrary() {
    const ok = await ensureLibraryPermission();
    if (!ok) return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (!res.canceled && res.assets && res.assets[0]?.uri) {
      setAvatarUri(res.assets[0].uri);
    }
  }

  async function takePhoto() {
    const ok = await ensureCameraPermission();
    if (!ok) return;
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (!res.canceled && res.assets && res.assets[0]?.uri) {
      setAvatarUri(res.assets[0].uri);
    }
  }

  function onEditAvatar() {
    Alert.alert('프로필 사진', '변경 방식을 선택하세요', [
      { text: '앨범에서 선택', onPress: pickFromLibrary },
      { text: '카메라로 촬영', onPress: takePhoto },
      { text: '취소', style: 'cancel' },
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 헤더: Bridge · Us */}
      <View style={s.header}>
        <Text style={s.brand}><Text style={{ fontWeight: '900' }}>Bridge</Text> <Text style={{ color: BLUE, fontWeight: '900' }}>· Us</Text></Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        {/* 아바타 + 이름 */}
        <View style={s.centerBox}>
          <View style={s.avatarWrap}>
            <View style={s.avatarCircle}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={s.avatarImg} />
              ) : (
                <Ionicons name="person-outline" size={48} color="#111" />
              )}
            </View>
            <Pressable
              style={s.editBtn}
              hitSlop={8}
              accessibilityLabel="프로필 사진 변경"
              accessibilityRole="button"
              onPress={onEditAvatar}
            >
              <Ionicons name="pencil" size={16} color="#fff" />
            </Pressable>
          </View>
          <Text style={s.userName}>{userName}</Text>
        </View>

        {/* 메뉴 버튼들 */}
        <View style={{ gap: 12, marginTop: 8 }}>
          <MenuButton label="회원정보 수정" onPress={() => navigation.navigate('ProfileEdit')} />
          <MenuButton label="내 멘토링 관리" onPress={() => navigation.navigate('AppliedMentoring')} />
          <MenuButton label="내 게시물 관리" onPress={() => { /* navigation.navigate('MyPosts') */ }} />
          <MenuButton label="회원탈퇴" onPress={handleWithdraw} />
        </View>

        {/* 로그아웃 버튼 */}
        <Pressable style={s.logoutBtn} onPress={handleLogout}>
          <Text style={s.logoutTxt}>로그아웃</Text>
        </Pressable>
      </ScrollView>

      {/* 하단 탭 */}
      <BottomTab navigation={navigation} active="MyPage" />
    </SafeAreaView>
  );
}

function MenuButton({ label, onPress }) {
  return (
    <Pressable style={s.menuBtn} onPress={onPress}>
      <Text style={s.menuTxt}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </Pressable>
  );
}

const s = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#fff',
  },
  brand: { fontSize: 22, color: '#111' },

  centerBox: { alignItems: 'center', marginTop: 12, marginBottom: 16 },
  avatarWrap: { position: 'relative', width: 100, height: 100 },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  avatarImg: { width: 100, height: 100, borderRadius: 50 },
  editBtn: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: { marginTop: 10, fontSize: 18, fontWeight: '800', color: '#111' },

  menuBtn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuTxt: { fontSize: 14, fontWeight: '700', color: '#111' },

  logoutBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  logoutTxt: { color: '#fff', fontWeight: '800' },
});
