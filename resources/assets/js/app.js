// *************************************************************************
// *************************************************************************
// *************************************************************************

require('./bootstrap');



// #ACCODION
// =========================================================================

$('.accordion__content').hide();
$('.accordion__content').first().show();
$('.accordion__panel').first().addClass('is--open');

$('.accordion__title').click(function() {
    $('.accordion__panel').removeClass('is--open');
    $(this).parent().addClass('is--open');
    $('.accordion__content').slideUp(200);
    $(this).next('.accordion__content').slideDown(200);
});



// #TABS
// =========================================================================

$('li[data-tab], .tabs__content').first().addClass('is--active');
$('.tabs__content').first().addClass('is--active');

$('li[data-tab]').click(function() {
    var thisTab = $(this).attr('data-tab');
    var tab = $('.tabs__content' + '[data-tab="' + thisTab + '"]');

    $('li[data-tab]').removeClass('is--active');
    $(this).addClass('is--active');
    $('.tabs__content').removeClass('is--active');
    tab.addClass('is--active');
});




// #DROPDOWN
// =========================================================================

$('.dropdown__container').mouseenter(function() {
    $(this).addClass('is--active');
});

$('.dropdown__container').mouseleave(function() {
    $(this).removeClass('is--active');
});

$('.dropdown').mouseleave(function() {
    $(this).parent().removeClass('is--active');
});




// #ALERT NOTIFY
// =========================================================================

$('.alert--notify').click(function() {
    $(this).fadeOut(200);
});



// #OFF CANVAS
// =========================================================================

var offCanvasTrigger = document.querySelector('.off-canvas__trigger');
var offCanvas = document.querySelector('.off-canvas');

if (offCanvasTrigger) {
    offCanvasTrigger.addEventListener('click', function () {
        offCanvas.classList.add('is--open');
        overlay.classList.add('is--active');
    });
}



// #MODAL
// =========================================================================

var modalTrigger = document.querySelector('.modal__trigger');
var modal = document.querySelector('.modal');

if (modalTrigger) {
    modalTrigger.addEventListener('click', function () {
        modal.classList.add('is--open');
        overlay.classList.add('is--active');
    });
}



// #KEY CONTROL
// =========================================================================

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        overlay.classList.remove('is--active');
    }
});

if (offCanvas) {

    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            offCanvas.classList.remove('is--open');
        }
    });

}

if (modal) {

    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            modal.classList.remove('is--open');
        }
    });

}



// #OVERLAY
// =========================================================================

var overlay = document.querySelector('.overlay');

if (overlay) {
    overlay.addEventListener('click', function () {
        this.classList.remove('is--active');
    });
}

if (overlay) {
    overlay.addEventListener('click', function () {
        offCanvas.classList.remove('is--open');
    });
}

if (overlay) {
    overlay.addEventListener('click', function () {
        modal.classList.remove('is--open');
    });
}



// #DOCS
// =========================================================================



//email form
var form = $('.form');

$(form).submit(function(e) {
  e.preventDefault();

  var formData = new FormData($(this)[0]);

  formData.append('file', $('input[type=file]')[0].files[0]);

  $.ajax({
    type: 'post',
    url: $(this).attr('action'),
    data: formData,
    processData: false,
    contentType: false
  })
  .done(function (response) {
    $('input').val('');
    $('textarea').val('');
    $('<div class="alert is-success">Your Message Was Sent! We\'ll be in touch.</div>').insertAfter(form);
    
    console.log('success' + response);
  })
  .fail(function (data) {
    $('input').val('');
    $('textarea').val('');
    $('<div class="alert is-error">Oh no! Something went wrong, try again.</div>').insertAfter(form);
    
    console.log(data);
  })

});



// smooth scroll
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});


// get/output file name
var resumeInput = document.querySelector('input[name=resume]');

resumeInput.addEventListener('change', function(e){
    var fileName = this.value
    var nameArray = fileName.split('\\')
    let i = nameArray.length - 1
    fileName = nameArray[i]

    document.querySelector('.fileName').innerHTML = fileName
})



// check if section in view

var lfxGroupTop = ($('.lfx-group').offset().top - 500);
var lfxTop = ($('.landscape-effects').offset().top - 500);
var propMangTop = ($('.prop-management').offset().top - 500);
var rochPlaceTop = ($('.rochester-place').offset().top - 500);
var parksideTop = ($('.parkside').offset().top - 500);
var synlawnTop = ($('.synlawn').offset().top - 500);
var innovativeTop = ($('.innovative-lifescapes').offset().top - 500);
var driveTop = ($('.drive').offset().top - 500);

var addViewClass = function(){
    var scrollTop = $(window).scrollTop();
          
    if (scrollTop > lfxGroupTop) { 
        $('.lfx-group').addClass('in-view');
    }

    if (scrollTop > lfxTop) { 
        $('.landscape-effects').addClass('in-view');
    }

    if (scrollTop > propMangTop) { 
        $('.prop-management').addClass('in-view');
    }

    if (scrollTop > rochPlaceTop) { 
        $('.rochester-place').addClass('in-view');
    }

    if (scrollTop > parksideTop) { 
        $('.parkside').addClass('in-view');
    }

    if (scrollTop > synlawnTop) { 
        $('.synlawn').addClass('in-view');
    }

    if (scrollTop > innovativeTop) { 
        $('.innovative-lifescapes').addClass('in-view');
    }

    if (scrollTop > driveTop) { 
        $('.drive').addClass('in-view');
    }
};
 
addViewClass();
 
$(window).scroll(function() {
    addViewClass();
});