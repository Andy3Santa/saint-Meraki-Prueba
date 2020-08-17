



const path = require('path')
const express= require('express')
const hbs= require('hbs')

const app= express()
const port =process.env.PORT || 3000


//var port = process.env.OVERRIDE_PORT || process.env.PORT || 3000;
//var secret = process.env.SECRET || '333';
var secret =  'Andres123';
//var validator = process.env.VALIDATOR || '45a1cf7d6e72cc672a7712e40e8aff837288eef7';
var validator = '45a1cf7d6e72cc672a7712e40e8aff837288eef7';
//var route = process.env.ROUTE || '/cmx';

// All CMX JSON data will end up here. Send it to a database or whatever you fancy.
// data format specifications: https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#Version_2.0
function cmxData(data) {
	console.log('JSON Feed: ' + JSON.stringify(data, null, 2));
}

//**********************************************************



//directories
const viewsPath= path.join(__dirname,'../templates/views')

const publicDir= path.join(__dirname,'../public')

const publicDirHelp= path.join(__dirname,'../public/help.html')
const partialsPath= path.join(__dirname,'../templates/partials')
// Express Server


var bodyParser = require('body-parser');



// set views
app.set('view engine','hbs')


app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory
app.use(express.static(publicDir))





//
app.use(bodyParser.json({ limit: '25mb' }));


// CMX Location Protocol, see https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#API_Configuration
//

//app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Equipos Conectados',
        name:'Andy'
    })
})



// Meraki asks for us to know the secret
app.get('/about', function(req, res) {
	
	 console.log('Validator = ' + validator);
	 res.status(200).send(validator);

	

});
//
// Getting the flow of data every 1 to 2 minutes
app.post('/help', function(req, res) {
	if (req.body.secret == secret) {

		

		console.log('Secret verified');
		cmxData(req.body);
		res.status(201).send(req.body);
	} else {
		console.log('Secret was invalid');
		res.status(501).send("Secret INvalid");
	}
	
});

// Start server
app.listen(port, function() {
	console.log('CMX Receiver listening on port: ' + port);
});
