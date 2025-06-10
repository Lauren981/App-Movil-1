import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function AccelerometerScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  const posX = data.x * 50;
  const posY = data.y * 50;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Acelerómetro</ThemedText>
      </ThemedView>
      <View style={styles.valuesRow}>
        <ThemedText style={styles.valueLabel}>X:</ThemedText>
        <ThemedText style={styles.value}>{data.x.toFixed(2)}</ThemedText>
        <ThemedText style={styles.valueLabel}>Y:</ThemedText>
        <ThemedText style={styles.value}>{data.y.toFixed(2)}</ThemedText>
        <ThemedText style={styles.valueLabel}>Z:</ThemedText>
        <ThemedText style={styles.value}>{data.z.toFixed(2)}</ThemedText>
      </View>
      <View style={styles.indicatorArea}>
        <View
          style={[
            styles.indicator,
            {
              transform: [
                { translateX: posX },
                { translateY: posY },
              ],
            },
          ]}
        />
      </View>
      <ThemedText style={{ marginTop: 16, textAlign: 'center' }}>
        Mueve tu dispositivo para ver el indicador.
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  valueLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 22,
    color: '#3b82f6',
    width: 60,
    textAlign: 'center',
  },
  indicatorArea: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    overflow: 'hidden',
  },
  indicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    position: 'absolute',
    left: 44,
    top: 44,
  },
});