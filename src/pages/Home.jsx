import React, { useState } from "react";
// import index from "../index.css";
const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
        name: "",
        email: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
      });
    }
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="container">
      <h1 className="heading">Crud App</h1>
      <div className="details">
        <form onSubmit={handleSubmit}>
          <div className="name1">
            <label>Name</label>
            <input name="name" required value={inputs.name} onChange={handleChange} />
          </div>
          <div className="email1">
            <label>Email</label>
            <input name="email" required value={inputs.email} onChange={handleChange} />
          </div>
          <button type="submit" className="button">
            {editClick ? "update" : "Add"}
          </button>
        </form>
      </div>
      <div>
        <table className="data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody className="tabledata">
            {tableData.map((item, i) => (
              <tr className="datas">
                <td className="name2">{item.name}</td>
                <td className="email2">{item.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="editbtn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="deletebtn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;