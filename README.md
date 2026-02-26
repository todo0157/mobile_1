# FanVoice - 크리에이터 맞춤 영상메시지 플랫폼

한국판 Cameo. 팬이 좋아하는 크리에이터에게 개인 맞춤 영상 메시지(생일 축하, 응원, 프로포즈 등)를 유료로 요청하는 플랫폼입니다.

## 핵심 컨셉

- **팬**: 크리에이터에게 1~5만원에 맞춤 영상 메시지를 요청
- **크리에이터**: 건당 수익 발생 (플랫폼 수수료 20%)
- **플랫폼**: 월 500건 × 평균 3만원 × 20% = **월 300만원** 수익 구조

## 스크린 구성 (5개 화면)

| 화면 | 파일 | 설명 |
|------|------|------|
| **홈** | `HomeScreen.js` | 히어로 배너, 카테고리, 인기 크리에이터, 이용방법 |
| **탐색** | `ExploreScreen.js` | 검색, 카테고리 필터, 정렬 (인기/평점/가격순) |
| **크리에이터 프로필** | `CreatorProfileScreen.js` | 커버, 통계, 바이오, 샘플영상, 리뷰, 요청 CTA |
| **영상 요청 폼** | `RequestFormScreen.js` | 받는사람, 상황 선택, 메시지 작성, 결제 |
| **내 요청** | `MyRequestsScreen.js` | 대기/제작중/완료 상태 추적, 영상 보기 |

## 기술 스택

- **React Native** (Expo SDK 50)
- **React Navigation** (Stack + Bottom Tabs)
- **@expo/vector-icons** (Ionicons)
- Mock 데이터 기반 MVP

## 프로젝트 구조

```
fanvoice/
├── App.js                          # 앱 진입점 + 네비게이션 설정
├── package.json
├── app.json
├── babel.config.js
└── src/
    ├── constants/
    │   └── theme.js                # 색상, 폰트, 사이즈, 그림자
    ├── data/
    │   └── mockData.js             # 크리에이터, 카테고리, 요청 데이터
    ├── components/
    │   ├── CreatorCard.js          # 크리에이터 카드 컴포넌트
    │   ├── CategoryChip.js         # 카테고리 칩 컴포넌트
    │   └── SectionHeader.js        # 섹션 헤더 컴포넌트
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── ExploreScreen.js
    │   ├── CreatorProfileScreen.js
    │   ├── RequestFormScreen.js
    │   └── MyRequestsScreen.js
    └── navigation/                 # (확장용)
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npx expo start

# iOS / Android / Web
npx expo start --ios
npx expo start --android
npx expo start --web
```

## 수익 모델

| 수익원 | 구조 | 예상 |
|--------|------|------|
| 영상 메시지 수수료 | 건당 20% | 월 500건 × 3만원 × 20% = 300만원 |
| 프리미엄 구독 (크리에이터) | 월 9,900원 | 100명 = 99만원 |
| 급행 요청 추가금 | 건당 +50% | 월 50건 = 75만원 |

## 경쟁 분석

| | Cameo (미국) | 팬딩 | **FanVoice** |
|--|-------------|------|------------|
| 시장 | 미국/영어권 | 한국 (후원 중심) | **한국 (영상메시지)** |
| 타겟 | 셀럽 | 중대형 크리에이터 | **마이크로~중형** |
| 핵심 기능 | 영상메시지 | 후원/멤버십 | **맞춤 영상메시지** |
| 가격대 | $25~$500 | 후원 기반 | **1~5만원** |

## 다음 단계 (로드맵)

1. **Firebase 연동** — 회원가입/로그인, 크리에이터/요청 데이터 저장
2. **결제 연동** — 토스페이먼츠 or 카카오페이
3. **영상 업로드** — Firebase Storage + 푸시 알림
4. **크리에이터 대시보드** — 수익 관리, 요청 수락/거절
5. **알림 시스템** — 요청 상태 변경 시 실시간 알림

## 라이선스

MIT
