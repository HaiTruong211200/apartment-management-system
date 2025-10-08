const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {type: String, required: true, minlength: 8, select: false},
      role: {
        type: String,
        enum: ['admin', 'staff', 'resident'],
        default: 'resident'
      }
    },
    {timestamps: true});

// Ensure unique index explicitly
// UserSchema.index({email: 1}, {unique: true});

// Hash password before save if modified
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare candidate password with stored hash
UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Remove sensitive fields from JSON
UserSchema.methods.toJSON = function() {
  const obj = this.toObject({versionKey: false});
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', UserSchema);
module.exports = {User};