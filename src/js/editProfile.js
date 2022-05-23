const $formEdit = document.querySelector('.form_login');
const $inpEditText = $formEdit.querySelectorAll('.inp_login');
const $imgEditProfile = $formEdit.querySelector('.inp_profileImg');
const [$userName,$userId,$intro] = [...$inpEditText];
const $txtError = $formEdit.querySelector('.txt_err');
const $txtOk = $formEdit.querySelector('.txt_ok');
const $btnSave = $formEdit.querySelector('.btn_save');
const url = `https://mandarin.api.weniv.co.kr`;
const token = JSON.parse(sessionStorage.getItem('token'));
const userData = JSON.parse(sessionStorage.getItem('userData'));

// 뒤로가기
const $btnBack = document.querySelector('.btn_backPage');
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 기존 프로필 정보 출력
function profile() {
  const $imgProfile = $formEdit.querySelector('.img_profile');

  $imgProfile.src = userData.image;
  $userName.value = userData.username;
  $userId.value = userData.accountname;
  $intro.value = userData.intro;
}
profile();

// 프로필 설정
async function fetchProfileIdData() {
  const res = await fetch(`${url}/user/accountnamevalid`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      "user": {
        "accountname": $userId.value,
      }
    })
  })
  const json = await res.json();
  
  // 계정ID 유효성 검사
  const userIdStandard = /^[\w]([_.]?[\w])*$/g
  const userIdTest = userIdStandard.exec($userId.value);
  if (!userIdTest) {
    $txtError.textContent = `* 계정ID 작성 양식을 준수해주세요.`;
    $txtError.classList.add('on');
    $txtOk.classList.remove('on');
    $btnSave.classList.remove('on');
  } else if (json.message == '잘못된 접근입니다.' || json.message == '이미 가입된 계정ID 입니다.') {
    $txtError.textContent = `* ${json.message}`;
    $txtError.classList.add('on');
    $txtOk.classList.remove('on');
  } else if (json.message == '사용 가능한 계정ID 입니다.') {
    $txtOk.textContent = `* ${json.message}`
    $txtOk.classList.add('on');
    $txtError.classList.remove('on');
  }
}
$userId.addEventListener('blur', fetchProfileIdData);

// 이미지 업로드
async function profileImage(e) {
  const labelPreview = $formEdit.querySelector('.label_profileImg');
  const files = e.target.files;
  const result = await imageUpload(files);
  const imgUrl = `${url}/${result}`;
  sessionStorage.setItem('imgUrl', imgUrl);
  labelPreview.innerHTML = `
  <img src="${imgUrl}" alt="프로필 이미지 선택" class="img_profile">
  `
}
async function imageUpload(files) {
  const formData = new FormData();
  formData.append('image', files[0]);
  const res = await fetch(`${url}/image/uploadfile`, {
      method: 'POST',
      body: formData,
  });
  const json = await res.json();
  const imgFileName = json.filename;
  return imgFileName;
}
$imgEditProfile.addEventListener('change', profileImage);

// 버튼 활성화 유효성 검사
[...$inpEditText].map((input) => {
  input.addEventListener('keyup', () => {
    if ($userName.value == '' || $userId.value == '' || $txtError.className == 'txt_err on') {
      $btnSave.classList.remove('on');
      $btnSave.setAttribute('disabled', 'disabled');
    } else {
      $btnSave.classList.add('on');
      $btnSave.removeAttribute('disabled');
    }
  })
})

// 프로필 수정 저장
async function fetchEditProfileData() {
  const imgUrl = sessionStorage.getItem('imgUrl');
  const res = await fetch(`${url}/user`, {
    method: 'PUT',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    },
    body : JSON.stringify({
      "user": {
        "username": $userName.value,
        "accountname": $userId.value,
        "intro": $intro.value,
        "image": imgUrl,
      }
    })
  });
  const json = await res.json();
  sessionStorage.setItem('userData', JSON.stringify(json.user));
}
$btnSave.addEventListener('click', (e) => {
  function move() {
    location.href = 'home.html'
  }
  e.preventDefault();
  fetchEditProfileData();
  setTimeout(move, 300);
})