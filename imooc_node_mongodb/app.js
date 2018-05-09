var express = require('express');
var app = express();

var port = process.env.PORT || 3001;
app.listen(port);
console.log("your imooc_movie project is listening port:" + port);

var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imooc_movie');
console.log('MongoDB connect success!');

var serveStatic = require('serve-static');  // 静态文件处理
app.use(serveStatic('public')); // 路径：public

app.set('views', './views/pages');
app.set('view engine', 'jade');

// var movie = require

// 首页
app.get('/', function (req, res) {
  res.render('index', {
    title: '首页',
    movies: {
      "title": "电影名称",
      "doctor": "导演"
    }
  })
});

// 列表页
app.get('/admin/list', function (req, res) {
  res.render('list', {
    title: '列表页',
    movies: [{
        "_id" : 123,
        "doctor" : "导演",
        "title" : "名字",
        "country" : "中国",
        "language" : "中文",
        "year" : 2018,
        "poster" : "https://movie.douban.com/subject/26683723/?from=showing",
        "summary" : "jianjie",
        "flash" : "http://player.youku.com/embed/XMzU2ODM2NDk4NA==",
        "meta" : {
          "updateAt" : "创建时间",
          "createAt" : "更新时间"
        }
      }
      ,{
        "_id" : 123,
        "doctor" : "导演",
        "title" : "名字",
        "country" : "中国",
        "language" : "中文",
        "year" : 2018,
        "poster" : "https://movie.douban.com/subject/26683723/?from=showing",
        "summary" : "jianjie",
        "flash" : "http://player.youku.com/embed/XMzU2ODM2NDk4NA==",
        "meta" : {
          "updateAt" : "创建时间",
          "createAt" : "更新时间"
        }
      }
    ]
  })
});

// 录入页和修改页
app.get('/admin', function (req, res) {
  res.render('admin', {
    title: "录入页"
  })
});


// 详情页
app.get('/movie/:id', function (req, res) {
  res.render('detail', {
    title: "详情页"
  })
});