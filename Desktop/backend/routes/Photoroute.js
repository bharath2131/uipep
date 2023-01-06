const express = require('express');
const Prouter = express.Router()
const Model = require('../model/Photomodel');
const AModel = require('../model/Albummodel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

Prouter.post('/postphoto', async (req, res) => {
    console.log(req.body)
    const photo = new Model({
        albumid:req.body.Album_id,
        userid:req.body.User_id,
        name: req.body.Name,
       ImageUrl:req.body.ImageUrl,
    })
    console.log(photo);
    try {
        const photoToSave = await photo.save();
        new date();
        res.status(200).json(photoToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get All Users
Prouter.get('/getAllphoto', async (req, res) => {
    try{
        const photo = await Model.find();
        res.json(photo)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Get one photo by ID
Prouter.get('/getOne/:id', async (req, res) => {
    try{
        const photo = await Model.findById(req.params.id);
        res.json(photo)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//get photo by Album
Prouter.get('/getPhotoByAlbum/:id', (req, res) => {
    Model.aggregate([
        // { $match: { $expr: { $eq: ["$albumid", { $toObjectId: req.query.albumid }] } } },
        {
            $match:{
                albumid:ObjectId(req.params.id)
            }
           },
        { $lookup: { from: "albums", localField: "albumid", foreignField: "_id", as: "albuminfo" } },
        { $lookup: { from: "users", localField: "userid", foreignField: "_id", as: "user" } }
			
    ], (err, data) => {
        if (!err) {
            res.status(200).json({
                message: "Photos fetched successfully",
                photos: data
            })
        } else {
            console.log(error)
            res.status(404).json({
                message: "Error in fetching photos",
                error: err
            })
        }
    })
})
//get Photo by user

Prouter.get('/getPhotoByUser/:id',(req, res) => {
    Model.aggregate([
        // { $match: { $expr: { $eq: ["$userid", { $toObjectId: req.query.userid }] } } },
        {
            $match:
            {
                userid:ObjectId(req.params.id)
            }
        },
        { $lookup: { from: "users", localField: "userid", foreignField: "_id", as: "user" } }
    ], (error, data) => {
        if (!error) {
            res.status(200).json({
                message: "Photos Found",
                photos: data
            })
        } else {
            res.status(404).json({
                message: "Error in finding Photos",
            })
        }
    })
})



//Updating the photo data using Patch
Prouter.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedphoto = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedphoto, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
Prouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const photo = await Model.findByIdAndDelete(id)
        res.send(`Document with ${photo.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = Prouter
    

