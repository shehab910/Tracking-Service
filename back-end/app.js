var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var Item=require("./models/Item");

var app = express();

//DB connection 

mongoose.connect(
  process.env.MONGO_URI,
  (err) => {
  if(err) console.log(err) 
  else console.log("MongoDB connected");
  }
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

require("dotenv").config()

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler

// app.use(function(req, res, next) {
//   next(createError(404));
// });





// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



app.get('/items',(req,res)=>{res.render('items.ejs'); })

app.post('/items', (req,res)=>{

try {
  //name, link, picSrc, price
  const {name,link,picSrc,price}=req.body;
  console.log(name,link,picSrc,price)

  let ts = Date.now();

let date_ob = new Date(ts);
let day = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

const item=new Item({
    name:name,
    itemLink:link,
    picture: picSrc,
    price:price,
    time:`${day}-${month}-${year}` 
  })
 item.save()
 .then(console.log("items saved to Database"))



}catch(err){
      console.log(err)
}
});












const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;
