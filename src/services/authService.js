import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { auth } from "./firebase";

function traduzirErro(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/missing-password":
      return "Informe a senha.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-mail ou senha incorretos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/network-request-failed":
      return "Sem conexão. Verifique sua internet.";
    default:
      return "Ocorreu um erro. Tente novamente.";
  }
}

export async function cadastrar(email, senha) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    return cred.user;
  } catch (error) {
    throw new Error(traduzirErro(error));
  }
}

export async function login(email, senha) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    return cred.user;
  } catch (error) {
    throw new Error(traduzirErro(error));
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(traduzirErro(error));
  }
}