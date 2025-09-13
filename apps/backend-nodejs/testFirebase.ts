console.log('👋 Hello from testFirebase.ts'); // ✅ Confirms execution

throw new Error('🔥 Forced crash to confirm execution'); // ✅ Forces visible error

// 🔒 The rest of the script is temporarily disabled for this test
// import { db } from '../firebase.ts';
// import { collection, getDocs } from 'firebase/firestore';

// console.log('✅ Firebase statically imported');
// console.log('🚀 Starting Firebase test...');

// const testFirebaseConnection = async () => {
//   console.log('🧪 About to check collections...');
//   const collections = ['users', 'courses', 'blogs', 'careers'];
//   for (const name of collections) {
//     console.log(`🔍 Checking collection: ${name}`);
//     try {
//       const snap = await getDocs(collection(db, name));
//       const count = snap.size;
//       if (count === 0) {
//         console.warn(`⚠️ ${name} is empty.`);
//         continue;
//       }
//       const sample = snap.docs.slice(0, 3).map(doc => {
//         const data = doc.data();
//         return {
//           ...(data?.title && { title: data.title }),
//           ...(data?.role && { role: data.role }),
//           ...(data?.email && { email: data.email }),
//           ...(data?.org && { org: data.org }),
//         };
//       });
//       console.log(`📂 ${name}: ${count} document(s)`);
//       console.log(`   🧾 Sample:`, sample);
//     } catch (error) {
//       console.error(`❌ Error reading ${name}:`, error);
//     }
//   }
//   console.log('\n✅ Firestore test completed.');
// };

// testFirebaseConnection().catch((err) => {
//   console.error('❌ Uncaught error:', err);
// });
