// var express = require("express");
import express from "express"
var app = express();
var hostname = "localhost";
var port = 3000;


app.get("/",(req,res)=>{
    res.send("haha")
})
app.listen(port,hostname,()=>{
    console.log("success")
}) 

