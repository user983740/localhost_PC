## 2026 제3회 와커톤 금상 수상작 🥇🏆

팀명: **상금수거반** 💰🧹💰🧹

- 📣 와커톤 3회 설명글: https://www.instagram.com/p/DTl7DdpAUro/
- 🖥️ 서버 레포: https://github.com/yeonseo432/localhost-server
- 📱 모바일 클라이언트 레포: https://github.com/yabsed/localhost-Mobile

<p align="center">
  <img src="./demo/award/Wakathon.png" alt="와커톤 3회 대회 설명" style="display: inline-block; width: 49%; max-width: 560px; height: auto; vertical-align: top;" />
  <img src="./demo/award/Result.png" alt="와커톤 금상 인증샷" style="display: inline-block; width: 49%; max-width: 560px; height: auto; vertical-align: top;" />
</p>

이 프로젝트는 **2026 제3회 와커톤 금상** 수상작입니다.

# localhost Admin

<p align="center">
  <img src="./public/logo.png" alt="localhost 아이콘" style="display: block; max-width: 96px; width: 100%; height: auto; margin: 0 auto;" />
</p>

위치 기반 미션 리워드 서비스 **localhost**의 매장 관리자 웹 클라이언트입니다.
매장 사장님은 이 관리자 페이지에서 미션을 생성·수정·삭제하고, 대시보드에서 운영 현황을 한눈에 확인할 수 있습니다.

## 프로젝트가 해결하는 문제

모바일 앱에서 사용자가 수행하는 미션을 매장 사장님이 직접 설계하고 관리할 수 있어야 합니다.
이 관리자 클라이언트는 다양한 미션 타입에 맞는 설정 폼을 제공하고, 매장 정보와 미션 운영 상태를 직관적으로 관리할 수 있도록 합니다.

- 5가지 미션 타입별 전용 생성/수정 폼
- 대시보드에서 활성 미션 수, 총 미션 수, 보상 예산 확인
- S3 연동 이미지 업로드를 통한 보물찾기 미션 관리

## 핵심 관리자 경험

### 1) 로그인 및 회원가입

<p align="center">
  [로그인 페이지 스크린샷]
  [회원가입 페이지 스크린샷]
</p>

- OWNER 역할 계정으로 로그인하여 관리자 기능에 접근합니다.
- 회원가입 후 매장 정보를 등록하면 바로 대시보드로 이동합니다.
- Daum 주소 API를 연동하여 매장 주소를 간편하게 검색·입력할 수 있습니다.

기술 포인트:
- `zustand` + `localStorage` 영속화로 토큰 캐싱 및 자동 로그인
- `_authenticated.tsx`의 `beforeLoad`에서 인증 상태를 확인하는 라우트 가드

### 2) 대시보드

<p align="center">
  [대시보드 페이지 스크린샷]
</p>

- 활성 미션 수, 전체 미션 수, 총 보상 예산을 통계 카드로 한눈에 확인합니다.
- 현재 활성화된 미션 목록이 카드 그리드로 표시되어 빠르게 접근할 수 있습니다.

기술 포인트:
- `TanStack React Query`로 서버 상태 관리 (staleTime 5분, retry 1회)
- 통계 데이터를 미션 목록에서 집계하여 실시간 반영

### 3) 미션 목록 및 상세

<p align="center">
  [미션 목록 페이지 스크린샷]
  [미션 상세 페이지 스크린샷]
</p>

- 매장에 등록된 모든 미션을 카드 그리드로 조회합니다.
- 미션 타입별 색상 배지와 활성/비활성 상태 배지로 직관적으로 구분합니다.
- 상세 페이지에서 미션 설정 정보를 확인하고 수정/삭제할 수 있습니다.

기술 포인트:
- 반응형 그리드 레이아웃 (모바일 1열, 데스크톱 3열)
- 미션 타입별 `configJson` 파싱 및 설정값 표시
- 삭제 시 `ConfirmModal`로 2차 확인 후 처리

### 4) 미션 생성 및 수정

<p align="center">
  [미션 생성 폼 스크린샷]
</p>

- 5가지 미션 타입 중 하나를 선택하면 해당 타입에 맞는 설정 필드가 동적으로 표시됩니다.
- 보물찾기(INVENTORY) 미션은 정답 이미지를 직접 업로드할 수 있습니다.

| 미션 타입 | 설정 필드 | 설명 |
|-----------|-----------|------|
| **시간대 방문** (TIME_WINDOW) | 시작/종료 시간, 요일 선택 | 특정 시간대 방문 유도 |
| **체류** (DWELL) | 체류 시간 (분) | 매장 내 일정 시간 체류 |
| **영수증 인증** (RECEIPT) | 대상 상품명 | 특정 상품 구매 인증 |
| **보물찾기** (INVENTORY) | 정답 이미지 업로드 | 카메라로 대상 촬영 인증 |
| **반복 방문** (STAMP) | 필요 방문 횟수 | N회 방문 시 보상 지급 |

기술 포인트:
- `Mantine Form`으로 타입별 동적 폼 유효성 검증
- S3 Presigned URL을 통한 이미지 직접 업로드
- 업로드 중 제출 방지 및 실시간 미리보기 제공

### 5) 매장 정보 관리

<p align="center">
  [매장 정보 페이지 스크린샷]
</p>

- 매장명, 주소, 상세 주소, 사업자 번호 등 매장 정보를 확인합니다.

기술 포인트:
- 회원가입 직후 매장 등록 플로우와 연계
- Daum Postcode API 연동으로 주소 자동완성

## 기술 아키텍처

### Frontend Stack

- React 19 + TypeScript 5.9 + Vite 7
- Mantine 8 (UI 컴포넌트 + 폼 + 알림)
- TanStack Router (파일 기반 라우팅)
- TanStack React Query (서버 상태 관리)
- Zustand (인증 상태 영속화)
- Tabler Icons (아이콘)
- dayjs (날짜 포매팅)

### 아키텍처 패턴 (Feature-Sliced Design)

```
src/
├── app/          # 프로바이더, 글로벌 설정 (theme, queryClient)
├── routes/       # TanStack Router 파일 기반 라우팅
├── pages/        # 페이지 컴포넌트
├── features/     # 비즈니스 기능 (auth, create-mission, edit-mission, delete-mission, edit-store)
├── entities/     # 도메인 모델 (mission, store, user, participant)
├── widgets/      # 조합형 위젯 (sidebar, header, mission-list, dashboard-stats)
└── shared/       # 공용 UI, 유틸, 상수
```

각 슬라이스 내부: `api/` → `model/` (types, hooks) → `ui/`

### 상태 관리

- `useAuthStore` (Zustand): 로그인, 토큰 영속화, 매장 ID 관리
- React Query Key 패턴: `['missions']`, `['mission', storeId, missionId]`, `['stores']`

### API 연동 포인트

- 인증
  - `POST /api/auth/login`
  - `POST /api/auth/signup`
- 매장
  - `GET /api/stores`
  - `POST /api/stores`
- 미션 CRUD
  - `GET /api/stores/{storeId}/missions`
  - `GET /api/missions/{missionId}`
  - `POST /api/stores/{storeId}/missions`
  - `PUT /api/missions/{missionId}`
  - `DELETE /api/missions/{missionId}`
- 이미지 업로드
  - `POST /api/images/presigned-url` (S3 Presigned URL 발급)

## 실행 방법

```bash
npm install

npm run dev
```

빌드:

```bash
npm run build
npm run preview
```
