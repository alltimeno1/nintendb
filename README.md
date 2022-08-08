# Nintendb

https://www.nintendb.shop

## 기술 스택

<div>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> 
  <img src="https://img.shields.io/badge/pug-A86454?style=for-the-badge&logo=pug&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <br>
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/Nginx-009639.svg?style=for-the-badge&logo=Nginx&logoColor=white">
</div>

## 구조

```bash
├── src
│   ├── @types // 타입 설정
│   ├── controllers // 요청에 대한 응답 반환
│   ├── css // 스타일 설정
│   ├── models // 데이터베이스 스키마
│   ├── routes // 라우터
│   ├── services // 데이터베이스 작업
│   ├── utils // 기타 모듈
│   └── views // pug 템플릿 엔진
├── static
│   ├── bgm // 음악 파일
│   └── img // 이미지 파일
├── app.js // 서버 실행
```

## 주요 기능

1. 네이버 소셜 로그인
- 로그인 / 비로그인 모두 이용 가능
2. 게임 정보 검색
- 키워드, 태그별로 검색
- 발매일, 평점, 할인율 순으로 검색
- 한줄평 남기기
3. 관심 목록
- 게임 찜하기
- 관심 목록 확인 및 삭제
4. 문의 남기기

## 라이브러리

| 이름                 | 설명                     | 버전  |
| :-----------------: | :---------------------: | :------: |
| mongoose            | MongoDB ORM             |6.21.1|
| passport-naver      | 네이버 소셜 로그인           |1.0.6|
| bcrypt              | 비밀번호 암호화             |5.0.1|
| pug                 | 템플릿 엔진                |1.0.6|
| axios               | HTTP 통신                |0.26.1|
| puppeteer           | 크롤링                    |13.5.2|
| typescript          | 타입 명시                 |4.6.3|
| eslint              | 코드 분석                 |8.19.0|
| prettier            | 코드 스타일 설정            |2.6.2|
| dotenv              | 환경변수 설정              |16.0.1|
| cors                | CORS 핸들링              |2.8.5|
| morgan              | 개발 로그 관리             |1.10.0|
