const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
          : v,
    },
    filename: {
      type: String,
      default: "listingimage",
    },
  },

  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
