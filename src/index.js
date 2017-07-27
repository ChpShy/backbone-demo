var $ = require('jquery');
var dialogTemp = require('./js/template/dialog.art');
var trTemp = require('./js/template/tr.art');

require(['./js/model/students','./js/model/student'], function (students, student) {
    // var stu = new student;
    var stus = new students;

    var indexView = Backbone.View.extend({
        el: '#content',

        template: _.template($("#init-template").html()),

        initialize: function () {},

        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });
    var indexView = new indexView;

    var schoolView1 = Backbone.View.extend({
        el: $("#content"),

        template: _.template($("#one-template").html()),

        events: {
            "click .wrapper .add": "toAdd",
            "click tr td span[data-type=edit]": "toEdit",
            "click tr td span[data-type=del]": "toDel"
        },

        initialize:function(){
            this.listenTo(stus, "add", this.render);
            this.listenTo(stus, "remove", this.render);
            this.listenTo(stus, "change", this.render);
            // this.listenTo(stus, "reset", this.render);
            stus.fetch();
        },

        render: function () {
            this.$el.html(this.template({list: stus.models, len: stus.length}));
            return this;
        },

        filter: function (id) {
            var selectedId= id;
            return _.filter(stus.models, function (model) {
                return selectedId == model.id;
            })
        },

        nextId: function () {
            return stus.nextId();
        },

        toAdd: function (event) {
            var id = this.nextId();
            editView.render({title:"新增", id:id});
        },

        toEdit: function (event) {
            var id = $(event.currentTarget).closest("tr").children("td")[0].innerText;
            var name = $(event.currentTarget).closest("tr").children("td")[1].innerText;
            var cla = $(event.currentTarget).closest("tr").children("td")[2].innerText;
            editView.render({title:"编辑", id:id, name: name, cla: cla});
        },

        toDel: function (event) {
            var id = $(event.currentTarget).closest("tr").children("td")[0].innerText;
            layer.confirm("确认删除id="+id+"的学员信息?", {title:"删除"}, function (index) {
                _.invoke(schoolView1.filter(id), 'destroy');
                console.log("id="+id+"的学员信息删除成功~");
                layer.close(index);
            });
            // stus.models[0].destroy();
            //remove不会删除请求服务器
            // stus.remove({id: id, name: name, cla: cla});
        }
    });
    var schoolView1 = new schoolView1;

    var schoolView2 = Backbone.View.extend({
        el: $("#content"),

        template: _.template($("#two-template").html()),

        initialize:function(){},

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    var schoolView2 = new schoolView2;

    var schoolView10 = Backbone.View.extend({
        el: $("#content"),

        template: _.template($("#ten-template").html()),

        initialize:function(){},

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    var schoolView10 = new schoolView10;

    var editView = Backbone.View.extend({
        el: '#dialog',

        // template: _.template($("#edit-template").html()),

        events: {
            "click .dialog-wrapper .footer button.sure": "submit",
            "click .dialog-wrapper .footer button.close": "close"
        },

        initialize:function(){},

        render: function (context) {
            this.$el.html(_.template(dialogTemp(context)));
            return this;
        },

        submit: function (event) {
            var id = $(event.delegateTarget).find("input[name='id']").val();
            var name = $(event.delegateTarget).find("input[name='name']").val();
            var cla = $(event.delegateTarget).find("input[name='cla']").val();
            //id == stus.length + 1 表示增加，往集合中添加model
            //id == stus.length 表示编辑，修改model
            if(id == schoolView1.nextId()) {
                // stu.save({id: stus.length+1, name: name, cla: cla});
                //往集合中添加model
                console.log("增加操作");
                stus.create({id: id, name: name, cla: cla});
            }else {
                //修改模型
                schoolView1.filter(id)[0].save({name: name, cla: cla});
            }

            this.$el.children().remove();
        },

        close: function (event) {
            this.$el.children().remove();
        }
    });
    var editView = new editView;

    //定义routes
    var schoolRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "c1": "classOf1",
            "c2": "classOf2",
            "c10": "classOf10",
            "*actions": "defaultRouter"
        },

        index: function () {
            indexView.render();
            // alert("1")
        },

        classOf1: function () {
            schoolView1.render();
        },

        classOf2: function () {
            schoolView2.render();
        },

        classOf10: function () {
            schoolView10.render();
        },

        defaultRouter: function (actions) {
            console.log(actions);
            //相当于重定向，手动跳往另一个路由
            this.navigate("", {trigger: true});
        }
    });
    var schoolRouter = new schoolRouter({});
    //手动创建路由
    schoolRouter.route("c0/:pageNo/:pageSize","page", function (pageNo, pageSize) {
        console.log(pageNo + pageSize);
        //关闭路由监听
        // Backbone.history.stop();
    });
    //监听路由事件，在index路由执行完成之后执行
    schoolRouter.on("route:index", function () {
        // alert("2");
    });

    Backbone.history.start();
});

/*
$(function(){


    //定义model

    /!*var schoolModel = Backbone.Model.extend({
     //默认值
     defaults: function () {
     return {
     id: schoolColl.length+1,
     name: "",
     old: "",
     class: ""
     }
     }
     });*!/
    //定义collection
    /!*var schoolColl = Backbone.Collection.extend({

     });*!/

    //定义view
    var indexView = Backbone.View.extend({
        el: '#content',

        template: _.template($("#init-template").html()),

        initialize: function () {},

        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });
    var indexView = new indexView;

    var schoolView1 = Backbone.View.extend({
        el: $("#content"),

        template: _.template($("#one-template").html()),
        
        events: {
            "click .wrapper .add": "toAdd",
            "click tr td span[data-type=edit]": "toEdit",
            "click tr td span[data-type=del]": "toDel"
        },

        initialize:function(){},

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        toAdd: function (event) {
            editView.render({title:"新增"});
        },

        toEdit: function (event) {
            editView.render({title:"编辑"});
        },

        toDel: function (event) {
        }
    });
    var schoolView1 = new schoolView1;

    var schoolView2 = Backbone.View.extend({
        el: $("#content"),

        template: _.template($("#two-template").html()),

        initialize:function(){},

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    var schoolView2 = new schoolView2;

    var schoolView10 = Backbone.View.extend({
        el: $("#content"),

        template: _.template($("#ten-template").html()),

        initialize:function(){},

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    var schoolView10 = new schoolView10;

    var editView = Backbone.View.extend({
        el: '#dialog',

        // template: _.template($("#edit-template").html()),

        events: {
            "click .dialog-wrapper .footer button.sure": "submit",
            "click .dialog-wrapper .footer button.close": "close"
        },

        initialize:function(){},

        render: function (context) {
            this.$el.html(_.template(dialogTemp(context)));
            return this;
        },

        submit: function (event) {

        },

        close: function (event) {
            this.$el.children().remove();
        }
    });
    var editView = new editView;

    //定义routes
    var schoolRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "c1": "classOf1",
            "c2": "classOf2",
            "c10": "classOf10",
            "*actions": "defaultRouter"
        },

        index: function () {
            indexView.render();
            // alert("1")
        },

        classOf1: function () {
            schoolView1.render();
        },

        classOf2: function () {
            schoolView2.render();
        },

        classOf10: function () {
            schoolView10.render();
        },

        defaultRouter: function (actions) {
            console.log(actions);
            //相当于重定向，手动跳往另一个路由
            this.navigate("", {trigger: true});
        }
    });
    var schoolRouter = new schoolRouter({});
    //手动创建路由
    schoolRouter.route("c0/:pageNo/:pageSize","page", function (pageNo, pageSize) {
        console.log(pageNo + pageSize);
        //关闭路由监听
        // Backbone.history.stop();
    });
    //监听路由事件，在index路由执行完成之后执行
    schoolRouter.on("route:index", function () {
        // alert("2");
    });

    Backbone.history.start();
});*/
