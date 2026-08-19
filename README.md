[README.md](https://github.com/user-attachments/files/31230908/README.md)
# 술과 담배 — 바다거북 스프 퀴즈

정적 사이트입니다. `index.html`, `style.css`, `script.js`, `assets/` 폴더만 있으면 동작합니다.

## GitHub Pages로 배포하기

1. 이 폴더(파일 전체)를 GitHub 저장소 루트에 업로드합니다.
2. 저장소의 **Settings → Pages**로 이동합니다.
3. **Branch**를 `main`(또는 사용 중인 브랜치), 폴더를 `/root`로 지정하고 저장합니다.
4. 몇 분 후 `https://<사용자명>.github.io/<저장소명>/` 주소로 접속하면 확인할 수 있습니다.

## 구조

- `index.html` — 페이지 구조
- `style.css` — 우주 배경 · 말풍선 · 로그 스타일
- `script.js` — 질문 34개를 무작위로 뽑아 말풍선에 보여주는 로직, 흰 배경을 투명 처리해 고양이를 오려내는 캔버스 처리
- `assets/cat.jpg` — 고양이 캐릭터 (스크립트가 흰 배경을 자동으로 투명 처리합니다)
- `assets/space.jpg` — 배경 이미지

## 질문/이미지 교체

- 다른 이미지를 쓰려면 `assets/cat.jpg`, `assets/space.jpg`를 같은 파일명으로 교체하면 됩니다. 고양이 이미지는 배경이 흰색(또는 아주 밝은 단색)이어야 자동 투명 처리가 잘 됩니다.
- 질문을 바꾸거나 추가하려면 `script.js` 상단의 `QUESTIONS` 배열을 수정하세요. `a` 값은 `yes`(예) · `no`(아니오) · `neutral`(중요하지 않습니다) 중 하나입니다.
