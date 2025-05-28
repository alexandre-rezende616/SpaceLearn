import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { fetchAulaPorId } from '../../../services/aulaService';

const getStyles = (theme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: theme.colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    flexShrink: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  aulaTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.accentPrimary,
    marginBottom: 8,
  },
  aulaDescricao: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  aulaConteudo: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  linkItem: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 16,
    color: theme.colors.accentLink, // Você pode precisar adicionar essa cor ao seu tema
    textDecorationLine: 'underline',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});

export default function DetalhesAulaScreen() {
  const router = useRouter();
  const { aulaId } = useLocalSearchParams(); // Recebe o ID da aula da rota
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [aula, setAula] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aulaId) {
      fetchAulaPorId(aulaId)
        .then(setAula)
        .catch(err => {
          console.error("Erro ao buscar detalhes da aula:", err);
          Alert.alert("Erro", "Não foi possível carregar os detalhes da aula.");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      Alert.alert("Erro", "ID da aula não fornecido.");
    }
  }, [aulaId]);

  const handleOpenLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não é possível abrir este URL: ${url}`);
    }
  };

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={theme.colors.accentPrimary} /></View>;
  }

  if (!aula) {
    return <View style={styles.loadingContainer}><Text style={styles.emptyText}>Aula não encontrada.</Text></View>;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">{aula.titulo}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.aulaTitulo}>{aula.titulo}</Text>
        {aula.descricao ? <Text style={styles.aulaDescricao}>{aula.descricao}</Text> : null}
        {aula.conteudo ? <Text style={styles.aulaConteudo}>{aula.conteudo}</Text> : null}

        {aula.arquivos && aula.arquivos.length > 0 && <Text style={styles.sectionTitle}>Arquivos</Text>}
        {aula.arquivos?.map((arquivo, index) => (
          <TouchableOpacity key={`arq-${index}`} style={styles.linkItem} onPress={() => handleOpenLink(arquivo.url)}>
            <Text style={styles.linkText}>{arquivo.nome}</Text>
          </TouchableOpacity>
        ))}

        {aula.videos && aula.videos.length > 0 && <Text style={styles.sectionTitle}>Vídeos</Text>}
        {aula.videos?.map((video, index) => (
          <TouchableOpacity key={`vid-${index}`} style={styles.linkItem} onPress={() => handleOpenLink(video.url)}>
            <Text style={styles.linkText}>{video.titulo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}