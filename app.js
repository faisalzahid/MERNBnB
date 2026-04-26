const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./Models/listing.js");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Server is listing at port 8080");
});

//DB Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/MERNBnB";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//Index Route
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route
// app.post("/listings", async (req, res) => {
//   let listing = req.body.listing;
//   let newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
// });

app.post("/listings", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  console.log(listing);
  res.render("listings/show.ejs", { listing });
});

//-----------------
// //For Sample Listing in model
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Karachi",
//     country: "Pakistan",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
