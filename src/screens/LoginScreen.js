import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { login, loginWithKakaoAccount, getProfile as getKakaoProfile } from '@react-native-seoul/kakao-login';

const BLUE = '#2563EB';
const KAKAO_YELLOW = '#FEE500';
const BORDER = '#E5E7EB';

const FORCE_ACCOUNT_LOGIN_IN_SIM = true;

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const onKakaoLogin = async () => {
    try {
      setLoading(true);
      let token;

      // iOS 시뮬레이터/개발 환경에서는 카카오톡 앱이 없어 login()이 실패하므로
      // 계정 로그인으로 바로 시도
      if (FORCE_ACCOUNT_LOGIN_IN_SIM && Platform.OS === 'ios') {
        console.log('iOS 시뮬레이터 로그인으로 바로 진행');
        token = await loginWithKakaoAccount();
      } else {
        try {
          token = await login();
        } catch (e) {
          console.log('카카오톡 앱 로그인 실패 → 계정 로그인 폴백 실행');
          token = await loginWithKakaoAccount();
        }
      }

      // Optional: const profile = await getKakaoProfile();
      navigation.replace('Home');
    } catch (e) {
      console.log('카카오 로그인 실패', e);

      // 개발 편의: 시뮬레이터/개발 모드에서는 실패해도 넘어가도록 처리
      if (__DEV__) {
        console.log('Home으로 우회 이동');
        navigation.replace('Home');
        return;
      }

      alert('카카오 로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable
        onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
        style={s.backBtn}
        hitSlop={10}
        accessibilityLabel="뒤로가기"
        accessibilityRole="button"
      >
        <Ionicons name="chevron-back" size={26} color="#111" />
      </Pressable>
      <View style={s.wrap}>
        <Text style={s.brand}>
          <Text style={{ fontWeight: '900', color: '#111827' }}>Bridge</Text>
          <Text style={{ color: BLUE, fontWeight: '900' }}> · Us</Text>
        </Text>
        <Text style={s.subtitle}>
          소중한 <Text style={{ color: BLUE, fontWeight: '800' }}>경험</Text>을 나눠주세요
        </Text>
        <View style={s.illustBox}>
          <Image
            source={require('../../assets/mascot.png')}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Pressable style={[s.kakaoBtn, loading && { opacity: 0.6 }]} onPress={onKakaoLogin} disabled={loading}>
          <Ionicons name="chatbubble-ellipses" size={18} color="#111" />
          <Text style={s.kakaoTxt}>{loading ? '로그인 중...' : '카카오 로그인'}</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#fff',
  },
  brand: { fontSize: 32 },
  subtitle: { fontSize: 16, color: '#111', marginTop: -6 },
  illustBox: { width: 220, height: 260, marginTop: 8, marginBottom: 12 },
  kakaoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: KAKAO_YELLOW,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  kakaoTxt: { color: '#111', fontWeight: '800', fontSize: 16 },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 18,
    padding: 6,
  },
});
