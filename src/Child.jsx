import { useState } from "react";

function Form() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    country: "",
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("form", form);
    alert(
      "form Submited with value are" +
        " " +
        "First Name" +
        " " +
        form.firstName +
        " " +
        "Last Name" +
        " " +
        form.lastName +
        " " +
        "Age" +
        " " +
        form.age +
        " " +
        "Country" +
        " " +
        form.country
    );
  };
  
  return (
    <>
      <h1>Form Submit</h1>
      <form
        onSubmit={handleSubmitForm}
        style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
      >
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={form.firstName}
          onChange={handleInputChange}
          name="firstName"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={form.lastName}
          name="lastName"
          onChange={handleInputChange}
        />
        <label htmlFor="Age">Age</label>
        <input
          type="text"
          id="Age"
          value={form.age}
          name="age"
          onChange={handleInputChange}
        />
        <label htmlFor="Age">Country</label>
        <select
          value={form.country}
          name="country"
          onChange={handleInputChange}
        >
          <option value={""} disabled>
            Select One
          </option>
          <option value={"IN"}>India</option>
          <option value={"US"}>United States</option>
          <option value={"UK"}>United Kingdom</option>
          <option value={"Ru"}>Russia</option>
        </select>
        <input type="submit" value={"Submit"} />
      </form>
    </>
  );
}

export default Form;
