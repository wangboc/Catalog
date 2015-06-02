# coding:utf-8

import os
import re

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
    cursor = connection.cursor()
    cursor.execute("select * from mediainfo where id = %d" % 26383)
    result = cursor.fetchone()
    cursor.close()

    program = dict(Name="wang")

    programJson = json.dumps(program)

    return render(request, 'QuickCatalog/index.html', program)

    # 26383


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
    return HttpResponse(program.toJson(), content_type="application/json")


def getPreCatalogList(request):
    STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
    jsonstr = json.dumps(os.listdir(STATIC_ROOT + "\QuickCatalog\PlayList".decode('utf-8')), ensure_ascii=False,
                         sort_keys=True,
                         separators=(',', ':'))
    return HttpResponse(jsonstr, content_type="application/json")


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


def saveNewKeyframe(request, data):
    keyframe = {}
    keyframe["id"] = ""
    keyframe["title"] = data.title
    keyframe["keyframe"] = ""
    keyframe["keyframeBase64"] = data.keyframeBase64
    keyframe["position"] = data.position
    keyframe["media_id"] = data.media_id
    keyframe["section_id"] = data.section_id
    keyframe["scene_id"] = data.scene_id
    keyframe["shot_id"] = data.shot_id
    NewKeyframe = KeyFrame(keyframe)
    # todo


def getPreCatalogDetail(request):
    STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
    file = STATIC_ROOT + r"\QuickCatalog\PlayList\桐乡新闻 2014-07-30.txt"
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
    program["title"] = "桐乡新闻 2014-07-30"
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
    program["isNew"] = "True"
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
                    section["isNew"] = "True"
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
    section["isNew"] = "True"
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
    file = STATIC_ROOT + r"\QuickCatalog\PlayList\桐乡新闻 2014-07-30.txt"
    file = file.decode('utf-8')
    input = open(file, 'r')
    text = ""
    for line in input.readlines():
        text += line.decode('gbk')
    input.close()
    fileDict = dict(content=text)
    contentjson = json.dumps(fileDict)
    return HttpResponse(contentjson, content_type="application/json")

