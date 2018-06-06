let express = require('express');
let app = express();

let port = process.env.PORT || 3001;
app.listen(port);
console.log("your imooc_movie project is listening port:" + port);

let path = require('path');


let serveStatic = require('serve-static');  // 静态文件处理
app.use(serveStatic('public')); // 路径：public

app.set('views', './views/pages');
app.set('view engine', 'jade');


let bodyParser = require('body-parser');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({extended: true}));

// 连接数据库mysql
let mysql  = require('mysql');

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port: '3306',
  database: 'node',
});

connection.connect();


// 首页
app.get('/', function (req, res) {
  let sql = 'select * from movie';
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[mysql ERROR]' + err);
      return;
    } else {
      res.render('index', {
        title: '首页',
        movies: result
      });
    }
  });
});

// 列表页
app.get('/admin/list', function (req, res) {
  let sql = 'select * from movie';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[mysql ERROR] - ',err.message);
      return;
    } else {
      res.render('list', {
        title: '列表页',
        movies: result
      });
    }
  });
});

// 录入页和修改页
app.get('/admin', function (req, res) {
  res.render('admin', {
    title: "录入页",
    movie: {
      "doctor" : "导演",
      "title" : "名字",
      "country" : "中国",
      "language" : "中文",
      "year" : 2018,
      "poster" : "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2520372116.webp",
      "summary" : "jianjie",
      "flash" : "http://vt1.doubanio.com/201806061059/cbf27c263e1d34924dfea9ba2be9f601/view/movie/M/402310606.mp4",
      "meta" : {
        "updateAt" : "创建时间",
        "createAt" : "更新时间"
      }
    },
  })
});

// admin update movie 后台更新页
app.get('/admin/update/:id', function (req, res) {
  let id = req.params.id;
  if (id) {
    let sql = 'select * from movie where Id = ' + id;
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      console.log('读取一条电影数据');
      res.render('admin', {
        title: '后台更新页',
        movie: result[0]
      })
    });
  }
});

// 详情页
app.get('/movie/:id', function (req, res) {
  let id = req.params.id;
  let  sql = 'SELECT * FROM movie where Id = ' + id ;
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    console.log('读取一条电影数据');
    res.render('detail', {
      title: '详情页',
      movie: result[0]
    })
  });
});

// 录入页表单提交
app.post('/admin/movie/new', function (req, res) {
  let id = req.body.movie.Id;
  let movieObj = req.body.movie;
  if (id !== 'undefined') { // 已经存在的电影数据,更新数据库
    let  addSql = 'update movie set doctor = ?, title = ?, country = ?, language = ?, year = ?, poster = ?, summary = ?, flash = ? where Id = ' + id;
    let  addSqlParams = [movieObj.doctor, movieObj.title, movieObj.country, movieObj.language, movieObj.year, movieObj.poster, movieObj.summary, movieObj.flash];


    connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      console.log('更新数据库成功');
      res.redirect('/movie/' + id);
    });
  } else {  // 新加的电影
    let  addSql = 'INSERT INTO movie(doctor,title,country,language,year,poster,summary,flash) VALUES(?,?,?,?,?,?,?,?)';
    let  addSqlParams = [movieObj.doctor, movieObj.title, movieObj.country, movieObj.language, movieObj.year, movieObj.poster, movieObj.summary, movieObj.flash];
    console.log('--------'+movieObj.summary);
    return;
    connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
      }
      console.log('录入数据库成功');
      id = result.insertId;
      res.redirect('/movie/' + id);
    });
  }
});

// 删除电影列表的数据
app.delete('/admin/list', function (req, res) {
  let id = req.query.id;
  if(id) {
    let sql = 'delete from movie where id = ' + id;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[mysql ERROR]' + err);
        return;
      } else {
        console.log('删除一条数据：' + id);
        res.json({success: 1});
      }
    })
  }
});
// app.get('/test', function (req, res) {
//   res.sendfile('views/pages/test.html', {
//
//   })
// });