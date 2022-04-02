const inputBox = document.querySelectorAll('.inp_login');
const [inpEmail, inpPw] = [...inputBox];
const btnLogin = document.querySelector('.btn_login');
const txtError = document.querySelector('.txt_err');
const url = `https://api.mandarin.cf/`;

// 버튼 활성화 조건
[...inputBox].map((input) => {
  input.addEventListener('keyup', () => {
    if (inpEmail.value == '' || inpPw.value == '') {
      btnLogin.setAttribute('disabled', 'disabled');
      btnLogin.classList.remove('on');
    } else {
      btnLogin.removeAttribute('disabled');
      btnLogin.classList.add('on');
    }
  })
})

// 로그인
async function fetchLoginData() {
  const res = await fetch(`${url}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user': {
        'email': inpEmail.value,
        'password': inpPw.value
      }
    })
  });
  const json = await res.json();

  if (json.message == '이메일 또는 비밀번호가 일치하지 않습니다.') {
    txtError.classList.add('on');
    txtError.textContent = `* ${json.message}`;
  } else {
    location.href = 'home.html';
    localStorage.setItem('userData', JSON.stringify(json.user));
    localStorage.setItem('token', JSON.stringify(json.user.token));
  }
}
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  fetchLoginData();
});