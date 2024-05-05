// Expressパッケージを使用
const express = require('express')
const app = express()

// MySQLでの接続を確立
const mysql = require('mysql2');

// cssや画像等にpublicを使う
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nishiki522',
  database: 'mydb1'
});


app.set('view engine', 'ejs');




// トップページにtop.ejsファイルを使うことを指定
app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.get('/history', (req, res) => {
  connection.query(
    'select * from weight order by date ASC',
    (error,results) => {
      if (error) {
        console.error('データベースクエリでエラーが発生',error);
        return res.send('データベースクエリでエラーが発生しました');
      }
      res.render('history.ejs',{weights: results});
    }
  )
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO weight (date,bodyweight,bodyfatpar) VALUES (?,?,?)',
    [req.body.itemName1,req.body.itemName2,req.body.itemName3],
    (error, results) => {
      res.redirect('/history');
    }
  );
});


app.listen(8000, () => console.log('This is nodetest.'))
