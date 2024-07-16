import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "./styles.css";
import { useAuthContext } from "@asgardeo/auth-react";
interface Student {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export const StudentRegister: FunctionComponent = (): ReactElement => {
  const { getAccessToken } = useAuthContext();
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Student>({
    id: 0,
    name: "",
    address: "",
    phone: "",
  });
  const [updatedStudent, setUpdatedStudent] = useState<Student>({
    id: 0,
    name: "",
    address: "",
    phone: "",
  });
  const [studentIdToDelete, setStudentIdToDelete] = useState<number>(0);
  const [studentIdToGet, setStudentIdToGet] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // const API = process.env.BACKEND_ENDPOINT

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get<Student[]>(
        "https://a0c4c024-030c-46b0-a425-3523a59c43dd-dev.e1-us-east-azure.choreoapis.dev/student-registration/student-registration/v1.0/students",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "x-jwt-assertion": accessToken,
          },
        }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async () => {
    const accessToken = await getAccessToken();
    try {
      await axios.post(
        "https://a0c4c024-030c-46b0-a425-3523a59c43dd-dev.e1-us-east-azure.choreoapis.dev/student-registration/student-registration/v1.0/students",
        newStudent,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "x-jwt-assertion": accessToken,
          },
        }
      );
      setNewStudent({
        id: 0,
        name: "",
        address: "",
        phone: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const getStudentById = async () => {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get<Student>(
        `https://a0c4c024-030c-46b0-a425-3523a59c43dd-dev.e1-us-east-azure.choreoapis.dev/student-registration/student-registration/v1.0/students/${studentIdToGet}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "x-jwt-assertion": accessToken,
          },
        }
      );
      setSelectedStudent(response.data);
    } catch (error) {
      console.error("Error fetching student by ID:", error);
    }
  };

  const updateStudent = async () => {
    const accessToken = await getAccessToken();
    try {
      await axios.put(
        "https://a0c4c024-030c-46b0-a425-3523a59c43dd-dev.e1-us-east-azure.choreoapis.dev/student-registration/student-registration/v1.0/students",
        updatedStudent,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "x-jwt-assertion": accessToken,
          },
        }
      );
      setUpdatedStudent({
        id: 0,
        name: "",
        address: "",
        phone: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async () => {
    const accessToken = await getAccessToken();
    try {
      await axios.delete(
        `https://a0c4c024-030c-46b0-a425-3523a59c43dd-dev.e1-us-east-azure.choreoapis.dev/student-registration/student-registration/v1.0/students/${studentIdToDelete}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "x-jwt-assertion": accessToken,
          },
        }
      );
      setStudentIdToDelete(0);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <table border={0}>
        <tr>
          {/* left */}
          <td>
            <h3>
              <b>Add a Student</b>
            </h3>
            <input
              type="text"
              placeholder="ID"
              value={newStudent.id}
              onChange={(e) =>
                setNewStudent({ ...newStudent, id: parseInt(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              value={newStudent.address}
              onChange={(e) =>
                setNewStudent({ ...newStudent, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={newStudent.phone}
              onChange={(e) =>
                setNewStudent({ ...newStudent, phone: e.target.value })
              }
            />
            <br />
            <br />
            <button onClick={addStudent}>Add Student</button>
          </td>

          {/* right */}
          <td>
            <h3>
              <b>Update a Student</b>
            </h3>
            <input
              type="text"
              placeholder="ID"
              value={updatedStudent.id}
              onChange={(e) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  id: parseInt(e.target.value),
                })
              }
            />
            <input
              type="text"
              placeholder="Name"
              value={updatedStudent.name}
              onChange={(e) =>
                setUpdatedStudent({ ...updatedStudent, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              value={updatedStudent.address}
              onChange={(e) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  address: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={updatedStudent.phone}
              onChange={(e) =>
                setUpdatedStudent({ ...updatedStudent, phone: e.target.value })
              }
            />
            <br />
            <br />
            <button onClick={updateStudent}>Update Student</button>
          </td>
        </tr>
      </table>

      <h1>
        <b>Students Data</b>
      </h1>
      <hr
        style={{ border: "2px solid black", width: "50%", margin: "20px auto" }}
      />

      <table>
        <tr>
          <td>
            <div>
              <h3>Search</h3>
              <p>
                ID
                <input type="search" placeholder="Search by ID" />
                <button onClick={getStudentById}>Search</button>

                {/* {selectedBook && (
              <div>
                <h3>{selectedBook.book_title}</h3>
                <p>Author: {selectedBook.author}</p>
                <p>Category: {selectedBook.category}</p>
                <p>Published Year: {selectedBook.published_year}</p>
                <p>Price: {selectedBook.price}</p>
                <p>Copies in Stock: {selectedBook.copies_in_stock}</p>
              </div>
            )} */}

              </p>
            </div>
          </td>
          <td>
            <div>
              <h3>Delete</h3>
              <label>ID:</label>
              <input
                type="search"
                value={studentIdToDelete}
                onChange={(e) => setStudentIdToDelete(parseInt(e.target.value))}
                placeholder="ID"
              />
              <button onClick={deleteStudent}>Delete Student</button>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <table style={{ border: "2px solid black" }} className="container">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Address</td>
                <td>Phone</td>
              </tr>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.address}</td>
                  <td>{student.phone}</td>
                </tr>
              ))}
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
};
