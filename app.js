//----------------------------------------
const mongoose = require("mongoose"); //import
const app = require("express")();
const { model, Schema } = require("mongoose");
//----------------------------------------

//-------------------------------------------------
//Our db
var dbURI = "mongodb://localhost/rapidinhas";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log(`connected to ${dbURI}`));

//-----------------------------------------------

//---------------------------------------------
//department
const departmentSchema = new Schema({
  name: String,
  location: String
});

const Department = model("department", departmentSchema);
//---------------------------------------------

//-------------------------------------------
//employee
const EmployeeSchema = new Schema({
  firstName: { type: String },
  lastName: String,
  department: { type: mongoose.Types.ObjectId, ref: "department" }
});
const Employee = model("employee", EmployeeSchema);

//----------------------------------------------

//--------------------------------------------------

const CompanySchema = new Schema({
  name: String,
  address: String,
  employees: [{ type: mongoose.Types.ObjectId, ref: "employee" }]
});

const Company = model("company", CompanySchema);
//--------------------------------------------------

app.use("/", async (req, res) => {
  res.json({
    department: await Department.find(),
    employees: await Employee.find(),
    employeesWithDep: await Employee.find().populate("department", "name"),
    Company: await Company.find(),
    CompanyWithEmployee: await Company.find().populate("employees"),
    CompanyWithEmployeesAndDep: await Company.find().populate({
      path: "employees",
      model: "employee",
      populate: { path: "department", model: "department" }
    })
  });
});

app.listen(3000, () => {
  console.log("we are on port 3000");
});
