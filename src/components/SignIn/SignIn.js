import React, { useState } from "react";

const SignIn = ({ serverURL, onRouteChange, setNavItem, loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handles changes in email input field
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handles changes in password input field
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handles user's sign in
  const onSubmit = () => {
    if (!email || !password) {
      window.alert("Fill all fields.")
      return 0
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!re.test(email)){
      window.alert("Input a valid email.")
        return 0
    }
        
    const credentials = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(`${serverURL}/signin`, credentials)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          loadUser(data);
          onRouteChange("home");
          setNavItem("Sign Out");
        } else onRouteChange("signin");
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
      <main className="pa4 black-100">
        <div className="measure">
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0 white">
            <legend className="f2 fw6 ph0 mh0 red">Sign In</legend>
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
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSubmit}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => {
                onRouteChange("reg");
                setNavItem("Sign In");
              }}
              className="f6 link dim black db pointer red"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
