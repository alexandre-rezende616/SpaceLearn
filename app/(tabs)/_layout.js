import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
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
        tabBarActiveTintColor: '#00CFE5',
        tabBarInactiveTintColor: '#A9A9A9', // Cinza mais claro para melhor contraste no fundo escuro
        tabBarStyle: {
          backgroundColor: '#0C0931', // OXFORD BLUE para o fundo da tab bar
          borderTopColor: '#0C0931', // Mesma cor do fundo para remover a linha ou uma cor sutil se desejar borda
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
