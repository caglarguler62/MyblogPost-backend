module.exports = app => {
  const blogposts = require("../controller/blogPosts.controller.js");

  var router = require("express").Router();

  // Create a new blogpost
  router.post("/", blogposts.create);

  // Retrieve all blogpost
  router.get("/", blogposts.findAll);

  // Retrieve all completed blogpost
  router.get("/completed", blogposts.findAllCompleted);

  // Retrieve a single blogpost with id
  router.get("/:id", blogposts.findOne);

  // Update a blogpost with id
  router.put("/:id", blogposts.update);

  // Delete a blogpost with id
  router.delete("/:id", blogposts.delete);

  // Delete all blogpost
  router.delete("/", blogposts.deleteAll);

  app.use('/api/blogposts', router);
};