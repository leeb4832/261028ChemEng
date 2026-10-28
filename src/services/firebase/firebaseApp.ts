// Firebase 초기화. 설정값은 .env(또는 Netlify 환경변수)에서 읽습니다.
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

let app: FirebaseApp | null = null

function getApp(): FirebaseApp {
  if (!app) {
    const env = import.meta.env
    app = initializeApp({
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    })
  }
  return app
}

export const getDb = (): Firestore => getFirestore(getApp())
export const getFirebaseAuth = (): Auth => getAuth(getApp())
