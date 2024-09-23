<div align=center><h1>📀SYNTHWAVE</h1></div>
<div align=center>
  <img width="50%" height="50%" src="https://github.com/dks044/SYNTHWAVE/assets/74749417/a332d1be-995f-4c8b-960d-c85f874f6df3" alt="홈페이지">
</div>
<div align=center>
  <h1>음악 관련 익명 리뷰 사이트</h1>
  <h3>SPA 원칙을 최대한 준수하면서 구현했습니다.</h3>
  <h4>(웹이 아닌 앱 느낌이 나게끔)</h4>
  <h3>백엔드와 협업 한다고 가정하고, json-server를 이용하여 RestFul 설계를 채택했습니다. </h3>
</div>
<br>
<div align=center>
    <h1>기간</h1>
    <h2> 24. 6. 1 ~ 24. 6. 5</h2>
</div>
<br><br>
<div align=center>
    <h1 id="주요-기능">주요 기능</h1>
    <h3>비동기식 검색, 필터, 정렬 기능(카드뷰, 리스트뷰 제공)</h3>
    <img width="50%" height="50%" src="https://github.com/dks044/SYNTHWAVE/assets/74749417/d7dd14e0-593d-434a-a420-67b880a8e9d4" alt="검색필터정렬">
    <p>Redux Saga를 사용하여 데이터를 렌더링한 후, 검색, 정렬, 필터 기능을 리다이렉트 없이 깔끔하게 사용자에게 제공합니다.</p>
    <br>
    <h3>글쓰기 (리다이렉트 없이 바로 보임)</h3>
    <img width="50%" height="50%" src="https://github.com/dks044/SYNTHWAVE/assets/74749417/9da7c832-12e0-4d30-8f91-f60e38c1c2da" alt="글쓰기">
    <br>
    <h3>수정하기(작성자만 가능)</h3>
    <img width="50%" height="50%" src="https://github.com/dks044/SYNTHWAVE/assets/74749417/14f6ad59-57db-4190-a55a-b9d890db3085" alt="수정하기">
    <br>
    <h3>좋아요, 별점 기능</h3>
    <img width="50%" height="50%" src="https://github.com/dks044/SYNTHWAVE/assets/74749417/4af83346-9c4f-4c61-a8be-4d02ad9f7345" alt="좋아요별점">
    <p>현재 사용자(브라우저)가 좋아요를 누르고, 한번 더 누르면 취소됨 (서버에 있는 게시글 데이터까지 반영)</p>
    <p>좋아요와 별점이 서버에 있는 데이터에 반영 후, <strong>화면에도 리다이렉트 없이 바로 반영 됩니다.</strong></p>
    <br>
    <h3>비동기식 댓글 기능 (수정, 삭제 - 작성자만 가능)</h3>
    <img width="50%" height="50%" src="https://github.com/dks044/SYNTHWAVE/assets/74749417/ee2edaf4-c94d-4b52-8840-54d8c38917a9" alt="댓글">
    <p>댓글의 CRUD가 이루어질시, <strong>Reudx-SAGA를 이용해서 서버에도 반영되며, 리다이렉트 없이 화면에 반영됩니다.</strong></p>
    <br>
</div>
<br><br><br>
<div align=center><h1 id="아키텍처">아키텍처 </h1></div>
<div align=center>
    <img src="https://github.com/dks044/SYNTHWAVE/assets/74749417/d19ad913-aa78-4aa0-b3d2-3d6148d83c65" alt="아키텍처">
</div>
<br><br>
<div align=center><h1 id="tech-stacks">TECH STACKS </h1></div>
  <div align=center>
    <h3>Frontend </h3>
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
    <img alt="Static Badge" src="https://img.shields.io/badge/styled_components-pink?style=for-the-badge&logo=styledcomponents&logoColor=white&color=%23DB7093">
    <img alt="Static Badge" src="https://img.shields.io/badge/Redux-black?style=for-the-badge&logo=redux&logoColor=white&color=%23764ABC">
    <img alt="Static Badge" src="https://img.shields.io/badge/Redux_Saga-black?style=for-the-badge&logo=reduxsaga&logoColor=white&color=%23764ABC">
    <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
    <br>
    <img alt="Static Badge" src="https://img.shields.io/badge/React_router-black?style=for-the-badge&logo=reactrouter&logoColor=white&color=%23CA4245">
    <img alt="Static Badge" src="https://img.shields.io/badge/Axios-black?style=for-the-badge&logo=axios&logoColor=white&color=%235A29E4">
  </div>
<br><br><br>
<div align=center><h1 id="파일-구조">파일 구조</h1></div>
<div align=center>
    <details>
      <summary>자세히</summary>
        <div align=left>
          <code>
            📦src
 ┣ 📂api
 ┃ ┗ 📜boardApi.js
 ┣ 📂components
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📜board.css
 ┃ ┃ ┣ 📜Board.js
 ┃ ┃ ┗ 📜Boards.js
 ┃ ┣ 📂etc
 ┃ ┃ ┣ 📜etc.css
 ┃ ┃ ┣ 📜LogoComponent.js
 ┃ ┃ ┗ 📜LogoText.js
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜layout.css
 ┃ ┃ ┗ 📜Navigate.js
 ┃ ┗ 📂write
 ┃ ┃ ┣ 📜PatchComponent.js
 ┃ ┃ ┗ 📜WriteComponent.js
 ┣ 📂containers
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📜board.css
 ┃ ┃ ┣ 📜BoardContainer.js
 ┃ ┃ ┗ 📜BoardsContainer.js
 ┃ ┣ 📂write
 ┃ ┃ ┣ 📜PatchContainer.js
 ┃ ┃ ┗ 📜WriteContainer.js
 ┃ ┗ 📜LayoutContainer.js
 ┣ 📂lib
 ┃ ┣ 📜asyncUtils.js
 ┃ ┣ 📜converToBase64.js
 ┃ ┣ 📜RatingStars.js
 ┃ ┗ 📜SimpleDataText.js
 ┣ 📂modules
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📜board.js
 ┃ ┃ ┗ 📜boardSaga.js
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜user.js
 ┃ ┃ ┗ 📜userSaga.js
 ┃ ┣ 📜reducers.js
 ┃ ┗ 📜rootSaga.js
 ┣ 📂pages
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📜BoardPage.js
 ┃ ┃ ┗ 📜BoardsPage.js
 ┃ ┣ 📂write
 ┃ ┃ ┣ 📜PatchPage.js
 ┃ ┃ ┗ 📜WritePage.js
 ┃ ┗ 📜HomePage.js
 ┣ 📂resources
 ┃ ┣ 📜GmarketSansTTFLight.ttf
 ┃ ┣ 📜Oswald-VariableFont_wght.ttf
 ┃ ┗ 📜SYNWHWAVE LOGO.png
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
          </code>
        </div>
    </details>
</div>
<br><br><br>

