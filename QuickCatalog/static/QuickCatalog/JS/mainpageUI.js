/**
 * Created by ho on 2015/5/2.
 */
ko.bindingHandlers.bootstrapSwitchOn = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $elem;
        $elem = $(element);
        $(element).bootstrapSwitch();
        $(element).bootstrapSwitch("state", ko.utils.unwrapObservable(valueAccessor()));
        $elem.on("switchChange.bootstrapSwitch", function (e, data) {
            valueAccessor()(data);
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var vStatus, vmStatus;
        vStatus = $(element).bootstrapSwitch("state");
        vmStatus = ko.utils.unwrapObservable(valueAccessor());
        if (vStatus !== vmStatus) {
            $(element).bootstrapSwitch("state", vmStatus);
        }
    }
};


function PreCatalogFile(data) {
    var self = this;
    self.title = ko.observable(data);
}

function KeyframeInfo(data) {
    var self = this;
    self.json = $.parseJSON(data);
    self.id = ko.observable(self.json.id);
    self.title = ko.observable(self.json.title);
    self.keyframe = ko.observable(self.json.keyframe);
    self.position = ko.observable(ParseSecondtoTime(self.json.position / 10000000.0));
    self.media_id = ko.observable(self.json.media_id);
    self.section_id = ko.observable(self.json.section_id);
    self.scene_id = ko.observable(self.json.scene_id);
    self.shot_id = ko.observable(self.json.shot_id);
    self.isNew = ko.observable(self.json.isNew);
    self.getjson = function () {
        self.json['id'] = self.id();
        self.json['title'] = self.title();
        self.json['keyframe'] = self.keyframe();
        self.json['position'] = self.position();
        self.json['media_id'] = self.media_id();
        self.json['section_id'] = self.section_id();
        self.json['scene_id'] = self.scene_id();
        self.json['shot_id'] = self.shot_id();
        self.json['isNew'] = self.isNew();
        return self.json;
    };
}
function ShotInfo(scene, data) {
    var self = this;
    self.json = $.parseJSON(data);
    self.id = ko.observable(self.json.id);
    self.scene_id = ko.observable(self.json.scene_id);
    self.title = ko.observable(self.json.title);
    self.description = ko.observable(self.json.description);
    self.topic_words = ko.observable(self.json.topic_words);
    self.key_words = ko.observable(self.json.key_words);
    self.post_picture = ko.observable(self.json.post_picture);
    self.time_start = ko.observable(self.json.time_start);
    self.time_end = ko.observable(self.json.time_end);
    self.rating = ko.observable(self.json.rating);
    self.reason = ko.observable(self.json.reason);
    self.location = ko.observable(self.json.location);
    self.date_time = ko.observable(self.json.date_time);
    self.subtitle = ko.observable(self.json.subtitle);
    self.shootway = ko.observable(self.json.shootway);
    self.rating2 = ko.observable(self.json.rating2);
    self.sense_range = ko.observable(self.json.sense_range);
    self.angle = ko.observable(self.json.angle);
    self.actual_sound = ko.observable(self.json.actual_sound);
    self.reason2 = ko.observable(self.json.reason2);
    self.upload_time = ko.observable(self.json.upload_time);
    self.reason3 = ko.observable(self.json.reason3);
    self.rating3 = ko.observable(self.json.rating3);
    self.ObjectID = ko.observable(self.json.ObjectID);
    self.keyframes = ko.observableArray([]);
    self.isNew = ko.observable(self.json.isNew);
    self.scene = ko.observable(scene);
    var kflist = $.map(self.json.keyframes, function (itemS) {
        return new KeyframeInfo(itemS);
    });
    self.keyframes(kflist);
    self.toShotInfoJson = function () {
        var jsonString = JSON.stringify(self.getjson());

        jsonString = jsonString.substring(0, jsonString.length - 1);
        var keyframesjsonString = ', "keyframes":[';
        for (var i = 0; i < self.keyframes().length; i++) {
            keyframesjsonString += JSON.stringify(self.keyframes()[i].getjson());
            if (i == self.keyframes().length - 1) keyframesjsonString += "";
            else keyframesjsonString += ",";
        }
        keyframesjsonString += ']}';
        jsonString = jsonString + keyframesjsonString;
        var json = $.parseJSON(jsonString);
        return json;
    };
    self.getjson = function () {
        self.json['id'] = self.id();
        self.json['scene_id'] = self.scene_id();
        self.json['title'] = self.title();
        self.json['description'] = self.description();
        self.json['topic_words'] = self.topic_words();
        self.json['key_words'] = self.key_words();
        self.json['post_picture'] = self.post_picture();
        self.json['time_start'] = self.time_start();
        self.json['time_end'] = self.time_end();
        self.json['rating'] = self.rating();
        self.json['reason'] = self.reason();
        self.json['location'] = self.location();
        self.json['date_time'] = self.date_time();
        self.json['subtitle'] = self.subtitle();
        self.json['shootway'] = self.shootway();
        self.json['rating2'] = self.rating2();
        self.json['sense_range'] = self.sense_range();
        self.json['angle'] = self.angle()
        self.json['actual_sound'] = self.actual_sound();
        self.json['reason2'] = self.reason2();
        self.json['upload_time'] = self.upload_time();
        self.json['reason3'] = self.reason3();
        self.json['rating3'] = self.rating3();
        self.json['ObjectID'] = self.ObjectID();
        self.json['isNew'] = self.isNew();
        return self.json;
    };
}
function SceneInfo(section, data) {
    var self = this;
    self.json = $.parseJSON(data);
    self.id = ko.observable(self.json.id);
    self.section_id = ko.observable(self.json.section_id);
    self.title = ko.observable(self.json.title);
    self.description = ko.observable(self.json.description);
    self.topic_words = ko.observable(self.json.topic_words);
    self.key_words = ko.observable(self.json.key_words);
    self.post_picture = ko.observable(self.json.post_picture);
    self.time_start = ko.observable(self.json.time_start);
    self.time_end = ko.observable(self.json.time_end);
    self.rating = ko.observable(self.json.rating);
    self.reason = ko.observable(self.json.reason);
    self.subtitle = ko.observable(self.json.subtitle);
    self.rating2 = ko.observable(self.json.rating2);
    self.reason2 = ko.observable(self.json.reason2);
    self.date_of_event = ko.observable(self.json.date_of_event);
    self.natural_sound = ko.observable(self.json.natural_sound);
    self.upload_time = ko.observable(self.json.upload_time);
    self.reason3 = ko.observable(self.json.reason3);
    self.rating3 = ko.observable(self.json.rating3);
    self.ObjectID = ko.observable(self.json.ObjectID);
    self.shots = ko.observableArray([]);
    self.isNew = ko.observable(self.json.isNew);
    self.section = ko.observable(section);
    for (var i = 0; i < self.json.shots.length; i++)
        self.shots.push(new ShotInfo(self, self.json.shots[i]));
    self.keyframes = ko.observableArray([]);
    var kflist = $.map(self.json.keyframes, function (itemS) {
        return new KeyframeInfo(itemS);
    });
    self.keyframes(kflist);
    self.getjson = function () {
        self.json['id'] = self.id();
        self.json['section_id'] = self.section_id();
        self.json['title'] = self.title();
        self.json['description'] = self.description();
        self.json['topic_words'] = self.topic_words();
        self.json['key_words'] = self.key_words();
        self.json['post_picture'] = self.post_picture();
        self.json['time_start'] = self.time_start();
        self.json['time_end'] = self.time_end();
        self.json['rating'] = self.rating();
        self.json['reason'] = self.reason();
        self.json['subtitle'] = self.subtitle();
        self.json['rating2'] = self.rating2();
        self.json['reason2'] = self.reason2();
        self.json['date_of_event'] = self.date_of_event();
        self.json['natural_sound'] = self.natural_sound();
        self.json['upload_time'] = self.upload_time();
        self.json['reason3'] = self.reason3();
        self.json['rating3'] = self.rating3();
        self.json['ObjectID'] = self.ObjectID();
        self.json['isNew'] = self.isNew();
        return self.json;
    };
    self.toSceneInfoJson = function () {
        var jsonString = JSON.stringify(self.getjson());

        jsonString = jsonString.substring(0, jsonString.length - 1);
        var keyframesjsonString = ', "keyframes":[';
        for (var i = 0; i < self.keyframes().length; i++) {
            keyframesjsonString += JSON.stringify(self.keyframes()[i].getjson());
            if (i == self.keyframes().length - 1) keyframesjsonString += "";
            else keyframesjsonString += ",";
        }
        keyframesjsonString += ']';
        jsonString = jsonString + keyframesjsonString;
        var shotsjsonString = ', "shots":[';
        for (var i = 0; i < self.shots().length; i++) {
            shotsjsonString += JSON.stringify((self.shots()[i].toShotInfoJson()));
            if (i == self.shots().length - 1) shotsjsonString += "";
            else shotsjsonString += ",";
        }
        shotsjsonString += ']}';
        jsonString = jsonString + shotsjsonString;
        var json = $.parseJSON(jsonString);
        return json;
    };

}
function SectionInfo(data) {
    var self = this;
    self.json = $.parseJSON(data);
    self.id = ko.observable(self.json.id);
    self.media_id = ko.observable(self.json.media_id);
    self.title = ko.observable(self.json.title);
    self.description = ko.observable(self.json.description);
    self.topic_words = ko.observable(self.json.topic_words);
    self.key_words = ko.observable(self.json.key_words);
    self.post_picture = ko.observable(self.json.post_picture);
    self.section_duty = ko.observable(self.json.section_duty);
    self.time_start = ko.observable(self.json.time_start);
    self.time_end = ko.observable(self.json.time_end);
    self.subtitle = ko.observable(self.json.subtitle);
    self.rating = ko.observable(self.json.rating);
    self.reason = ko.observable(self.json.reason);
    self.title2 = ko.observable(self.json.title2);
    self.class_name = ko.observable(self.json.class_name);
    self.actual_sound = ko.observable(self.json.actual_sound);
    self.program_form = ko.observable(self.json.program_form);
    self.date_time = ko.observable(self.json.date_time);
    self.section_series = ko.observable(self.json.section_series);
    self.rating2 = ko.observable(self.json.rating2);
    self.reason2 = ko.observable(self.json.reason2);
    self.contributor = ko.observable(self.json.contributor);
    self.audio_channel_num = ko.observable(self.json.audio_channel_num);
    self.audio_channel_lan = ko.observable(self.json.audio_channel_lan);
    self.subtitle_num = ko.observable(self.json.subtitle_num);
    self.subtitle_lan = ko.observable(self.json.subtitle_lan);
    self.years_covered = ko.observable(self.json.years_covered);
    self.spatial = ko.observable(self.json.spatial);
    self.source = ko.observable(self.json.source);
    self.data_source_way = ko.observable(self.json.data_source_way);
    self.data_source_man = ko.observable(self.json.data_source_man);
    self.yuzhong = ko.observable(self.json.yuzhong);
    self.years = ko.observable(self.json.years);
    self.awards = ko.observable(self.json.awards);
    self.upload_time = ko.observable(self.json.upload_time);
    self.reason3 = ko.observable(self.json.reason3);
    self.rating3 = ko.observable(self.json.rating3);
    self.creater = ko.observable(self.json.creater);
    self.pcreater = ko.observable(self.json.pcreater);
    self.create_method = ko.observable(self.json.create_method);
    self.create_other_info = ko.observable(self.json.create_other_info);
    self.ObjectID = ko.observable(self.json.ObjectID);
    self.scenes = ko.observableArray([]);
    self.isNew = ko.observable(self.json.isNew);
    for (var i = 0; i < self.json.scenes.length; i++)
        self.scenes.push(new SceneInfo(self, self.json.scenes[i]));

    self.keyframes = ko.observableArray([]);
    var kflist = $.map(self.json.keyframes, function (itemS) {
        return new KeyframeInfo(itemS);
    });
    self.keyframes(kflist);
    self.getjson = function () {
        self.json['id'] = self.id();
        self.json['media_id'] = self.media_id();
        self.json['title'] = self.title();
        self.json['description'] = self.description();
        self.json['topic_words'] = self.topic_words();
        self.json['key_words'] = self.key_words();
        self.json['post_picture'] = self.post_picture();
        self.json['section_duty'] = self.section_duty();
        self.json['time_start'] = self.time_start();
        self.json['time_end'] = self.time_end();
        self.json['subtitle'] = self.subtitle();
        self.json['rating'] = self.rating();
        self.json['reason'] = self.reason();
        self.json['title2'] = self.title2();
        self.json['class_name'] = self.class_name();
        self.json['actual_sound'] = self.actual_sound();
        self.json['program_form'] = self.program_form();
        self.json['date_time'] = self.date_time();
        self.json['section_series'] = self.section_series();
        self.json['rating2'] = self.rating2();
        self.json['reason2'] = self.reason2();
        self.json['contributor'] = self.contributor();
        self.json['audio_channel_num'] = self.audio_channel_num();
        self.json['audio_channel_lan'] = self.audio_channel_lan();
        self.json['subtitle_num'] = self.subtitle_num();
        self.json['subtitle_lan'] = self.subtitle_lan();
        self.json['years_covered'] = self.years_covered();
        self.json['spatial'] = self.spatial();
        self.json['source'] = self.source();
        self.json['data_source_way'] = self.data_source_way();
        self.json['data_source_man'] = self.data_source_man();
        self.json['yuzhong'] = self.yuzhong();
        self.json['years'] = self.years();
        self.json['awards'] = self.awards();
        self.json['upload_time'] = self.upload_time();
        self.json['reason3'] = self.reason3();
        self.json['rating3'] = self.rating3();
        self.json['creater'] = self.creater();
        self.json['pcreater'] = self.pcreater();
        self.json['create_method'] = self.create_method();
        self.json['create_other_info'] = self.create_other_info();
        self.json['ObjectID'] = self.ObjectID();
        self.json['isNew'] = self.isNew();
        for (i in self.json) {
            if (self.json[i] == null)
                self.json[i] = "";
        }
        return self.json;
    };
    self.toSectionInfoJson = function () {
        var jsonString = JSON.stringify(self.getjson());

        jsonString = jsonString.substring(0, jsonString.length - 1);
        var keyframesjsonString = ', "keyframes":[';
        for (var i = 0; i < self.keyframes().length; i++) {
            keyframesjsonString += JSON.stringify(self.keyframes()[i].getjson());
            if (i == self.keyframes().length - 1) keyframesjsonString += "";
            else keyframesjsonString += ",";
        }
        keyframesjsonString += ']';
        jsonString = jsonString + keyframesjsonString;

        var scenesjsonString = ', "scenes":[';
        for (var i = 0; i < self.scenes().length; i++) {
            scenesjsonString += JSON.stringify((self.scenes()[i].toSceneInfoJson()));
            if (i == self.scenes().length - 1) scenesjsonString += "";
            else scenesjsonString += ",";
        }
        scenesjsonString += ']}';
        jsonString = jsonString + scenesjsonString;
        var json = $.parseJSON(jsonString);
        return json;
    };
}


var ProgramViewModel = function ViewModel() {
        var self = this;

        //用于暂存界面上展现的片段层、场景层和镜头层，以及关键帧信息
        self.currentSection = ko.observable();
        self.currentScene = ko.observable();
        self.currentShot = ko.observable();
        self.currentKeyframes = ko.observableArray([]);
        self.currentLayer = ko.observable();

        //每类中的isNew属性用于区别是否新建关键帧或四层信息
        self.isNew = ko.observable();

        self.media_id = ko.observable();
        self.title = ko.observable();
        self.title2 = ko.observable();
        self.title_alter = ko.observable();
        self.media_state = ko.observable();
        self.cataloger = ko.observable();
        self.approver = ko.observable();
        self.id = ko.observable();
        self.description = ko.observable();
        self.class_name = ko.observable();
        self.topic_words = ko.observable();
        self.key_words = ko.observable();
        self.subtitle = ko.observable();
        self.media_duty = ko.observable();
        self.publisher = ko.observable();
        self.audience = ko.observable();
        self.media_column = ko.observable();
        self.source_id = ko.observable();
        self.post_picture = ko.observable();

        self.publish_date = ko.observable();
        self.time_length = ko.observable();
        self.carry_type = ko.observable();
        self.media_format = ko.observable();
        self.additional_logo = ko.observable();
        self.media_series = ko.observable();
        self.media_type = ko.observable();
        self.location = ko.observable();
        self.path = ko.observable();
        self.rating = ko.observable();
        self.reason = ko.observable();
        self.zhishi = ko.observable();
        self.aspect = ko.observable();
        self.audio_format = ko.observable();
        self.source_method = ko.observable();
        self.source_provider = ko.observable();
        self.time_start = ko.observable();
        self.color = ko.observable();
        self.sound_language = ko.observable();
        self.subtitle_language = ko.observable();
        self.media_class = ko.observable();
        self.xintai = ko.observable();
        self.creater = ko.observable();
        self.rating2 = ko.observable();
        self.approver2 = ko.observable();
        self.reason2 = ko.observable();
        self.subordinate_title = ko.observable();
        self.title_description = ko.observable();
        self.series_title = ko.observable();
        self.episodes_totalnum = ko.observable();
        self.episodes_num = ko.observable();
        self.tv_class = ko.observable();
        self.produced_date = ko.observable();
        self.parallel_proper_title = ko.observable();
        self.parallel_series_title = ko.observable();
        self.character = ko.observable();
        self.date_of_event = ko.observable();
        self.version_des = ko.observable();
        self.producer = ko.observable();
        self.name_of_cpo = ko.observable();
        self.cp_statement = ko.observable();
        self.audio_quality = ko.observable();
        self.video_quality = ko.observable();
        self.video_bit_rate = ko.observable();
        self.video_coding_format = ko.observable();
        self.video_sam_type = ko.observable();
        self.isrc = ko.observable();
        self.relations_id = ko.observable();
        self.years_covered = ko.observable();
        self.spatial = ko.observable();
        self.published_date = ko.observable();
        self.cp_statement1 = ko.observable();
        self.yuzhong = ko.observable();
        self.awards = ko.observable();
        self.xilie_name = ko.observable();
        self.class_num = ko.observable();
        self.class_time = ko.observable();
        self.reason3 = ko.observable();
        self.upload_time = ko.observable();
        self.approve_time = ko.observable();
        self.approve2_time = ko.observable();
        self.catalog_times = ko.observable();
        self.approve_times = ko.observable();
        self.approve2_times = ko.observable();
        self.approve3_time = ko.observable();
        self.rating3 = ko.observable();
        self.level = ko.observable();
        self.time_end = ko.observable();
        self.test = ko.observable();
        self.shengdao = ko.observable();
        self.ObjectID = ko.observable();
        self.keyframes = ko.observableArray([]);
        self.sections = ko.observableArray([]);
        self.isNew = ko.observable();
        //当导入串联单时，为界面中加载串联单原文件
        self.pre_catalogfile = ko.observable();
        self.videoFile = ko.observable();
        //服务器中已有串联单文件
        self.pre_catalogfiles = ko.observableArray([]);
        //获取服务器中所有串联单清单
        self.getprecatalogfiles = function (data, event) {
            self.pre_catalogfiles.removeAll();
            $.getJSON("/quickcatalog/getPreCatalogList/", function (item) {
                for (i in item) {
                    self.pre_catalogfiles.push(new PreCatalogFile(item[i]));
                }
            });
        }
        //删除指定串联单文件
        self.delete_pre_catalogfile = function (title, data, event) {
            var json = title();
            $.ajax({
                type: "post",
                url: "/quickcatalog/deletePreCatalogFile/",
                dataType: "text",
                data: json,
                success: function (data) {
                    for (i in self.pre_catalogfiles()) {
                        if (self.pre_catalogfiles()[i].title() == json)
                            self.pre_catalogfiles.remove(self.pre_catalogfiles()[i]);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }

        //切层
        self.addbrotherLayer = function (data, event) {
            if (self.currentLayer == 0)
                return;


            else if (self.currentLayer == 1) {
                var status = $('input[name="addbrotherLayerBtn"]').bootstrapSwitch("state");
                if (status == true) {
                    self.currentSection().time_end(ParseSecondtoTime((document.querySelector('video')).currentTime - ParseTimetoSecond(self.currentSection().time_start())));
                    return;
                }
                var newSection = NewSection(self.id());
                self.currentSection(newSection);
                self.currentKeyframes(null);
                self.sections.push(newSection);
                self.currentLayer = 1;
            }
            else if (self.currentLayer == 2) {
                var status = $('input[name="addbrotherLayerBtn"]').bootstrapSwitch("state");
                if (status == true) {
                    self.currentScene().time_end(ParseSecondtoTime((document.querySelector('video')).currentTime - ParseTimetoSecond(self.currentScene().time_start())));
                    return;
                }
                var newScene = NewScene(self.currentScene().section(), self.currentScene().section_id());
                self.currentScene(newScene);
                self.currentKeyframes(null);
                self.currentScene().section().scenes.push(newScene);
                self.currentLayer = 2;
            }
            else if (self.currentLayer == 3) {
                var status = $('input[name="addbrotherLayerBtn"]').bootstrapSwitch("state");
                if (status == true) {
                    self.currentShot().time_end(ParseSecondtoTime((document.querySelector('video')).currentTime - ParseTimetoSecond(self.currentShot().time_start())));
                    return;
                }
                var newShot = NewShot(self.currentShot().scene(), self.currentShot().scene_id());
                self.currentKeyframes(null);
                self.currentShot(newShot);
                self.currentShot().scene().shots.push(newShot);
                self.currentLayer = 3;
            }
        };

        //子层
        self.addsubLayer = function (data, event) {
            if (self.currentLayer == 3) {
                var status = $('input[name="addsubLayerBtn"]').bootstrapSwitch("state");
                if (status == true) {
                    self.currentShot().time_end(ParseSecondtoTime((document.querySelector('video')).currentTime - ParseTimetoSecond(self.currentShot().time_start())));
                    return;
                }
            }
            else if (self.currentLayer == 0) {
                var newSection = NewSection(self.id());
                self.currentSection(newSection);
                self.currentKeyframes(null);
                self.sections.push(newSection);

            }
            else if (self.currentLayer == 1) {
                var status = $('input[name="addsubLayerBtn"]').bootstrapSwitch("state");
                if (status == true) {
                    self.currentSection().time_end(ParseSecondtoTime((document.querySelector('video')).currentTime - ParseTimetoSecond(self.currentSection().time_start())));
                    return;
                }
                var newScene = NewScene(self.currentSection(), self.currentSection().id());
                self.currentScene(newScene);
                self.currentKeyframes(null);
                self.currentSection().scenes.push(newScene);
                self.currentLayer = 2;
            }
            else if (self.currentLayer == 2) {
                var status = $('input[name="addsubLayerBtn"]').bootstrapSwitch("state");
                if (status == true) {
                    self.currentScene().time_end(ParseSecondtoTime((document.querySelector('video')).currentTime - ParseTimetoSecond(self.currentScene().time_start())));
                    return;
                }
                var newShot = NewShot(self.currentScene(), self.currentScene().id());
                self.currentKeyframes(null);
                self.currentShot(newShot);
                self.currentScene().shots.push(newShot);
                self.currentLayer = 3;
            }

        };


        //点击提交按钮
        self.submit = function (data, event) {
            //todo ajax
            var json = self.ToProgramJson();
            $.ajax({
                type: "post",
                url: "/quickcatalog/saveProgramInfo/",
                dataType: "text",
                data: json,
                success: function (data) {
                    alert(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        };

        //将节目层JSON序列化
        self.ToProgramJson = function () {
            var jsonString = '{"media_id":"' + self.media_id() + '", ' +
                '"title":"' + self.title() + '", ' +
                '"title2":"' + self.title2() + '", ' +
                '"title_alter":"' + self.title_alter() + '", ' +
                '"media_state":"' + self.media_state() + '", ' +
                '"cataloger":"' + self.cataloger() + '", ' +
                '"approver":"' + self.approver() + '", ' +
                '"id":"' + self.id() + '", ' +
                '"description":"' + self.description().replace(/[\r]/g, "\\r").replace(/[\n]/g, "\\n") + '", ' +
                '"class_name":"' + self.class_name() + '", ' +
                '"topic_words":"' + self.topic_words() + '", ' +
                '"key_words":"' + self.key_words() + '", ' +
                '"subtitle":"' + self.subtitle() + '", ' +
                '"media_duty":"' + self.media_duty() + '", ' +
                '"publisher":"' + self.publisher() + '", ' +
                '"audience":"' + self.audience() + '", ' +
                '"media_column":"' + self.media_column() + '", ' +
                '"source_id":"' + self.source_id() + '", ' +
                '"post_picture":"' + self.post_picture() + '", ' +
                '"publish_date":"' + self.publish_date() + '", ' +
                '"time_length":"' + self.time_length() + '", ' +
                '"carry_type":"' + self.carry_type() + '", ' +
                '"media_format":"' + self.media_format() + '", ' +
                '"additional_logo":"' + self.additional_logo() + '", ' +
                '"media_series":"' + self.media_series() + '", ' +
                '"media_type":"' + self.media_type() + '", ' +
                '"location":"' + self.location() + '", ' +
                '"path":"' + self.path() + '", ' +
                '"rating":"' + self.rating() + '", ' +
                '"reason":"' + self.reason() + '", ' +
                '"zhishi":"' + self.zhishi() + '", ' +
                '"aspect":"' + self.aspect() + '", ' +
                '"audio_format":"' + self.audio_format() + '", ' +
                '"source_method":"' + self.source_method() + '", ' +
                '"source_provider":"' + self.source_provider() + '", ' +
                '"time_start":"' + self.time_start() + '", ' +
                '"color":"' + self.color() + '", ' +
                '"sound_language":"' + self.sound_language() + '", ' +
                '"subtitle_language":"' + self.subtitle_language() + '", ' +
                '"media_class":"' + self.media_class() + '", ' +
                '"xintai":"' + self.xintai() + '", ' +
                '"creater":"' + self.creater() + '", ' +
                '"rating2":"' + self.rating2() + '", ' +
                '"approver2":"' + self.approver2() + '", ' +
                '"reason2":"' + self.reason2() + '", ' +
                '"subordinate_title":"' + self.subordinate_title() + '", ' +
                '"title_description":"' + self.title_description() + '", ' +
                '"series_title":"' + self.series_title() + '", ' +
                '"episodes_totalnum":"' + self.episodes_totalnum() + '", ' +
                '"episodes_num":"' + self.episodes_num() + '", ' +
                '"tv_class":"' + self.tv_class() + '", ' +
                '"produced_date":"' + self.produced_date() + '", ' +
                '"parallel_proper_title":"' + self.parallel_proper_title() + '", ' +
                '"parallel_series_title":"' + self.parallel_series_title() + '", ' +
                '"character":"' + self.character() + '", ' +
                '"date_of_event":"' + self.date_of_event() + '", ' +
                '"version_des":"' + self.version_des() + '", ' +
                '"producer":"' + self.producer() + '", ' +
                '"name_of_cpo":"' + self.name_of_cpo() + '", ' +
                '"cp_statement":"' + self.cp_statement() + '", ' +
                '"audio_quality":"' + self.audio_quality() + '", ' +
                '"video_quality":"' + self.video_quality() + '", ' +
                '"video_bit_rate":"' + self.video_bit_rate() + '", ' +
                '"video_coding_format":"' + self.video_coding_format() + '", ' +
                '"video_sam_type":"' + self.video_sam_type() + '", ' +
                '"isrc":"' + self.isrc() + '", ' +
                '"relations_id":"' + self.relations_id() + '", ' +
                '"years_covered":"' + self.years_covered() + '", ' +
                '"spatial":"' + self.spatial() + '", ' +
                '"published_date":"' + self.published_date() + '", ' +
                '"cp_statement1":"' + self.cp_statement1() + '", ' +
                '"yuzhong":"' + self.yuzhong() + '", ' +
                '"awards":"' + self.awards() + '", ' +
                '"xilie_name":"' + self.xilie_name() + '", ' +
                '"class_num":"' + self.class_num() + '", ' +
                '"class_time":"' + self.class_time() + '", ' +
                '"reason3":"' + self.reason3() + '", ' +
                '"upload_time":"' + self.upload_time() + '", ' +
                '"approve_time":"' + self.approve_time() + '", ' +
                '"approve2_time":"' + self.approve2_time() + '", ' +
                '"catalog_times":"' + self.catalog_times() + '", ' +
                '"approve_times":"' + self.approve_times() + '", ' +
                '"approve2_times":"' + self.approve2_times() + '", ' +
                '"approve3_time":"' + self.approve3_time() + '", ' +
                '"rating3":"' + self.rating3() + '", ' +
                '"level":"' + self.level() + '", ' +
                '"time_end":"' + self.time_end() + '", ' +
                '"test":"' + self.test() + '", ' +
                '"shengdao":"' + self.shengdao() + '", ' +
                '"isNew":"' + self.isNew() + '", ' +
                '"ObjectID":"' + self.ObjectID() + '"';

            var keyframesjsonString = ', "keyframes":[';
            for (var i = 0; i < self.keyframes().length; i++) {
                keyframesjsonString += JSON.stringify(self.keyframes()[i].getjson());
                if (i == self.keyframes().length - 1) keyframesjsonString += "";
                else keyframesjsonString += ",";
            }
            keyframesjsonString += ']';
            jsonString = jsonString + keyframesjsonString;

            var sectionjsonString = ', "sections":[';
            for (var i = 0; i < self.sections().length; i++) {
                sectionjsonString += JSON.stringify((self.sections()[i].toSectionInfoJson()));
                if (i == self.sections().length - 1) sectionjsonString += "";
                else sectionjsonString += ",";
            }
            sectionjsonString += ']}';
            jsonString = jsonString + sectionjsonString;
            var json = $.parseJSON(jsonString);
            return jsonString;

        };

//截取关键帧图像信息，编码方式为jpeg，并保存在相应的层中。
        self.catchKeyframePic = function (data, event) {
            var id = 0;
            if (self.currentLayer == 0) {
                id = self.id();
            }
            else if (self.currentLayer == 1) {
                id = self.currentSection().id();
            }
            else if (self.currentLayer == 2) {
                id = self.currentScene().id();
            }
            else if (self.currentLayer == 3) {
                id = self.currentShot().id();
            }
            self.currentKeyframes.push(NewKeyframe(self.currentLayer, id));
        };
//删除层次信息
        self.deleteLayer = function (data, event) {
            if (self.currentLayer == 0) return;
            else if (self.currentLayer == 1) {
                if (self.currentSection().isNew() == "True")
                    self.sections.remove(self.currentSection())
                else {
                    id = self.currentSection().id();
                    $.ajax({
                        type: "post",
                        url: "/quickcatalog/deleteSectionInfo/",
                        dataType: "text",
                        data: id.toString(),
                        success: function (data) {
                            self.sections.remove(self.currentSection());
                            alert(data);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        }
                    });
                }
            }
            else if (self.currentLayer == 2) {
                if (self.currentScene().isNew() == "True")
                    self.currentScene().section().scenes.remove(self.currentScene());
                else {
                    id = self.currentScene().id();
                    $.ajax({
                        type: "post",
                        url: "/quickcatalog/deleteSceneInfo/",
                        dataType: "text",
                        data: id.toString(),
                        success: function (data) {
                            self.currentScene().section().scenes.remove(self.currentScene());
                            alert(data);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        }
                    });
                }
            }
            else if (self.currentLayer == 3) {
                if (self.currentShot().isNew() == "True")
                    self.currentShot().scene().shots.remove(self.currentShot())
                else {
                    id = self.currentShot().id();
                    $.ajax({
                        type: "post",
                        url: "/quickcatalog/deleteShotInfo/",
                        dataType: "text",
                        data: id.toString(),
                        success: function (data) {
                            self.currentShot().scene().shots.remove(self.currentShot());
                            alert(data);

                            //$("#programTreeHead").trigger("click")
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        }
                    });
                }
            }
            self.changeToOtherLayer(0, self, event)
        };
//获取节目层编目信息。type==0时，代表串联单解析，type==1时，代表从数据库中读取。
        self.getprograminfo = function (type, data, event) {
            self.currentLayer = 0;
            var video = document.querySelector('video');
            var videolength = ParseSecondtoTime(video.duration);
            if (type == 0) {
                title = data();
                self.videoFile("http://10.1.70.88/" + title.split('.')[0] + ".mp4");
                $('#player_html5_api').attr("src", self.videoFile());
                queryString = "/quickcatalog/getPreCatalogDetail/?title=" + title;
                $.ajax({
                    type: "post",
                    url: "/quickcatalog/getPreCatalogFile/",
                    dataType: "text",
                    data: title,
                    success: function (item) {
                        self.pre_catalogfile($.parseJSON(item).content);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
                //切换到串联单页面
                $.ChangeToPreCatalogContentPage(1);
                $('#myModal').modal("hide");
            }
            else if (type == 1) {
                queryString = "/quickcatalog/30485/programinfo/";
                //切换到关键帧预览页面
                $.ChangeToPreCatalogContentPage(0);
            }

            $.getJSON(queryString, function (item) {
                self.isNew(item.isNew);
                self.media_id(item.media_id);
                self.title(item.title);
                self.title2(item.title2);
                self.title_alter(item.title_alter);
                self.media_state(item.media_state);
                self.cataloger(item.cataloger);
                self.approver(item.approver);
                self.id(item.id);
                self.description(item.description);
                self.class_name(item.class_name);
                self.topic_words(item.topic_words);
                self.key_words(item.key_words);
                self.subtitle(item.subtitle);
                self.media_duty(item.media_duty);
                self.publisher(item.publisher);
                self.audience(item.audience);
                self.media_column(item.media_column);
                self.source_id(item.source_id);
                self.post_picture(item.post_picture);
                self.post_picture(item.post_picture);
                self.publish_date(item.publish_date);
                self.time_length(item.time_length);
                self.carry_type(item.carry_type);
                self.media_format(item.media_format);
                self.additional_logo(item.additional_logo);
                self.media_series(item.media_series);
                self.media_type(item.media_type);
                self.location(item.location);
                self.path(item.path);
                self.rating(item.rating);
                self.reason(item.reason);
                self.zhishi(item.zhishi);
                self.aspect(item.aspect);
                self.audio_format(item.audio_format);
                self.source_method(item.source_method);
                self.source_provider(item.source_provider);
                self.time_start(item.time_start);
                self.color(item.color);
                self.sound_language(item.sound_language);
                self.subtitle_language(item.subtitle_language);
                self.media_class(item.media_class);
                self.xintai(item.xintai);
                self.creater(item.creater);
                self.rating2(item.rating2);
                self.approver2(item.approver2);
                self.reason2(item.reason2);
                self.subordinate_title(item.subordinate_title);
                self.title_description(item.title_description);
                self.series_title(item.series_title);
                self.episodes_totalnum(item.episodes_totalnum);
                self.episodes_num(item.episodes_num);
                self.tv_class(item.tv_class);
                self.produced_date(item.produced_date);
                self.parallel_proper_title(item.parallel_proper_title);
                self.parallel_series_title(item.parallel_series_title);
                self.character(item.character);
                self.date_of_event(item.date_of_event);
                self.version_des(item.version_des);
                self.producer(item.producer);
                self.name_of_cpo(item.name_of_cpo);
                self.cp_statement(item.cp_statement);
                self.audio_quality(item.audio_quality);
                self.video_quality(item.video_quality);
                self.video_bit_rate(item.video_bit_rate);
                self.video_coding_format(item.video_coding_format);
                self.video_sam_type(item.video_sam_type);
                self.isrc(item.isrc);
                self.relations_id(item.relations_id);
                self.years_covered(item.years_covered);
                self.spatial(item.spatial);
                self.published_date(item.published_date);
                self.cp_statement1(item.cp_statement1);
                self.yuzhong(item.yuzhong);
                self.awards(item.awards);
                self.xilie_name(item.xilie_name);
                self.class_num(item.class_num);
                self.class_time(item.class_time);
                self.reason3(item.reason3);
                self.upload_time(item.upload_time);
                self.approve_time(item.approve_time);
                self.approve2_time(item.approve2_time);
                self.catalog_times(item.catalog_times);
                self.approve_times(item.approve_times);
                self.approve2_times(item.approve2_times);
                self.approve3_time(item.approve3_time);
                self.rating3(item.rating3);
                self.level(item.level);
                self.time_end(videolength);
                self.test(item.test);
                self.shengdao(item.shengdao);
                self.ObjectID(item.ObjectID);

                var kflist = $.map(item.keyframes, function (itemS) {
                    return new KeyframeInfo(itemS);
                });
                self.keyframes(kflist);
                self.currentKeyframes(kflist);
                var sectionlist = $.map(item.sections, function (itemS) {
                    return new SectionInfo(itemS);
                });
                self.sections(sectionlist);


                $.ChangeToCatalogTree();
                $.ResetTree();
                $.SetPlayPosition("00:00:00:00");
            });

        };

        self.drawImage = function (param, event) {
            var canvas = document.getElementById('canvas' + param.json.id);
            var context = canvas.getContext('2d');

            var image = new Image();
            image.src = 'data:image/jpeg;base64,' + param.json.keyframe;
            context.drawImage(image, 0, 0, 150, 150);
        };

        self.changeToOtherLayer = function (param, data, event) {
            if (event) {
                if (event.type == "click")
                    var layerDepth = param;
                if (layerDepth == 0) {
                    $("#DetailTabs a[href='#programsTab']").tab("show");
                    self.currentKeyframes(data.keyframes());
                    self.currentLayer = 0;
                    selectText(self.title());
                }
                else if (layerDepth == 1) {
                    $("#DetailTabs a[href='#sectionsTab']").tab("show");
                    self.currentSection(data);
                    self.currentKeyframes(data.keyframes());
                    content = data.title();
                    self.currentLayer = 1;
                    selectText(self.currentSection().title());
                }
                else if (layerDepth == 2) {
                    $('#DetailTabs a[href="#scenesTab"]').tab('show');
                    self.currentScene(data);
                    self.currentKeyframes(data.keyframes());
                    self.currentLayer = 2;
                    selectText(self.currentScene().title());
                }
                else if (layerDepth == 3) {
                    $('#DetailTabs a[href="#shotsTab"]').tab('show');
                    self.currentShot(data);
                    self.currentKeyframes(data.keyframes());
                    self.currentLayer = 3;
                    selectText(self.currentShot().title());
                }
                timestr = data.time_start();
                $.SetPlayPosition(timestr);

            }
        };

        self.deleteKeyframe = function (id, data, event) {
            if (event) {
                if (event.type == "click") {
                    if (event.currentTarget.id == "deleteKeyframeBtn") {
                        $.ajax({
                            type: "post",
                            url: "/quickcatalog/deleteKeyframe/",
                            dataType: "text",
                            data: id.toString(),
                            success: function (result) {
                                self.currentKeyframes.remove(data);
                                alert(result);


                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            }
                        });
                    }
                }
            }
        };


    }
    ;

//新建关键帧
function NewKeyframe(layer, id) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var video = document.querySelector('video');
    context.drawImage(video, 0, 0, 300, 150);
    if (layer == 0) {
        keyframe = '{"id":"' + Math.random() + '","title":"","position":"' + video.currentTime * 10000000 + '","keyframe":"' + canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "") + '","media_id":"' + id + '","section_id":"","scene_id":"","shot_id":"","isNew":"True"}'
    }
    else if (layer == 1) {
        keyframe = '{"id":"' + Math.random() + '","title":"","position":"' + video.currentTime * 10000000 + '","keyframe":"' + canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "") + '","media_id":"","section_id":"' + id + '","scene_id":"","shot_id":"","isNew":"True"}'
    }
    else if (layer == 2) {
        keyframe = '{"id":"' + Math.random() + '","title":"","position":"' + video.currentTime * 10000000 + '","keyframe":"' + canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "") + '","media_id":"","section_id":"","scene_id":"' + id + '","shot_id":"","isNew":"True"}'
    }
    else if (layer == 3) {
        keyframe = '{"id":"' + Math.random() + '","title":"","position":"' + video.currentTime * 10000000 + '","keyframe":"' + canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "") + '","media_id":"","section_id":"","scene_id":"","shot_id":"' + id + '","isNew":"True"}'
    }

    frame = new KeyframeInfo(keyframe);
    return frame;
}
//新建片段层
function NewSection(id) {
    var video = document.querySelector('video');
    var time_start = ParseSecondtoTime(video.currentTime);
    section = '{"id":"' + Math.random() + '", ' +
    '"media_id":"' + id + '", ' +
    '"title":"", ' +
    '"description":"", ' +
    '"topic_words":"", ' +
    '"key_words":"", ' +
    '"post_picture":"", ' +
    '"section_duty":"", ' +
    '"time_start":"' + time_start + '", ' +
    '"time_end":"", ' +
    '"subtitle":"", ' +
    '"rating":"", ' +
    '"reason":"", ' +
    '"title2":"", ' +
    '"class_name":"", ' +
    '"actual_sound":"", ' +
    '"program_form":"", ' +
    '"date_time":"", ' +
    '"section_series":"", ' +
    '"rating2":"", ' +
    '"reason2":"", ' +
    '"contributor":"", ' +
    '"audio_channel_num":"", ' +
    '"audio_channel_lan":"", ' +
    '"subtitle_num":"", ' +
    '"subtitle_lan":"", ' +
    '"years_covered":"", ' +
    '"spatial":"", ' +
    '"source":"", ' +
    '"data_source_way":"", ' +
    '"data_source_man":"", ' +
    '"yuzhong":"", ' +
    '"years":"", ' +
    '"awards":"", ' +
    '"upload_time":"", ' +
    '"reason3":"", ' +
    '"rating3":"", ' +
    '"creater":"", ' +
    '"pcreater":"", ' +
    '"create_method":"", ' +
    '"create_other_info":"", ' +
    '"ObjectID":"", ' +
    '"scenes":"", ' +
    '"keyframes":"", ' +
    '"isNew":"True"}';

    return new SectionInfo(section);
}

//新建场景层
function NewScene(section, section_id) {
    var video = document.querySelector('video');
    var time_start = ParseSecondtoTime(video.currentTime);
    scene = '{"id":"' + Math.random() + '", ' +
    '"section_id":"' + section_id + '", ' +
    '"title":"", ' +
    '"description":"", ' +
    '"topic_words":"", ' +
    '"key_words":"", ' +
    '"post_picture":"", ' +
    '"time_start":"' + time_start + '", ' +
    '"time_end":"", ' +
    '"rating":"", ' +
    '"reason":"", ' +
    '"subtitle":"", ' +
    '"rating2":"", ' +
    '"reason2":"", ' +
    '"date_of_event":"", ' +
    '"natural_sound":"", ' +
    '"upload_time":"", ' +
    '"reason3":"", ' +
    '"rating3":"", ' +
    '"ObjectID":"", ' +
    '"shots":"", ' +
    '"keyframes":"", ' +
    '"isNew":"True"}';
    return new SceneInfo(section, scene);
}

//新建镜头层
function NewShot(scene, scene_id) {
    var video = document.querySelector('video');
    var time_start = ParseSecondtoTime(video.currentTime);
    shot = '{"id":"' + Math.random() + '", ' +
    '"scene_id":"' + scene_id + '", ' +
    '"title":"", ' +
    '"description":"", ' +
    '"topic_words":"", ' +
    '"key_words":"", ' +
    '"post_picture":"", ' +
    '"time_start":"' + time_start + '", ' +
    '"time_end":"", ' +
    '"rating":"", ' +
    '"reason":"", ' +
    '"location":"", ' +
    '"date_time":"", ' +
    '"subtitle":"", ' +
    '"shootway":"", ' +
    '"rating2":"", ' +
    '"sense_range":"", ' +
    '"angle":"", ' +
    '"actual_sound":"", ' +
    '"reason2":"", ' +
    '"upload_time":"", ' +
    '"reason3":"", ' +
    '"rating3":"", ' +
    '"ObjectID":"", ' +
    '"keyframes":"", ' +
    '"isNew":"True"}';
    return new ShotInfo(scene, shot);
}

ko.applyBindings(new ProgramViewModel());


//用于自定义textarea控件
String.prototype.trim2 = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
function F(objid) {
    return document.getElementById(objid).value;
}
function G(objid) {
    return document.getElementById(objid);
}

/********检索串联单并选中内容 刘翌翊添加textarea检索功能 2015.06.02********/
function selectText(searchStr) {
    //传入需要检索的内容存入searchStr

    if (searchStr != "") {
        var textBox = document.getElementById("c2");
        var textStr = textBox.value;
        if (textStr != "") {
            var lines = textStr.split("\n");
            var i = 0;
            while (lines[i].indexOf(searchStr) == '-1') {
                i++;
            }
            textBox.focus();//可根据需要启用
            G('c2').scrollTop = (i - 5) * 20;//此处选取CSS行高计算值为20px
            var start = textStr.indexOf(lines[i]);
            var end = start + lines[i].length;
            textBox.setSelectionRange(start, end);
        }
    }
}


var msgA = ["msg1", "msg2", "msg3", "msg4"];
var c = ["c1", "c2", "c3", "c4"];
var slen = [50, 20000, 20000, 60];//允许最大字数
var num = "";
var isfirst = [0, 0, 0, 0, 0, 0];
function isEmpty(strVal) {
    if (strVal == "")
        return true;
    else
        return false;
}
function isBlank(testVal) {
    var regVal = /^\s*$/;
    return (regVal.test(testVal))
}
function chLen(strVal) {
    strVal = strVal.trim2();
    var cArr = strVal.match(/[^\x00-\xff]/ig);
    return strVal.length + (cArr == null ? 0 : cArr.length);
}
function check(i) {
    var iValue = F("c" + i);
    var iObj = G("msg" + i);
    var n = (chLen(iValue) > slen[i - 1]);
    if ((isBlank(iValue) == true) || (isEmpty(iValue) == true) || n == true) {
        iObj.style.display = "block";
    } else {
        iObj.style.display = "none";
    }
}

function keyUp() {
    var obj = G("c2");
    var str = obj.value;
    str = str.replace(/\r/gi, "");
    str = str.split("\n");
    n = str.length;
    line(n);
}
function line(n) {
    var lineobj = G("li");
    for (var i = 1; i <= n; i++) {
        if (document.all) {
            num += i + "\r\n";
        } else {
            num += i + "\n";
        }
    }
    lineobj.value = num;
    num = "";
}
function autoScroll() {
    var nV = 0;
    if (!document.all) {
        nV = G("c2").scrollTop;
        G("li").scrollTop = nV;
        setTimeout("autoScroll()", 20);
    }
}
if (!document.all) {
    window.addEventListener("load", autoScroll, false);
}
//自定义控件结束


//解析播放器中的时间，由秒转换为00:00:00:00格式，其中，最后一位为帧数。
function ParseSecondtoTime(seconds) {
    var time_start = new Date();
    time_start.setHours(0);
    time_start.setMinutes(0);
    time_start.setSeconds(seconds);
    second = time_start.getSeconds();
    if (second < 10) second = "0" + second;
    var frame = Math.floor((seconds - Math.floor(seconds)) * 25);
    if (frame < 10) frame = "0" + frame;
    minute = time_start.getMinutes();
    if (minute < 10) minute = "0" + minute;
    hours = time_start.getHours();
    if (hours < 10) hours = "0" + hours;
    return time_start = hours + ":" + minute + ":" + second + ":" + frame;

}

//解析播放器中的时间，由00:00:00:00格式转化为秒，其中，最后一位为帧数。
function ParseTimetoSecond(timeStr) {
    strs = timeStr.split(":");
    hours = strs[0];
    minutes = strs[1];
    seconds = strs[2];
    frames = strs[3];
    Second = parseInt(seconds) + (parseInt(hours) * 60 + parseInt(minutes)) * 60 + parseInt(frames) * 40 / 1000.0;
    return Second;

}


