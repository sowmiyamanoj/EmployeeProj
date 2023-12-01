const asyncHandler = require("express-async-handler");
const Role = require("../models/roleModel");

//Get all Roles
//route Get /api/Roles
//access public
const getRoles = asyncHandler(async (req, res) => {
  const Roles = await Role.find();
  res.status(200).json(Roles);
});

//Create New Roles
//route Post /api/Roles
//access public
const createRole = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { roleID, roleName, roleStatus, roleDescription, ruleRights } =
    req.body;

  const role = await Role.create({
    roleID,
    roleName,
    roleStatus,
    roleDescription,
    ruleRights,
  });

  res.status(201).json(role);
});

//Get all Roles
//route Get /api/Roles/:id
//access public
const getRole = asyncHandler(async (req, res) => {
  const role = await Role.findOne({ roleID: req.params.id });
  if (!Role) {
    res.status(404);
    throw new Error("Role not found");
  }
  res.status(200).json(role);
});

//Update individual Roles
//route Post /api/Roles
//access public
const updateRole = asyncHandler(async (req, res) => {
  const role = await Role.findOne({ roleID: req.params.id });
  if (!role) {
    res.status(404);
    throw new Error("Role not found");
  }

  const updatedRole = await Role.findOneAndUpdate(
    { roleID: req.params.id },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedRole);
});

//Delete all Roles
//route Delete /api/Roles/:id
//access public
const deleteRole = async (req, res) => {
  try {
    const deleteRole = await Role.findOneAndDelete({
      roleID: req.params.id,
    });
    if (!deleteRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRoles,
  createRole,
  getRole,
  updateRole,
  deleteRole,
};
