
import React, { useState } from "react";
import*as XLSX from "xlsx";
function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const downloadExcel = () => {

  const worksheet = XLSX.utils.json_to_sheet(students);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  XLSX.writeFile(workbook, "StudentsData.xlsx");

};

  const addStudent = () => {

    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    } 
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
      alert("Please enter a valid email address");
      return;
    }
     if (isEditing) {
    const updatedStudents = [...students];
    updatedStudents[editIndex] = { name, email, age };
    setStudents(updatedStudents);
    setIsEditing(false);
    setEditIndex(null);
  } else {

    const newStudent = { name, email, age };
    setStudents([...students, newStudent]);
  }
    setName("");
    setEmail("");
    setAge("");
  };

  const deleteStudent = (index) => {
    const confirmDelete = window.confirm("Are You Sure You Want to Delete this Student?"); 
    if(confirmDelete){
      const updatedStudents=students.filter((_,i) => i !== index);
    setStudents(updatedStudents);
  }
  };
  const editStudent = (index) => {
  const student = students[index];

  setName(student.name);
  setEmail(student.email);
  setAge(student.age);

  setEditIndex(index);
  setIsEditing(true);
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Students Table</h1>
      <button onClick={downloadExcel}>Download Excel</button>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                 <button onClick={() => editStudent(index)}>Edit</button>
                  <button onClick={() => deleteStudent(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;