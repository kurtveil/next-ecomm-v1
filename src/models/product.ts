// import mongoose from 'mongoose';
import mongoose, { Schema, } from 'mongoose';
// interfaz para el documento del producto

const productSchemaa: Schema =  new mongoose.Schema({
  name: { type: String, required: false },
  price: { type: String, required: false },
  code: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false },
  characteristics: { type: String, required: false },
  amount: { type: String, required: false },
});

export default mongoose.models.Product || mongoose.model('Product', productSchemaa);;
