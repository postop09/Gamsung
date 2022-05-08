const $inpText = document.querySelector('.inp_textarea');
const $imgPosts = document.querySelector('.inp_postImg');
const $btnUpload = document.querySelector('.btn_upload');
const $imgProfile = document.querySelector('.img_writer');
const $listPreview = document.querySelector('.list_previewImg');
const $labelImgUpload = document.querySelector('.label_upload');
const url = `https://mandarin.api.weniv.co.kr`;
const token = JSON.parse(localStorage.getItem('token'));
const userData = JSON.parse(localStorage.getItem('userData'));

// 뒤로가기
const $btnBack = document.querySelector('.btn_backPage');
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 작성자 프로필 이미지
$imgProfile.src = userData.image;

// 텍스트박스 크기 조절
$inpText.addEventListener('keyup', () => {
  $inpText.style.height = '1px';
  $inpText.style.height = (12 + $inpText.scrollHeight) + 'px';
});

// 이미지 미리보기
function previewImg(e) {
  if($imgPosts.files.length <= 3) {
    for (let image of e.target.files) {
      const reader = new FileReader();
      reader.onload = function(e) {
        $listPreview.innerHTML += `
        <li class="item_previewImg">
          <img src="${e.target.result}" alt="" class="img_preview">
        </li>
        `
      };
      reader.readAsDataURL(image);
    }
  } else {
    alert('사진은 3장을 초과할 수 없습니다.')
    return false;
  }
}
$imgPosts.addEventListener('change', previewImg);

// 미리보기 이미지 초기화
$labelImgUpload.addEventListener('click', () => {
  $listPreview.innerHTML = '';
})

// 이미지 업로드
async function fetchImgData(files, index){
  const formData = new FormData();
  formData.append("image", files[index]);
  const res = await fetch(`${url}/image/uploadfile`, {
    method: "POST",
    body : formData
  })
  const json = await res.json();
  const productImgName = json.filename;
  return productImgName
}
async function createPost() {
  const imageUrls = [];
  const files = $imgPosts.files;

  if (files.length<=3) {
    for (let index = 0; index < files.length; index++) {
      const imgUrl = await fetchImgData(files,index);
      imageUrls.push(`${url}/${imgUrl}`);
    }
    const res = await fetch(`${url}/post`, {
      method: "POST",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "post": {
          "content": $inpText.value,
          "image": imageUrls + '',
        }
      })
    });
  } else {
      alert("이미지가 3장을 초과했습니다.");
      return false;
  }
}
$btnUpload.addEventListener('click', (e) => {
  function move() {
    location.href = 'myProfile.html'
  }
  e.preventDefault();
  createPost();
  setTimeout(move, 500);
})

// 버튼 활성화 유효성 검사
$inpText.addEventListener('keyup', () => {
  if ($inpText.value !== '' || $imgPosts.files.length !== 0) {
    $btnUpload.classList.add('on');
    $btnUpload.removeAttribute('disabled');
  } else {
    $btnUpload.classList.remove('on');
    $btnUpload.setAttribute('disabled', 'disabled');
  }
})
$imgPosts.addEventListener('change', () => {
  if ($inpText.value !== '' || $imgPosts.files.length !== 0) {
    $btnUpload.classList.add('on');
    $btnUpload.removeAttribute('disabled');
  } else {
    $btnUpload.classList.remove('on');
    $btnUpload.setAttribute('disabled', 'disabled');
  }
})
