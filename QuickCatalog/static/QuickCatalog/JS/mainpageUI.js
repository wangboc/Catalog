/**
 * Created by ho on 2015/5/2.
 */
function KeyframeInfo(data) {
    var self = this;
    self.json = $.parseJSON(data);
    self.id = ko.observable(self.json.id);
    self.title = ko.observable(self.json.title);
    self.keyframe = ko.observable(self.json.keyframe);
    self.position = ko.observable(self.json.position);
    self.media_id = self.json.media_id;
    self.section_id = self.json.section_id;
    self.scene_id = self.json.scene_id;
    self.shot_id = self.json.shot_id;
};
function ShotInfo(data) {
    var self = this;
    self.json = $.parseJSON(data);
    self.id = self.json.id;
    self.scene_id = self.json.scene_id;
    self.title = self.json.title;
    self.description = self.json.description;
    self.topic_words = self.json.topic_words;
    self.key_words = self.json.key_words;
    self.post_picture = self.json.post_picture;
    self.time_start = self.json.time_start;
    self.time_end = self.json.time_end;
    self.rating = self.json.rating;
    self.reason = self.json.reason;
    self.location = self.json.location;
    self.date_time = self.json.date_time;
    self.subtitle = self.json.subtitle;
    self.shootway = self.json.shootway;
    self.rating2 = self.json.rating2;
    self.sense_range = self.json.sense_range;
    self.angle = self.json.angle;
    self.actual_sound = self.json.actual_sound;
    self.reason2 = self.json.reason2;
    self.upload_time = self.json.upload_time;
    self.reason3 = self.json.reason3;
    self.rating3 = self.json.rating3;
    self.ObjectID = self.json.ObjectID;
}
function SceneInfo(data) {
    var self = this;
    self.json = $.parseJSON(data);
    self.id = self.json.id;
    self.section_id = self.json.section_id;
    self.title = self.json.title;
    self.description = self.json.description;
    self.topic_words = self.json.topic_words;
    self.key_words = self.json.key_words;
    self.post_picture = self.json.post_picture;
    self.time_start = self.json.time_start;
    self.time_end = self.json.time_end;
    self.rating = self.json.rating;
    self.reason = self.json.reason;
    self.subtitle = self.json.subtitle;
    self.rating2 = self.json.rating2;
    self.reason2 = self.json.reason2;
    self.date_of_event = self.json.date_of_event;
    self.natural_sound = self.json.natural_sound;
    self.upload_time = self.json.upload_time;
    self.reason3 = self.json.reason3;
    self.rating3 = self.json.rating3;
    self.ObjectID = self.json.ObjectID;
    self.shots = ko.observableArray([]);
    for (var i = 0; i < self.json.shots.length; i++)
        self.shots.push(new ShotInfo(self.json.shots[i]));
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
    self.pcreater = ko.observable(self.json.pccreater);
    self.create_method = ko.observable(self.json.create_method);
    self.create_other_info = ko.observable(self.json.create_other_info);
    self.ObjectID = ko.observable(self.json.ObjectID);
    self.scenes = ko.observableArray([]);
    for (var i = 0; i < self.json.scenes.length; i++)
        self.scenes.push(new SceneInfo(self.json.scenes[i]));
}


var ProgramViewModel = function ViewModel() {
    // Data
    var self = this;
    self.currentSection = ko.observable();
    self.currentScene = ko.observable();
    self.currentShot = ko.observable();
    self.currentKeyframes = ko.observableArray([]);

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
    self.getprograminfo = function () {
        $.getJSON("/quickcatalog/23031/programinfo/", function (item) {
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
            self.time_end(item.time_end);
            self.test(item.test);
            self.shengdao(item.shengdao);
            self.ObjectID(item.ObjectID);

            var kflist = $.map(item.keyframes, function (itemS) {
                return new KeyframeInfo(itemS);
            });
            self.keyframes(kflist);

            var sectionlist = $.map(item.sections, function (itemS) {
                return new SectionInfo(itemS);
            });
            self.sections(sectionlist);

            self.currentSection(self.sections()[0]);


            $.ChangeToCatalogTree();
            $.ResetTree();
        });

    };

    self.drawImage = function (param, event) {
        var canvas = document.getElementById('canvas' + param.json.id);
        var context = canvas.getContext('2d');

        var image = new Image();
        image.src = 'data:image/jpg;base64,' + param.json.keyframe;
        context.drawImage(image, 0, 0, 150, 150);
    };

    self.changeToOtherLayer = function (param, data, event) {
        if (event) {
            var layerDepth = param;
            if (layerDepth == 0) {
                $("#DetailTabs a[href='#programsTab']").tab("show");
            }
            else if (layerDepth == 1) {
                $("#DetailTabs a[href='#sectionsTab']").tab("show");
            }
            else if (layerDepth == 2) {
                $('#DetailTabs a[href="#scenesTab"]').tab('show');
            }
            else if (layerDepth == 3) {
                $('#DetailTabs a[href="#shotsTab"]').tab('show');
            }
        }
    }


};


ko.applyBindings(new ProgramViewModel());


