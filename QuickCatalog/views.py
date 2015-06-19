# coding:utf-8

import os
import re
import base64
import types
import ftplib
from django.shortcuts import render
from django.http import HttpResponse

from models import ProgramInfo
from models import SectionInfo
from models import SceneInfo
from models import ShotInfo
from models import KeyFrame

# Create your views here.
import json
from django.db import connection

import sys

reload(sys)
sys.setdefaultencoding('utf-8')


def index(request):
    # cursor = connection.cursor()
    # cursor.execute("select * from mediainfo where id = %d" % 26383)
    # result = cursor.fetchone()
    # cursor.close()

    program = dict(Name="wang")

    programJson = json.dumps(program)

    return render(request, 'QuickCatalog/index.html', program)

    # 26383


# 获取节目层编目信息，该信息存储于数据库
def getProgramInfo(request, id):
    cursor = connection.cursor()
    # 获取节目层信息
    cursor.execute("select * from mediainfo where id = " + id)
    DESC = cursor.description
    programList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
    program = ProgramInfo(programList[0])
    # 获取节目层关键帧信息
    cursor.execute("select * from keyframe where media_id = " + id)
    DESC = cursor.description
    keyframeList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
    program.keyframeList = [KeyFrame(keyframe) for keyframe in keyframeList]
    # 获取片段层信息
    cursor.execute("select * from sectioninfo where media_id=" + str(program.id))
    DESC = cursor.description
    sectionList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
    program.sectionList = [SectionInfo(section) for section in sectionList]
    # 获取场景层信息
    for section in program.sectionList:
        cursor.execute("select * from sceneinfo where section_id=" + str(section.id))
        DESC = cursor.description
        sceneList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
        section.sceneList = [SceneInfo(scene) for scene in sceneList]
        # 获取片段层关键帧信息
        cursor.execute("select * from keyframe where section_id=" + str(section.id))
        DESC = cursor.description
        keyframeList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
        section.keyframeList = [KeyFrame(keyframe) for keyframe in keyframeList]
        # 获取镜头层信息
        for scene in section.sceneList:
            cursor.execute("select * from shotinfo where scene_id=" + str(scene.id))
            DESC = cursor.description
            shotList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
            scene.shotList = [ShotInfo(shot) for shot in shotList]
            # 获取场景层关键帧信息
            cursor.execute("select * from keyframe where scene_id=" + str(scene.id))
            DESC = cursor.description
            keyframeList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
            scene.keyframeList = [KeyFrame(keyframe) for keyframe in keyframeList]
            for shot in scene.shotList:
                # 获取镜头层关键镇信息
                cursor.execute("select * from keyframe where shot_id=" + str(shot.id))
                DESC = cursor.description
                keyframeList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
                shot.keyframeList = [KeyFrame(keyframe) for keyframe in keyframeList]
    cursor.close()
    return HttpResponse(program.toJson(), content_type="application/json")


# 用于删除串联单文件
def deletePreCatalogFile(request):
    try:
        if request.method == 'POST':
            title = request.body
            STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
            PATH = STATIC_ROOT + "/QuickCatalog/PlayList/" + title.decode('utf-8')
            os.remove(PATH)
        return HttpResponse("{'删除成功':'" + PATH + "'}", content_type="application/json")
    except Exception as e:
        return HttpResponse("{'删除结果':'出现问题' + '" + e + "'}", content_type="application/json")


# 获取串联单文件目录
def getPreCatalogList(request):
    STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
    jsonstr = json.dumps(os.listdir(STATIC_ROOT + "\QuickCatalog\PlayList".decode('utf-8')), ensure_ascii=False,
                         sort_keys=True,
                         separators=(',', ':'))
    return HttpResponse(jsonstr, content_type="application/json")


# 用于上传串联单文件
def uploadfile(request):
    try:
        STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
        PATH = STATIC_ROOT + "/QuickCatalog/PlayList".decode('utf-8')
        files = request.FILES.getlist('file_data')
        for f in files:
            fileurl = PATH + '/' + f._name.decode('utf-8')
            destination = open(fileurl, 'wb+')
            for chunk in f.chunks():
                destination.write(chunk)
            destination.close()
            # filename = f.name.decode('utf-8').split('.')
            # if filename[1] == "MP4" or filename[1] == "mp4":
            # ftpconnect = ftplib.FTP('10.1.70.88', 'Anonymous')
            # ftpconnect.storbinary('stor %s' % f.name.decode('utf-8').encode('gbk'), destination)
            #     # ftpconnect.quit()
            # # destination.close()
        return HttpResponse(json.dumps('OK'), content_type="applicatoin/json")
    except Exception as e:
        return HttpResponse(json.dumps(e), content_type="applicatoin/json")


# 删除关键帧信息
def deleteKeyframe(request):
    try:
        if request.method == 'POST':
            keyframe_id = request.body
            sqlCommand = "Delete from keyframe where id='" + keyframe_id + "'"
            cursor = connection.cursor()
            cursor.execute(sqlCommand)
            cursor.close()
        return HttpResponse("{'删除成功':'" + keyframe_id + "'}", content_type="application/json")
    except:
        return HttpResponse("{'删除结果':'出现问题'}", content_type="application/json")


# 保存节目层编目信息，如果是新节目，即串联单解析出来的内容，则新建条目。否则，更新内容
def saveProgramInfo(request):
    try:
        if request.method == 'POST':
            reqArray = json.loads(request.body)
            id = "0"
            if reqArray["isNew"] == "True":
                id = str(SaveNewProgramInfo(reqArray))
            else:
                id = str(UpdateProgramInfo(reqArray))
            return HttpResponse("{'保存结果':'保存完成','节目ID':'" + id + "'}", content_type="application/json")
    except:
        return HttpResponse("{'保存结果':'提交出现问题'}", content_type="application/json")


# 删除片段层信息
def deleteSectionInfo(request):
    try:
        if request.method == 'POST':
            section_id = request.body
            sqlCommand = "Delete from sectioninfo where id='" + section_id + "'"
            cursor = connection.cursor()
            cursor.execute(sqlCommand)
            cursor.close()
        return HttpResponse("{'删除成功':'" + section_id + "'}", content_type="application/json")
    except:
        return HttpResponse("{'删除结果':'出现问题'}", content_type="application/json")


# 删除场景层信息
def deleteSceneInfo(request):
    try:
        if request.method == 'POST':
            scene_id = request.body
            sqlCommand = "Delete from sceneinfo where id='" + scene_id + "'"
            cursor = connection.cursor()
            cursor.execute(sqlCommand)
            cursor.close()
        return HttpResponse("{'删除成功':'" + scene_id + "'}", content_type="application/json")
    except:
        return HttpResponse("{'删除结果':'出现问题'}", content_type="application/json")


# 删除镜头层信息
def deleteShotInfo(request):
    try:
        if request.method == 'POST':
            shot_id = request.body
            sqlCommand = "Delete from shotinfo where id='" + shot_id + "'"
            cursor = connection.cursor()
            cursor.execute(sqlCommand)
            cursor.close()
        return HttpResponse("{'删除成功':'" + shot_id + "'}", content_type="application/json")
    except:
        return HttpResponse("{'删除结果':'出现问题'}", content_type="application/json")


# 保存新建节目层信息
def SaveNewProgramInfo(reqArray):
    sqlCommand = "INSERT INTO uploadinfo  (high_location_name, \
                 filename)\
                VALUES (\
                    \'" + "桐乡新闻2011" + "\', \
                \'" + reqArray["title"] + "\')"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.execute("SELECT @@IDENTITY FROM uploadinfo")
    id = cursor.fetchone()[0]
    sqlCommand = "INSERT INTO tocatalog  (media_id,  \
                 title)\
                VALUES (\
               \'" + str(id) + "\', \
                \'" + reqArray["title"] + "\')"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.execute("SELECT @@IDENTITY FROM tocatalog")
    cursor.close()
    sqlCommand = "INSERT INTO MediaInfo  ( \
                 media_id,\
                title,\
                title_alter,\
                media_state,\
                cataloger,\
                approver,\
                description,\
                time_length,\
                location,\
                path,\
                time_start,\
                approver2,\
                shengdao,\
                isNew)\
                VALUES (\
                \'" + str(id) + "\', \
                \'" + reqArray["title"] + "\', \
                \'" + reqArray["title_alter"] + "\', \
                \'" + '一审通过' + "\', \
                \'" + str(300) + "\', \
                \'" + str(300) + "\', \
                \'" + reqArray["description"] + "\', \
                \'" + reqArray["time_length"] + "\', \
                \'" + "桐乡新闻2011_L" + "\', \
                \'" + reqArray["title"] + "\', \
                \'" + reqArray["time_start"] + "\', \
                \'" + str(300) + "\', \
                \'" + reqArray["shengdao"] + "\', \
                \'" + reqArray["isNew"] + "\')"

    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.execute("SELECT @@IDENTITY FROM Mediainfo")
    id = cursor.fetchone()[0]
    cursor.close()
    for keyframe in reqArray["keyframes"]:
        SaveNewKeyframe(keyframe, 0, str(id))
    for section in reqArray["sections"]:
        SaveNewSection(section, str(id))
    return id


# 保存新片段层信息
def SaveNewSection(section, media_id):
    sqlCommand = "INSERT INTO SectionInfo  ( \
                    media_id,\
                    title,\
                    description,\
                    topic_words,\
                    key_words,\
                    time_start,\
                    time_end,\
                    isNew)\
                    VALUES (\
                    \'" + str(media_id) + "\',\
                    \'" + section["title"] + "\', \
                    \'" + section["description"] + "\',\
                    \'" + section["topic_words"] + "\', \
                    \'" + section["key_words"] + "\', \
                    \'" + section["time_start"] + "\',\
                    \'" + section["time_end"] + "\',\
                    \'" + section["isNew"] + "\')"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.execute("SELECT @@IDENTITY FROM SectionInfo")
    section_id = cursor.fetchone()[0]
    cursor.close()
    for KeyFrame in section["keyframes"]:
        SaveNewKeyframe(KeyFrame, 1, section_id)
    for scene in section["scenes"]:
        SaveNewSceneInfo(scene, section_id)
    return


# 保存新场景层信息
def SaveNewSceneInfo(scene, section_id):
    sqlCommand = "INSERT INTO SceneInfo  ( \
                    section_id,\
                    title,\
                    description,\
                    topic_words,\
                    key_words,\
                    time_start,\
                    time_end,\
                    isNew)\
                    VALUES (\
                    \'" + str(section_id) + "\',\
                    \'" + scene["title"] + "\',\
                    \'" + scene["description"] + "\',\
                    \'" + scene["topic_words"] + "\',\
                    \'" + scene["key_words"] + "\',\
                    \'" + scene["time_start"] + "\',\
                    \'" + scene["time_end"] + "\',\
                    \'" + scene["isNew"] + "\')"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.execute("SELECT @@IDENTITY FROM SceneInfo")
    scene_id = cursor.fetchone()[0]
    cursor.close()
    for keyframe in scene["keyframes"]:
        SaveNewKeyframe(keyframe, 2, scene_id)
    for shot in scene["shots"]:
        SaveNewShotInfo(shot, scene_id)

    return


# 保存新镜头层信息
def SaveNewShotInfo(shot, scene_id):
    sqlCommand = "INSERT INTO ShotInfo  ( \
                    scene_id,\
                    title,\
                    description,\
                    topic_words,\
                    key_words,\
                    time_start,\
                    time_end,\
                    location,\
                    sense_range,\
                    angle,\
                    actual_sound,\
                    isNew)\
                    VALUES (\
                    \'" + str(scene_id) + "\',\
                    \'" + shot["title"] + "\',\
                    \'" + shot["description"] + "\',\
                    \'" + shot["topic_words"] + "\',\
                    \'" + shot["key_words"] + "\',\
                    \'" + shot["time_start"] + "\',\
                    \'" + shot["time_end"] + "\',\
                    \'" + shot["location"] + "\',\
                    \'" + shot["sense_range"] + "\',\
                    \'" + shot["angle"] + "\',\
                    \'" + shot["actual_sound"] + "\',\
                    \'" + shot["isNew"] + "\')"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.execute("SELECT @@IDENTITY FROM ShotInfo")
    shot_id = cursor.fetchone()[0]
    cursor.close()
    for keyframe in shot["keyframes"]:
        SaveNewKeyframe(keyframe, 3, shot_id)


# 保存新关键帧信息
def SaveNewKeyframe(keyframe, layer, layerid):
    if layer == 0:
        keyframe["media_id"] = layerid
    elif layer == 1:
        keyframe["section_id"] = layerid
    elif layer == 2:
        keyframe["scene_id"] = layerid
    elif layer == 3:
        keyframe["shot_id"] = layerid
    keyframeresult = base64.b64decode(keyframe["keyframe"])
    keyframeresult = buffer(keyframeresult)
    strs = keyframe["position"].split(":")
    hours = strs[0]
    minutes = strs[1]
    seconds = strs[2]
    frames = strs[3]
    Second = int(seconds) + (int(hours) * 60 + int(minutes)) * 60 + int(frames) * 40 / 1000.0
    position = Second * 10000000

    sqlCommand = "INSERT INTO Keyframe  ( \
                 title,\
                position,\
                media_id,\
                section_id,\
                scene_id,\
                shot_id,\
                keyframe)\
                VALUES (\
                \'" + keyframe["title"] + "\', \
                \'" + str(position) + "\', \
                \'" + str(keyframe["media_id"]) + "\', \
                \'" + str(keyframe["section_id"]) + "\', \
                \'" + str(keyframe["scene_id"]) + "\', \
                \'" + str(keyframe["shot_id"]) + "\',%s)"

    cursor = connection.cursor()
    cursor.execute(sqlCommand, [keyframeresult])
    cursor.execute("SELECT @@IDENTITY FROM Keyframe")
    id = cursor.fetchone()[0]
    cursor.close()
    return


# 更新节目层信息
def UpdateProgramInfo(reqArray):
    sqlCommand = "Update mediainfo set \
            title=\'" + reqArray["title"] + "\',\
            media_state=\'" + '一审通过' + "\',\
            description=\'" + reqArray["description"] + "\',\
            class_name=\'" + reqArray["class_name"] + "\',\
            topic_words=\'" + reqArray["topic_words"] + "\',\
            key_words=\'" + reqArray["key_words"] + "\',\
            subtitle=\'" + reqArray["subtitle"] + "\',\
            isNew=\'" + reqArray["isNew"] + "\'\
            where id = \'" + reqArray["id"] + "\'"

    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.close()
    for keyframe in reqArray["keyframes"]:
        if keyframe["isNew"] == "True":
            SaveNewKeyframe(keyframe, 0, reqArray["id"])
    for section in reqArray["sections"]:
        if section["isNew"] == "True":
            SaveNewSection(section, reqArray["id"])
        else:
            UpdateSectionInfo(section)

    return reqArray["id"]


# 更新片段层信息
def UpdateSectionInfo(section):
    sqlCommand = "Update sectioninfo set \
               title=\'" + section["title"] + "\',\
            description=\'" + section["description"] + "\',\
            topic_words=\'" + section["topic_words"] + "\',\
            key_words=\'" + section["key_words"] + "\',\
            isNew=\'" + section["isNew"] + "\' \
            where id = \'" + str(section["id"]) + "\'"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.close()
    for KeyFrame in section["keyframes"]:
        if KeyFrame["isNew"] == "True":
            SaveNewKeyframe(KeyFrame, 1, str(section["id"]))
    for Scene in section["scenes"]:
        if Scene["isNew"] == "True":
            SaveNewSceneInfo(Scene, section["id"])
        else:
            UpdateSceneInfo(Scene)
    return


# 更新场景层信息
def UpdateSceneInfo(Scene):
    sqlCommand = "Update sceneinfo set \
                section_id=\'" + str(Scene["section_id"]) + "\',\
                title=\'" + Scene["title"] + "\', \
                description=\'" + Scene["description"] + "\', \
                topic_words=\'" + Scene["topic_words"] + "\', \
                key_words=\'" + Scene["key_words"] + "\', \
                isNew =\'" + Scene["isNew"] + "\' \
            where id = \'" + str(Scene["id"]) + "\'"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.close()
    for Keyframe in Scene["keyframes"]:
        if Keyframe["isNew"] == "True":
            SaveNewKeyframe(Keyframe, 2, str(Scene["scene_id"]))
    for Shot in Scene["shots"]:
        if Shot["isNew"] == "True":
            SaveNewShotInfo(Shot, Scene["id"])
        else:
            UpdateShotInfo(Shot)
    return


# 更新镜头层信息
def UpdateShotInfo(Shot):
    sqlCommand = "Update shotinfo set \
                scene_id=\'" + str(Shot["scene_id"]) + "\',\
                title=\'" + Shot["title"] + "\', \
                description=\'" + Shot["description"] + "\', \
                topic_words=\'" + Shot["topic_words"] + "\', \
                key_words=\'" + Shot["key_words"] + "\', \
                isNew =\'" + Shot["isNew"] + "\' \
            where id = \'" + str(Shot["id"]) + "\'"
    cursor = connection.cursor()
    cursor.execute(sqlCommand)
    cursor.close()
    for Keyframe in Shot["keyframes"]:
        if Keyframe["isNew"] == "True":
            SaveNewKeyframe(Keyframe, 3, str(Shot["shot_id"]))
    return


def __ParseTimeSpan__(timeold, timenew):
    RexDateString = re.compile(r'\d{2}:\d{2}:\d{2}:\d{2}')
    timeo = RexDateString.findall(timeold)  # 00:00:00:00
    timen = RexDateString.findall(timenew)  # 00:10:00:00
    RexDateString = re.compile(r':')
    timeoL = RexDateString.split(timeo[0])  # [00, 00, 00, 00]
    timenL = RexDateString.split(timen[0])  # [00, 10, 00, 00]
    timeoLength = ((int(timeoL[0]) * 60 + int(timeoL[1])) * 60 + int(timeoL[2])) * 25 + int(timeoL[3])  # 换算为帧数
    timenLength = ((int(timenL[0]) * 60 + int(timenL[1])) * 60 + int(timenL[2])) * 25 + int(timenL[3])  # 换算为帧数
    timeFrames = timenLength + timeoLength  # 出点帧数
    Frame = timeFrames % 25
    FrameS = str(Frame)
    Second = (timeFrames - Frame) / 25 % 60
    SecondS = str(Second)
    Minints = ((timeFrames - Frame) / 25 - Second) / 60 % 60
    MinintsS = str(Minints)
    Hours = (((timeFrames - Frame) / 25 - Second) / 60 - Minints) / 60
    HoursS = str(Hours)
    if Frame < 10: FrameS = "0" + str(Frame)
    if Second < 10: SecondS = "0" + str(Second)
    if Minints < 10: MinintsS = "0" + str(Minints)
    if Hours < 10: HoursS = "0" + str(Hours)
    time = HoursS + ":" + MinintsS + ":" + SecondS + ":" + FrameS
    return [timeo[0], timen[0], time]  # 入点 时长 出点


def getPreCatalogDetail(request):
    STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
    file = STATIC_ROOT + r"\QuickCatalog\PlayList\桐乡新闻 2014-11-30.txt"
    file = file.decode('utf-8')
    input = open(file, 'r')

    timeold = "1900-01-01  00:00:00:00"
    # 用于去除存在口播【创建人】的段落
    isNouseParagraph = False
    # 用于去除存在口播【创建人】的段落 结束
    descriptionTemp = ""
    titleTemp = ""
    time_start_temp = ""
    time_end_temp = ""

    program = {}
    program["title"] = "桐乡新闻-2014-11-30"
    program["media_id"] = ""
    program["title2"] = ""
    program["title_alter"] = ""
    program["media_state"] = ""
    program["cataloger"] = ""
    program["approver"] = ""
    program["id"] = ""
    program["description"] = ""
    program["class_name"] = ""
    program["topic_words"] = ""
    program["key_words"] = ""
    program["subtitle"] = ""
    program["media_duty"] = ""
    program["publisher"] = ""
    program["audience"] = ""
    program["media_column"] = ""
    program["source_id"] = ""
    program["post_picture"] = ""

    program["publish_date"] = ""
    program["time_length"] = ""
    program["carry_type"] = ""
    program["media_format"] = ""
    program["additional_logo"] = ""
    program["media_series"] = ""
    program["media_type"] = ""
    program["location"] = ""
    program["path"] = ""
    program["rating"] = ""
    program["reason"] = ""
    program["zhishi"] = ""
    program["aspect"] = ""
    program["audio_format"] = ""
    program["source_method"] = ""
    program["source_provider"] = ""
    program["time_start"] = "00:00:00:00"
    program["color"] = ""
    program["sound_language"] = ""
    program["subtitle_language"] = ""
    program["media_class"] = ""
    program["xintai"] = ""
    program["creater"] = ""
    program["rating2"] = ""
    program["approver2"] = ""
    program["reason2"] = ""
    program["subordinate_title"] = ""
    program["title_description"] = ""
    program["series_title"] = ""
    program["episodes_totalnum"] = ""
    program["episodes_num"] = ""
    program["tv_class"] = ""
    program["produced_date"] = ""
    program["parallel_proper_title"] = ""
    program["parallel_series_title"] = ""
    program["character"] = ""
    program["date_of_event"] = ""
    program["version_des"] = ""
    program["producer"] = ""
    program["name_of_cpo"] = ""
    program["cp_statement"] = ""
    program["audio_quality"] = ""
    program["video_quality"] = ""
    program["video_bit_rate"] = ""
    program["video_coding_format"] = ""
    program["video_sam_type"] = ""
    program["isrc"] = ""
    program["relations_id"] = ""
    program["years_covered"] = ""
    program["spatial"] = ""
    program["published_date"] = ""
    program["cp_statement1"] = ""
    program["yuzhong"] = ""
    program["awards"] = ""
    program["xilie_name"] = ""
    program["class_num"] = ""
    program["class_time"] = ""
    program["reason3"] = ""
    program["upload_time"] = ""
    program["approve_time"] = ""
    program["approve2_time"] = ""
    program["catalog_times"] = ""
    program["approve_times"] = ""
    program["approve2_times"] = ""
    program["approve3_time"] = ""
    program["rating3"] = ""
    program["level"] = ""
    program["time_end"] = ""
    program["test"] = ""
    program["shengdao"] = ""
    program["ObjectID"] = ""
    program["isNew"] = "NewInfo"
    Programinfo = ProgramInfo(program)

    SectionCount = 0

    for line in input.readlines():
        if line == '\n':
            continue

        line = line.decode('gbk')
        RexDateString = re.compile(r'\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}:\d{2}:\d{2}')
        position = RexDateString.search(line)
        if (position):
            # 解析新片段层入点 时长 出点
            timelist = __ParseTimeSpan__(timeold, RexDateString.findall(line)[0])

            if SectionCount != 0:
                # =========================保存上一片段层信息===================================================
                if isNouseParagraph is False:
                    section = {}
                    section["title"] = titleTemp
                    section["description"] = descriptionTemp
                    section["time_start"] = time_start_temp
                    section["time_end"] = time_end_temp
                    section["id"] = ""
                    section["media_id"] = ""
                    section["topic_words"] = ""
                    section["key_words"] = ""
                    section["post_picture"] = ""
                    section["section_duty"] = ""
                    section["subtitle"] = ""
                    section["rating"] = ""
                    section["reason"] = ""
                    section["title2"] = ""
                    section["class_name"] = ""
                    section["actual_sound"] = ""
                    section["program_form"] = ""
                    section["date_time"] = ""
                    section["section_series"] = ""
                    section["rating2"] = ""
                    section["reason2"] = ""
                    section["contributor"] = ""
                    section["audio_channel_num"] = ""
                    section["audio_channel_lan"] = ""
                    section["subtitle_num"] = ""
                    section["subtitle_lan"] = ""
                    section["years_covered"] = ""
                    section["spatial"] = ""
                    section["source"] = ""
                    section["data_source_way"] = ""
                    section["data_source_man"] = ""
                    section["yuzhong"] = ""
                    section["years"] = ""
                    section["awards"] = ""
                    section["upload_time"] = ""
                    section["reason3"] = ""
                    section["rating3"] = ""
                    section["creater"] = ""
                    section["pcreater"] = ""
                    section["create_method"] = ""
                    section["create_other_info"] = ""
                    section["ObjectID"] = ""
                    section["isNew"] = "NewInfo"
                    Sectioninfo = SectionInfo(section)
                    Programinfo.sectionList.append(Sectioninfo)
                    # ===========================================================================================
                elif isNouseParagraph:
                    isNouseParagraph = False
            details = RexDateString.split(line)

            descriptionTemp = details[1]

            titleTemp = details[0]
            time_start_temp = timelist[0]
            time_end_temp = timelist[1]
            timeold = timelist[2]  # 设定下一片段层开始时间
            SectionCount += 1

            # 用于去除存在口播【创建人】的段落
            nouserKeyword = "创建人"
            nouserKeyword = nouserKeyword.decode('utf8')
            RexkeywordString = re.compile(u"创建人")
            p = RexkeywordString.search(line)
            if (p):
                isNouseParagraph = True
                # 用于去除存在口播【创建人】的段落 结束


        else:
            descriptionTemp += line

    # =========================保存上一片段层信息===================================================
    section = {}
    section["title"] = titleTemp
    section["description"] = descriptionTemp
    section["time_start"] = time_start_temp
    section["time_end"] = time_end_temp
    section["id"] = ""
    section["media_id"] = ""
    section["topic_words"] = ""
    section["key_words"] = ""
    section["post_picture"] = ""
    section["section_duty"] = ""
    section["subtitle"] = ""
    section["rating"] = ""
    section["reason"] = ""
    section["title2"] = ""
    section["class_name"] = ""
    section["actual_sound"] = ""
    section["program_form"] = ""
    section["date_time"] = ""
    section["section_series"] = ""
    section["rating2"] = ""
    section["reason2"] = ""
    section["contributor"] = ""
    section["audio_channel_num"] = ""
    section["audio_channel_lan"] = ""
    section["subtitle_num"] = ""
    section["subtitle_lan"] = ""
    section["years_covered"] = ""
    section["spatial"] = ""
    section["source"] = ""
    section["data_source_way"] = ""
    section["data_source_man"] = ""
    section["yuzhong"] = ""
    section["years"] = ""
    section["awards"] = ""
    section["upload_time"] = ""
    section["reason3"] = ""
    section["rating3"] = ""
    section["creater"] = ""
    section["pcreater"] = ""
    section["create_method"] = ""
    section["create_other_info"] = ""
    section["ObjectID"] = ""
    section["isNew"] = "NewInfo"
    Sectioninfo = SectionInfo(section)
    Programinfo.sectionList.append(Sectioninfo)
    # ===========================================================================================
    # jsonstr = json.dumps(Programinfo.toJson(), ensure_ascii=False,
    # sort_keys=True,
    # separators=(',', ':'))
    input.close()
    return HttpResponse(Programinfo.toJson(), content_type="application/json")


def getPreCatalogFile(request):
    STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
    file = STATIC_ROOT + r"\QuickCatalog\PlayList\桐乡新闻 2014-11-30.txt"
    file = file.decode('utf-8')
    input = open(file, 'r')
    text = ""
    for line in input.readlines():
        text += line.decode('gbk')
    input.close()
    fileDict = dict(content=text)
    contentjson = json.dumps(fileDict)
    return HttpResponse(contentjson, content_type="application/json")

