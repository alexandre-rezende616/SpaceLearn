// src/services/authService.js

// IMPORTANTE: Certifique-se de que esta URL base está correta e acessível
// a partir do seu dispositivo/emulador.
const API_BASE_URL = 'http://192.168.0.191:3000/api'; // Mesma base do materiaService

export const registerUser = async (userData) => {
  try {
    console.log('Enviando dados de registro para o backend:', userData);
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Se o backend retornar um erro com uma mensagem específica, use-a.
      // Caso contrário, use uma mensagem genérica baseada no status.
      throw new Error(data.message || `Erro HTTP: ${response.status}`);
    }

    console.log('Resposta do registro do backend:', data);
    return data; // Deve conter { token, user, message }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    throw error; // Re-throw para que o chamador (RegisterScreen) possa tratar
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log('Enviando credenciais de login para o backend:', credentials);
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Erro HTTP: ${response.status}`);
    }

    console.log('Resposta do login do backend:', data);
    return data; // Deve conter { token, user, message }
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    throw error;
  }
};