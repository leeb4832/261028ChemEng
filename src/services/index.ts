// 어떤 저장소를 쓸지 정하는 단 하나의 파일.
// Phase 2에서는 아래 두 줄만 Firebase 구현으로 바꾸면 됩니다.
import { mockAuthService } from './mock/mockAuth'
import { mockDataService } from './mock/mockData'
import type { AuthService, DataService } from './types'

export const authService: AuthService = mockAuthService
export const dataService: DataService = mockDataService
