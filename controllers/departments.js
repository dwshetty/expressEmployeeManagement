const Department = require('../models/departments');

const createOne = (req, res) => {
    const { description, name } = req.body

    if (!(name && description)) {
        res.render('index', { error: "Invalid payload!" });
        return;
    }

    const department = new Department({
        name,
        description,
        createdDate: Date.now()
    });

    department.save()
    .then(data => {
        res.redirect("/departments")
    })
    .catch(err => {
        res.status(500).send({ message: "Error creating Department" });
    });
};

const findAll = (req, res) => {
    Department.find({})
    .then(departments => {
        res.render('departments', { departments });
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Departments" });
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

    Department.findById(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "No Department found with id=" + id });
            return;
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Department with id=" + id });
    });
};

const updateOne = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Invalid payload!" });
        return;
    }

    const id = req.params.id;

    Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "No Department found with id=" + id });
            return;
        }
        res.send({ message: "Department updated successfully." });
    })
    .catch(err => {
        res.status(500).send({ message: "Error updating Department with id=" + id });
    });
};

const deleteAll = (req, res) => {
    Department.deleteMany({})
    .then(data => {
        res.send({ message: `${data.deletedCount} Departments were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({ message: "Error deleting Departments" });
    });
};

const deleteOne = (req, res) => {
    const id = req.params.id;

    Department.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "No Department found with id=" + id });
            return;
        }
        res.send({ message: "Department deleted successfully." });
    })
    .catch(err => {
        res.status(500).send({ message: "Error deleting Department with id=" + id });
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