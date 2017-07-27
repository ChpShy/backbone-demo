
define(function () {

    var student = Backbone.Model.extend({
        // url: "www.baidu.com",
        //默认值
        defaults: function () {
            return {
                id: 0,
                name: "1",
                cla: "1"
            }
        },

        initialize:function(){}
    });
    return student;
    // var student = new student;
});