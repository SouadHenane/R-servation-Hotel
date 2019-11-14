var mongoose=require('mongoose');
var express=require("express");

var bodyParser=require("body-parser");
var app=express();
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use('/template', express.static(__dirname + '/template'));

app.use('/js', express.static(__dirname + '/js'));

app.use('/img', express.static(__dirname + '/img'));

//app.use('/css', express.static(__dirname + '/css'));

var bp=bodyParser.urlencoded({extended:false});

var db=mongoose.connect("mongodb://localhost:27017/mesHoetls");

var monSchema=mongoose.Schema({nom : String});

var hotel=mongoose.model('hotel',monSchema);



app.get('/',function(req,res){res.sendFile(__dirname+"/main.html");});

app.get('/add',function(req,res){res.sendFile(__dirname+"/template/formulaire.html");});

app.post('/ajout',bp,function(req,res){
	
	var nom=req.body.nom;

	var u= new hotel({nom:nom});
    u.save();
	res.redirect('/hotels');
});

app.get("/edit",function(req,res){
	hotel.find().then(function(hs){
		res.render('edit.ejs',{hotels:hs});
	});

});

app.get("/hotels",function(req,res){
    hotel.find().then(function(hs){
        res.render('hotels.ejs',{hotels:hs});
    });

});

app.post('/mod',bp,function(req,res){
	var id=req.body.id;
	var nom=req.body.nom;
	hotel.findById(id). then (function (u){
      u.nom=nom;
      u.save(); 
	  res.redirect('/edit');
	});
	
});

app.post('/sup',bp,function(req,res){
	var id=req.body.id;
	hotel. findByIdAndRemove(id). then (function (p){
         console.log(p+ "supprimé");
		 res.redirect('/edit');
});

});

app.post('/login',bp,function(req,res){

    res.redirect('/hotels');
});

app.post('/reserve',bp,function(req,res){

    res.redirect('/edit');
});


app.listen(3001);
console.log('Serveur lance sur le port 3001');






