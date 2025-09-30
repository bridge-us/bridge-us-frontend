import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MentorLandingScreen from '../screens/MenteeLandingScreen'; 
import MentorReviewsScreen from '../screens/MentorReviewsScreen';
import OpenChatRoomScreen from '../screens/OpenChatRoomScreen';

const Stack = createNativeStackNavigator();

export default function MentorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name="MentorHome" component={MentorLandingScreen} />
      <Stack.Screen name="MentorReviews" component={MentorReviewsScreen} />
      <Stack.Screen name="OpenChatRoom" component={OpenChatRoomScreen} />
    </Stack.Navigator>
  );
}