// 사이트 전체에서 쓰는 데이터 모양(타입)

export type Role = 'admin' | 'member' | 'pending'

export interface User {
  uid: string
  name: string
  email: string
  role: Role
}

export interface ResearchArea {
  id: string
  title: string
  description: string
  keywords: string[]
}

export type PublicationKind = '논문' | '학회발표'

export interface Publication {
  id: string
  title: string
  authors: string
  year: number
  journal: string
  kind: PublicationKind
  url: string // DOI 또는 외부 링크
}

export interface Course {
  id: string
  name: string
  semester: string
  description: string
}

export type MaterialType = '강의노트' | '과제' | '참고문헌'

export interface Material {
  id: string
  courseId: string
  title: string
  type: MaterialType
  url: string // 외부 링크(Google Drive 등)
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  createdAt: string // ISO 날짜 문자열
  commentCount: number
}

export interface Comment {
  id: string
  postId: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
}

export type MemberPosition = '교수' | '박사과정' | '석사과정' | '학부연구생'

export interface Member {
  id: string
  name: string
  position: MemberPosition
  topic: string
  order: number // 화면에 나오는 순서(작을수록 먼저)
}
