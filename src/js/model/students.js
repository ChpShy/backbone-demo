
define(['./student'], function (student) {
    var students = Backbone.Collection.extend({
        model: student,

        //本地数据库，用到backbone-localstorage.js
        localStorage:new Backbone.LocalStorage("Students-Table"),

        nextId: function () {
            console.log(this.length);
            if(this.length == 0) {
                console.log("stus.length == 0");
                return 1;
            }else {
                console.log("stus.length == " + this.length);
                return parseInt(this.last().get('id'))+1;
            }
        }
    });
    return students;
    // var students = new students;
});