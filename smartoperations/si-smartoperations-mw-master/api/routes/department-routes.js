const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Department = require('../models/department-models')

router.get('/', (req, res, next) => {
    Department.find().exec().then(docs => {
        console.log("All the records ", docs);
        res.status(200).json(docs);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const department = new Department({
        _id: new mongoose.Types.ObjectId(),
        airportType: req.body.airportType,
        departmentName: req.body.departmentName,
        serviceType: req.body.serviceType,
        skill: req.body.skill
    });
    department.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling post request from department',
            createdDepartment: result
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:departmentId', (req, res, next) => {
    const id = req.params.departmentId;
    Department.findById(id).exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: 'No valid entry provided for the ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:departmentId', (req, res, next) => {
    const id = req.params.departmentId;
    const updateOps ={};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
      }
    // second parameter - update list
    Department.update({_id:id}, {$set : updateOps}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

router.delete('/:departmentId', (req, res, next) => {
    const id = req.params.departmentId;
    Department.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;