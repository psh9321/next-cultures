## 주요 기술 스택 
 - Next.js (AppRouter)
 - TypeScript
 - React Query, Zustand
 - NextAuth
 - Styled-Components
 - Ky

## 파일 별 책임 분리 설계
 - page.tsx : 서버 페이지
 - _view.tsx : 클라이언트 페이지
 - layout.tsx : root 페이지
 - _html.tsx : styled-components

## FSD 디자인 패턴 적용
 - entities : API 도메인 별 최소 단위 UI 및 API, hook, zustand store 모음
 - features : 기능이 들어간 컴포넌트 UI
 - provider : 전역 프로바이더
 - script : 외부 스크립트
 - shared : 전역으로 사용되는 ui, 유틸 기능 등등
 - styles : 전역 스타일
 - widgets : 페이지를 구성하는 조립 단위 UI

## 클라이언트 <=> Next API Router <=> Backend 통신 구조 설계

## 주요 기능

### 소셜 로그인
 - NextAuth 기반 OAuth 로그인
 - Naver, Kakao, Google 로그인 지원

### 전시 검색
 - Debounce 기반 검색
 - URL QueryString 기반 검색 상태 관리
 - 브라우저 히스토리 누적 없이 검색 상태 동기화

### 반응형 UI
 - Desktop / Tablet / Mobile 대응
 - use-media-query 기반 조건부 렌더링

### 로딩 상태 관리
 - Zustand를 활용한 전역 로딩 상태 관리
 - 목록 조회, 검색, 상세 페이지 진입 시 사용자 피드백 제공