---
name: auto-commit
description: "Use this skill when the user types /commit, says 'commit', 'push', 'auto-commit', or wants to commit and push their changes. This skill analyzes all uncommitted changes, groups them by feature/functionality, creates atomic commits with intuitive Korean commit messages, and pushes everything at once."
disable-model-invocation: true
---

# Auto Commit & Push

변경사항을 분석하여 기능별로 atomic commit을 만들고 한번에 push하는 스킬.

## 실행 절차

아래 단계를 **순서대로** 빠짐없이 수행하라.

### Step 1: 현재 상태 파악

다음 명령어를 병렬로 실행하여 변경사항을 파악한다:

```bash
git status
git diff
git diff --cached
git log --oneline -5
git branch -vv
```

- 변경사항이 없으면 "커밋할 변경사항이 없습니다." 라고 알리고 종료한다.
- 현재 브랜치가 remote를 tracking하는지 확인한다.

### Step 2: 변경 파일 분석 및 그룹핑

모든 변경/추가/삭제된 파일의 diff 내용을 읽고, **기능 단위(feature)**로 그룹핑한다.

그룹핑 기준:
1. **같은 기능에 속하는 파일들** - 예: 컴포넌트 + 스타일 + 테스트 → 하나의 커밋
2. **설정/환경 변경** - config, env, package.json 등 → 별도 커밋
3. **리팩토링** - 기능 변경 없이 구조만 바뀐 것 → 별도 커밋
4. **문서 변경** - README, docs 등 → 별도 커밋
5. **버그 수정** - 버그 관련 파일들 → 별도 커밋
6. **의존성 변경** - package.json, lock 파일 등 → 별도 커밋

파일이 1~3개이고 모두 같은 기능이면 하나의 커밋으로 합쳐도 된다.

### Step 3: 커밋 계획 표시

사용자에게 커밋 계획을 보여준다. 형식:

```
## 커밋 계획

1. feat: 로그인 폼 UI 구현
   - src/components/LoginForm.tsx
   - src/styles/login.css

2. fix: 회원가입 이메일 검증 오류 수정
   - src/utils/validation.ts

3. chore: ESLint 설정 업데이트
   - .eslintrc.js
```

그리고 사용자에게 확인을 요청한다: "이대로 커밋하시겠습니까?"

### Step 4: 순차적 Atomic Commit 실행

사용자가 승인하면, 각 그룹에 대해 순서대로:

1. `git add <해당 그룹의 파일들>` (파일명을 명시적으로 지정)
2. `git commit -m "<커밋 메시지>"`

**주의사항:**
- `git add .` 또는 `git add -A`는 절대 사용하지 않는다
- 각 커밋은 해당 그룹의 파일만 포함한다
- 커밋 실패 시 즉시 사용자에게 알린다

### Step 5: Push

모든 커밋이 완료되면:

1. `git log --oneline -<커밋수>` 로 생성된 커밋들을 확인한다
2. remote tracking이 설정되어 있으면 `git push`, 없으면 `git push -u origin <브랜치명>`으로 push한다

push 후 결과를 사용자에게 보여준다.

## 커밋 메시지 규칙

### 형식
```
<type>: <간결한 설명>
```

### Type 목록
| Type | 용도 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `style` | 코드 스타일/포맷팅 |
| `docs` | 문서 변경 |
| `chore` | 설정, 빌드, 기타 잡무 |
| `test` | 테스트 추가/수정 |
| `perf` | 성능 개선 |
| `deps` | 의존성 추가/업데이트/삭제 |

### 메시지 작성 원칙
- 한국어로 작성한다
- **무엇을 했는지** 직관적으로 알 수 있게 쓴다
- 30자 이내로 간결하게 작성한다
- 예시:
  - `feat: 사용자 프로필 페이지 추가`
  - `fix: 로그인 시 토큰 만료 처리 누락 수정`
  - `refactor: API 호출 로직 공통 유틸로 분리`
  - `chore: TypeScript strict 모드 활성화`
  - `deps: React 18로 업그레이드`

## 중요 규칙

- **절대로** `--no-verify` 플래그를 사용하지 않는다
- **절대로** `--force` push를 하지 않는다
- 커밋 전 반드시 사용자에게 계획을 보여주고 승인을 받는다
- 민감한 파일(.env, credentials 등)이 포함되어 있으면 경고한다
- Co-Authored-By 헤더는 추가하지 않는다
