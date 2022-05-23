const $inpSearch = document.querySelector('.inp_search');
const $listUser = document.querySelector('.list_searchUser')
const $btnMyProfile = document.querySelector('.btn_myProfile');
const url = `https://mandarin.api.weniv.co.kr`;
const token = JSON.parse(localStorage.getItem('token'));

// 뒤로가기
const $btnBack = document.querySelector('.btn_backPage');
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 나의 프로필
$btnMyProfile.addEventListener('click', () => {
  const myAccountname = JSON.parse(localStorage.getItem('userData')).accountname;
  localStorage.setItem('myAccountname', myAccountname);
})

// 일치하는 유저 데이터
async function fetchsearchData() {
  const res = await fetch(`${url}/user/searchuser/?keyword=${$inpSearch.value}`, {
    method: "GET",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : 'application/json'
    }
  });
  const json = await res.json();
  // console.log(res);
  console.log(json);
  console.log($inpSearch.value);
  [...json].map((data) => {
    $listUser.innerHTML += `
      <li class="item_searchUser">
        <a href="userProfile.html" class="btn_searchUser">
          <img src="${data.image}" alt="" class="img_searchUser">
          <div class="wrap_txtUser">
            <strong class="txt_userName">${data.username}</strong>
            <small class="txt_userId">@ ${data.accountname}</small>
          </div>
        </a>
      </li>
    `
  })
  $listUser.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) {
      const accountname = e.target.parentNode.querySelector('.txt_userId').textContent.substr(2);
      localStorage.setItem('accountname', accountname);
      $inpSearch.value = '';
    }
  })
}
// 검색 디바운스
function debounce() {
  let timer;
  $inpSearch.addEventListener('keyup', (e) => {
    if ($inpSearch.value.length >= 1) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        $listUser.innerHTML = '';
        if ($inpSearch.value !== '') {
          fetchsearchData();
        }
      }, 300);
    }
  });
}
debounce();