# 스마트 도크 시스템 Cloud

기존 화면 4개를 React/Vite 웹 앱으로 재구성했습니다. 앱의 Supabase 테이블 이름과 컬럼 사용은 `supabase/setup.sql` 기준으로 맞춰져 있습니다.

## DB 구조 (SQL과 앱 코드 일치)
- `driver`: 기사 이름/연락처
- `truck`: 차량번호, 기사 FK, 화물유형, 톤수, 출발지
- `dispatch`: 접수 순번, 상태, 도크 FK, 접수/배정/작업/완료 시간
- `dock`: 도크 구역, 설명, 상태, 현재 dispatch FK
- `notification_log`: 상태 변경 알림 로그

## 1) Supabase
1. Supabase 프로젝트를 생성합니다.
2. SQL Editor에서 `supabase/setup.sql` 전체를 실행합니다.
3. (선택) 테스트값을 넣으려면 `supabase/seed_demo.sql`을 한 번 실행합니다. 테스트값은 가상값입니다.
4. Project Settings → API에서 Project URL과 anon/public key를 준비합니다.

## 2) 로컬 실행
Node.js LTS 설치 후:
```bash
npm install
```
`.env.example`을 `.env.local`로 복사하고 Supabase URL/key를 입력한 후:
```bash
npm run dev
```
환경변수가 없으면 화면이 로컬 데모 데이터로 동작합니다.

## 3) GitHub 업로드
GitHub에서 새 repository를 만들고 프로젝트 폴더에서 실행:
```bash
git init
git add .
git commit -m "Smart dock cloud app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## 4) Vercel 배포
1. Vercel → Add New Project → GitHub repository Import.
2. Framework preset Vite 확인.
3. Environment Variables에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 입력.
4. AI 브리핑을 쓰려면 서버 환경변수 `OPENAI_API_KEY`도 추가 (VITE_ 접두사 금지).
5. Deploy.

## 참고/제한
- DB 컬럼은 원본 SQLite 파일이 없어 화면과 사용자가 제공한 SQLite 테이블 이름을 바탕으로 추정한 PostgreSQL 스키마입니다.
- 과제 데모를 위해 setup.sql에 anon 공개 RLS 정책이 포함됩니다. 실제 개인정보를 저장할 서비스로 쓰기 전 접근 정책/인증을 강화하세요.
- 배정 및 완료 UI는 dispatch와 dock을 순차 업데이트합니다. 실제 다중 사용자 운영에는 원자적 RPC/트랜잭션을 권장합니다.
