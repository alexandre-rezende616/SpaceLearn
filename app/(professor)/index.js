// app/(professor)/index.js
import { Redirect } from 'expo-router';

export default function ProfessorIndex() {
  return <Redirect href="/(professor)/painel" />;
}