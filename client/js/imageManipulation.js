$(document).ready(function(){
    $('.removeImage').click(function(){
        $(this).parent().remove();
        return false;
    });

});
function clearImageField(){
  $('<input />').attr('type', 'hidden')
          .attr('name', "s3Url")
          .attr('value', s3Url)
          .appendTo('#createPostForm');
}
