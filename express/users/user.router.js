const express = require("express");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./user.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200);
    res.send(users);
  } catch (error) {
    console.error("Error fetching all the users", error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.get("/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await getUserById(userId);
    res.status(200);
    res.send(user);
  } catch (error) {
    console.error("Error fetching user by id", error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200);
    res.send(newUser);
  } catch (error) {
    console.error("Error creating a new user", req.body, error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.put("/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const updatedUser = await updateUser(userId, req.body);
    res.status(200);
    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating a new user", req.body, error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.delete("/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const deletedUser = await deleteUser(userId);
    res.status(200);
    res.send("User deleted succesfully");
  } catch (error) {
    console.error("Error deleting a user", req.body, error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

module.exports = router;
