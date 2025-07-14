const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  title: { type: String },
  description: { type: String },
  tags: [{ type: String }],
  favorite: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema); 