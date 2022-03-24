const $secFeed = document.querySelector('.sec_feed');
const $secNoneFeed = document.querySelector('.sec_noneFeed');
const url = `http://146.56.183.55:5050`;
const userData = JSON.parse(localStorage.getItem('userData'));
const token = JSON.parse(localStorage.getItem('token'));

// 토큰 검증
async function fetchTokenData() {
  const res = await fetch(`${url}/user/checktoken`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    },
  })
  const json = await res.json();
  if (json.isValid) {
    fetchFollowingData();
    fetchFeedData();
  }
}

// 팔로잉 리스트
async function fetchFollowingData() {
  const accountname = userData.accountname
  const res = await fetch(`${url}/profile/${accountname}/following`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    },
  });
  const json = await res.json();
  // console.log(res);
  console.log(json);
}

// 피드 목록
async function fetchFeedData() {
  const res = await fetch(`${url}/post/feed`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  })
  const json = await res.json();
  // console.log(json);
  const posts = json.posts;
  console.log(posts);
  if (json.posts == '') {
    $secFeed.classList.remove('on');
    $secNoneFeed.classList.add('on');
  } else {
    $secFeed.classList.add('on');
    $secNoneFeed.classList.remove('on');
    posts.map((post) => {
      const authorImg = post.author.image;
      const authorName = post.author.username;
      const authorId = post.author.accountname;
      const postId = post.id;
      const postContent = post.content;
      const postImg = post.image;
      const postImgs = postImg.split(',');
      const postHeartCount = post.heartCount;
      const postCommentCount = post.commentCount;
      const postCreatedAt = post.createdAt;
      const postHearted = post.hearted;
      const createYear = postCreatedAt.substr(0, 4);
      const createMonth = postCreatedAt.substr(5, 2);
      const createDay = postCreatedAt.substr(8, 2);

      console.log(postHearted);
      // CORB 문제
      $secFeed.innerHTML += `
        <article class="artic_feed" key="${postId}">
          <h3 class="txt_hide">게시글</h3>
          <img src="${authorImg}" alt="" class="img_profile">
          <div class="wrap_contents">
            <div class="wrap_profile">
              <a href="" class="txt_profile">
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
                <dt><button type="button"><img src="../img/icon/icon-message-circle.png" alt="댓글 개수 및 댓글 보러가기" class="img_icon"></button></dt>
                <dd>${postCommentCount}</dd>
              </div>
            </dl>
            <small class="txt_postDate">${createYear}년 ${createMonth}월 ${createDay}일</small>
          </div>
        </article>
      `
    })
  }
}
window.addEventListener('load', fetchTokenData);

// 좋아요
async function fetchLikeData(postId) {
  const res = await fetch(`${url}/post/${postId}/heart`, {
    method: 'POST',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  });
  const json = await res.json();
  console.log(json);
}
// 좋아요 취소
async function fetchUnLikeData(postId) {
  const res = await fetch(`${url}/post/${postId}/unheart`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  });
  const json = await res.json();
  console.log(json);
}
$secFeed.addEventListener('click', (e) => {
  if (e.target.className === 'img_icon img_like') {
    const postId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('key');
    const heartCount = e.target.parentNode.parentNode.parentNode.querySelector('dd')
    fetchLikeData(postId);
    e.target.classList.add('on');
    e.target.src = '../img/icon/icon-heart-active.png';
    heartCount.textContent = Number(heartCount.textContent) + 1;
  } else if (e.target.className === 'img_icon img_like on') {
    const postId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('key');
    const heartCount = e.target.parentNode.parentNode.parentNode.querySelector('dd')
    fetchUnLikeData(postId);
    e.target.classList.remove('on');
    e.target.src = '../img/icon/icon-heart.png';
    heartCount.textContent = Number(heartCount.textContent) - 1;
  }
})