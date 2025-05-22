// c:\Users\xandi\SpaceLearn\app\(professor)\_layout.js
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';

export default function Layout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: theme.colors.backgroundSecondary,
          borderTopColor: theme.colors.backgroundSecondary,
        },
        tabBarActiveTintColor: theme.colors.accentPrimary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="painel" // Corresponde a app/(professor)/painel.js
        options={{
          title: 'Início',
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
      <Tabs.Screen
        name="conta" // Corresponde a app/(professor)/conta.js
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="turma" // Corresponde ao DIRETÓRIO app/(professor)/turma/ (VERIFIQUE O NOME EXATO E CASE)
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index" // Corresponde a um possível app/(professor)/index.js
        options={{ href: null }}
      />
      <Tabs.Screen
        name="turma/[nome]/alunos" // Corresponde ao DIRETÓRIO app/(professor)/turma/[nome]/alunos (VERIFIQUE O NOME EXATO E CASE)
        options={{
          href: null,
        }}
      />
      
      {/* Se houver QUALQUER OUTRO arquivo ou diretório em app/(professor)/ que não deva ser uma aba,
          adicione uma entrada similar aqui. Por exemplo:
      <Tabs.Screen
        name="nomeDeOutroArquivoOuDiretorio"
        options={{ href: null }}
      />
      */}
    </Tabs>
  );
}
