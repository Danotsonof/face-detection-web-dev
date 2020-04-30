import React, { useState } from "react";

const Register = ({ onRouteChange, setNavItem }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const onNameChange = event => {
    setName(event.target.value);
  };

  const onRegister = () => {
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
    fetch(`http://localhost:3001/register`, credentials)
      .then(res => res.json())
      .then(data => {
        if (data === email) {
          onRouteChange("signin");
          setNavItem("Register");
        } else onRouteChange("reg");
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
              name="password"
              id="password"
              onChange={onPasswordChange}
            />
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
