// 화면이 사용하는 "데이터 창구"의 약속(인터페이스).
// 화면은 이 약속만 알고, 실제 저장소(가짜/Firebase)는 services/index.ts에서 고른다.
import type {
  Comment, Course, Material, Member, Post, Publication, ResearchArea, Role, User,
} from '../types'

export interface Entity {
  id: string
}

export type CreateInput<T extends Entity> = Omit<T, 'id'>

export interface ListOptions<T extends Entity> {
  /** 최대 개수 (Firestore 무료 읽기 한도를 아끼기 위해 필요한 만큼만 가져오기) */
  limit?: number
  /** 같은 값인 항목만 (예: { courseId: 'c1' }) */
  filter?: Partial<T>
  sortBy?: keyof T & string
  desc?: boolean
}

/** 실시간 구독 없이 1회 조회만 하는 방식 */
export interface Collection<T extends Entity> {
  list(options?: ListOptions<T>): Promise<T[]>
  get(id: string): Promise<T | null>
  create(data: CreateInput<T>): Promise<T>
  update(id: string, patch: Partial<CreateInput<T>>): Promise<T>
  delete(id: string): Promise<void>
}

export interface DataService {
  research: Collection<ResearchArea>
  publications: Collection<Publication>
  courses: Collection<Course>
  materials: Collection<Material>
  posts: Collection<Post>
  comments: Collection<Comment>
  members: Collection<Member>
}

export interface AuthService {
  /** 데모에서는 역할을 골라 로그인. 실제 Google 로그인(Phase 2)에서는 인자를 쓰지 않음 */
  signInWithGoogle(demoRole?: Role): Promise<void>
  signOut(): Promise<void>
  /** 로그인 상태가 바뀔 때마다 호출됨. 해제 함수를 돌려줌 */
  onAuthChange(callback: (user: User | null) => void): () => void
}
