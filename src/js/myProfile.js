const $secMain = document.querySelector('.sec_profileMain')
const $secProfile = $secMain.querySelector('.sec_profile');
const $secProducts = $secMain.querySelector('.sec_products');
const $secPost = $secMain.querySelector('.sec_userFeed');
const $secFeed = $secPost.querySelector('.sec_feed');
const $secAlbum = $secPost.querySelector('.sec_album');
const $followers = $secProfile.querySelector('.txt_followrs');
const $btnFollow = $secProfile.querySelector('.btn_follow');
const $wrapFollow = $secProfile.querySelectorAll('.wrap_follow');
const $btnMyProfile = document.querySelector('.btn_myProfile');
const $btnMore = document.querySelector('.btn_moreMenu');
const $secModal = document.querySelector('.sec_modal');
const $btnListType = $secPost.querySelector('.btn_listType');
const $btnAlbumType = $secPost.querySelector('.btn_albumType');
const url = `https://api.mandarin.cf/`;
const token = JSON.parse(localStorage.getItem('token'));
const myAccountname = localStorage.getItem('myAccountname');

// 뒤로가기
const $btnBack = document.querySelector('.btn_backPage');
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 프로필 정보
async function fetchProfileData() {
  const res = await fetch(`${url}/profile/${myAccountname}`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  // console.log(json);
  // console.log(json.profile);
  const image = json.profile.image;
  const username = json.profile.username;
  const userId = json.profile.accountname;
  const intro = json.profile.intro;
  const followers = json.profile.followerCount;
  const following = json.profile.followingCount;
  const isfollow = json.profile.isfollow;
  localStorage.setItem('searchData', JSON.stringify(json.profile));
  userProfile(image, username, userId, intro, followers, following, isfollow);
}
fetchProfileData();

function userProfile(image, username, userId, intro, followers, following, isfollow) {
  const $imgProfile = $secProfile.querySelector('.img_profile');
  const $userName = $secProfile.querySelector('.txt_userName');
  const $userId = $secProfile.querySelector('.txt_userId');
  const $overview = $secProfile.querySelector('.txt_overview');
  const $following = $secProfile.querySelector('.txt_following');
  
  $imgProfile.src = image;
  $userName.textContent = username;
  $userId.textContent = userId;
  $overview.textContent = intro;
  $followers.textContent = followers;
  $following.textContent = following;
}
// 팔로워/팔로잉 정보
$wrapFollow[0].addEventListener('click', () => {
  localStorage.setItem('clickData', 'Followers');
})
$wrapFollow[1].addEventListener('click', () => {
  localStorage.setItem('clickData', 'Followings');
})

// 상품 목록
async function fetchProduct() {
  const res = await fetch(`${url}/product/${myAccountname}`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  const $listProducts = $secProducts.querySelector('.list_products');
  
  if (json.data === 0) {
    $secProducts.classList.remove('on');
  } else {
    $secProducts.classList.add('on');
    json.product.map((item) => {
      const price = +item.price;
      // console.log(item);
      $listProducts.innerHTML += `
        <li class="item_product" key=${item.id} address="${item.link}">
          <button type="button">
            <img src="${item.itemImage}" alt="" class="img_product">
          </button>
          <p class="txt_name">${item.itemName}</p>
          <strong class="txt_price">${price.toLocaleString()}원</strong>
        </li>
      `
    })
  }
}
fetchProduct();

// 게시글 목록
async function fetchPost() {
  const res = await fetch(`${url}/post/${myAccountname}/userpost`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  const $listPosts = $secPost.querySelector('.sec_feed');

  if (json.post.length === 0) {
    $secPost.classList.remove('on');
  } else {
    $secPost.classList.add('on');
    json.post.map((postItem) => {
      // console.log(postItem);
      const authorImg = postItem.author.image;
      const authorName = postItem.author.username;
      const authorId = postItem.author.accountname;
      const postItemId = postItem.id;
      const postContent = postItem.content;
      const postImg = postItem.image;
      const postImgs = postImg.split(',');
      const postHeartCount = postItem.heartCount;
      const postCommentCount = postItem.commentCount;
      const postCreatedAt = postItem.createdAt;
      const postHearted = postItem.hearted;
      const createYear = postCreatedAt.substr(0, 4);
      const createMonth = postCreatedAt.substr(5, 2);
      const createDay = postCreatedAt.substr(8, 2);

      $listPosts.innerHTML += `
        <article class="artic_feed" key="${postItemId}">
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
                <li><button type="button"><img src="${postImgs[0]}" alt="해당 게시물로 이동" class="img_feedImg"></button></li>
              </ul>
            `}
            <dl class="list_likeComment">
              <div class="wrap_likeComment">
                <dt><button type="button"><img src="${postHearted ? '../img/icon/icon-heart-active.png' : '../img/icon/icon-heart.png'}" alt="좋아요" class="${postHearted ? 'img_icon img_like on' : 'img_icon img_like'}"></button></dt>
                <dd>${postHeartCount}</dd>
              </div>
              <div class="wrap_likeComment">
                <dt><button type="button"><img src="../img/icon/icon-message-circle.png" alt="댓글 개수 및 댓글 보러가기" class="img_icon img_chat"></button></dt>
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
fetchPost();

// 게시글 앨범
async function fetchPostAlbum() {
  const res = await fetch(`${url}/post/${myAccountname}/userpost`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  const $listAlbum = $secAlbum.querySelector('.list_albumImg');
    
  json.post.map((postItem) => {
    if (postItem.image !== '') {
      const postImg = postItem.image;
      const postImgs = postImg.split(',');

      $listAlbum.innerHTML += `
        <li key="${postItem.id}">
          <button type="button" class="btn_albumImg">
            <img src="${postImgs[0]}" alt="" class="img_album">
          </button>
        </li>
      `
    }
  })
}
fetchPostAlbum ();

$btnAlbumType.addEventListener('click', () => {
  $secFeed.classList.remove('on');
  $secAlbum.classList.add('on');
  $btnListType.querySelector('.img_listType').src = '../img/icon/icon-post-list-off.png'
  $btnAlbumType.querySelector('.img_albumType').src = '../img/icon/icon-post-album-on.png'
});
$btnListType.addEventListener('click', () => {
  $secFeed.classList.add('on');
  $secAlbum.classList.remove('on');
  $btnListType.querySelector('.img_listType').src = '../img/icon/icon-post-list-on.png'
  $btnAlbumType.querySelector('.img_albumType').src = '../img/icon/icon-post-album-off.png'
})
$secAlbum.addEventListener('click', (e) => {
  if (e.target.className === 'img_album') {
    const postId = e.target.parentNode.parentNode.getAttribute('key')
    localStorage.setItem('postId', postId)
    location.href = 'post.html';
  }
})

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
  // console.log(json);
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
  // console.log(json);
}

// 상품 삭제
async function fetchDeleteProduct(productId) {
  const res = await fetch(`${url}/product/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  });
  const json = await res.json();
  console.log(json);
}
$secProducts.addEventListener('click', (e) => {
  if (e.target.className === 'img_product') {
    const productId = e.target.parentNode.parentNode.getAttribute('key');
    localStorage.setItem('productId', productId);
  }
})

// 게시글 삭제
async function fetchDeletePost(postId) {
  const res = await fetch(`${url}/post/${postId}`, {
    method: "DELETE",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  });
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
  } else if (e.target.parentNode.className === 'txt_profile') {
    const accountname = e.target.parentNode.querySelector('.txt_profileId').textContent.substr(2);
    // console.log(accountname);
    localStorage.setItem('accountname', accountname);
  } else if (e.target.className === 'img_icon img_chat') {
    const postId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('key');
    localStorage.setItem('postId', postId);
    location.href = 'post.html';
  } else if (e.target.className === 'img_feedImg') {
    const postId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('key');
    localStorage.setItem('postId', postId);
    location.href = 'post.html';
  } else if (e.target.className === 'img_profileMore') {
    const postId = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('key');
    localStorage.setItem('postId', postId);
  }
})

// 나의 프로필
$btnMyProfile.addEventListener('click', () => {
  location.reload();
})

// 프로필 모달창
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
})
// 로그아웃 재확인 모달창
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

// 상품 모달창
function modalProduct(e) {
  if (e.target.className === 'img_product') {
    // console.log('상품');
    const productLink = e.target.parentNode.parentNode.getAttribute('address');
    localStorage.setItem('productLink', productLink);
    $secModal.innerHTML += `
      <article class="modal_product">
        <h3 class="txt_hide">상품 수정 및 삭제 모달창</h3>
        <div class="wrap_profile">
          <ul class="list_btnProfile">
            <li><button type="button" class="btn_profile btn_delete btn_product">삭제</button></li>
            <li><button type="button" class="btn_profile btn_setting btn_product">수정</button></li>
            <li><button type="button" class="btn_profile btn_website">웹사이트에서 상품 보기</button></li>
          </ul>
          <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
        </div>
      </article>
    `
  }
}
$secProducts.addEventListener('click', (e) => {
  modalProduct(e);
})
// 상품 삭제 재확인
function modalProductConfirm(e) {
  if (e.target.className === 'btn_profile btn_delete btn_product') {
    console.log('삭제');
    $secModal.innerHTML += `
      <article class="modal_confirm">
        <h3 class="txt_hide">선택 재확인 모달창</h3>
        <div class="wrap_confirm">
          <p class="txt_confirm">상품을 삭제할까요?</p>
          <ul class="list_btnConfirm">
            <li><button type="button" class="btn_confirm btn_cancel">취소</button></li>
            <li><button type="button" class="btn_confirm btn_delete btn_product">삭제</button></li>
          </ul>
        </div>
      </article>
    `
  } else if (e.target.className === 'btn_confirm btn_delete btn_product') {
    const productId = localStorage.getItem('productId');
    fetchDeleteProduct(productId);
    location.reload();
    alert('삭제되었습니다.');
  } else if (e.target.className === 'btn_profile btn_setting btn_product') {
    console.log('수정');
  }
}

// 게시글 모달창
function modalPost(e) {
  if (e.target.parentNode.className === 'btn_profileMore') {
    $secModal.innerHTML += `
      <article class="modal_post">
        <h3 class="txt_hide">게시글 수정 및 삭제 모달창</h3>
        <div class="wrap_profile">
          <ul class="list_btnProfile">
            <li><button type="button" class="btn_profile btn_delete">삭제</button></li>
            <li><button type="button" class="btn_profile btn_setting btn_post">수정</button></li>
          </ul>
          <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
        </div>
      </article>
    `
  } else if (e.target.className === 'btn_close') {
    $secModal.innerHTML = '';
  } else if (e.target.className === 'modal_post' || e.target.className === 'modal_profile' || e.target.className === 'modal_product') {
    $secModal.innerHTML = '';
  }
}
// 게시글 삭제 재확인
function modalPostConfirm(e) {
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
  } else if (e.target.className === 'btn_profile btn_setting btn_post') {
    console.log('수정');
    location.href = 'editPost.html';
    $secModal.innerHTML = '';
  } else if (e.target.className === 'btn_confirm btn_cancel') {
    console.log('취소');
    $secModal.innerHTML = '';
  } else if (e.target.className === 'btn_confirm btn_delete') {
    const postId = localStorage.getItem('postId');
    fetchDeletePost(postId);
    location.reload();
    alert('삭제되었습니다.')
  } else if (e.target.className === 'btn_confirm btn_delete btn_logout') {
    localStorage.clear();
    location.href = 'index.html';
    alert('로그아웃 되었습니다.')
  } else if (e.target.className === 'btn_profile btn_website') {
    const productLink = localStorage.getItem('productLink');
    window.location.href = productLink;
    console.log('페이지 이동');
  } else if (e.target.className === 'modal_confirm') {
    $secModal.innerHTML = '';
  }
}

$secMain.addEventListener('click', (e) => {
  modalLogoutCheck(e);
  modalPost(e);
  modalPostConfirm(e);
  modalProductConfirm(e);
});