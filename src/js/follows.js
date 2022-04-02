const $listFollower = document.querySelector('.list_searchUser');
const $btnBack = document.querySelector('.btn_backPage');
const $title = document.querySelector('.txt_title');
const url = `https://api.mandarin.cf/`;
const searchData = JSON.parse(localStorage.getItem('searchData'));
const userData = JSON.parse(localStorage.getItem('userData'));
const token = JSON.parse(localStorage.getItem('token'));
const followData = localStorage.getItem('clickData');

// 뒤로가기
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 전체 유저 목록 중 일치하는 유저 목록
// 팔로우 상태 확인
async function fetchUserData() {
  const res = await fetch(`${url}/user`, {
    method: 'GET'
  })
  const json = await res.json();
  const followers = searchData.follower;
  const followings = searchData.following;

  $title.textContent = followData;
  if (followData === 'Followers') {
    followers.map((follower) => {
      json.map((user) => {
        if (follower === user._id && user.follower.includes(userData._id)) {
          $listFollower.innerHTML += `
            <li class="item_searchUser">
            <img src="${user.image}" alt="" class="img_searchUser">
              <a href="userProfile.html" class="btn_searchUser">
                <div class="wrap_txtUser">
                  <strong class="txt_userName">${user.username}</strong>
                  <small class="txt_userId">@ ${user.accountname}</small>
                </div>
              </a>
              <button type="button" class="btn_follow on">취소</button>
            </li>
          `
        } else if (follower === user._id) {
          $listFollower.innerHTML += `
            <li class="item_searchUser">
            <img src="${user.image}" alt="" class="img_searchUser">
              <a href="userProfile.html" class="btn_searchUser">
                <div class="wrap_txtUser">
                  <strong class="txt_userName">${user.username}</strong>
                  <small class="txt_userId">@ ${user.accountname}</small>
                </div>
              </a>
              <button type="button" class="btn_follow">팔로우</button>
            </li>
          `
        }
      })
    })
  } else if (followData === 'Followings') {
    followings.map((following) => {
      json.map((user) => {
        if (following === user._id && user.follower.includes(userData._id)) {
          $listFollower.innerHTML += `
            <li class="item_searchUser">
            <img src="${user.image}" alt="" class="img_searchUser">
              <a href="userProfile.html" class="btn_searchUser">
                <div class="wrap_txtUser">
                  <strong class="txt_userName">${user.username}</strong>
                  <small class="txt_userId">@ ${user.accountname}</small>
                </div>
              </a>
              <button type="button" class="btn_follow on">취소</button>
            </li>
          `
        } else if (following === user._id) {
          $listFollower.innerHTML += `
            <li class="item_searchUser">
            <img src="${user.image}" alt="" class="img_searchUser">
              <a href="userProfile.html" class="btn_searchUser">
                <div class="wrap_txtUser">
                  <strong class="txt_userName">${user.username}</strong>
                  <small class="txt_userId">@ ${user.accountname}</small>
                </div>
              </a>
              <button type="button" class="btn_follow">팔로우</button>
            </li>
          `
        }
      })
    })
  }
}
fetchUserData();

// 팔로우 버튼 및 유저 프로필 이동
$listFollower.addEventListener('click', (e) => {
  const followAccountname = e.target.parentNode.querySelector('.txt_userId').textContent.substr(2);
  
  if (e.target.parentNode.className === 'wrap_txtUser') {
    localStorage.setItem('accountname', followAccountname);
  } else if (e.target.className === 'btn_follow') {
    fetchFollowData(followAccountname);
    e.target.classList.add('on');
    e.target.textContent = '취소';
  } else if (e.target.className === 'btn_follow on') {
    fetchUnfollowData(followAccountname);
    e.target.classList.remove('on');
    e.target.textContent = '팔로우';
  }
})
// 팔로우
async function fetchFollowData(followAccountname) {
  const res = await fetch(`${url}/profile/${followAccountname}/follow`, {
    method: 'POST',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  console.log(json);
}
// 팔로우 취소
async function fetchUnfollowData(followAccountname) {
  const res = await fetch(`${url}/profile/${followAccountname}/unfollow`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  console.log(json);
}