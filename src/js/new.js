// 회원가입
const newEmail = document.querySelector('.sec_newEmail');
const inputData = newEmail.querySelectorAll('.inp_login');
const [emailData, pwData] = [...inputData];
const secError = newEmail.querySelectorAll('.txt_err');
const secOk = newEmail.querySelector('.txt_ok');
const btns = document.querySelectorAll('.btn_newNext');
const [btnNext, btnAccess] = [...btns];
// 프로필 설정
const newProfile = document.querySelector('.sec_newProfile');
const inputProfile = newProfile.querySelectorAll('.inp_login');
const url = `http://146.56.183.55:5050`;

// 회원가입
async function fetchNewData() {
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
    secError[0].textContent = `* 이메일 양식을 준수해주세요.`;
    secError[0].classList.add('on');
    secOk.classList.remove('on');
  } else if (json.message == '잘못된 접근입니다.' || json.message == '이미 가입된 이메일 주소 입니다.') {
    secError[0].textContent = `* ${json.message}`;
    secError[0].classList.add('on');
    secOk.classList.remove('on');
  } else if (json.message == '사용 가능한 이메일 입니다.') {
    secOk.textContent = `* ${json.message}`
    secOk.classList.add('on');
    secError[0].classList.remove('on');
  }
}
emailData.addEventListener('blur', fetchNewData);

// 비밀번호 유효성 검사
pwData.addEventListener('keyup', (e) => {
  if (e.target.value.length < 6) {
    secError[1].classList.add('on');
  } else {
    secError[1].classList.remove('on');
  }
});

// 버튼 활성화 유효성 검사
[...inputData].map((input) => {
  input.addEventListener('keyup', () => {
    if (emailData.value == '' || pwData.value == '' || secError[0].className == 'txt_err on' || secError[1].className == 'txt_err on') {
      btnNext.classList.remove('on');
    } else {
      btnNext.classList.add('on');
      btnNext.removeAttribute('disabled');
    }
  })
});
btnNext.addEventListener('click', (e) => {
  e.preventDefault();
  if (secError[0].className != 'txt_err on' && secError[1].className != 'txt_err on') {
    let newData = {
      "user": {
        "username": '',
        "eamil": emailData.value,
        "password": pwData.value,
        "accountname": '',
        "intro": '',
        "image": '',
      }
    }
    localStorage.setItem('newData', JSON.stringify(newData));
    newEmail.style.display = 'none';
    newProfile.style.display = 'block';
  }
});

// 프로필 설정
console.log(inputProfile);
const userIdStandard = /^[\w]([_.]?[\w])*[\w]([_.]?[\w])$/g
const userIdTest = userIdStandard.exec(inputProfile[1].value);

inputProfile[1].addEventListener('keyup', () => {
  console.log(inputProfile[1].value);
  if (userIdTest) {
    console.log(false);
  } else if(!userIdTest) {
    console.log(true);
  }
})
btnAccess.addEventListener('click', () => {});