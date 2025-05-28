import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext'; // Importar useTheme

export default function TabsLayout() {
  const { theme } = useTheme(); // Acessar o tema

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'diario') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'central') {
            iconName = focused ? 'rocket' : 'rocket-outline';
          } else if (route.name === 'medalhas') {
            iconName = focused ? 'medal' : 'medal-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.accentPrimary, // Cor ativa do tema
        tabBarInactiveTintColor: theme.colors.textSecondary, // Cor inativa do tema
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundPrimary, // Cor de fundo da tab bar do tema
          borderTopColor: theme.colors.backgroundPrimary, // Cor da borda superior (ou theme.colors.border)
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="diario" />
      <Tabs.Screen name="central" />
      <Tabs.Screen name="medalhas" />
    </Tabs>
  );
}
