import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

export const logRoleSelection = async (role: string) => {
  const db = getFirestore();
  try {
    await addDoc(collection(db, 'roleSelections'), {
      role,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error logging role selection:', error);
  }
};
