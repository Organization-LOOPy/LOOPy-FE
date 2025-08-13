# LOOPy-FE

> 고객의 루틴에 나의 커피를 더하다
> **루피는 '우연한 방문'을 '단골 루틴'으로 바꾸는, 동네 카페를 위한 디지털 리워드 플랫폼입니다.**

## 👨‍👩‍👧‍👦 팀 소개

| 썸머 / 이현서 | 매디 / 강나윤 | 민 / 고민균 |
|--------------|---------------|--------------|
| <img src="https://github.com/user-attachments/assets/9f79b8c7-6dae-43c2-9911-3cc4eb450458" width="200" /> | <img src="https://github.com/user-attachments/assets/5ed40500-a26e-40b8-bc98-2495c66b47ca" width="200" /> | <img src="https://github.com/user-attachments/assets/31447f88-c080-4891-ab24-4debf08d9eac" width="200" /> |

> 루피 팀은 **카페와 사람을 단골이라는 연결로 이어주는** 경험을 디자인합니다.

---

## 💡 서비스 개요

매일 커피를 마시지만 늘 겪는 고민들:

```
# 개인카페는 좋은데, 결국 적립 잘 되는 프랜차이즈로 가게 되는 나
# 종이 스탬프는 자꾸 까먹어서 영원히 10잔 못 채우기
# 학교 앞 카페 DB를 3년째 뒤적이며 분좋카 발품팔기
```

**LOOPy**는 이러한 불편을 해결합니다.
**종이 스탬프를 디지털로 통합하고**,
**카페와 고객을 자연스럽게 연결**해줍니다.

## 🧭 사용자별 혜택

### ☕ To. 고객

* 내 주변 카페 쉽게 탐색
* 하나의 앱에서 다양한 스탬프/혜택 확인
* 사장님이 보내는 알림으로 할인 정보 즉시 확인

### 📣 To. 사장님

* 손님의 방문을 단골 루틴으로 연결
* 손쉽게 발급·관리 가능한 디지털 리워드
* 메시지·이벤트 전송으로 고객 소통

---

## 🧾 주요 기능

* QR 기반 스탬프 적립 시스템
* FCM 푸시 알림을 통한 이벤트·혜택 전송
* 카카오맵 기반 위치 탐색 + 정보 제공
* 사장님/고객 별 UI 및 반응형 설계
* 이메일 인증 기반 회원가입 및 로그인
* PWA 지원 (앱 설치 가능)

## ⚙️ 기술 스택

* **Frontend**

  * React + TypeScript
  * Vite (초고속 개발 환경)
  * Tailwind CSS (유틸리티 스타일)
  * React Router DOM v6
  * PWA (vite-plugin-pwa)

* **사용 라이브러리 및 도구**

  * `react-hook-form`, `zod`: 폼과 유효성 검사
  * `@tanstack/react-query`: 서버 상태 및 캐시 관리
  * `axios`: API 통신
  * `vite-plugin-svgr`: SVG 컴포넌트 처리
  * `react-intersection-observer`: 무한 스크롤
  * `clsx`: 조건부 클래스 처리

* **외부 API**

  * Kakao Map API
  * Firebase Cloud Messaging (FCM)

---

## 🧪 실행 방법

```bash
# pnpm 설치
npm install --global corepack@latest
npm install -g pnpm@latest-10

# 프로젝트 생성 및 의존성 설치
pnpm create vite
cd LOOPy-FE
pnpm install

# 개발 서버 실행
pnpm run dev
```

### 주요 라이브러리 설치 명령

```bash
pnpm add axios react-router-dom
pnpm i react-hook-form @hookform/resolvers zod
pnpm add @tanstack/react-query @tanstack/react-query-devtools
pnpm add react-intersection-observer clsx
pnpm add -D vite-plugin-svgr vite-plugin-pwa
```

---

## 📱 반응형 구조

| 구분  | 플랫폼  | 주요 UI                     |
| --- | ---- | ------------------------- |
| 고객  | 앱 전용 | 지도 기반 탐색, QR 인증, 혜택 관리, 챌린지   |
| 사장님 | 웹 전용 | 고객 스탬프 확인, 메시지 발송, 이벤트 등록 |

---

## 🏷️ 태그

`#디지털스탬프` `#단골관리` `#카카오맵` `#푸시알림` `#위치 탐색`
`#루피` `#Vite` `#TailwindCSS` `#PWA` `#QR인증` `#챌린지`

---

**매일 마시는 커피, 이제는 루피로 더 특별하게.**
