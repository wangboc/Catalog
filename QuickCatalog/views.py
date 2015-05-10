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
    Second = (timeFrames - Frame) / 25 % 60
    Minints = ((timeFrames - Frame) / 25 - Second) / 60 % 60
    Hours = (((timeFrames - Frame) / 25 - Second) / 60 - Minints) / 60
    time = str(Hours) + ":" + str(Minints) + ":" + str(Second) + ":" + str(Frame)
    return [timeo, timen, time]  # 入点 时长 出点


def getPreCatalogDetail(request):
    STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')
    file = STATIC_ROOT + r"\QuickCatalog\PlayList\桐乡新闻 2014-07-30.txt"
    file = file.decode('utf-8')
    input = open(file, 'r')
    NewParamCount = 0
    Lines = []
    timeold = "1900-01-01  00:00:00:00"
    for line in input.readlines():
        Lines.append(line)
        print  line.decode('gbk')
        RexDateString = re.compile(r'\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}:\d{2}:\d{2}')
        position = RexDateString.search(line)
        if (position):
            timenew = RexDateString.findall(line)
            __ParseTimeSpan__(timeold, timenew[0])  # 解析出入点 时长 出点
    jsonstr = json.dumps(Lines, ensure_ascii=False,
                         sort_keys=True,
                         separators=(',', ':'))
    return HttpResponse(jsonstr, content_type="application/json")
