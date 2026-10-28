// Google 로그인. 처음 로그인한 사람은 users/{uid} 문서가 role "pending"으로 만들어집니다.
import {
  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut,
  type User as FirebaseUser,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { Role, User } from '../../types'
import type { AuthService } from '../types'
import { getDb, getFirebaseAuth } from './firebaseApp'

const roles: Role[] = ['admin', 'member', 'pending']

async function loadUser(fbUser: FirebaseUser): Promise<User> {
  const ref = doc(getDb(), 'users', fbUser.uid)
  const snap = await getDoc(ref)
  const email = fbUser.email ?? ''
  if (!snap.exists()) {
    const name = fbUser.displayName ?? email
    await setDoc(ref, { name, email, role: 'pending' })
    return { uid: fbUser.uid, name, email, role: 'pending' }
  }
  const data = snap.data()
  const role = roles.find((r) => r === data.role) ?? 'pending'
  return { uid: fbUser.uid, name: String(data.name ?? email), email, role }
}

export const firebaseAuthService: AuthService = {
  async signInWithGoogle() {
    await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider())
  },
  async signOut() {
    await signOut(getFirebaseAuth())
  },
  onAuthChange(callback) {
    return onAuthStateChanged(getFirebaseAuth(), (fbUser) => {
      if (!fbUser) return callback(null)
      loadUser(fbUser)
        .then(callback)
        .catch((e) => {
          console.error('사용자 정보를 불러오지 못했습니다.', e)
          callback(null)
        })
    })
  },
}
