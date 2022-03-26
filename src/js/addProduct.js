const $secProduct = document.querySelector('.sec_newProfile');
const $inpProduct = $secProduct.querySelectorAll('.inp_login');
const $imgProduct = $secProduct.querySelector('.inp_profileImg');
const [$productName,$price,$address] = [...$inpProduct];
const $btnSave = $secProduct.querySelector('.btn_save');
const url = `http://146.56.183.55:5050`;
const token = JSON.parse(localStorage.getItem('token'));

// 상품 등록
async function fetchPushProductData() {
  const imgUrl = localStorage.getItem('imgUrl');
  const price = +$price.value
  const res = await fetch(`${url}/product`, {
    method: "POST",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    },
    body: JSON.stringify({
      "product":{
        "itemName": $productName.value,
        "price": price,
        "link": $address.value,
        "itemImage": imgUrl
      }
    })
  })
  const json = await res.json();
  console.log(json);
}

// 이미지 업로드
async function profileImage(e) {
  const labelPreview = $secProduct.querySelector('.label_profileImg');
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
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: 'POST',
      body: formData,
  });
  const json = await res.json();
  const imgFileName = json.filename;
  return imgFileName;
}
$imgProduct.addEventListener('change', profileImage);

// 가격 콤마
$price.addEventListener('blur', () => {
  const priceStandard = /^[0-9]*$/g
  const priceTest = priceStandard.exec($price.value);
  if (!priceTest) {
    alert('숫자만 입력해주세요.');
    $price.value = '';
    $price.focus();
  } 
});

// 버튼 활성화 유효성 검사
[...$inpProduct].map((input) => {
  input.addEventListener('keyup', () => {
    if ($productName.value === '' || $price.value === '' || $address.value === '') {
      $btnSave.classList.remove('on');
      $btnSave.setAttribute('disabled', 'disabled');
    } else {
      $btnSave.classList.add('on');
      $btnSave.removeAttribute('disabled');
    }
  })
})
$btnSave.addEventListener('click', (e) => {
  e.preventDefault();
  fetchPushProductData();
  setTimeout(location.href = 'myProfile.html', 800);
})