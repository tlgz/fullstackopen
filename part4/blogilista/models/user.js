const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required: true,
    minLength: 3,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    delete returnedObject.blogs[0].__v
    delete returnedObject.blogs[0].user
    delete returnedObject.blogs[0].likes
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User