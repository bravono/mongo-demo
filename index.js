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

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  console.log(id);

  course.isPublished = true;
  course.author = "Bravono";

  const result = await course.save();
  console.log(result);
}

updateCourse("5a68fdf95db93f6477053ddd");
