# 🍊감귤 마켓

## 🟠 1 프로젝트 설명
> [기존 팀 프로젝트](https://github.com/postop09/mandarine_market)에서 http 호환 문제 및 부족한 부분 개선, 모든 기능들을 구현해보기 위해 개인프로젝트로 재진행.

### 1.1 프로젝트 주제
- **상품을 등록하여 홍보할 수 있는 SNS**
- 상품을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있습니다. 글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다. 피드를 구경하다가 마음에 드는 게시물을 발견했다면 좋아요를 누를 수 있고 댓글을 남기거나 공유를 할 수도 있습니다.

### 1.2 핵심 기능
- API
- CRUD
- 로그인/회원가입
- Mobile first Design

## 🟠 2 빌드 및 실행방법
### 2.1 서버 폐쇄
- 서버 변경 후 오류

## 🟠 3 개발 환경
- 1인 개발

### 3.1 사용 기술/도구
- HTML
- CSS/SCSS
- JavaScript
- Git/Github(Git issue, Git Project)
- Figma

### 3.2 프로젝트 구조
```
└─src
    ├─font
    ├─img
    │  └─icon
    ├─js
    ├─pages
    │  └─Modal
    └─style
```
### 3.3 UI
**피그마 활용**
![감귤마켓 전체 피그마](https://user-images.githubusercontent.com/93017923/161413093-b7c6bf92-12bb-4500-92e0-cac906b19818.PNG)

### 3.4 API
- 로그인/로그아웃/회원가입
- 토큰 검증
- 이미지 업로드
- 프로필 정보/수정
- 검색
- 게시글 작성/출력/수정/삭제/신고
- 상품 작성/출력/수정/삭제
- 댓글 작성/출력/삭제/신고
- 팔로우/팔로워/좋아요

## 🟠 4 구현 페이지 및 기능
### 4.1 회원가입
![회원가입](https://user-images.githubusercontent.com/93017923/161414640-8d51506f-6f13-4b5d-8b12-3e146fbba02f.gif)
- 정규표현식을 활용하여 올바른 이메일 형식을 구분
- 이메일 주소창에서 포커스를 잃을 때 유효성 검사 실시, 즉각적인 피드백을 통해 사용성 개선
- 이메일 유효성/비밀번호 6자리 이상 조건 만족 시, 다음 버튼 활성화
- 이미지 파일만 선택 가능, 선택한 이미지 미리보기 출력
- 계정ID는 이메일 유효성 검사와 동일하게 포커스를 잃을 때 결과 피드백
- 사용자 이름/계정ID 조건 만족 시, 시작 버튼 활성화

### 4.2 로그인
![로그인](https://user-images.githubusercontent.com/93017923/161414644-dd495da7-bb0b-469e-a3e3-3412c538885e.gif)
- 이메일과 비밀번호가 일치하지 않으면 오류메세지 출력
- 모든 입력창이 채워지면 버튼 활성화

### 4.3 검색
![검색](https://user-images.githubusercontent.com/93017923/161414650-a23e1ef3-2d78-43c3-8208-c0e48f5adc52.gif)
- 검색창에 입력한 텍스트와 이름 혹은 계정ID가 일치하는 사용자 출력

### 4.4 유저 프로필
#### 4.4.1 팔로우
![팔로우](https://user-images.githubusercontent.com/93017923/161415008-cc3218ec-1c36-4956-a773-b6d64e338768.gif)
- 팔로우 클릭 시, 상대방의 팔로잉 리스트에 추가
- 홈 페이지에 팔로우한 사용자의 게시글 출력

#### 4.4.2 팔로워/팔로잉 리스트
![팔로워,팔로잉](https://user-images.githubusercontent.com/93017923/161415012-bc46f350-cf5e-4211-ab82-eb1ec80f9454.gif)
- 사용자의 팔로워/팔로잉 확인 및 취소/팔로우 가능

### 4.5 내 프로필
![내 프로필](https://user-images.githubusercontent.com/93017923/161415261-1fd9b301-50a4-4f43-ac1c-a55ae64639f3.gif)
- 내 프로필에 관련된 정보 출력(상품, 게시글, 팔로워/팔로잉)
- 이미지가 있는 게시물만 앨범 형태로 보기

#### 4.5.1 프로필 수정
![프로필 수정](https://user-images.githubusercontent.com/93017923/161415265-ecb1998b-fcb4-4912-8b71-ccfb13d457f6.gif)
- 계정ID 중복 검사

### 4.6 게시글
#### 4.6.1 게시글 작성
![게시글 작성](https://user-images.githubusercontent.com/93017923/161415839-6d5abea6-ca95-42fa-a99f-2bd9b70b3035.gif)
- 글 혹은 이미지가 업로드 되면 버튼 활성화
- 이미지는 최대 3장까지 업로드
- 이미지 미리보기 출력

#### 4.6.2 게시글 상세보기
![게시글 상세보기](https://user-images.githubusercontent.com/93017923/161415842-0c039b11-6bbf-4e3b-b997-52997d9cb8a2.gif)
- 이미지 혹은 말풍선 클릭 시, 상세보기 페이지로 이동
- 이미지 자세히 보기 모달창 출력
- 해당 게시글의 댓글 목록 출력

#### 4.6.3 게시글 수정
![게시글 수정](https://user-images.githubusercontent.com/93017923/161904990-afaf5afd-be03-41d3-9bda-c502836f63bb.gif)
- 최초 등록되어 있는 게시물 내용 불러오기
- 텍스트나 이미지 둘 중 하나만 수정하여 저장 가능
- 이미지는 변경하지 않고 텍스트만 수정 시 기존 이미지 url 전송

#### 4.6.4 게시글 삭제
![게시글 삭제](https://user-images.githubusercontent.com/93017923/161415845-3ef2df9b-3c68-4168-adf6-f145b3e92f03.gif)
- 내 게시글인 경우 삭제
- 게시글 삭제 재확인 모달창

#### 4.6.5 게시글 신고
![게시글 신고](https://user-images.githubusercontent.com/93017923/161415851-154f7d2e-1aa9-4b54-8753-cd6828e72cb8.gif)
- 내 게시글이 아닌 경우 게시글 신고

### 4.7 상품
#### 4.7.1 상품 작성
![상품 작성](https://user-images.githubusercontent.com/93017923/161416052-ac91f9fe-62a6-4fec-8632-49e602f0f2da.gif)
- 이미지 미리보기 출력
- 정규표현식을 이용한 숫자만 작성 제한
- 올바른 작성법이 아닌 경우 오류텍스트 출력

#### 4.7.2 상품 페이지로 이동
![상품 이동](https://user-images.githubusercontent.com/93017923/161416057-00337616-17dc-43c4-b9d3-24465a1511e8.gif)

#### 4.7.3 상품 삭제
![상품 삭제](https://user-images.githubusercontent.com/93017923/161416059-b068dad5-3463-43b3-815d-306143ec10ed.gif)
- 내 상품인 경우 삭제

### 4.8 댓글
#### 4.8.1 댓글 작성
![댓글 작성](https://user-images.githubusercontent.com/93017923/161416291-44acd56d-cd86-4f09-8c95-8df429b26957.gif)
- 입력창에 텍스트가 없으면 버튼 비활성화

#### 4.8.2 댓글 삭제
![댓글 삭제](https://user-images.githubusercontent.com/93017923/161416294-492f6be8-4625-41e4-bb91-e91e7c5b8559.gif)
- 내 댓글인 경우 삭제

#### 4.8.3 댓글 신고
![댓글 신고](https://user-images.githubusercontent.com/93017923/161416298-1541d1bc-2477-4b1f-a9e3-3150d645c327.gif)
- 내 댓글이 아닌 경우 신고

### 4.9 로그아웃
![로그아웃](https://user-images.githubusercontent.com/93017923/161416399-2ef36a4c-b701-4e96-b992-5ee42663be3d.gif)
- 로컬스토리지 초기화 및 index페이지로 이동

### 4.10 기타
- 좋아요 기능
- 채팅 페이지 구현, 기능 미구현

## 🟠 5 문제점 및 궁금했던 점/개선방안 및 배운점
### 5.1 문제점
- **API 데이터 호출/전송과 submit 버튼**

submit 버튼에 API 데이터 전송 이벤트를 할당해 놓는 경우 데이터가 전송되기 전에 이벤트가 발생하는 문제

- **깃허브 페이지 출력/상품 링크로 이동 오류**

http와 호환되지 않는 문제, 링크 인식 오류(Mixed Content)

- **이미지 출력 문제**

이미지 주소가 정상적으로 입력되지 않은 파일, 한 장의 이미지만 출력되고, 여러장의 이미지는 출력되지 않는 문제
### 5.2 궁금했던 점
- **http와 https**

정리 : https://watchwebs.tistory.com/27

### 5.3 개선방안 및 배운점
- **API 데이터 호출/전송과 submit 버튼**

submit 버튼의 기본 이벤트를 억제(`e.preventDefault();`)하고, `setTimeOut()`를 이용하여, 정상적으로 데이터가 전송될 시간을 확보 후 다음 이벤트를 발생시킨다.

- **깃허브 페이지 출력/상품 링크로 이동 오류**

http용 데이터 호출 주소에서 https용 데이터 호출 주소로 변경

- **이미지 출력 문제**

이미지 호출 시 가장 첫번째 이미지가 출력되도록 변경

## 🟠 6 느낀점
최초 팀 프로젝트로 진행되었던 감귤마켓을 개인 프로젝트로 진행하니 확실히 많은 시간을 소요해야했다. 그럼에도 불구하고, 이전에 직접 만들어보지 못했던 로그인/회원가입 기능, CRUD 모두 활용할 수 있어서 좋았다. 특히, 작업을 하면서 UI적 요소의 작은 오류들이 많이 식별되었는데, 점점 프로젝트가 정돈되어갈 수록 수정 보완할 것이 계속해서 생겨나는 것같다! 앞으로도 지속적으로 확인하며 개선시켜보자.

## 🟠 7 추가 목표
- 게시글 수정(04.06 완료)
- 이미지 서버는 http/ 베이스 서버는 https?? CORS와 Mixed Contents...(05.08 확인)
