mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/Week8';
mongoose.connect(MONGO_URI);   // ⬅ no extra options


const db = mongoose.connection;

db.on('error', function(err){
  console.log("Error occured during connection" + err);
});

db.once('connected', function(){
  console.log(`Connected to ${MONGO_URI}`);
});
const PersonScheme = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  Gender: String,
  Salary: Number
});

const person_doc = mongoose.model('modelname', PersonScheme, 'personCollection');

const doc1 = new person_doc({
  name: 'Jacky',
  age: 36,
  Gender: "Male",
  Salary: 3456
});

doc1.save()
.then((doc1) => {
  console.log("New person added:", doc1);
})
.catch((err) => {
  console.error(err);
});
manypersons = [
 { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
 { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
 { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
 { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
];

person_doc.insertMany(manypersons)
.then(function(){
  console.log("Multiple data inserted");
})
.catch(function(error){
  console.log(error);
});
person_doc.find()
.sort({Salary: 1})
.select("name Salary age")
.limit(5)
.exec()
.then(docs => {
  console.log("Showing multiple documents");
  docs.forEach(function(Doc){
    console.log(Doc.age, Doc.name);
  });
})
.catch(err => {
  console.error(err);
});

var givenage = 30;

person_doc.find({ Gender: "Female", age: { $gte: givenage } })
.exec()
.then(docs => {
  docs.forEach(function(Doc){
    console.log(Doc.age, Doc.name);
  });
})
.catch(err => {
  console.error(err);
});



