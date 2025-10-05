import React from 'react';
import { SafeAreaView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BLUE = '#2563EB';
const KAKAO_YELLOW = '#FEE500';
const BORDER = '#E5E7EB';

export default function LoginScreen({ navigation }) {
  const onKakaoLogin = async () => {
    try {
    
      navigation.replace('Home'); 
    } catch (e) {
      alert('카카오 로그인에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
        <Pressable style={s.kakaoBtn} onPress={onKakaoLogin}>
          <Ionicons name="chatbubble-ellipses" size={18} color="#111" />
          <Text style={s.kakaoTxt}>카카오 로그인</Text>
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
});
