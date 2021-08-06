import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCa9oyVmQMjWVM_I9ICWkjtgIExjqfC8H4",
  authDomain: "bugtrack-42d41.firebaseapp.com",
  projectId: "bugtrack-42d41",
  storageBucket: "bugtrack-42d41.appspot.com",
  messagingSenderId: "709091527753",
  appId: "1:709091527753:web:856790dbfd06b5dbe64398"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default firebase;

export const getLists = async projectTitle => {
  let lists = {};
  const doc = await db.collection(projectTitle).doc('Lists').get();
  const names = doc.data().Lists.map(item => item);
  for (const list of names) {
    const querySnapshot = await db.collection(projectTitle).doc('Lists').collection(list).orderBy("createdAt", "asc").get();
    let currentList = []
    querySnapshot.forEach(doc => currentList.push(doc.data()));
    lists[list] = currentList;
  }
  return lists;
}

export const getItem = async (projectTitle, listTitle, id) => {
  const result = await db.collection(projectTitle).doc('Lists').collection(listTitle).doc(id).get();
  return result.data();
}

export const addItem = async (projectTitle, listTitle, newItem) => {
  const date = firebase.firestore.Timestamp.fromDate(new Date());
  const id = await db.collection(projectTitle).doc('id count').get();
  newItem.id = id.data().number;
  newItem.createdAt = date;
  const result = await db.collection(projectTitle).doc('Lists').collection(listTitle).doc(newItem.id.toString()).set(newItem);
  await db.collection(projectTitle).doc('id count').set({ 'number': id.data().number + 1 });
  return result;
}

export const editItem = async (projectTitle, listTitle, editedItem) => {
  const result = await db.collection(projectTitle).doc('Lists').collection(listTitle).doc(editedItem.id.toString()).set(editedItem);
  return result;
}

export const removeItem = async (projectTitle, listTitle, id) => {
  const result = await db.collection(projectTitle).doc('Lists').collection(listTitle).doc(id.toString()).delete();
  return result;
}