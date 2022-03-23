const $secProfile = document.querySelector('.sec_profile');
const $followers = $secProfile.querySelector('.txt_followrs');
const $btnFollow = $secProfile.querySelector('.btn_follow');
const $wrapFollow = $secProfile.querySelectorAll('.wrap_follow');
const url = `http://146.56.183.55:5050`;
const token = JSON.parse(localStorage.getItem('token'));
const accountname = localStorage.getItem('accountname');

// 뒤로가기
const $btnBack = document.querySelector('.btn_backPage');
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 프로필 정보
async function fetchProfileData() {
  const res = await fetch(`${url}/profile/${accountname}`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  // console.log(json);
  console.log(json.profile);
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

  if (isfollow === false) {
    $btnFollow.classList.remove('on');
    $btnFollow.textContent = '팔로우';
  } else {
    $btnFollow.classList.add('on');
    $btnFollow.textContent = '팔로우 취소';
  };
}

// 팔로우
async function fetchFollowData() {
  const res = await fetch(`${url}/profile/${accountname}/follow`, {
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
async function fetchUnfollowData() {
  const res = await fetch(`${url}/profile/${accountname}/unfollow`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  console.log(json);
}
$btnFollow.addEventListener('click', () => {
  const followers = parseInt($followers.textContent);
  if ($btnFollow.classList.contains('on')) {
    fetchUnfollowData();
    $btnFollow.classList.remove('on');
    $btnFollow.textContent = '팔로우';
    $followers.textContent = followers - 1;
  } else {
    fetchFollowData();
    $btnFollow.classList.add('on');
    $btnFollow.textContent = '팔로우 취소';
    $followers.textContent = followers + 1;
  }
});
$wrapFollow[0].addEventListener('click', () => {
  localStorage.setItem('clickData', 'Followers');
})
$wrapFollow[1].addEventListener('click', () => {
  localStorage.setItem('clickData', 'Followings');
})