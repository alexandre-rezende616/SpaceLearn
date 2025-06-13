// src/context/AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // console.log('--- [AuthContext] AuthProvider EXECUTANDO (TOPO DA FUNÇÃO) ---');
  const [user, setUser] = useState(null); // Armazenará o objeto do usuário { id, nome, email, role }
  const [token, setToken] = useState(null);

  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  // Simplificado isLoading para este teste, para focar no problema de navegação
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    console.log('--- [AuthContext] AuthProvider: Primeiro useEffect (loadAuthData) INICIANDO ---');
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedToken && storedUserData) {
          setToken(storedToken);
          setUser(JSON.parse(storedUserData));
          console.log('--- [AuthContext] AuthProvider: Dados de auth carregados do AsyncStorage ---');
        }
      } catch (e) {
        console.error('Failed to load auth data from storage', e);
      } finally {
        console.log('--- [AuthContext] AuthProvider: loadAuthData finalizado, setIsLoading(false) ---');
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  useEffect(() => {
    // Garante que o estado de navegação e o router estejam prontos,
    // e que o carregamento inicial do token/usuário esteja concluído.
    console.log(`>>> [AuthContext] useEffect (navegação) TRIGGERED. User: ${user ? user.id : null}, Segments: ${segments.join('/')}, isLoading: ${isLoading}, NavState: ${JSON.stringify(navigationState)}`);

    // Verificação de navigationState.stale
    // Adicionada verificação explícita para navigationState e navigationState.key
    if (isLoading || !router || !navigationState || !navigationState.key) {
      console.log('[AuthContext] useEffect (navegação): Ainda aguardando (isLoading/router/navigationState/navigationState.key).');
      return;
    }
    // Se navigationState.stale for um problema, podemos reintroduzir a verificação depois.
    // Esta verificação separada ajuda a isolar se 'stale' é o bloqueador.
    if (navigationState.stale === true) {
        console.log('[AuthContext] useEffect (navegação): navigationState.stale é true. Aguardando.');
      return;
    }

    console.log('[AuthContext] useEffect (navegação): Navegação pronta! User:', user ? {id: user.id, role: user.role} : null, 'Segments:', segments);

    // Lógica de redirecionamento reativada
    // Constrói a rota atual a partir dos segmentos. Ex: 'login', '(tabs)/home', 'conta'
    const currentRoute = segments.join('/') || 'index'; 
    // Define se a rota atual é uma rota de autenticação explícita
    const isAuthRoute = currentRoute === 'login' || currentRoute === 'register';
    if (!user) { // Se NÃO houver usuário logado
      // Se não estiver numa rota de autenticação (login, register) E não for a tela inicial (index)
      if (!isAuthRoute && currentRoute !== 'index') {
        console.log(`[AuthContext] useEffect (navegação): No user, NOT on auth route or index (current: ${currentRoute}). Redirecting to /login.`);
        router.replace('/login');
      } else {
        console.log(`[AuthContext] useEffect (navegação): No user, but on auth route or index (current: ${currentRoute}). No redirect from here.`);
      }
    } else { // Se HOUVER usuário logado
      // Se o usuário estiver logado MAS estiver numa rota de autenticação (login, register) ou na tela inicial (index)
      if (isAuthRoute || currentRoute === 'index') {
        console.log(`[AuthContext] useEffect (navegação): User logged in (role: ${user.role}), but on auth route or index (current: ${currentRoute}). Redirecting based on role.`);
        if (user.role === 'aluno') {
          router.replace('/(tabs)/home');
        } else if (user.role === 'professor') {
          router.replace('/(professor)/painel');
        } else {
          console.log(`[AuthContext] useEffect (navegação): User has unknown role '${user.role}'. Redirecting to / from auth/index.`);
          router.replace('/'); // Ou uma rota padrão para usuários autenticados
        }
      } else {
        console.log(`[AuthContext] useEffect (navegação): User logged in, NOT on auth route or index (current: ${currentRoute}). No redirect from here.`);
      }
    }
  }, [user, segments, router, navigationState, isLoading]); // MODIFICADO: navigationState em vez de navigationState?.key

  const login = async (userData, userToken) => {
    console.log('--- [AuthContext] login function called with userData:', JSON.stringify(userData), 'token:', userToken);
    setUser(userData);
    setToken(userToken);
    await AsyncStorage.setItem('userToken', userToken);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    // O redirecionamento é tratado pelo useEffect
  };
  
  const logout = async () => {
    console.log('--- [AuthContext] logout function called ---');
    console.log('--- [AuthContext] Current user before logout:', JSON.stringify(user));
    console.log('--- [AuthContext] Current token before logout:', token);

    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('--- [AuthContext] userToken removed from AsyncStorage ---');
      await AsyncStorage.removeItem('userData');
      console.log('--- [AuthContext] userData removed from AsyncStorage ---');
    } catch (e) {
      console.error('--- [AuthContext] Failed to remove auth data from storage during logout', e);
    }
    
    console.log('--- [AuthContext] Calling router.replace("/login") from logout function ---');
    router.replace('/login');
    console.log('--- [AuthContext] router.replace("/login") CALLED from logout function ---');
  };

  // AuthProvider DEVE SEMPRE renderizar seus children para que o Expo Router inicialize.
  // A lógica de carregamento/redirecionamento é tratada no useEffect.
  // Se uma tela de carregamento global for necessária (como a de "Carregando autenticação..."),
  // ela deve ser implementada de forma que não impeça a renderização dos children,
  // por exemplo, como um overlay, ou delegando às telas filhas.
  // Por agora, vamos remover a tela de carregamento de autenticação também para simplificar.
  // console.log(`--- [AuthContext] Render: Fornecendo Provider. isLoading: ${isLoading}, NavReady: ${!!navigationState?.key && navigationState?.stale === false}`);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}