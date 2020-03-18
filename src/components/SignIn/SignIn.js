import React from "react";
// import "./FaceCount.css";

const SignIn = ({onRouteChange}) => {
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
      <main className="pa4 black-100">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0 white">
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
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={() => onRouteChange('home')}
            />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('reg')} href="#0" className="f6 link dim black db pointer red">
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
