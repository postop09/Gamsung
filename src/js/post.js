const $secMain = document.querySelector('.sec_postMain');
const $secDetail = $secMain.querySelector('.sec_postDetail');
const $secComment = $secMain.querySelector('.sec_postComment');
const $secModal = $secMain.querySelector('.sec_modal');
const $secFooter = document.querySelector('.sec_postFooter');
const $inpComment = $secFooter.querySelector('.inp_comment');
const $btnComment = $secFooter.querySelector('.btn_pushComment');
const $btnMore = document.querySelector('.btn_moreMenu');
const url = `http://146.56.183.55:5050`;
const token = JSON.parse(localStorage.getItem('token'));
const postId = localStorage.getItem('postId');

// 뒤로가기
const $btnBack = document.querySelector('.btn_backPage');
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 게시글 상세보기
async function fetchPostData() {
  const res = await fetch(`${url}/post/${postId}`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  const authorImg = json.post.author.image;
  const authorName = json.post.author.username;
  const authorId = json.post.author.accountname;
  const postContent = json.post.content;
  const postImg = json.post.image;
  const postImgs = postImg.split(',');
  const postHeartCount = json.post.heartCount;
  const postCommentCount = json.post.commentCount;
  const postCreatedAt = json.post.createdAt;
  const postHearted = json.post.hearted;
  const createYear = postCreatedAt.substr(0, 4);
  const createMonth = postCreatedAt.substr(5, 2);
  const createDay = postCreatedAt.substr(8, 2);
  // console.log(json);
  
  $secDetail.innerHTML = `
    <img src="${authorImg}" alt="" class="img_profile">
    <div class="wrap_contents">
      <div class="wrap_profile">
        <a href="userProfile.html" class="txt_profile">
          <strong class="txt_profileName">${authorName}</strong>
          <small class="txt_profileId">@ ${authorId}</small>
        </a>
        <button type="button" class="btn_profileMore"><img src="../img/icon/s-icon-more-vertical.png" alt="" class="img_profileMore"></button>
      </div>
      <p class="txt_feedText">${postContent}</p>
      ${postImgs=='' ? '' : `
        <ul>
        <li><img src="${postImgs[0]}" alt="" class="img_feedImg"></li>
        </ul>
      `}
      <dl class="list_likeComment">
        <div class="wrap_likeComment">
          <dt><button type="button" class="btn_like"><img src="${postHearted ? '../img/icon/icon-heart-active.png' : '../img/icon/icon-heart.png'}" alt="좋아요" class="${postHearted ? 'img_icon img_like on' : 'img_icon img_like'}"></button></dt>
          <dd>${postHeartCount}</dd>
        </div>
        <div class="wrap_likeComment">
          <dt><button type="button" class="btn_chat"><img src="../img/icon/icon-message-circle.png" alt="댓글 개수 및 댓글 보러가기" class="img_icon img_chat"></button></dt>
          <dd>${postCommentCount}</dd>
        </div>
      </dl>
      <small class="txt_postDate">${createYear}년 ${createMonth}월 ${createDay}일</small>
    </div>
  `
}
fetchPostData();

// 좋아요
async function fetchLikeData() {
  const res = await fetch(`${url}/post/${postId}/heart`, {
    method: 'POST',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  });
  const json = await res.json();
  // console.log(json);
}
// 좋아요 취소
async function fetchUnLikeData() {
  const res = await fetch(`${url}/post/${postId}/unheart`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  });
  const json = await res.json();
  // console.log(json);
}
$secDetail.addEventListener('click', (e) => {
  if (e.target.className === 'img_icon img_like') {
    const heartCount = e.target.parentNode.parentNode.parentNode.querySelector('dd')
    fetchLikeData();
    e.target.classList.add('on');
    e.target.src = '../img/icon/icon-heart-active.png';
    heartCount.textContent = Number(heartCount.textContent) + 1;
  } else if (e.target.className === 'img_icon img_like on') {
    const heartCount = e.target.parentNode.parentNode.parentNode.querySelector('dd')
    fetchUnLikeData();
    e.target.classList.remove('on');
    e.target.src = '../img/icon/icon-heart.png';
    heartCount.textContent = Number(heartCount.textContent) - 1;
  } else if (e.target.parentNode.className === 'txt_profile') {
    const accountname = e.target.parentNode.querySelector('.txt_profileId').textContent.substr(2);
    console.log(accountname);
    localStorage.setItem('accountname', accountname);
  } else if (e.target.className === 'img_icon img_chat') {
    $inpComment.focus();
  }
})

// 댓글 목록
async function fetchCommentData() {
  const res = await fetch(`${url}/post/${postId}/comments`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  // console.log(json);
  json.comments.map((comment) => {
    const $listComment = $secComment.querySelector('.list_comment');
    const $imgMyProfile = $secFooter.querySelector('.img_myProfile');
    const imgMyProfile = JSON.parse(localStorage.getItem('userData'));
    const commentImg = comment.author.image;
    const commentName = comment.author.username;
    const commentCreatedAt = comment.createdAt;
    const createYear = commentCreatedAt.substr(0, 4);
    const createMonth = commentCreatedAt.substr(5, 2);
    const createDay = commentCreatedAt.substr(8, 2);
    const commentContent = comment.content;

    $imgMyProfile.src = imgMyProfile.image;
    $listComment.innerHTML += `
      <li class="item_comment">
        <img src="${commentImg}" alt="" class="img_comment">
        <div class="wrap_user">
          <div class="wrap_txtUser">
            <strong class="txt_userName">${commentName}</strong>
            <small class="txt_uploadTime">${createYear}년 ${createMonth}월 ${createDay}일</small>
            <button type="button" class="btn_commentMore">
              <img src="../img/icon/s-icon-more-vertical.png" alt="메뉴 보기" class="img_commentMore">
            </button>
          </div>
          <p class="txt_comment">${commentContent}</p>
        </div>
      </li>
    `
  })
}
fetchCommentData();

// 댓글 작성
async function fetchPushCommentData() {
  const res = await fetch(`${url}/post/${postId}/comments`, {
    method: 'POST',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    },
    body: JSON.stringify({
      "comment": {
        "content": $inpComment.value,
      }
    })
  });
  // const json = await res.json();
  // console.log(json);
}
$btnComment.addEventListener('click', () => {
  fetchPushCommentData();
  window.location.reload();
});

// 댓글 입력 버튼 활성화
function inpCommentForBtn() {
  if ($inpComment.value === '') {
    $btnComment.classList.remove('on');
    $btnComment.setAttribute('disabled', 'disabled');
  } else {
    $btnComment.classList.add('on');
    $btnComment.removeAttribute('disabled');
  }
}
$inpComment.addEventListener('keyup', inpCommentForBtn);

// 모달창
function modalProfile() {
  $secModal.innerHTML += `
    <article class="modal_profile">
      <h3 class="txt_hide">개인 프로필 모달창</h3>
      <div class="wrap_profile">
        <ul class="list_btnProfile">
          <li><button type="button" class="btn_profile btn_info">설정 및 개인정보</button></li>
          <li><button type="button" class="btn_profile btn_logout">로그아웃</button></li>
        </ul>
        <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
      </div>
    </article>
  `
}
$btnMore.addEventListener('click', () => {
  modalProfile();
});

function modalLogoutCheck(e) {
  if (e.target.className === 'btn_profile btn_info') {
    console.log('설정 및 개인정보');
  } else if (e.target.className === 'btn_profile btn_logout') {
    console.log('로그아웃');
    $secModal.innerHTML += `
      <article class="modal_confirm">
        <h3 class="txt_hide">선택 재확인 모달창</h3>
        <div class="wrap_confirm">
          <p class="txt_confirm">로그아웃 하시겠어요?</p>
          <ul class="list_btnConfirm">
            <li><button type="button" class="btn_confirm btn_cancel">취소</button></li>
            <li><button type="button" class="btn_confirm btn_delete btn_logout">로그아웃</button></li>
          </ul>
        </div>
      </article>
    `
  }
}

function modalReport(e) {
  if (e.target.parentNode.className === 'btn_profileMore') {
    $secModal.innerHTML += `
      <article class="modal_report">
        <h3 class="txt_hide">신고 모달창</h3>
        <div class="wrap_profile">
          <ul class="list_btnProfile">
            <li><button type="button" class="btn_profile btn_report">신고하기</button></li>
          </ul>
          <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
        </div>
      </article>
    `
  } else if (e.target.parentNode.className === 'btn_profileMore' && 'mine') {
    $secModal.innerHTML += `
      <article class="modal_post">
        <h3 class="txt_hide">게시글 수정 및 삭제 모달창</h3>
        <div class="wrap_profile">
          <ul class="list_btnProfile">
            <li><button type="button" class="btn_profile btn_delete">삭제</button></li>
            <li><button type="button" class="btn_profile btn_setting">수정</button></li>
          </ul>
          <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
        </div>
      </article>
    `
  }
}

function modalComment(e) {
  if (e.target.parentNode.className === 'btn_commentMore') {
    $secModal.innerHTML += `
      <article class="modal_report">
        <h3 class="txt_hide">신고 모달창</h3>
        <div class="wrap_profile">
          <ul class="list_btnProfile">
            <li><button type="button" class="btn_profile btn_report">신고하기</button></li>
          </ul>
          <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
        </div>
      </article>
    `
  } else if (e.target.parentNode.className === 'btn_commentMore' && 'mine') {
    $secModal.innerHTML += `
      <article class="modal_delete">
        <h3 class="txt_hide">댓글 삭제 모달창</h3>
        <div class="wrap_profile">
          <ul class="list_btnProfile">
            <li><button type="button" class="btn_profile btn_delete">삭제</button></li>
          </ul>
          <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
        </div>
      </article>
    `
  } else if (e.target.className === 'btn_close') {
    $secModal.innerHTML = '';
  } else if (e.target.className === 'modal_post' || e.target.className === 'modal_report' || e.target.className === 'modal_profile') {
    $secModal.innerHTML = '';
  }
}

function modalConfirm(e) {
  if (e.target.className === 'btn_profile btn_delete') {
    console.log('삭제');
    $secModal.innerHTML += `
      <article class="modal_confirm">
        <h3 class="txt_hide">선택 재확인 모달창</h3>
        <div class="wrap_confirm">
          <p class="txt_confirm">게시글을 삭제할까요?</p>
          <ul class="list_btnConfirm">
            <li><button type="button" class="btn_confirm btn_cancel">취소</button></li>
            <li><button type="button" class="btn_confirm btn_delete">삭제</button></li>
          </ul>
        </div>
      </article>
    `
  } else if (e.target.className === 'btn_profile btn_setting') {
    console.log('수정');
  } else if (e.target.className === 'btn_confirm btn_cancel') {
    console.log('취소');
    $secModal.innerHTML = '';
  } else if (e.target.className === 'btn_confirm btn_delete') {
    console.log('삭제 확인');
  } else if (e.target.className === 'btn_confirm btn_delete btn_logout') {
    console.log('로그아웃');
  } else if (e.target.className === 'btn_profile btn_website') {
    console.log('페이지 이동');
  } else if (e.target.className === 'modal_confirm') {
    $secModal.innerHTML = '';
  }
}
$secMain.addEventListener('click', (e) => {
  modalLogoutCheck(e);
  modalReport(e);
  modalComment(e);
  modalConfirm(e);
})