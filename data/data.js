import { collection, query, where, getFirestore, getDocs, updateDoc, doc } from "firebase/firestore";
import { app } from "../config/firebaseConfig";

// Obter uma referência para a coleção 'clinicas' no Firestore
const clinicasRef = collection(getFirestore(app), "clinicas");

// Função para buscar todas as clínicas com o status igual a false
const buscarClinicas = async () => {
  try {
    // Realizar a consulta para buscar todas as clínicas com o status igual a false
    const q = query(clinicasRef, where("status", "==", false));
    const snapshot = await getDocs(q);

    // Array para armazenar as clínicas encontradas
    const clinicas = [];

    // Iterar sobre os documentos retornados pela consulta
    snapshot.forEach((doc) => {
      // Obter os dados de cada documento
      const data = doc.data();

      // Adicionar os dados ao array de clínicas
      clinicas.push(data);
    });

    return clinicas;
  } catch (error) {
    console.error("Erro ao buscar as clínicas:", error);
    return [];
  }
};

export default buscarClinicas;
