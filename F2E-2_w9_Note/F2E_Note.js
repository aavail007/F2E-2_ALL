$(document).ready(function() {
    $("#barsBtn").on("click", function() {
        $(".nav_div").addClass("open");
    });

    $(".close_nav").on("click", function() {
        $(".nav_div").removeClass("open");
    });

    $("#boxType").on("click", function() {
        $(".note_content").removeClass("list_type");
        $("#listType").removeClass("active");
        $("#boxType").addClass("active");
    });

    $("#listType").on("click", function() {
        $(".note_content").addClass("list_type");
        $("#boxType").removeClass("active");
        $("#listType").addClass("active");
    });
    
    $(".note_box").on("click", function() {
        $(".note_detail").addClass("open");
    });
    
    $(".backBtn").on("click", function() {
        $(".note_detail").removeClass("open");
        $(".edit_div").removeClass("open");
    });

    $("#newNoteBtn").on("click", function() {
        $(".edit_div").addClass("open");
    });

    $("#displayTypeBtn").on("click", function() {
        var type = $("#noteBody").hasClass("night");
        if(type) {
            $("#noteBody").removeClass("night");
            $("#displayTypeBtn").text('夜間模式');
            $(".section_img").attr('src','img/day.png');
        } else {
            $("#noteBody").addClass("night");
            $("#displayTypeBtn").text('日間模式');
            $(".section_img").attr('src','img/night.png');
        }
        
    });
});

tinymce.init({
    selector: 'textarea',
    mobile: {
      theme: 'silver',
    },
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
      ],
    toolbar: 'bullist numlist | bold | italic | underline | strikethrough | image | link ',
    menubar: false,
    height: 500,
    content_css : "F2E_Note.css",
    setup: function (ed) {
        ed.on('init', function(args) {
            $(".tox-tinymce").attr('style','height: 100%');
        });
    },
  });

// =========================
