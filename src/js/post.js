const $secDetail = document.querySelector('.sec_postDetail');
const $secComment = document.querySelector('.sec_postComment');
const $secFooter = document.querySelector('.sec_postFooter');
const url = `http://146.56.183.55:5050`;
const token = JSON.parse(localStorage.getItem('token'));
const postId = localStorage.getItem('postId');

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
  console.log(json);

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
  console.log(json);
  json.comments.map((comment) => {
    const $listComment = $secComment.querySelector('.list_comment');
    const commentImg = comment.author.image;
    const commentName = comment.author.username;
    const commentCreatedAt = comment.createdAt;
    const createYear = commentCreatedAt.substr(0, 4);
    const createMonth = commentCreatedAt.substr(5, 2);
    const createDay = commentCreatedAt.substr(8, 2);
    const commentContent = comment.content;

    $listComment.innerHTML += `
      <li class="item_comment">
        <img src="${commentImg}" alt="" class="img_comment">
        <div class="wrap_user">
          <div class="wrap_txtUser">
            <strong class="txt_userName">${commentName}</strong>
            <small class="txt_uploadTime">${createYear}년 ${createMonth}월 ${createDay}일</small>
            <button type="button">
              <img src="../img/icon/s-icon-more-vertical.png" alt="메뉴 보기">
            </button>
          </div>
          <p class="txt_comment">${commentContent}</p>
        </div>
      </li>
    `
  })
}
fetchCommentData();

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
    const $inpComment = $secFooter.querySelector('.inp_comment');
    $inpComment.focus();
  }
})