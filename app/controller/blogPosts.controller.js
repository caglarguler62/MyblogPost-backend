const db = require("../models");
const MyBlogPosts = db.blogposts;

// Create and Save a new MyBlogPosts
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a MyBlogPosts
  const blogposts = new MyBlogPosts({
    title: req.body.title,
    completed: req.body.completed ? req.body.completed : false
  });

  // Save MyBlogPosts in the database
  blogposts
    .save(blogposts)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TodoItem."
      });
    });
};

// Retrieve all MyBlogPosts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  MyBlogPosts.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todo items."
      });
    });
};

// Find a single MyBlogPosts with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TodoItem.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found MyBlogPosts with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving MyBlogPosts with id=" + id });
    });
};

// Update a MyBlogPosts by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  TodoItem.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo Item with id=${id}. Maybe Todo Item was not found!`
        });
      } else res.send({ message: "Todo Item was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo Item with id=" + id
      });
    });
};

// Delete a MyBlogPosts with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TodoItem.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Todo Item with id=${id}. Maybe Todo Item was not found!`
        });
      } else {
        res.send({
          message: "Todo Item was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo Item with id=" + id
      });
    });
};

// Delete all MyBlogPosts from the database.
exports.deleteAll = (req, res) => {
  TodoItem.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todo Items were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Todo Items."
      });
    });
};

// Find all completed MyBlogPosts
exports.findAllCompleted = (req, res) => {
  TodoItem.find({ completed: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Todo Items."
      });
    });
};