// 초기 샘플 데이터 (화학공학 예시). 새로고침하면 이 상태로 돌아옵니다.
import type {
  Comment, Course, Material, Member, Post, Publication, ResearchArea,
} from '../../types'

export const seedResearch: ResearchArea[] = [
  {
    id: 'r1',
    title: '촉매 반응공학',
    description: '고체 촉매 표면에서의 반응 메커니즘을 규명하고, 활성과 선택도가 높은 촉매를 설계합니다.',
    keywords: ['불균일 촉매', '반응속도론', '촉매 설계'],
  },
  {
    id: 'r2',
    title: '이산화탄소 포집 및 전환',
    description: '다공성 흡착제와 아민 용매를 이용한 CO2 포집, 그리고 포집된 CO2의 유용 화합물 전환을 연구합니다.',
    keywords: ['CO2 포집', '흡착', '탄소 전환'],
  },
  {
    id: 'r3',
    title: '공정 시뮬레이션 및 최적화',
    description: 'Aspen Plus와 Python을 활용해 화학공정을 모사하고, 에너지 효율과 경제성을 함께 최적화합니다.',
    keywords: ['Aspen Plus', '공정 최적화', '기술경제성 분석'],
  },
  {
    id: 'r4',
    title: '수소 생산 공정',
    description: '수전해와 개질 공정의 효율을 높이기 위한 반응기 설계와 열 통합을 연구합니다.',
    keywords: ['수소', '수전해', '열 통합'],
  },
]

export const seedPublications: Publication[] = [
  {
    id: 'p1', kind: '논문', year: 2025,
    title: 'Amine-functionalized MOF for CO2 capture under humid flue gas conditions',
    authors: '김교수, 이학생, 최박사', journal: 'Chemical Engineering Journal',
    url: 'https://doi.org/10.0000/example.2025.001',
  },
  {
    id: 'p2', kind: '논문', year: 2024,
    title: 'Kinetic modeling of Ni-based catalysts for dry reforming of methane',
    authors: '김교수, 정박사', journal: 'Applied Catalysis B: Environmental',
    url: 'https://doi.org/10.0000/example.2024.002',
  },
  {
    id: 'p3', kind: '학회발표', year: 2024,
    title: 'Techno-economic analysis of a pilot-scale CO2 capture process',
    authors: '이학생, 김교수', journal: '한국화학공학회 가을 총회',
    url: 'https://example.com/conference/2024',
  },
  {
    id: 'p4', kind: '논문', year: 2023,
    title: 'Heat integration strategies for green hydrogen production',
    authors: '박석사, 김교수', journal: 'Energy Conversion and Management',
    url: 'https://doi.org/10.0000/example.2023.003',
  },
]

export const seedCourses: Course[] = [
  { id: 'c1', name: '반응공학', semester: '2026년 1학기', description: '반응속도론과 이상 반응기(CSTR, PFR, 회분식) 설계의 기초를 배웁니다.' },
  { id: 'c2', name: '공정 시뮬레이션', semester: '2026년 1학기', description: 'Aspen Plus를 이용해 단위공정과 전체 공정을 모사하는 실습 과목입니다.' },
  { id: 'c3', name: '물질 및 에너지 수지', semester: '2025년 2학기', description: '화학공정의 물질 수지와 에너지 수지 계산 방법을 익힙니다.' },
]

export const seedMaterials: Material[] = [
  { id: 'm1', courseId: 'c1', title: '1주차 강의노트: 반응속도식', type: '강의노트', url: 'https://drive.google.com/example-1' },
  { id: 'm2', courseId: 'c1', title: '1차 과제: CSTR 설계 문제', type: '과제', url: 'https://drive.google.com/example-2' },
  { id: 'm3', courseId: 'c1', title: 'Fogler, Elements of Chemical Reaction Engineering', type: '참고문헌', url: 'https://example.com/fogler' },
  { id: 'm4', courseId: 'c2', title: 'Aspen Plus 시작하기', type: '강의노트', url: 'https://drive.google.com/example-3' },
  { id: 'm5', courseId: 'c2', title: '증류탑 모사 실습 과제', type: '과제', url: 'https://drive.google.com/example-4' },
  { id: 'm6', courseId: 'c3', title: '물질 수지 연습문제 모음', type: '과제', url: 'https://drive.google.com/example-5' },
]

export const seedMembers: Member[] = [
  { id: 'mem1', name: '김교수', position: '교수', topic: '촉매 반응공학, CO2 전환', order: 1 },
  { id: 'mem2', name: '최박사', position: '박사과정', topic: '아민 기능화 MOF를 이용한 CO2 포집', order: 2 },
  { id: 'mem3', name: '정박사', position: '박사과정', topic: '메탄 건식 개질 촉매의 반응속도론', order: 3 },
  { id: 'mem4', name: '이학생', position: '석사과정', topic: '파일럿 규모 CO2 포집 공정의 경제성 분석', order: 4 },
  { id: 'mem5', name: '박석사', position: '석사과정', topic: '수소 생산 공정의 열 통합', order: 5 },
]

export const seedPosts: Post[] = [
  {
    id: 'post1', authorId: 'u-member', authorName: '이학생', createdAt: '2026-10-20T09:00:00.000Z', commentCount: 2,
    title: '이번 주 랩미팅 논문 추천받습니다',
    content: 'CO2 포집 흡착제 관련 최신 리뷰 논문을 읽어보려고 합니다.\n추천하실 논문이 있으면 댓글로 남겨 주세요.',
  },
  {
    id: 'post2', authorId: 'u-admin', authorName: '김교수', createdAt: '2026-10-22T14:30:00.000Z', commentCount: 0,
    title: '학회 발표 일정 안내',
    content: '다음 달 학회 발표 신청이 있습니다. 발표를 원하는 학생은 이번 주 금요일까지 초록을 공유해 주세요.',
  },
  {
    id: 'post3', authorId: 'u-x1', authorName: '최박사', createdAt: '2026-10-25T11:10:00.000Z', commentCount: 0,
    title: 'Aspen Plus 수렴 오류 해결 팁 공유',
    content: '재순환 흐름이 있는 공정에서 수렴이 안 될 때, 초기 추정값과 Tear stream 설정을 먼저 확인해 보세요.',
  },
]

export const seedComments: Comment[] = [
  { id: 'cm1', postId: 'post1', authorId: 'u-x1', authorName: '최박사', createdAt: '2026-10-20T10:00:00.000Z', content: 'ACS Energy Letters의 최근 리뷰를 추천합니다.' },
  { id: 'cm2', postId: 'post1', authorId: 'u-admin', authorName: '김교수', createdAt: '2026-10-20T13:20:00.000Z', content: '좋습니다. 읽고 핵심 그림 3개만 정리해서 발표해 주세요.' },
]
