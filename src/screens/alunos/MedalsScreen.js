// src/screens/MedalsScreen.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LayoutPadrao from '../../components/LayoutPadrao';
import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filtroBotao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  filtroTexto: {
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 40, // Espaço no final da lista
  },
  medalha: { // Card da medalha
    flex: 1, // Para que as colunas ocupem espaço igual
    margin: 8,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140, // Altura mínima para consistência
  },
  medalhaTexto: { // Emoji da medalha
    fontSize: 40,
    marginBottom: 8,
  },
  medalhaTitulo: { // Título da medalha
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const MEDALHAS = [
  {
    id: '1',
    titulo: 'Primeira Missão',
    descricao: 'Concluiu a primeira missão com sucesso.',
    conquistada: true,
  },
  {
    id: '2',
    titulo: 'Mestre dos Satélites',
    descricao: 'Montou 5 satélites corretamente.',
    conquistada: true,
  },
  {
    id: '3',
    titulo: 'Quizzical',
    descricao: 'Acertou todos os quizzes de um módulo.',
    conquistada: false,
  },
  {
    id: '4',
    titulo: 'Explorador Espacial',
    descricao: 'Explorou todos os módulos disponíveis.',
    conquistada: false,
  },
  {
    id: '5',
    titulo: 'Participativo',
    descricao: 'Interagiu nas atividades da galeria.',
    conquistada: true,
  },
];

export default function MedalsScreen() {
  const [filtro, setFiltro] = useState('todas');
  const { theme } = useTheme(); // Use o hook para acessar o tema
  const router = useRouter();

  const medalhasFiltradas = MEDALHAS.filter((m) => {
    if (filtro === 'todas') return true;
    if (filtro === 'conquistadas') return m.conquistada;
    if (filtro === 'faltantes') return !m.conquistada;
  });

  return (
    <LayoutPadrao>
      <View style={[baseStyles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
        <Text style={[baseStyles.title, { color: theme.colors.accentPrimary }]}>Minhas Medalhas</Text>

        <View style={baseStyles.filtros}>
          <TouchableOpacity
            style={[
              baseStyles.filtroBotao,
              { backgroundColor: filtro === 'todas' ? theme.colors.accentSecondary : theme.colors.backgroundSecondary }
            ]}
            onPress={() => setFiltro('todas')}
          >
            <Text style={[
              baseStyles.filtroTexto,
              { color: filtro === 'todas' ? theme.colors.buttonSecondaryText : theme.colors.textPrimary }
            ]}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              baseStyles.filtroBotao,
              { backgroundColor: filtro === 'conquistadas' ? theme.colors.accentSecondary : theme.colors.backgroundSecondary }
            ]}
            onPress={() => setFiltro('conquistadas')}
          >
            <Text style={[
              baseStyles.filtroTexto,
              { color: filtro === 'conquistadas' ? theme.colors.buttonSecondaryText : theme.colors.textPrimary }
            ]}>Conquistadas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              baseStyles.filtroBotao,
              { backgroundColor: filtro === 'faltantes' ? theme.colors.accentSecondary : theme.colors.backgroundSecondary }
            ]}
            onPress={() => setFiltro('faltantes')}
          >
            <Text style={[
              baseStyles.filtroTexto,
              { color: filtro === 'faltantes' ? theme.colors.buttonSecondaryText : theme.colors.textPrimary }
            ]}>Faltantes</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={medalhasFiltradas}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={baseStyles.lista}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                baseStyles.medalha,
                {
                  backgroundColor: item.conquistada ? theme.colors.accentPrimary : theme.colors.backgroundSecondary,
                },
              ]}
              onPress={() =>
                router.push({
                  pathname: '/detalhes-medalha',
                  params: {
                    titulo: item.titulo,
                    descricao: item.descricao,
                    conquistada: item.conquistada ? '1' : '0',
                  },
                })
              }
            >
              <Text style={baseStyles.medalhaTexto}>
                {item.conquistada ? '🏅' : '🔒'}
              </Text>
              <Text
                style={[
                  baseStyles.medalhaTitulo,
                  { color: item.conquistada ? theme.colors.buttonPrimaryText : theme.colors.textPrimary },
                ]}
              >
                {item.titulo}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LayoutPadrao>
  );
}