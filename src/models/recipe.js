const mongoose = require('mongoose');

//tworzenie schematu - można schematy zagnieżdżać w sobie itp.
const recipeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //tutaj zostanie wstawiony obiekt usera
        ref: 'User'
    },
    recipe_name: {
        type: String,
        trim: true//przytnie string jakby ktos wpisał spację przed lub po
        //tu jeszcze jakaś walidacja danych
    },
    description: {
        type: String,
    },
    prep_time: {
        type: Number,
    },
}, {
    timestamps: true
});


//tworzenie modelu - na modelu pracujemy jako na odnośniku do bazy danych
const model = mongoose.model('Recipe', recipeSchema);
module.exports = model;
