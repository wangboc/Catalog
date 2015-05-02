/**
 * Created by ho on 2015/5/2.
 */



$(document).ready(function () {
    $("tr").dblclick(function () {
        $("#programsTab").load("/quickcatalog/23031/programinfo/", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success")
                alert("外部内容加载成功！");
            if (statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    });
});
