//https://github.com/kartik-v/bootstrap-fileinput#showuploadedthumbs
$("#input-id").fileinput({
    dropZoneEnabled: false,
    removeLabel:'清除',
    uploadLabel:'开始上传',
    browseLabel: '选择上传文件',
    uploadUrl: '/quickcatalog/uploadfile/', //
    allowedFileExtensions: ['txt', 'TXT', 'mp4', 'MP4'],
    overwriteInitial: false,
    maxFileSize: 302414
    //allowedFileTypes: ['image', 'video', 'flash'],
});