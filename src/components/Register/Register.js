import React, { useState } from "react";

const Register = ({ serverURL, onRouteChange, setNavItem }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Handles changes in email input field
  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  // Handles changes in password input field
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  // Handles changes in name input field
  const onNameChange = event => {
    setName(event.target.value);
  };

  // Handles registration on users
  const onRegister = () => {
    if (!email || !password || !name) {
      window.alert("Fill all fields.")
      return 0
    }
    const pw = /^((?=.*[a-z])(?=.*[A-Z]))(?=.{6,})/;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!re.test(email)){
      window.alert("Input a valid email.")
        return 0
    }

    if (password.length < 6){
      window.alert("Password must be at least 6 characters.")
        return 0
    }

    if(!pw.test(password)){
      window.alert("Password must contain atleast 1 lowercase and 1 uppercase.")
        return 0
    }

    const credentials = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    };
    fetch(`${serverURL}/register`, credentials)
      .then((res) => {
		  if(!res.ok) return "";
		else return res.json();
	  })
      .then(data => {
        if (data === email) {
          onRouteChange("signin");
          setNavItem("Register");
          window.alert("Account successfully created")
        } else {
          onRouteChange("reg");
          window.alert("Kindly try again")
        }
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3 --blue">
      <div
        className="pa4"
        action="sign-up_submit"
        method="get"
        acceptCharset="utf-8"
      >
        <fieldset id="sign_up" className="white ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0 red">Register</legend>
          <div className="mt3">
            <label htmlFor="name" className="f6 b db mb2">
              UserName
            </label>
            <input
              id="name"
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              aria-describedby="name-desc"
              onChange={onNameChange}
            />
            <small id="name-desc" className="f6 black db mb2">
              What would you like to be called?
            </small>
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">
              Email
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
              onChange={onEmailChange}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              aria-describedby="pw-desc"
              name="password"
              id="password"
              onChange={onPasswordChange}
            />
            <small id="pw-desc" className="f6 black db mb2">
              Password must contain atleast 1 lowercase and 1 uppercase and must be atleast 6 characters
            </small>
          </div>
        </fieldset>
        <div className="mt3">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
            value="Register"
            onClick={onRegister}
          />
        </div>
        <div className="lh-copy mt3">
          <p
            onClick={() => { onRouteChange("signin"); setNavItem("Register") }}
            className="f6 link dim black db pointer red"
          >
            Sign In
          </p>
        </div>
      </div>
    </article>
  );
};

export default Register;
