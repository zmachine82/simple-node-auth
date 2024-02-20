const express = require('express');

const {setupDB} = require('./setupDB')
const Address = require('./Address')
const User = require('./User')
const jwt = require('jsonwebtoken');
const needsValidUser = require('./auth.middleware')

const app = express();
app.use(express.json())
const port = process.env.PORT || 5000;

app.post('/sign-up', async (req, res) => {
  const newUser = await User.create(req.body)
  res.status(201).json({token: newUser.createToken()})
})

app.post('/sign-in', async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if(user &&  !user.comparePassword(req.body.password)) {
    res.status(401).send('Wrong password dummy')
  }
  res.status(201).json({token: user.createToken()})
})


app.get('/users', async (req, res) => {
  const allUsers = await User.find({})
  res.status(200).json(allUsers)
})


app.post('/address', needsValidUser(async (req, res) => {
  const newAddressData = req.body
  newAddressData.userId = req.user._id
  const newAddress = await Address.create(newAddressData)
  res.status(201).json(newAddress)
}))

app.get('/address', needsValidUser(async (req, res) => {
    console.log(req.user);
    const allAddresses = await Address.find({userId: req.user._id})
    res.status(200).json(allAddresses)
  
}))

app.delete('/address/:id', async (req, res) => {
  const deletionResult = await Address.deleteOne({_id: req.params.id})

  res.status(200).json(deletionResult)
})

setupDB().then(() => {
  app.listen(port, () => console.log(`listening on http://localhost:${port}`));
})

