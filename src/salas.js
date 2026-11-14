// Salas disponíveis. Em um sistema real, viriam de um banco de dados.
export const SALAS = [
  { id: 'lab-1', nome: 'Laboratório 1', capacidade: 30 },
  { id: 'lab-2', nome: 'Laboratório 2', capacidade: 30 },
  { id: 'auditorio', nome: 'Auditório', capacidade: 120 },
];

export function salaExiste(id) {
  return SALAS.some((s) => s.id === id);
}
