const socket = io();

/**
 * Created by https://trungquandev.com's author on 25/02/2018.
 */
function nineScrollLeft() {
  $('.left').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}

function nineScrollRight(divId) {
  $(`.right .chat[data-chat = ${divId}]`).niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
  $(`.right .chat[data-chat=${divId}]`).scrollTop( $(`.right .chat[data-chat=${divId}]`)[0].scrollHeight);
}

function enableEmojioneArea(divId) {
  $(`#write-chat-${divId}`).emojioneArea({
    standalone: false,
    pickerPosition: 'top',
    filtersPosition: 'bottom',
    tones: false,
    autocomplete: false,
    inline: true,
    hidePickerOnBlur: true,
    search: false,
    shortnames: false,
    events: {
      keyup: function(editor, event) {
        // gán giá trị thay đổi vào thẻ input đã bị ẩn
        $(`#write-chat-${divId}`).val(this.getText());
      },
      click: function(){
        // lắng nghe dom
        textAndEmojiChat(divId);
      }
    },
  });
  $('.icon-chat').bind('click', function(event) {
    event.preventDefault();
    $('.emojionearea-button').click();
    $('.emojionearea-editor').focus();
  });
}

function spinLoaded() {
  $('.master-loader').css('display', 'none');
}

function spinLoading() {
  $('.master-loader').css('display', 'block');
}

function ajaxLoading() {
  $(document)
    .ajaxStart(function() {
      spinLoading();
    })
    .ajaxStop(function() {
      spinLoaded();
    });
}

function showModalContacts() {
  $('#show-modal-contacts').click(function() {
    $(this).find('.noti_contact_counter').fadeOut('slow');
  });
}

function configNotification() {
  $('#noti_Button').click(function() {
    $('#notifications').fadeToggle('fast', 'linear');
    $('.noti_counter').fadeOut('slow');
    return false;
  });
  $(".main-content").click(function() {
    $('#notifications').fadeOut('fast', 'linear');
  });
}

function gridPhotos(layoutNumber) {
  $(".show-images").unbind("click").on("click",function(){
    let href = $(this).attr("href");
    let modalImagesId = href.replace("#","")
    let countRows = Math.ceil($(`#${modalImagesId}`).find('div.all-images>img').length / layoutNumber);
  let layoutStr = new Array(countRows).fill(layoutNumber).join("");
  $(`#${modalImagesId}`).find('div.all-images').photosetGrid({
    highresLinks: true,
    rel: 'withhearts-gallery',
    gutter: '2px',
    layout: layoutStr,
    onComplete: function() {
      $(`#${modalImagesId}`).find('.all-images').css({
        'visibility': 'visible'
      });
      $(`#${modalImagesId}`).find('.all-images a').colorbox({
        photo: true,
        scalePhotos: true,
        maxHeight: '90%',
        maxWidth: '90%'
      });
    }
  });
  })
  
}



function addFriendsToGroup() {
  $('ul#group-chat-friends').find('div.add-user').bind('click', function() {
    let uid = $(this).data('uid');
    $(this).remove();
    let html = $('ul#group-chat-friends').find('div[data-uid=' + uid + ']').html();

    let promise = new Promise(function(resolve, reject) {
      $('ul#friends-added').append(html);
      $('#groupChatModal .list-user-added').show();
      resolve(true);
    });
    promise.then(function(success) {
      $('ul#group-chat-friends').find('div[data-uid=' + uid + ']').remove();
    });
  });
}

function cancelCreateGroup() {
  $('#cancel-group-chat').bind('click', function() {
    $('#groupChatModal .list-user-added').hide();
    if ($('ul#friends-added>li').length) {
      $('ul#friends-added>li').each(function(index) {
        $(this).remove();
      });
    }
  });
}
function flashMasterNotify(){
    let notify = $(".master-success-message").text();
    if(notify.length){
      alertify.notify(notify,"success",4);
    }
}

function changeTypeChat(){
  $("#select-type-chat").bind("change",function(){
    let optionSelected = $("option:selected",this);
    optionSelected.tab("show");

    if($(this).val() === "user-chat"){
      $(".create-group-chat").hide();
    }else{
      $(".create-group-chat").show();
    }
  })
}
function changeScreenChat(){
  $(".room-chat").unbind("click").on("click",function(){
    let divId = $(this).find("li").data("chat")
    $(".person").removeClass("active")
    $(`.person[data-chat = ${divId} ]`).addClass("active")
    $(this).tab("show");

    //cấu hình thanh cuộn box chat rightside
    nineScrollRight(divId);

    enableEmojioneArea(divId);

    videoChat(divId)
  })
}
$(document).ready(function() {
  // Hide số thông báo trên đầu icon mở modal contact
  showModalContacts();

  // Bật tắt popup notification
  configNotification();

  // Cấu hình thanh cuộn
  nineScrollLeft();


  // Bật emoji, tham số truyền vào là id của box nhập nội dung tin nhắn
  // enableEmojioneArea("17071995");

  // Icon loading khi chạy ajax
  ajaxLoading();

  // Hiển thị button mở modal tạo nhóm trò chuyện

  // Hiển thị hình ảnh grid slide trong modal tất cả ảnh, tham số truyền vào là số ảnh được hiển thị trên 1 hàng.
  // Tham số chỉ được phép trong khoảng từ 1 đến 5
  gridPhotos(5);

  // Thêm người dùng vào danh sách liệt kê trước khi tạo nhóm trò chuyện
  addFriendsToGroup();

  // Action hủy việc tạo nhóm trò chuyện
  cancelCreateGroup();
  //hiện thông báo đăng nhập thành công
  flashMasterNotify();
  // thay doi kieu tro chuyen
  changeTypeChat();
  //thay đồi màn hình chat  
  changeScreenChat();

  $("ul.people").find("a")[0].click();

  $("#video-chat-group").bind("click",function(){
    alertify.notify("Tính năng này không khả dụng với nhóm trò chuyện","error",7)
  })
});
