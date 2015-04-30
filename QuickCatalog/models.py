# Create your models here.
# coding:utf-8
import json
import decimal

from django.db.models.base import ModelState


class ProgramInfo():
    sectionList = []
    __Json__ = ""


    def toJson(self):
        self.programDic.setdefault("sections", [])
        for section in self.sectionList:
            self.programDic.get("sections").append(section.toJson())

        self.__Json__ = json.dumps(self.programDic, ensure_ascii=False, cls=DateTimeEncoder, sort_keys=True, indent=4,
                                   separators=(',', ':'))
        return self.__Json__

    def __init__(self, programDic):
        self.programDic = programDic
        self.media_id = programDic["media_id"]
        self.title = programDic["title"]
        self.title2 = programDic["title2"]
        self.title_alter = programDic["title_alter"]
        self.media_state = programDic["media_state"]
        self.cataloger = programDic["cataloger"]
        self.approver = programDic["approver"]
        self.id = programDic["id"]
        self.description = programDic["description"]
        self.class_name = programDic["class_name"]
        self.topic_words = programDic["topic_words"]
        self.key_words = programDic["key_words"]
        self.subtitle = programDic["subtitle"]
        self.media_duty = programDic["media_duty"]
        self.publisher = programDic["publisher"]
        self.audience = programDic["audience"]
        self.media_column = programDic["media_column"]
        self.source_id = programDic["source_id"]
        self.post_picture = programDic["post_picture"]
        self.post_picture = programDic["post_picture"]
        self.publish_date = programDic["publish_date"]
        self.time_length = programDic["time_length"]
        self.carry_type = programDic["carry_type"]
        self.media_format = programDic["media_format"]
        self.additional_logo = programDic["additional_logo"]
        self.media_series = programDic["media_series"]
        self.media_type = programDic["media_type"]
        self.location = programDic["location"]
        self.path = programDic["path"]
        self.rating = programDic["rating"]
        self.reason = programDic["reason"]
        self.zhishi = programDic["zhishi"]
        self.aspect = programDic["aspect"]
        self.audio_format = programDic["audio_format"]
        self.source_method = programDic["source_method"]
        self.source_provider = programDic["source_provider"]
        self.time_start = programDic["time_start"]
        self.color = programDic["color"]
        self.sound_language = programDic["sound_language"]
        self.subtitle_language = programDic["subtitle_language"]
        self.media_class = programDic["media_class"]
        self.xintai = programDic["xintai"]
        self.creater = programDic["creater"]
        self.rating2 = programDic["rating2"]
        self.approver2 = programDic["approver2"]
        self.reason2 = programDic["reason2"]
        self.subordinate_title = programDic["subordinate_title"]
        self.title_description = programDic["title_description"]
        self.series_title = programDic["series_title"]
        self.episodes_totalnum = programDic["episodes_totalnum"]
        self.episodes_num = programDic["episodes_num"]
        self.tv_class = programDic["tv_class"]
        self.produced_date = programDic["produced_date"]
        self.parallel_proper_title = programDic["parallel_proper_title"]
        self.parallel_series_title = programDic["parallel_series_title"]
        self.character = programDic["character"]
        self.date_of_event = programDic["date_of_event"]
        self.version_des = programDic["version_des"]
        self.producer = programDic["producer"]
        self.name_of_cpo = programDic["name_of_cpo"]
        self.cp_statement = programDic["cp_statement"]
        self.audio_quality = programDic["audio_quality"]
        self.video_quality = programDic["video_quality"]
        self.video_bit_rate = programDic["video_bit_rate"]
        self.video_coding_format = programDic["video_coding_format"]
        self.video_sam_type = programDic["video_sam_type"]
        self.isrc = programDic["isrc"]
        self.relations_id = programDic["relations_id"]
        self.years_covered = programDic["years_covered"]
        self.spatial = programDic["spatial"]
        self.published_date = programDic["published_date"]
        self.cp_statement1 = programDic["cp_statement1"]
        self.yuzhong = programDic["yuzhong"]
        self.awards = programDic["awards"]
        self.xilie_name = programDic["xilie_name"]
        self.class_num = programDic["class_num"]
        self.class_time = programDic["class_time"]
        self.reason3 = programDic["reason3"]
        self.upload_time = programDic["upload_time"]
        self.approve_time = programDic["approve_time"]
        self.approve2_time = programDic["approve2_time"]
        self.catalog_times = programDic["catalog_times"]
        self.approve_times = programDic["approve_times"]
        self.approve2_times = programDic["approve2_times"]
        self.approve3_time = programDic["approve3_time"]
        self.rating3 = programDic["rating3"]
        self.level = programDic["level"]
        self.time_end = programDic["time_end"]
        self.test = programDic["test"]
        self.shengdao = programDic["shengdao"]
        self.ObjectID = programDic["ObjectID"]


class SectionInfo:
    sceneList = []
    __Json__ = ""

    def toJson(self):
        self.sectionDic.setdefault("scenes", [])
        for scene in self.sceneList:
            self.sectionDic.get("scenes").append(scene.toJson())

        self.__Json__ = json.dumps(self.sectionDic, ensure_ascii=False, cls=DateTimeEncoder, sort_keys=True, indent=4,
                                   separators=(',', ':'))
        return self.__Json__

    def __init__(self, sectionDic):
        self.sectionDic = sectionDic
        self.id = sectionDic["id"]
        self.media_id = sectionDic["media_id"]
        self.title = sectionDic["title"]
        self.description = sectionDic["description"]
        self.topic_words = sectionDic["topic_words"]
        self.key_words = sectionDic["key_words"]
        self.post_picture = sectionDic["post_picture"]
        self.section_duty = sectionDic["section_duty"]
        self.time_start = sectionDic["time_start"]
        self.time_end = sectionDic["time_end"]
        self.subtitle = sectionDic["subtitle"]
        self.rating = sectionDic["rating"]
        self.reason = sectionDic["reason"]
        self.title2 = sectionDic["title2"]
        self.class_name = sectionDic["class_name"]
        self.actual_sound = sectionDic["actual_sound"]
        self.program_form = sectionDic["program_form"]
        self.date_time = sectionDic["date_time"]
        self.section_series = sectionDic["section_series"]
        self.rating2 = sectionDic["rating2"]
        self.reason2 = sectionDic["reason2"]
        self.contributor = sectionDic["contributor"]
        self.audio_channel_num = sectionDic["audio_channel_num"]
        self.audio_channel_lan = sectionDic["audio_channel_lan"]
        self.subtitle_num = sectionDic["subtitle_num"]
        self.subtitle_lan = sectionDic["subtitle_lan"]
        self.years_covered = sectionDic["years_covered"]
        self.spatial = sectionDic["spatial"]
        self.source = sectionDic["source"]
        self.data_source_way = sectionDic["data_source_way"]
        self.data_source_man = sectionDic["data_source_man"]
        self.yuzhong = sectionDic["yuzhong"]
        self.years = sectionDic["years"]
        self.awards = sectionDic["awards"]
        self.upload_time = sectionDic["upload_time"]
        self.reason3 = sectionDic["reason3"]
        self.rating3 = sectionDic["rating3"]
        self.creater = sectionDic["creater"]
        self.pcreater = sectionDic["pcreater"]
        self.create_method = sectionDic["create_method"]
        self.create_other_info = sectionDic["create_other_info"]
        self.ObjectID = sectionDic["ObjectID"]


class SceneInfo:
    shotList = []
    __Json__ = ""

    def toJson(self):
        self.sceneDic.setdefault("shots", [])
        for shot in self.shotList:
            self.sceneDic.get("shots").append(shot.toJson())

        self.__Json__ = json.dumps(self.sceneDic, ensure_ascii=False, cls=DateTimeEncoder, sort_keys=True, indent=4,
                                   separators=(',', ':'))
        return self.__Json__

    def __init__(self, sceneDic):
        self.sceneDic = sceneDic
        self.id = sceneDic["id"]
        self.section_id = sceneDic["section_id"]
        self.title = sceneDic["title"]
        self.description = sceneDic["description"]
        self.topic_words = sceneDic["topic_words"]
        self.key_words = sceneDic["key_words"]
        self.post_picture = sceneDic["post_picture"]
        self.time_start = sceneDic["time_start"]
        self.time_end = sceneDic["time_end"]
        self.rating = sceneDic["rating"]
        self.reason = sceneDic["reason"]
        self.subtitle = sceneDic["subtitle"]
        self.rating2 = sceneDic["rating2"]
        self.reason2 = sceneDic["reason2"]
        self.date_of_event = sceneDic["date_of_event"]
        self.natural_sound = sceneDic["natural_sound"]
        self.upload_time = sceneDic["upload_time"]
        self.reason3 = sceneDic["reason3"]
        self.rating3 = sceneDic["rating3"]
        self.ObjectID = sceneDic["ObjectID"]


class ShotInfo:
    __Json__ = ""

    def toJson(self):
        self.__Json__ = json.dumps(self.shotDic, ensure_ascii=False, cls=DateTimeEncoder, sort_keys=True, indent=4,
                                   separators=(',', ':'))
        return self.__Json__

    def __init__(self, shotDic):
        self.shotDic = shotDic
        self.id = ["id"]
        self.scene_id = ["scene_id"]
        self.title = ["title"]
        self.description = ["description"]
        self.topic_words = ["topic_words"]
        self.key_words = ["key_words"]
        self.post_picture = ["post_picture"]
        self.time_start = ["time_start"]
        self.time_end = ["time_end"]
        self.rating = ["rating"]
        self.reason = ["reason"]
        self.location = ["location"]
        self.date_time = ["date_time"]
        self.subtitle = ["subtitle"]
        self.shootway = ["shootway"]
        self.rating2 = ["rating2"]
        self.sense_range = ["sense_range"]
        self.angle = ["angle"]
        self.actual_sound = ["actual_sound"]
        self.reason2 = ["reason2"]
        self.upload_time = ["upload_time"]
        self.reason3 = ["reason3"]
        self.rating3 = ["rating3"]
        self.ObjectID = ["ObjectID"]


# 由于从数据库中读出的Datatime类型数据无法序列化，为json.dumps函数添加编码方法
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'isoformat'):
            return obj.isoformat()
        elif isinstance(obj, decimal.Decimal):
            return float(obj)
        elif isinstance(obj, ModelState):
            return None
        else:
            return json.JSONEncoder.default(self, obj)
