import mongoose, { Schema, Document } from 'mongoose';

export interface CategoryDocument extends Document {
    name: string
}

const categorySchema = new Schema<CategoryDocument>({
    name: { type: String, required: true },  
})

const Category = mongoose.model<CategoryDocument>('Category', categorySchema);

export default Category;