//console.log('hello world') 

const express = require('express');
const app = express();
const schema = require('./db_schema/schema.js');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

mongoose.connect("mongodb+srv://user200:temp12345@cluster0.wcy5m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
	console.log('Database connected');
}).catch((error)=>{
	console.log('error ',error);
});

app.post('/submit',async(req, res)=>{
	try{
		res.write(`<h1>your username is ${req.body.username} and password is ${req.body.password}</h1>`);
		console.log(req.body);
		const product = await schema.create(req.body);
		//res.status(200).json(product);
	} catch(error){
		res.status(500).json({message:error.message});
	}	
	res.end();
});

app.get('/submit', async(req,res)=>{
	try{
		const scheme = await schema.find({});
		res.status(200).json(scheme);
	}catch(error){
		res.status(500).json({message:error.message});
	}

});

app.get('/',(req,res)=>{
	res.setHeader('Content-Type','text/html');
	res.send(`<form action="/submit" method="POST">
	<label>USERNAME</label>
	<input type='text' name="username" placeholder='ENTER USERNAME' required></input>
	<br><br>
	<label>PASSWORD</label>
	<input type='password' name="password" placeholder='ENTER PASSWORD' required></input>
	<br><br>
	<button type="submit">submit</button>
	</form>`);
});

app.listen(3000,()=>{
	console.log("HELLO WORLD");
});
