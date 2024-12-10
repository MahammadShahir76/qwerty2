const express = require('express')
require('./db/Config')
const app= express();
const cors=require('cors');
app.use(express.json());
app.use(cors());
const ProviderInfo=require("./db/ProviderInfo")
const TakerInfo=require("./db/TakerInfo");
const ServiceReview = require('./db/ServiceReview');
const User=require("./db/User");
const VideoTaker = require('./db/VideoTaker');

app.post('/add-ProviderInfo',async(req,resp)=>{
    let providerInfo=new ProviderInfo(req.body)//Book here is the model name
    let result=await providerInfo.save();
    resp.send(result)
})

app.post('/add-TakerInfo',async(req,resp)=>{
    let takerinfo=new TakerInfo(req.body)//Book here is the model name
    let result=await takerinfo.save();
    resp.send(result)
})

app.get("/search/:key",async (req,resp)=>{
    let result=await TakerInfo.find({
        "$or":[
            {ServiceCategory:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

app.get("/search1/:key",async (req,resp)=>{
    let result=await ProviderInfo.find({
        "$or":[
            {ServiceCategory:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

app.post('/add-review',async(req,resp)=>{
    let serviceReview=new ServiceReview(req.body)//Book here is the model name
    let result=await serviceReview.save();
    resp.send(result)
})

app.get('/overview',async(req,resp)=>{
    let servicereview=await ServiceReview.find();
    if(servicereview.length>0){
        resp.send(servicereview)
    }else{
        resp.send({candidate:"No reviews found"})
    }
})

app.post("/register",async(req,resp)=>{//used in the signup page
    let user=new User(req.body);//User here is the model
    let result=await user.save();
    // console.log(req.body) use this to see the output
    resp.send(result)
})


app.post("/login",async (req,resp)=>{
    if(req.body.password&&req.body.email){
        let user=await User.findOne(req.body).select("-password");// This is a common security practice because passwords should not be sent to clients or logged unnecessarily.
        if(user){
            resp.send(user)
        }else{
            resp.send({result:"No User Found"})
        }
    }else{
        resp.send({result:"no main user found"})
    }
})

app.post('/add-VideoTakerInfo',async(req,resp)=>{
    let videotaker=new VideoTaker(req.body)//Book here is the model name
    let result=await videotaker.save();
    resp.send(result)
})

app.get('/VideoOverview',async(req,resp)=>{
    let videotaker=await VideoTaker.find();
    if(videotaker.length>0){
        resp.send(videotaker)
    }else{
        resp.send({candidate:"No reviews found"})
    }
})

//Location codes google api
// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);
// const io = new Server(server);

// let locations = {};

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("update-location", (data) => {
//     locations[socket.id] = data;
//     socket.broadcast.emit("location-updated", locations);
//   });

//   socket.on("disconnect", () => {
//     delete locations[socket.id];
//     socket.broadcast.emit("location-updated", locations);
//   });
// });


//location code
// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// const io = new Server(server);

// let locations = {};

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("update-location", (data) => {
//     locations[socket.id] = data;
//     socket.broadcast.emit("location-updated", locations);
//   });

//   socket.on("disconnect", () => {
//     delete locations[socket.id];
//     socket.broadcast.emit("location-updated", locations);
//   });
// });

app.listen(5000)