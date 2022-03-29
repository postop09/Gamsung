const $secMain = document.querySelector('.sec_chatListMain');
const $secModal = $secMain.querySelector('.sec_modal');
const $btnMore = document.querySelector('.btn_moreMenu');

// 뒤로가기
const $btnBack = document.querySelector('.btn_backPage');
$btnBack.addEventListener('click', () => {
  window.history.back();
})

// 모달창
function modalProfile() {
  $secModal.innerHTML += `
    <article class="modal_profile">
      <h3 class="txt_hide">개인 프로필 모달창</h3>
      <div class="wrap_profile">
        <ul class="list_btnProfile">
          <li><button type="button" class="btn_profile btn_info">설정 및 개인정보</button></li>
          <li><button type="button" class="btn_profile btn_logout">로그아웃</button></li>
        </ul>
        <button type="button" class="btn_close"><span class="txt_hide">모달창 닫기</span></button>
      </div>
    </article>
  `
}
$btnMore.addEventListener('click', () => {
  modalProfile();
});

function modalLogoutCheck(e) {
  if (e.target.className === 'btn_profile btn_info') {
    console.log('설정 및 개인정보');
  } else if (e.target.className === 'btn_profile btn_logout') {
    console.log('로그아웃');
    $secModal.innerHTML += `
      <article class="modal_confirm">
        <h3 class="txt_hide">선택 재확인 모달창</h3>
        <div class="wrap_confirm">
          <p class="txt_confirm">로그아웃 하시겠어요?</p>
          <ul class="list_btnConfirm">
            <li><button type="button" class="btn_confirm btn_cancel">취소</button></li>
            <li><button type="button" class="btn_confirm btn_delete btn_logout">로그아웃</button></li>
          </ul>
        </div>
      </article>
    `
  }
}

function modalConfirm(e) {
  if (e.target.className === 'btn_confirm btn_cancel') {
    console.log('취소');
    $secModal.innerHTML = '';
  } else if (e.target.className === 'btn_confirm btn_delete btn_logout') {
    console.log('로그아웃 확인');
  } else if (e.target.className === 'modal_confirm' || e.target.className === 'btn_close' || e.target.className === 'modal_profile') {
    $secModal.innerHTML = '';
  }
}
$secMain.addEventListener('click', (e) => {
  modalLogoutCheck(e);
  modalConfirm(e);
})