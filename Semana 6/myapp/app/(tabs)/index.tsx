import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.centered}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logo}
        />
        <ThemedText type="title" style={{ marginTop: 12 }}>¡Bienvenido!</ThemedText>
        <ThemedText style={{ textAlign: 'center', marginVertical: 8 }}>
          App base creada con Expo Go
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.iconRow}>
        <View style={styles.iconBox}>
          <IconSymbol name="paperplane.fill" size={40} color="#3b82f6" />
          <ThemedText style={styles.iconLabel}>Cámara</ThemedText>
        </View>
        <View style={styles.iconBox}>
          <IconSymbol name="chevron.right" size={40} color="#f59e42" />
          <ThemedText style={styles.iconLabel}>Acelerómetro</ThemedText>
        </View>
        <View style={styles.iconBox}>
          <IconSymbol name="house.fill" size={40} color="#22c55e" />
          <ThemedText style={styles.iconLabel}>Mapas</ThemedText>
        </View>
      </ThemedView>
      <ThemedView style={styles.centered}>
        <ThemedText type="subtitle" style={{ marginTop: 16 }}>Explora las pestañas inferiores</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    width: 120,
    height: 74,
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
    gap: 12,
  },
  iconBox: {
    alignItems: 'center',
    gap: 4,
  },
  iconLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
