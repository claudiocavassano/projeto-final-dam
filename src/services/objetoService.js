import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const objetosRef = collection(db, "objetos");

export function listarObjetos(callback, callbackErro) {
  const consulta = query(objetosRef, orderBy("criadoEm", "desc"));

  const cancelarEscuta = onSnapshot(
    consulta,
    (snapshot) => {
      const objetos = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));
      callback(objetos);
    },
    (erro) => {
      if (callbackErro) {
        callbackErro(erro);
      } else {
        console.error("Erro ao listar objetos:", erro);
      }
    }
  );

  return cancelarEscuta;
}

export async function criarObjeto(dados) {
  await addDoc(objetosRef, {
    ...dados,
    status: "ativo",
    criadoEm: serverTimestamp(),
  });
}

export async function editarObjeto(id, dados) {
  if (!id) throw new Error("O id é obrigatório para editar.");
  await updateDoc(doc(db, "objetos", id), dados);
}

export async function excluirObjeto(id) {
  if (!id) throw new Error("O id é obrigatório para excluir.");
  await deleteDoc(doc(db, "objetos", id));
}