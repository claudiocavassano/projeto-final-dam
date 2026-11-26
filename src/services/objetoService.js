import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
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

export async function excluirObjeto(id) {
  if (!id) {
    throw new Error("O id do objeto é obrigatório para excluir.");
  }

  await deleteDoc(doc(db, "objetos", id));
}