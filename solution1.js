// Get all the published backend courses

// Sort by name

// Pick only name and author properties

// Print the result

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.log("Could not connect to MongoDB database", err));

const courseSchema = mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
