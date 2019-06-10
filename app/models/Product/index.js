const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  customer_id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Product name is required.'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['dairy', 'fruit', 'vegetable'],
    default: 'vegetable',
  },
  created_at: {
    type: Date,
  },
});

// ProductSchema.pre('updateOne', (next) => {
//   next()
// });

module.exports = model('Product', ProductSchema);
