//https://github.com/kartik-v/bootstrap-fileinput#showuploadedthumbs
//用于文件上传的控件
$("#input-id").fileinput({
    dropZoneEnabled: false,
    removeLabel: '清除',
    uploadLabel: '开始上传',
    browseLabel: '选择串联单',
    uploadUrl: '/quickcatalog/uploadfile/', //
    allowedFileExtensions: ['txt', 'TXT'],
    overwriteInitial: false,
    maxFileSize: 302414
    //allowedFileTypes: ['image', 'video', 'flash'],
});
//用于时间选择的控件
$('#Publish_date_Pro').datepicker({
    format: "yyyy/mm/dd",
    language: "zh-CN",
    autoclose: true,
    todayHighlight: true
});
$('#Produced_date__Pro').datepicker({
    format: "yyyy/mm/dd",
    language: "zh-CN",
    autoclose: true,
    todayHighlight: true
});

//$("#input-id_mp4").fileinput({
//    dropZoneEnabled: false,
//    removeLabel: '清除',
//    uploadLabel: '开始上传',
//    browseLabel: '选择视频流',
//    uploadUrl: '/quickcatalog/uploadfile/', //
//    allowedFileExtensions: ['mp4', 'MP4'],
//    overwriteInitial: false,
//    maxFileSize: 302414
//    //allowedFileTypes: ['image', 'video', 'flash'],
//});