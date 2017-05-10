 var mongojs = require('mongojs'),
 db = mongojs('employee', ['employee']);

exports.updateEmployee = function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.employee.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {
      $set: {
        name: req.body.name, 
        email: req.body.email, 
        gender: req.body.gender, 
        dob: req.body.dob, 
        department: req.body.department, 
        age: req.body.age 
      }
    },
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
};

exports.getEmployee = function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.employee.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
};

exports.deleteEmployee = function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.employee.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
};

exports.addEmployee = function (req, res) {
    console.log(req.body);
    if(req.body.gender.toUpperCase() == 'MALE' || req.body.gender.toUpperCase() == 'FEMALE'){
      db.employee.insert(req.body, function(err, doc) {
      res.json(doc);
    });
    }
    else{
      res.status(400).send('ERROR : Bad Request, Invalid value for gender');
    }
};

exports.getAllEmployees = function (req, res) {
  console.log('I received a GET request');

  db.employee.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
};