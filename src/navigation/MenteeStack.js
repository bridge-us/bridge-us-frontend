import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MentorDetailScreen from '../screens/MentorDetailScreen';
import ApplyCompleteScreen from '../screens/ApplyCompleteScreen';
import BoardScreen from '../screens/BoardScreen';
import BoardPostScreen from '../screens/BoardPostScreen';
import BoardWriteScreen from '../screens/BoardWriteScreen';

const Stack = createNativeStackNavigator();

export default function MenteeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name="MenteeHome" component={HomeScreen} />
      <Stack.Screen name="MentorDetail" component={MentorDetailScreen} />
      <Stack.Screen name="ApplyComplete" component={ApplyCompleteScreen} />
      {/* 게시판(멘티가 접근하는 경로) */}
      <Stack.Screen name="Board" component={BoardScreen} />
      <Stack.Screen name="BoardPost" component={BoardPostScreen} />
      <Stack.Screen name="BoardWrite" component={BoardWriteScreen} />
    </Stack.Navigator>
  );
}