const express = require('express');
const router = express.Router();
const Members = require('../models/IMember');
const authenticate = require('../midleware/authenticate');

/*
    INFO : GET all the Members
    URL : http://127.0.0.1:5000/api/members/
	METHOD : GET
	Fields : no-fields
	express function : router.get();
 */
router.get('/members', async (request , response) => {
  try {
    let members = await Members.find();
    response.status(200).json(members);
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : GET a single Member
    URL : http://127.0.0.1:5000/api/members/:id
	METHOD : GET
	Fields : no-fields
	express function : router.get();
 */
router.get('/members/:id',async (request , response) => {
  let memberId = request.params.id;
  try {
    let members = await Members.findById(memberId); // select * from Members where id=''
    response.status(200).json(members);
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : Create a Members
    URL : http://127.0.0.1:5000/api/members/
	METHOD : POST
	Fields : Name , Gender , Email , Phone
	express function : router.post();
 */
router.post('/members', async (request , response) => {
  try {
    let newMember = {
        name : request.body.name,
        gender : request.body.gender,
        email : request.body.email,
        phone : request.body.phone
    };

    //check the Members is exists or not
    let member = await Members.findOne({name : newMember.email});
    if(member){
      return response.status(400).json({
        result : 'Failed',
        message : 'Member is already exists'

      });
    }
    member = new Members(newMember);
    member = await member.save(); // INSERT data to database

    response.status(200).json(member);
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : Update a Members
    URL : http://127.0.0.1:5000/api/members/:id
	METHOD : PUT
	Fields : Name , Gender , Email , Phone
	express function : router.put();
 */
router.put('/members/:id', async (request , response) => {
  let memberId = request.params.id;
  try {
    let updatedMembers = {
      name : request.body.name,
      gender : request.body.gender,
      email : request.body.email,
      phone : request.body.phone
    };
    let member = await Members.findById(memberId);
    if(member){
      member = await Members.findByIdAndUpdate(memberId , {
        $set : updatedMembers
      }, {new : true});
      response.status(200).json(member);
    }
    else{
      return response.status(400).json({
        result : 'failed',
        message : 'No Members is found to update'
      });
    }
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : Delete a Members
    URL : http://127.0.0.1:5000/api/members/:id
	METHOD : DELETE
	Fields : no-fields
	express function : router.delete();
 */
router.delete('/members/:id', async (request , response) => {
  let memberId = request.params.id;
  try {
    let member = await Members.findByIdAndDelete(memberId);
    response.status(200).json(member)
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

module.exports = router;
