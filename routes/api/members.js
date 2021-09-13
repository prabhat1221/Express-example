const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Gets All Members
router.get('/', (req, res) => res.json(members));

// Get Single Member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});
//post Member
router.post('/', (req, res) =>{
  newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone 
  }
  members.push(newMember);
  res.redirect('/')
  res.json(members)

})
// update Member

router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    updatedMember = req.body;
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name? updatedMember.name: member.name;
        member.email = updatedMember.email? updatedMember.email: member.name;
        member.phone = updatedMember.phone? updatedMember.phone: member.phone;
        res.json(members)
      }
    })
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
})


module.exports = router;
