import React from "react";

const Register = ({ onRouteChange }) => {
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
            />
            <small id="name-desc" className="f6 black-60 db mb2">
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
            />
          </div>
        </fieldset>
        <div className="mt3">
          <input
            onClick={() => onRouteChange("signin")}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
            value="Register"
          />
        </div>
        <div className="lh-copy mt3">
          <p
            onClick={() => onRouteChange("signin")}
            href="#0"
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
