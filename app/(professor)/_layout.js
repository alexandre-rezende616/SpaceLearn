// _layout.js
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';

export default function Layout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão das abas
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundSecondary, // Fundo da barra de abas
          borderTopColor: theme.colors.backgroundSecondary, // Cor da borda superior (geralmente igual ao fundo para um visual limpo)
        },
        tabBarActiveTintColor: theme.colors.accentPrimary, // Cor dos ícones/texto da aba ativa
        tabBarInactiveTintColor: theme.colors.textSecondary, // Cor dos ícones/texto da aba inativa
      }}
    >
      {/* Telas que serão exibidas como abas */}
      <Tabs.Screen
        name="painel" // Corresponde a app/(professor)/painel.js
        options={{
          title: 'Início', // Título exibido na aba
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="turmas" // Corresponde a app/(professor)/turmas.js
        options={{
          title: 'Turmas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="missoes" // Corresponde a app/(professor)/missoes.js
        options={{
          title: 'Missões',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="medalhas" // Corresponde a app/(professor)/medalhas.js
        options={{
          title: 'Medalhas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Itens a serem ocultados da barra de abas */}
      {/* Essas telas existem dentro do grupo (professor), mas não devem ser abas visíveis */}
      <Tabs.Screen
        name="conta" // Corresponde a app/(professor)/conta.js
        options={{
          href: null, // Oculta esta tela da barra de abas
          href: null, // Mantém oculta da lista de abas
          tabBarStyle: { display: 'none' }, // Oculta a barra de abas quando esta tela está ativa
        }}
      />
       <Tabs.Screen
        name="index" // Corresponde a app/(professor)/index.js (o que criamos para redirecionar)
        options={{
          href: null, // Oculta o index da barra de abas
        }}
      />
      <Tabs.Screen
        name="turma" // Corresponde ao diretório app/(professor)/turma
         name="turma/[id]" // Referencia diretamente a rota dinâmica
        options={{ href: null }}
      />
      <Tabs.Screen
        name="materia/nova" // Corresponde ao diretório app/(professor)/materia
        options={{ href: null }}
      />
      <Tabs.Screen
        name="turma/nova" // Oculta a rota específica do formulário de nova turma
        options={{ href: null }}
      />
      {/* Adicione aqui outras telas ou diretórios que não devem ser abas */}
    </Tabs>
  );
}
