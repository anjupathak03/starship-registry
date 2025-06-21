const { Schema, model } = require('mongoose');

const starshipSchema = new Schema(
  {
    registryNumber: { type: String, unique: true, required: true }, // NCC-1701-D
    name:           { type: String, required: true },               // Enterprise
    class:          { type: String, required: true },               // Galaxy-class
    commissioned:   { type: Date,   required: true },               // 2363-10-04
    status:         {
      type: String,
      enum: ['ACTIVE', 'MUSEUM', 'DESTROYED'],
      default: 'ACTIVE'
    }
  },
  { timestamps: true }
);

module.exports = model('Starship', starshipSchema);
