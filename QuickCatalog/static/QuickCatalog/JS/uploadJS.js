/**
 * Created by hoh on 2015/6/17.
 */
$(document).ready(function() {
    $('#upload').click(function() {
        $.ajax({
            title: '桐乡新闻',
            type: 'POST',
            url : '/quickcatalog/uploadfile/',
            enctype: "multipart/form-data",
            data  : {
                'file': $('#file').val()
            },
            success: function(data) {
                console.log(data)
            }
        })
    })
})
