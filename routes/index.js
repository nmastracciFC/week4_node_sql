var express = require('express');
var router = express.Router();
var connect = require('../utils/sqlConnect');
var bodyParser = require('body-parser');
var config = require('../config');


var toRender = (config.kidsmode) ? 'main_kids' : 'home';

//MIDDLEWARE

//parse request, make sure we can convert incoming data into somethign express can use 
router.use(bodyParser.urlencoded({extended:false}));//if it's not form encoded then it will pass through and parse it into a plain object
router.use(bodyParser.json());

router.use((req,resp,next) => {
	//on EVERY incoming request GET POST DELETE... this can santize or examine.. this wioll time stamp though
	var now = new Date();
	var timestamp = now.toLocaleString('en-us', {
		hour: "numeric",
		minute: "numeric",
		hour12: true
	});

	console.log(`you made a ${req.method} call!`);//these consoles are in the terminal
	console.log(`you made the call at ${timestamp}`);
	// console.log(req);
	next();//run the next method like get or post
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('home', { title: 'Car Project', message: 'I love mini coopers' });

  res.render(toRender, { 
  	title: 'Car Project', 
  	message: 'I love mini coopers',
  	mainpage:true,
  	kidsmode: config.kidsmode
  });
});

// Get a car data
router.get('/getCars', function(req, res, next){
	connect.query('SELECT * FROM mainmodel', (err, result) => {
		if(err) {
			throw err;
			console.log(err);
			} else {
				console.log(result);
				res.render('cars', {
					title: 'Mini Cars',
					message: 'A selection of Minis',
					mainheading: 'This is the info about cars',
					carData: result
				});
			}
		});
	});


//GET ONE API

// router.get('/api/:id', function(req, res, next) {
//   console.log(req.params.id);
//   console.log("this works");
//   connect.query(`SELECT * FROM mainmodel WHERE model="${req.params.id}"`, (err, result) => {
// 		if(err) {
// 			throw err;
// 			console.log(err);
// 			} else {
// 				// console.log(result);
// 				// res.json({carData: result});
// 				res.render('onecar',{
// 					carData: result
// 				});
// 			}
// 		});

// 	});

//DELETE ONE API
// router.delete('/api/:id', (req, res) => {
// 	console.log("hit the delete route");
// 	console.log(req.params.id);
// 	connection.query(`DELETE FROM mainmodel WHERE model="${req.params.id}"`, (err, result) => {
// 		if(err) {
// 			console.log(err);
// 			throw(err);
// 		} else {
// 			res.json(result);
// 		}
// 	});
// });


//POST ONE
router.post('/api/:id', (req, res, next) => {
	console.log(`hit the post route`);
	// console.log(`hit the post route with this ${req.params.id}`);
	connect.query(`INSERT INTO mainmodel (id, model, modelName, pricing, modelDetails, imgPath) VALUES (NULL, "${req.body.model}", "${req.body.modelName}", "${req.body.pricing}", "${req.body.modelDetails}", "${req.body.imgPath}");`, (err, data)=>{
		if (err){
			throw(err);
		} else {
			res.json(data);
		}
	});

});

module.exports = router;
