function Student(name,sex,ID,grade,major) {
	this.name = name,
	this.sex = sex,
	this.ID = ID,
	this.grade = grade,
	this.major = major
}
Student.prototype.save = function() {
	var storage = localStorage.getItem("StudentInfo");
	storage = storage ? JSON.parse(storage) : [];
	storage.push(this);
	storage = JSON.stringify(storage);
	localStorage.setItem("StudentInfo",storage);
}
function getStudent(ID) {
	var storage = localStorage.getItem("StudentInfo");
	var result = null;
	if(storage==null){
		alert("There's no student!");
		return result;
	}
	else{
		storage = JSON.parse(storage);
		for(var i = 0;i<storage.length;i++){
			if(storage[i].ID==ID){
				result = i;
				break;
			}
		}
		return result;
	}
}
function add() {
	var name = document.getElementById("add-name").value;
	var sex = document.getElementById("add-sex").value;
	var ID = document.getElementById("add-ID").value;
	var grade = document.getElementById("add-grade").value;
	var major = document.getElementById("add-major").value;
	var i = null;
	var student = new Student(name,sex,ID,grade,major);
	student.save();
	i = getStudent(ID);
	if(i!=null){
		alert("Finish!");
	}
}
function search() {
	var ID = document.getElementById("search-ID").value;
	var i = getStudent(ID);
	var storage = localStorage.getItem("StudentInfo");
	storage = JSON.parse(storage);
	if(i==null){
		alert("There's no such student!");
		document.getElementById("name-found").innerHTML = "";
		document.getElementById("sex-found").innerHTML = "";
		document.getElementById("ID-found").innerHTML = "";
		document.getElementById("grade-found").innerHTML = "";
		document.getElementById("major-found").innerHTML = "";
	}
	else{
		document.getElementById("name-found").innerHTML = storage[i].name;
		document.getElementById("sex-found").innerHTML = storage[i].sex;
		document.getElementById("ID-found").innerHTML = storage[i].ID;
		document.getElementById("grade-found").innerHTML = storage[i].grade;
		document.getElementById("major-found").innerHTML = storage[i].major;
	}
}
function Delete() {
	var ID = document.getElementById("delete-ID").value;		
	var i = getStudent(ID);
	var storage = localStorage.getItem("StudentInfo");
	storage = JSON.parse(storage);
	if(i==null){
		alert("There's no such student!");
	}
	else{
		storage.splice(i,1);
		storage = JSON.stringify(storage);
		localStorage.setItem("StudentInfo",storage);
		i = getStudent(ID);
		if(i==null){
			alert("Finish!");
		}
	}
}
function searchToRevise(Reset) {
	var ID = document.getElementById("revise-ID").value;
	var i = getStudent(ID);
	var storage = localStorage.getItem("StudentInfo");
	storage = JSON.parse(storage);
	if(Reset){
		if(i==null){
			alert("There's no such student!");
			document.getElementById("name-to-revise").value = "";
			document.getElementById("sex-to-revise").value = "";
			document.getElementById("ID-to-revise").value = "";
			document.getElementById("grade-to-revise").value = "";
			document.getElementById("major-to-revise").value = "";
		}
		else{
			document.getElementById("name-to-revise").value = storage[i].name;
			document.getElementById("sex-to-revise").value = storage[i].sex;
			document.getElementById("ID-to-revise").value = storage[i].ID;
			document.getElementById("grade-to-revise").value = storage[i].grade;
			document.getElementById("major-to-revise").value = storage[i].major;
		}
	}
	else{
		return i;
	}
}
function revise() {
	var i = searchToRevise(false);
	var before = null;
	var after = null;
	var storage = localStorage.getItem("StudentInfo");	
	before = storage;
	storage = JSON.parse(storage);
	storage[i].name = document.getElementById("name-to-revise").value;
	storage[i].sex = document.getElementById("sex-to-revise").value;
	storage[i].ID = document.getElementById("ID-to-revise").value;
	storage[i].grade = document.getElementById("grade-to-revise").value;
	storage[i].major = document.getElementById("major-to-revise").value;
	storage = JSON.stringify(storage);
	after = storage;
	localStorage.setItem("StudentInfo",storage);
	if(before!=after){
		alert("Finish!");
	}
}
	
