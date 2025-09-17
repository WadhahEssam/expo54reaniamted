import { ScrollView, StyleSheet, View } from 'react-native';

import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export default function HomeScreen() {
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  return (
    <ScrollView contentContainerStyle={{ gap: 10 }}>
      {Array.from({ length: 300 }).map((_, index) => (
        <SomeAnimatedRow key={index} direction={direction} />
      ))}
      
    </ScrollView>
  );
}

const SomeAnimatedRow = (direction = 'left') => {
  
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],

    };
  });

  useEffect(() => {
    rotate.value = withRepeat(withTiming(direction === 'left' ? 25 : -25, { duration: Math.random() * 1000 }), -1, true);
  }, [direction, rotate]);
  
  
  return (
    <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[animatedStyle, {width: 100, height: 100, backgroundColor: Math.random() > 0.5 ? 'red' : 'blue' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
