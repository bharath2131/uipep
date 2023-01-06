const express = require('express');
const Arouter = express.Router()
const Model = require('../model/Albummodel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId


Arouter.post('/postalbum', async (req, res) => {
    console.log(req.body)
    const album = new Model({
        userid: req.body.userid,
        name: req.body.name
    })
    console.log(album);
    try {
        const albumToSave = await album.save();
        res.status(200).json(albumToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get All Users
Arouter.get('/getAllalbum', async (req, res) => {
    try{
        const album = await Model.find();
        res.json(album)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Get one album by ID
Arouter.get('/getOne/:id', async (req, res) => {
    try{
        const album = await Model.findById(req.params.id);
        res.json(album)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//get album by user ID
Arouter.get('/AlbumbyUser/:id',async (req, res) => {
    try{
        const album = await Model.aggregate([
            // { $match: { $expr: { $eq: ["$userid", { $toObjectId: req.query.userid }] } } },
            
           {
            $match:{
                userid:ObjectId(req.params.id)
            }
           },
            { $lookup: { from: "datas", localField: "userid", foreignField: "_id", as: "userinfo" } },    
    ]);
        
        res.json(album)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



//Updating the album data using Patch
Arouter.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedalbum = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedalbum, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
Arouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const album = await Model.findByIdAndDelete(id)
        res.send(`Document with ${album.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports =  Arouter;