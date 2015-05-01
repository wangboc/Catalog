# coding:utf-8
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



    # return HttpResponse(programJson, content_type="application/json")
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
        # 获取镜头层信息
        if len(section.sceneList) > 0:
            for scene in section.sceneList:
                cursor.execute("select * from shotinfo where scene_id=" + str(scene.id))
                DESC = cursor.description
                shotList = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
                scene.shotList = [ShotInfo(shot) for shot in shotList]
    return HttpResponse(program.toJson(), content_type="application/json")

