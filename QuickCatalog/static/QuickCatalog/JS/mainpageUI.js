/**
 * Created by ho on 2015/5/2.
 */
function ProgramViewModel() {
    // Data
    var self = this;
    self.id = ko.observable();
    self.title = ko.observable();

    self.getprograminfo = function () {
        $.getJSON("/quickcatalog/23031/programinfo/", function (item) {
            self.id(item.id);
            self.title(item.title);
        });
    };

    // Show inbox by default
    //self.goToFolder('Inbox');
}

ko.applyBindings(new ProgramViewModel());

