const express 	= require('express');
const hbs 		= require('hbs');
const fs		= require('fs');

const port 		= process.env.PORT || 3000;
var app 		= express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		console.log('Unable to append server.log');
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

var currentYear = new Date().getFullYear();

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: currentYear, 
		welcome: 'Welcome to the website',
	});
}); 

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page', 
		currentYear: currentYear, 
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: [
			'Failed to find page'
		]
	});
});

app.listen(port, () => {
	console.log(`Server is up on Port ${port}`);
});