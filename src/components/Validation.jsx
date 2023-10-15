import React, {Fragment, useState} from "react";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";
import validationData from "../JSON/validationData.json";

const Validation = () => {
  let [count, setcount] = useState(0);
  const [blankObj, setblankObj] = useState({});

  /* AHI BDHA NE BLANK VALUE API 6 KM K APRE JYRE FIELD PR CLICK KARIYE TYA J ERROR BATAVSE BAKI BDHI FIELD MA NI DEKHSE  */
  const [obj, setobj] = useState({
    hobbies: [],
    fname: "",
    lname: "",
    email: "",
    phone: "",
    date: "",
    password: "",
    confirmPassword: "",
    gender: "",
    information: "",
  });
  const [array, setarray] = useState([]);
  let [isError, setisError] = useState({});
  const [formHeight, setformHeight] = useState(false);
  let [filterObject, setfilterObject] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  let [filterArray, setfilterArray] = useState([]);
  let letters = /^[A-Za-z\s]*$/;

  /* DATE MATE NU FUNCTION CHE ANE AA FUNCTION NE ELSE IF NI CONTION MA SET KARYU NICHE */
  function isDate18orMoreYearsOld(day, month, year) {
    return new Date(year + 18, month, day) <= new Date();
  }

  const getData = (e) => {
    if (e.target.name == "hobbies") {
      if (e.target.checked) {
        obj.hobbies.push(e.target.value);
      } else {
        obj.hobbies = obj.hobbies.filter((x) => x != e.target.value);
      }

      blankObj.hobbies = [];
    } else if (e.target.name == "information") {
      /* how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript INFORMATION VALA MA FIRST LETTER CAPITAL KRVA AAVU SERCH KRI AMA J FIRST SITE AMA THI J AA REPLACE VALI CODE A HOI A COPY KRI LEVO AND AA RITE CONDITION MA LAKHI DEVU */
      obj[e.target.name] = e.target.value.replace(/(^\w|\s\w)/g, (m) =>
        m.toUpperCase()
      );
    } else {
      obj[e.target.name] = e.target.value;

      blankObj[e.target.name] = "";
    }
    /* AHI AAPRNE NAME MLSE JYA ATLE AA VALIDATE VALA FUNCTION MA APRE ARGUMENET MA NAME PASS KRI IF CONDITION MA CHEK KEVU K BNNE EQUAL 6 K NAI A CHEK KRSE*/
    validateData(e.target.name);
    setobj({...obj});
    setblankObj({...blankObj});
    // console.log(obj)
  };

  const save = () => {

    for(let key in obj){
          validateData(key)
    }
console.log(Object.keys(isError))
   if(Object.keys(isError).length == 0){
    if (obj.id == undefined) {
        count = count + 1;
        setcount(count);
        obj.id = count;
        array.push(obj);
      } else {
        let index = array.findIndex((x) => x.id == obj.id);
        array.splice(index, 1, obj);
      }
      // console.log(count);
      setarray([...array]);
      filterArray = array;
      setfilterArray([...filterArray]);
      setobj({...blankObj});
      // console.log(array);
   }
  };

  const validateData = (name) => {
    let validationObj = validationData.find((x) => x.name == name);
  
      if(validationObj){

        let errorObj = validationObj.conditions.find((x) => eval(x.condition));
        if (errorObj) {
          if(errorObj.otherField){
            isError[errorObj.otherField] = errorObj.error;
          }
          else{

            isError[name] = errorObj.error;
          }

        } else {
          delete isError[name];
        }
      }
    
    setisError({...isError});
  };

  const validatePassword = ()=>{

      if ((obj.password !== obj.confirmPassword) && (obj.confirmPassword != '')) {
        isError.confirmPassword = "Password and Confirm Password must be same."
        console.log(isError)
      }
      if ((obj.password === obj.confirmPassword) && (obj.confirmPassword != "")) {
        delete isError.confirmPassword;
        console.log(isError)

      }
      setisError({...isError});
      return true
  }

  const openForm = () => {
    setformHeight(true);
  };

  const closeForm = () => {
    setformHeight(false);
  };

  return (
    <Fragment>
      <div>Validation</div>

      <form
        action=""
        className="w-50 mx-auto border border-1 p-4 mt-5 form-custom"
        style={{height: formHeight ? "auto" : "70px"}}
      >
        <div className="d-flex justify-content-between">
          <h3>FORM {obj.fname}</h3>
          <div>
            {formHeight ? (
              <AiOutlineArrowUp
                style={{cursor: "pointer"}}
                onClick={closeForm}
              />
            ) : (
              <AiOutlineArrowDown
                style={{cursor: "pointer"}}
                onClick={openForm}
              />
            )}
          </div>
        </div>
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
        <span className="error_msg">{isError?.password}</span>
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
        <span className="error_msg">{isError?.confirmPassword}</span>
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
          {filterArray.map((x, i) => {
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

export default Validation;
