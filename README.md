### 폴더 구조

```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┣ 📂icons // 아이콘
 ┃ ┗ 📂images // 이미지 파일
 ┣ 📂components // 컴포넌트 관리
 ┃ ┣ 📂TextField
 ┃ ┣ 📂Button
 ┃ ┣ 📂Modal
 ┃ ┣ 📂Toast
 ┃ ┣ 📂Badge
 ┃ ┣ 📂Header
 ┃ ┣ 📂CardList
 ┃ ┣ 📂Card
 ┃ ┣ 📂Option
 ┣ 📂constants // 상수 관리
 ┣ 📂hooks // 리액트 훅 관리
 ┣ 📂pages // 리액트 라우터를 위한 페이지 관리
 ┃ ┣ 📂Main // path = "/" 매인 페이지
 ┃ ┣ 📂List // path = "/list" 롤링페이퍼 목록 페이지
 ┃ ┣ 📂MakePaper // path = "/post" 롤링페이퍼 만들기 페이지
 ┃ ┣ 📂RollingPaper // path = "/post/{id}" 롤링페이퍼 페이지
 ┃ ┣ 📂WritePaper // path = "/post/{id}/message" 롤링페이퍼 메세지 보내기 페이지
 ┣ 📂styles // 전역 css 관리 이하 css 는 module.css 를 이용해서 각 폴더에서 관리.
 ┗ 📂utils // 유틸 함수 관리
```
