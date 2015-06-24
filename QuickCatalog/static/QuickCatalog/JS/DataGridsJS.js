/**
 * Created by hoh on 2015/6/24.
 */
var $editTable = $('#tableCreater_Pro');

$editTable.datagrid({
    columns: [[
        {
            title: "创建者名称", field: "name"
        }
        , {
            title: "责任方式", field: "duty_manner"
        }
        , {
            title: "其他信息", field: "message"
        }
    ]]
    , edit: true
    , singleSelect: true //false allow multi select
    , selectedClass: 'success' //default: 'success'
    , selectChange: function (selected, rowIndex, rowData, $row) {
        //allow multi-select
        //console.log(selected, rowIndex, rowData, $row);
    }
}).datagrid("loadData", {rows: null});

//节目层其他责任者
var $editTable = $('#tableDuty_Pro');

$editTable.datagrid({
    columns: [[
        {
            title: "责任者名称", field: "name"
        }
        , {
            title: "责任者并列名", field: "pname"
        }
        , {
            title: "责任方式", field: "duty"
        }
        ,{
            title: "责任者说明", field: "other"
        }

    ]]
    , edit: true
    , singleSelect: true //false allow multi select
    , selectedClass: 'success' //default: 'success'
    , selectChange: function (selected, rowIndex, rowData, $row) {
        //allow multi-select
        //console.log(selected, rowIndex, rowData, $row);
    }
}).datagrid("loadData", {rows: null});

//节目层栏目
var $editTable = $('#tableColumn_Pro');

$editTable.datagrid({
    columns: [[
        {
            title: "栏目名称", field: "name"
        }
        , {
            title: "期次", field: "time"
        }
        , {
            title: "年度", field: "years"
        }
    ]]
    , edit: true
    , singleSelect: true //false allow multi select
    , selectedClass: 'success' //default: 'success'
    , selectChange: function (selected, rowIndex, rowData, $row) {
        //allow multi-select
        //console.log(selected, rowIndex, rowData, $row);
    }
}).datagrid("loadData", {rows: null});

//节目层获奖
var $editTable = $('#tableAward_Pro');

$editTable.datagrid({
    columns: [[
        {
            title: "奖名", field: "title"
        }
        , {
            title: "奖项", field: "item"
        }
        , {
            title: "获奖年度", field: "year"
        }
        , {
            title: "获奖者", field: "winner"
        }
        , {
            title: "颁奖日期", field: "memo"
        }
    ]]
    , edit: true
    , singleSelect: true //false allow multi select
    , selectedClass: 'success' //default: 'success'
    , selectChange: function (selected, rowIndex, rowData, $row) {
        //allow multi-select
        //console.log(selected, rowIndex, rowData, $row);
    }
}).datagrid("loadData", {rows: null});

