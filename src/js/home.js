const secFeed = document.querySelector('.sec_feed');
const secNoneFeed = document.querySelector('.sec_noneFeed');
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
  // console.log(res);
  // console.log(json);
  // console.log(json.isValid);
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
  // console.log(json);
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
  // console.log(res);
  // console.log(json);
  // console.log(json.posts);
  if (json.posts == '') {
    secFeed.classList.remove('on');
    secNoneFeed.classList.add('on');
  } else {
    secFeed.classList.add('on');
    secNoneFeed.classList.remove('on');
  }
}
window.addEventListener('load', fetchTokenData);

