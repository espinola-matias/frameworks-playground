import { Schema, model } from 'mongoose';

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres']
    },
    content: {
        type: String,
        required: [true, 'El contenido es obligatorio'],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: null
    }
});

export default model('Article', ArticleSchema);
