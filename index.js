const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React Course",
    author: "Ahbideen",
    tags: ["react", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();

async function getCourse() {
  const pageNumber = 1;
  const pageSize = 10;

  const courses = await Course.find({ author: "Ahbideen", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: -1 })
    .select({ name: 1, date: 1 });
  console.log(courses);
}

// getCourse();

// QUERY FIRST APPROACH

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  console.log(id);

  course.isPublished = false;
  course.author = "Bravono";

  const result = await course.save();
  console.log(result);
}

// updateCourse("65674af0e7809b54e06d264a");

//UPDATE FIRST APPROACH

async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    { $set: { author: "Bravo", isPublished: true } }
  );
  console.log(result);
}

// updateCourse("65674af0e7809b54e06d264a");

// UPDATE FIRST APPROACH && GETTING THE COURSE OBJ

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    { $set: { author: "Bravo", isPublished: false } },
    { new: true }
  );
  console.log(course);
}

updateCourse("656b8aabbee0923744fe8788");
