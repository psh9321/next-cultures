# Discover Cultures 
https://exhibition.psh9321.cloud/

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

## 기능 테스트

### 실행 커멘트
 - 실행 : pnpm test
 - 감시 모드 : pnpm test-watch

### 테스트 항목
 - `Auth.test.tsx`: 소셜 로그인 팝업 URL, 세션 상태 전환, 쿠키 삭제 및 로그아웃 검증
 - `CultureList.test.tsx`: 실제 React Query로 최초 조회, 페이지 누적, 마지막 페이지 종료, 검색 조건 변경, 조회 오류 및 목록 UI의 스크롤 추가 조회 조건과 빈 목록 검증
 - `CultureMap.test.tsx`: 현 지도 영역 검색, 확대·축소 제한, 좌표별 마커 목록 및 선택한 전시의 상세페이지 이동 검증
 - `Detail.test.tsx`: 서버 prefetch 캐시가 있는 상세페이지의 조회 및 정보 갱신, 로그인 상태의 카카오톡 공유 데이터·링크 검증
 - `Favorite.test.tsx`: 좋아요 등록·해제 UI, 상세 캐시 갱신, 목록 무효화, 비로그인·세션 만료 검증
 - `Metadata.test.ts`: 전시별 제목·설명·canonical·OG·Twitter 메타데이터 및 조회 실패 검증
 - `Search.test.tsx`: 검색어 디바운스, 카테고리·지역 검색, 필터 조합 및 해제 검증 