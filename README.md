# 화학공학 연구실 웹사이트

연구·수업 자료와 대학원생 토론 게시판이 있는 웹사이트입니다.
Firebase 설정(`.env`)이 있으면 **실제 Google 로그인과 Firestore 저장**을 쓰고, 없으면 **가짜 데이터(데모)** 로 동작합니다. 데모에서는 새로고침하면 입력한 내용이 처음 상태로 돌아갑니다.

## 1. 내 컴퓨터에서 실행해 보기

1. [Node.js](https://nodejs.org) 에서 **LTS 버전**을 설치합니다. (20 이상)
2. 이 폴더에서 터미널(Windows는 PowerShell, Mac은 터미널)을 엽니다.
3. 아래 두 줄을 차례대로 입력합니다.

```bash
npm install
```

```bash
npm run dev
```

4. 화면에 나온 주소(보통 `http://localhost:5173`)를 인터넷 브라우저에 붙여넣으면 사이트가 보입니다.
5. 로그인 화면에서 **교수 / 학생 / 승인대기** 중 하나를 골라 역할별 화면 차이를 확인해 보세요.
   - 교수(admin): 연구·수업·구성원 항목에 **추가/수정/삭제** 버튼이 보입니다.
   - 학생(member): 토론 게시판을 읽고 쓸 수 있습니다.
   - 승인대기(pending): "교수님의 승인을 기다리는 중입니다" 안내만 보입니다.

배포 전에 오류가 없는지 확인하려면 `npm run build` 를 실행하세요. 오류 없이 끝나면 정상입니다.

## 2. GitHub에 올리기

1. [github.com](https://github.com) 에 로그인하고 오른쪽 위 **+ → New repository** 를 누릅니다.
2. 이름(예: `chemeng-lab`)을 적고 **Create repository** 를 누릅니다.
3. 만들어진 페이지에 나오는 안내(“…or push an existing repository”)의 명령어를 이 폴더의 터미널에 붙여넣습니다.
   (GitHub Desktop 같은 프로그램을 쓰셔도 됩니다.)
4. `.env` 파일, `node_modules` 폴더는 자동으로 제외되도록 설정되어 있으니 신경 쓰지 않으셔도 됩니다.

## 3. Netlify로 배포하기

1. [netlify.com](https://www.netlify.com) 에 GitHub 계정으로 가입/로그인합니다.
2. **Add new site → Import an existing project → GitHub** 를 선택하고 방금 만든 저장소를 고릅니다.
3. 빌드 설정은 `netlify.toml` 에 이미 들어 있어 **그대로 두고** **Deploy** 를 누릅니다.
4. 1~2분 뒤 `https://○○○.netlify.app` 주소가 생깁니다. 이 주소가 사이트 주소입니다.
5. 이후 GitHub에 변경 내용을 올릴 때마다 자동으로 다시 배포됩니다.

## 4. Firebase 연결하기

1. Firebase 콘솔 → **Firestore Database → 데이터베이스 만들기** (프로덕션 모드로 시작).
2. **Firestore → 규칙** 탭에 이 폴더의 `firestore.rules` 내용을 붙여넣고 **게시**합니다. (이 규칙이 보안의 핵심이니 꼭 하세요.)
3. 내 컴퓨터: `.env.example`을 복사해 `.env`로 만들고 값을 채웁니다. (Firebase 콘솔 → 프로젝트 설정 → 내 앱의 설정값)
4. Netlify: **Site configuration → Environment variables**에 `.env`와 같은 6개 이름/값을 넣고 다시 배포합니다.
5. Firebase 콘솔 → **Authentication → 설정 → 승인된 도메인**에 Netlify 주소(`○○○.netlify.app`)를 추가합니다.
6. **첫 교수(관리자) 만들기**: 사이트에서 Google로 한 번 로그인 → Firebase 콘솔 → Firestore → `users` 컬렉션 → 내 문서의 `role` 값을 `admin`으로 바꿉니다. 새로고침(또는 재로그인)하면 상단에 **회원 관리** 메뉴가 생기고, 여기서 다른 사람을 승인할 수 있습니다.

## 5. 내용 바꾸기

- 연구실 이름·소개 문구: `src/siteInfo.ts`
- 초기 샘플 데이터: `src/services/mock/seed.ts`
- 연구·수업·구성원 내용은 교수(admin)로 로그인해서 화면에서 직접 수정할 수 있습니다. (Phase 1에서는 새로고침하면 사라집니다.)

## 6. 폴더 구조 (참고)

```
src/
  components/  공용 화면 조각 (헤더, 카드, 폼 …)
  pages/       주소별 화면
  services/    데이터 창구 (types.ts = 약속, mock/ = 가짜 구현, firebase/ = Firebase 구현, index.ts = 선택)
  context/     로그인 상태
  types/       데이터 모양 정의
firestore.rules   Firebase 보안 규칙 초안 (아직 적용 안 함)
netlify.toml      Netlify 배포 설정
.env.example      Firebase 연동 때 쓸 설정 이름 목록
```
