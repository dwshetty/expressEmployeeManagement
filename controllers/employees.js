const Employee = require('../models/employees');
const Department = require('../models/departments');

const createOne = (req, res) => {
    const { name, surname, department } = req.body

    if (!(name && surname && department)) {
        res.render('index', { error: "Invalid payload!" });
        return;
    }

    Department.find({ name: department })
    .then(data => {
        if(data.length < 1) {
            res.render('index', { error: "Invalid Department!" });
            return;
        }
        const employee = new Employee({
            name,
            surname,
            department,
            createdDate: Date.now()
        });
        
        employee.save()
        .then(data => {
            res.redirect("/employees")
        })
        .catch(err => {
            res.status(500).send({ message: "Error creating Employee" });
        });
    })
    .catch(err => {
        res.render('index', { error: "Something went wrong!" });
    });
};

const findAll = (req, res) => {
    Employee.find({})
    .then(employees => {
        res.render('employees', { employees });
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Employees" });
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

    Employee.findById(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "No Employee found with id=" + id });
            return;
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Employee with id=" + id });
    });
};

const updateOne = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Invalid payload!" });
        return;
    }

    const id = req.params.id;

    Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "No Employee found with id=" + id });
            return;
        }
        res.send({ message: "Employee updated successfully." });
    })
    .catch(err => {
        res.status(500).send({ message: "Error updating Employee with id=" + id });
    });
};

const deleteAll = (req, res) => {
    Employee.deleteMany({})
    .then(data => {
        res.send({ message: `${data.deletedCount} Employees were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({ message: "Error deleting Employees" });
    });
};

const deleteOne = (req, res) => {
    const id = req.params.id;

    Employee.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "No Employee found with id=" + id });
            return;
        }
        res.send({ message: "Employee deleted successfully." });
    })
    .catch(err => {
        res.status(500).send({ message: "Error deleting Employee with id=" + id });
    });
};

module.exports = {
    createOne,
    deleteAll,
    deleteOne,
    findAll,
    findOne,
    updateOne,
}