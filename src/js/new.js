// 회원가입
const $newEmail = document.querySelector('.sec_newEmail');
const $inputData = $newEmail.querySelectorAll('.inp_login');
const [emailData, pwData] = [...$inputData];
const $secError = document.querySelectorAll('.txt_err');
const $secOk = document.querySelectorAll('.txt_ok');
const $btns = document.querySelectorAll('.btn_newNext');
const [btnNext, btnAccess] = [...$btns];
// 프로필 설정
const $newProfile = document.querySelector('.sec_newProfile');
const $imgProfile = $newProfile.querySelector('.inp_profileImg');
const $inputProfile = $newProfile.querySelectorAll('.inp_login');
const url = `https://api.mandarin.cf/`;

// 회원가입
async function fetchIdPwData() {
  const res = await fetch(`${url}/user/emailvalid`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      "user": {
        "email": emailData.value,
      }
    })
  })
  const json = await res.json();

  // 이메일 유효성 검사
  const emailStandard = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const emailTest = emailStandard.exec(emailData.value);
  if (!emailTest) {
    $secError[0].textContent = `* 이메일 양식을 준수해주세요.`;
    $secError[0].classList.add('on');
    $secOk[0].classList.remove('on');
  } else if (json.message == '잘못된 접근입니다.' || json.message == '이미 가입된 이메일 주소 입니다.') {
    $secError[0].textContent = `* ${json.message}`;
    $secError[0].classList.add('on');
    $secOk[0].classList.remove('on');
  } else if (json.message == '사용 가능한 이메일 입니다.') {
    $secOk[0].textContent = `* ${json.message}`
    $secOk[0].classList.add('on');
    $secError[0].classList.remove('on');
  }
}
emailData.addEventListener('blur', fetchIdPwData);

// 비밀번호 유효성 검사
pwData.addEventListener('keyup', (e) => {
  if (e.target.value.length < 6) {
    $secError[1].classList.add('on');
  } else {
    $secError[1].classList.remove('on');
  }
});

// 버튼 활성화 유효성 검사
[...$inputData].map((input) => {
  input.addEventListener('keyup', () => {
    if (emailData.value == '' || pwData.value == '' || $secError[0].className == 'txt_err on' || $secError[1].className == 'txt_err on') {
      btnNext.classList.remove('on');
    } else {
      btnNext.classList.add('on');
      btnNext.removeAttribute('disabled');
    }
  })
});
btnNext.addEventListener('click', (e) => {
  e.preventDefault();
  if ($secError[0].className != 'txt_err on' && $secError[1].className != 'txt_err on') {
    let newData = {
      "user": {
        "email": emailData.value,
        "password": pwData.value,
      }
    }
    localStorage.setItem('newData', JSON.stringify(newData));
    $newEmail.style.display = 'none';
    $newProfile.style.display = 'block';
  }
});

// 프로필 설정
async function fetchProfileIdData() {
  const res = await fetch(`${url}/user/accountnamevalid`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      "user": {
        "accountname": $inputProfile[1].value,
      }
    })
  })
  const json = await res.json();
  
  // 계정ID 유효성 검사
  const userIdStandard = /^[\w]([_.]?[\w])*$/g
  const userIdTest = userIdStandard.exec($inputProfile[1].value);
  if (!userIdTest) {
    $secError[2].textContent = `* 계정ID 작성 양식을 준수해주세요.`;
    $secError[2].classList.add('on');
    $secOk[1].classList.remove('on');
    btnAccess.classList.remove('on');
  } else if (json.message == '잘못된 접근입니다.' || json.message == '이미 가입된 계정ID 입니다.') {
    $secError[2].textContent = `* ${json.message}`;
    $secError[2].classList.add('on');
    $secOk[1].classList.remove('on');
  } else if (json.message == '사용 가능한 계정ID 입니다.') {
    $secOk[1].textContent = `* ${json.message}`
    $secOk[1].classList.add('on');
    $secError[2].classList.remove('on');
  }
}
$inputProfile[1].addEventListener('blur', fetchProfileIdData);

// 버튼 활성화 유효성 검사
[...$inputProfile].map((input) => {
  input.addEventListener('keyup', () => {
    if ($inputProfile[0].value == '' || $inputProfile[1].value == '' || $secError[2].className == 'txt_err on') {
      btnAccess.classList.remove('on');
      btnAccess.setAttribute('disabled', 'disabled');
    } else {
      btnAccess.classList.add('on');
      btnAccess.removeAttribute('disabled');
    }
  })
})
btnAccess.addEventListener('click', (e) => {
  e.preventDefault();
});

// 이미지 업로드
async function profileImage(e) {
  const labelPreview = $newProfile.querySelector('.label_profileImg');
  const files = e.target.files;
  const result = await imageUpload(files);
  const imgUrl = `${url}/${result}`;
  localStorage.setItem('imgUrl', imgUrl);
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
$imgProfile.addEventListener('change', profileImage);

// 회원가입
async function fetchCreateData() {
  const localData = JSON.parse(localStorage.getItem('newData'));
  const imgUrl = localStorage.getItem('imgUrl');
  const res = await fetch(`${url}/user`, {
    method : "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "user": {
        "username": $inputProfile[0].value,
				"email": localData.user.email,
				"password": localData.user.password,
				"accountname": $inputProfile[1].value,
				"intro": $inputProfile[2].value,
				"image": imgUrl,
      }
    })
  })
  const json = await res.json();
  if (json.message == '회원가입 성공') {
    localStorage.removeItem('newData');
    localStorage.removeItem('imgUrl');
    window.history.back();
  } else {
    alert('다시 시도해주세요.');
  }
};
btnAccess.addEventListener('click', fetchCreateData);