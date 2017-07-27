
define(['./student'], function (student) {
    var students = Backbone.Collection.extend({
        model: student,

        //本地数据库，用到backbone-localstorage.js
        localStorage:new Backbone.LocalStorage("Students-Table")
    });
    return students;
    // var students = new students;
});