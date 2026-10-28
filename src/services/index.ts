// 어떤 저장소를 쓸지 정하는 단 하나의 파일.
// .env(또는 Netlify 환경변수)에 Firebase 설정이 있으면 Firebase, 없으면 가짜(데모) 데이터를 씁니다.
import { firebaseAuthService } from './firebase/firebaseAuth'
import { firebaseDataService } from './firebase/firebaseData'
import { mockAuthService } from './mock/mockAuth'
import { mockDataService } from './mock/mockData'
import type { AuthService, DataService } from './types'

const useFirebase = Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

/** true면 가짜 데이터/가짜 로그인(데모) 모드 */
export const isDemoMode = !useFirebase

export const authService: AuthService = useFirebase ? firebaseAuthService : mockAuthService
export const dataService: DataService = useFirebase ? firebaseDataService : mockDataService
