var $ = require('jquery');


$(function(){


    //定义model

    //定义collection

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

        initialize:function(){},
        
        render: function () {
            this.$el.html(this.template());
            return this;
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
        Backbone.history.stop();
    });
    //在index路由执行完成之后执行
    schoolRouter.on("route:index", function () {
        // alert("2");
    });

    Backbone.history.start();
});