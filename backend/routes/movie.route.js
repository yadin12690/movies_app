const express = require('express');
const app = express();
const movieRoute = express.Router();

// Movie model
let Movie = require('../models/Movie');

// Add Movie
movieRoute.route('/create').post((req, res, next) => {
    Movie.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get All Movies
movieRoute.route('/').get((req, res) => {
    Movie.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single movie
movieRoute.route('/read/:id').get((req, res) => {
    Movie.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update movie
movieRoute.route('/update/:id').put((req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

// Delete movie
movieRoute.route('/delete/:id').delete((req, res, next) => {
    Movie.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update like
movieRoute.route('/update/:id').put((req, res, next) => {
    Movie.findOneAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            console.log(data)
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

module.exports = movieRoute;