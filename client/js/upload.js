// Requires jQuery and blueimp's jQuery.fileUpload

// client-side validation by fileUpload should match the policy
// restrictions so that the checks fail early
var acceptFileType = /.*/i;
// var maxFileSize = 1000000;
// The URL to your endpoint that maps to s3Credentials function
var credentialsUrl = '/s3_credentials';
// The URL to your endpoint to register the uploaded file
var uploadUrl = '/upload';


$(document).ready(function(){

  // console.log("running delete event handler");
  $('.deleteButtons').each(function(index){
    // console.log( index + ": " + $( this ).attr('id') );
    var deleteButtonID = $( this ).attr('id');
    $(this).on('click', function () {
      let deleteButton = $(this);
      let deleteURL = "/upload/"+deleteButtonID+"/destroy"
      $.post(deleteURL, function(){
        // console.log(deleteButton);
        deleteButton.parent().parent().remove();
      });
    });
  });

});


window.initS3FileUpload = function($fileInput) {
  $fileInput.fileupload({
    // acceptFileTypes: acceptFileType,
    // maxFileSize: maxFileSize,
    paramName: 'file',
    add: s3add,
    dataType: 'xml',
    replaceFileInput:false,
    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      $('.progress .bar').css(
        'width',
        progress + '%'
      );
      $('.progress .bar').html(
        progress + '%'
      );

    },
    done: onS3Done
  });
};

// This function retrieves s3 parameters from our server API and appends them
// to the upload form.
function s3add(e, data) {
  var filename = data.files[0].name;
  var contentType = data.files[0].type;
  var params = [];
  data.context = $('<button type="button" class="btn btn-primary">').text('Upload')
  // data.context = $('<button/>').text('Upload')
                .appendTo('.inputArea')
                .click(function () {
                    data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                    $.ajax({
                      url: credentialsUrl,
                      type: 'GET',
                      dataType: 'json',
                      data: {
                        filename: filename,
                        content_type: contentType
                      },
                      success: function(s3Data) {
                        data.url = s3Data.endpoint_url;
                        data.formData = s3Data.params;
                        data.submit();
                      }
                    });
                });
  return params;
};

function onS3Done(e, data) {
  var s3Url = $(data.jqXHR.responseXML).find('Location').text();
  var s3Key = $(data.jqXHR.responseXML).find('Key').text();
  var s3Size = data.originalFiles[0].size;
  var s3LastModified = data.originalFiles[0].lastModifiedDate;
  // console.log("size is " + s3Size);
  // console.log(s3LastModified);
  data.context.text('Upload finished.');
  window.setTimeout(function() {
    data.context.remove();
}, 5000);
  $('.progress .bar').css(
    'width',
    0 + '%'
  );
  $('.progress .bar').html("");

  var HTMLtoAppend = '<tr>'+
  '<td>'+s3Key+'</td>'+
  '<td>'+s3Size+'</td>'+
  '<td>'+s3LastModified+'</td>'+
  '<td><a href="'+s3Url+'">'+
  '<button type="button" name="button">View</button></a></td>'+
  '<td><button type="button" class="deleteButtons" id="'+s3Key+'">Delete</button></td></tr>';
  $(HTMLtoAppend).appendTo($('table'));
  // now attach event handler
  $('.deleteButtons:last').on('click', function () {
    let deleteButton = $('.deleteButtons:last');
    let deleteURL = "/upload/"+s3Key+"/destroy"
    $.post(deleteURL, function(){
      deleteButton.parent().parent().remove();
    });
  });
  console.log(s3Url);
  $('<input />').attr('type', 'hidden')
          .attr('name', "s3Url")
          .attr('value', s3Url)
          .appendTo('.PostForm');
};

$(function() {
  initS3FileUpload($('.fileInput'));
});
