import React, { Fragment, useState } from "react";

const Formval = () => {
  let [count, setcount] = useState(0);
  const [blankObj, setblankObj] = useState({});
  const [obj, setobj] = useState({ hobbies: [] });
  const [array, setarray] = useState([]);
  const [isError, setisError] = useState({})
  let letters = /^[A-Za-z\s]*$/;


  function isDate18orMoreYearsOld(day, month, year) {
    return new Date(year+18, month, day) <= new Date();
}

  const getData = (e) => {
    if (e.target.name == "hobbies") {
      if (e.target.checked) {
        obj.hobbies.push(e.target.value);
      } else {
        obj.hobbies = obj.hobbies.filter((x) => x != e.target.value);
      }

      blankObj.hobbies = [];
    }
    else if(e.target.name == 'information'){
      obj[e.target.name] = e.target.value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }
    else {
      obj[e.target.name] = e.target.value;

      blankObj[e.target.name] = "";
    }
    FormValidation();
    setobj({ ...obj });
    setblankObj({ ...blankObj });
    // console.log(obj)
  };

  const save = () => {
    FormValidation()
    if (!isError) {
      if (obj.id == undefined) {
        count = count + 1;
        setcount(count);
        obj.id = count;
        array.push(obj);
      } else {
        let index = array.findIndex((x) => x.id == obj.id);
        array.splice(index, 1, obj);
      }
      console.log(count);
      setarray([...array]);
      setobj({ ...blankObj });
      console.log(array);
    }
  };

  const FormValidation = () => {
    if (!obj.fname || obj.fname == '') {
      isError.fname = "First name is required"
    }
    else if (obj.fname && !letters.test(obj.fname)) {
      isError.fname = "First name is contains only letters"
    }
    else {
      isError.fname = ''
    }

    if (!obj.lname || obj.lname == '') {
      isError.lname = "Last name is required"
    }
    else if (obj.lname && !letters.test(obj.lname)) {
      isError.lname = "Last name is contains only letters"
    }
    else {
      isError.lname = ''
    }

    if (!obj.email || obj.email == '') {
      isError.email = "Email is required"
    }
    else if (obj.email && ((!obj.email.includes('@gmail.com') && !obj.email.includes('@outlook.com')))) {
      isError.email = "@gmail.com or @outlook.com is required"
    }
    else {
      isError.email = ''
    }

    if (!obj.phone || obj.phone == '') {
      isError.phone = "Mobile No is required"
    }
    else if ((obj.phone < 0) || (obj.phone.length != 10)) {
      isError.phone = "Mobile no is not valid."
    }
    else {
      isError.phone = ''
    }

    if (!obj.date || obj.date == '') {
      isError.date = "Date is required"
    }
    else if (!isDate18orMoreYearsOld(new Date(obj.date).getDate(), new Date(obj.date).getMonth(), new Date(obj.date).getFullYear())) {
      isError.date = "Date must be 18+."
    }
    else {
      isError.date = ''
    }
    
    if (!obj.gender || obj.gender == '') {
      isError.gender = "Gender is required"
    }
    else {
      isError.gender = ''
    }

    if (!obj.hobbies || obj.hobbies == '') {
      isError.hobbies = "Hobbies is required"
    }
    else if (obj.hobbies.length < 3) {
      isError.hobbies = "Please select 3"
    }
    else {
      isError.hobbies = ''
    }

    if (!obj.information || obj.information == '') {
      isError.information = "Information is required"
    }
    
    else {
      isError.information = ''
    }

    setisError({ ...isError })
  }

  return (
    <Fragment>
      <div>FormValidation</div>

      <form action="" className="w-50 mx-auto border border-1 p-4 mt-5">
        <h3>FORM {obj.fname}</h3>
        <label htmlFor="" className="d-block">
          First Name
        </label>
        <input
          type="text"
          name="fname"
          className="w-100"
          value={obj.fname || ""}
          onChange={getData}
        />
        <span className="error_msg">{isError?.fname}</span>

        <label htmlFor="" className="d-block">
          Last Name
        </label>
        <input
          type="text"
          name="lname"
          className="w-100"
          value={obj.lname || ""}
          onChange={getData}
        />
        <span className="error_msg">{isError?.lname}</span>

        <label htmlFor="" className="d-block">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-100"
          value={obj.email || ""}
          onChange={getData}
        />
        <span className="error_msg">{isError?.email}</span>

        <label htmlFor="" className="d-block">
          Mobile No
        </label>
        <input
          type="tel"
          name="phone"
          className="w-100"
          value={obj.phone || ""}
          onChange={getData}
        />
        <span className="error_msg">{isError?.phone}</span>

        <label htmlFor="" className="d-block">
          Birth Date
        </label>
        <input
          type="date"
          name="date"
          className="w-100"
          value={obj.date || ""}
          onChange={getData}
        />
        <span className="error_msg">{isError?.date}</span>

        <label htmlFor="" className="d-block">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="w-100"
          value={obj.password || ""}
          onChange={getData}
        />

        <label htmlFor="" className="d-block">
         Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="w-100"
          value={obj.confirmPassword || ""}
          onChange={getData}
        />

        <label htmlFor="" className="d-block">
          Gender
        </label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={obj.gender == "Male"}
          onChange={getData}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="FeMale"
          checked={obj.gender == "FeMale"}
          onChange={getData}
        />
        Female
        <br />
        <span className="error_msg">{isError?.gender}</span>

        <label htmlFor="" className="d-block">
          Hobby
        </label>
        <input
          type="checkbox"
          name="hobbies"
          value="Cricket"
          checked={obj.hobbies?.includes("Cricket")}
          onChange={getData}
        />
        Cricket
        <input
          type="checkbox"
          name="hobbies"
          value="Football"
          checked={obj.hobbies?.includes("Football")}
          onChange={getData}
        />
        Footbal
        <input
          type="checkbox"
          name="hobbies"
          value="Music"
          checked={obj.hobbies?.includes("Music")}
          onChange={getData}
        />
        Music
        <input
          type="checkbox"
          name="hobbies"
          value="Reading"
          checked={obj.hobbies?.includes("Reading")}
          onChange={getData}
        />
        Reading
        <input
          type="checkbox"
          name="hobbies"
          value="Writing"
          checked={obj.hobbies?.includes("Writing")}
          onChange={getData}
        />
        Writing
        <br />
        <span className="error_msg">{isError?.hobbies}</span>

        <label htmlFor="" className="d-block">
          Information
        </label>
        <textarea
          name="information"
          id=""
          cols="30"
          rows="2"
          className="w-100"
          value={obj.information || ""}
          onChange={getData}
        ></textarea>
        <span className="error_msg">{isError?.information}</span>
        <br />
        <button type="button" className="btn btn-success mt-4" onClick={save}>
          Save
        </button>
      </form>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Profile</th> */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th>Information</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {array.map((x, i) => {
            return (
              <tr key={i}>
                <td>{x.id}</td>
                <td>{x.fname}</td>
                <td>{x.lname}</td>
                <td>{x.email}</td>
                <td>{x.phone}</td>
                <td>{x.date}</td>
                <td>{x.gender}</td>
                <td>{x.hobbies?.join(",")}</td>
                <td>{x.information}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Formval;
