import React, { useState } from "react";
import style from "../Auth.module.css";
import { Link } from "react-router-dom";
import FormFill from "../../../common/components/FormToFill/FormToFill";
import Layout from "../Layout";
import { observer } from "mobx-react-lite";
import usePopUp from "../../../common/hooks/usePopUp";
import AuthStore from "../../stores/auth-store";
import Button from "../../../common/components/Button";
import { SIGN_UP } from "../../../utils/const";
import Text from "../../../common/components/Text";

const SignIn = observer(() => {
  const { signIn } = AuthStore;

  const { decoratedAction: signInWithPopUp } = usePopUp(
    signIn,
    "successfully logged into your account",
    "Entered the wrong password or login",
    "/"
  );

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const minLetters = 5;
  const rules: IRule<string>[] = [
    {
      errorMessage: "Empty line",
      validate: (value) => !!value,
    },
    {
      errorMessage: "Minimum length:" + minLetters + " letters",
      validate: (value) => value.length >= minLetters,
    },
  ];
  return (
    <Layout>
      <div className={style.auth_form}>
        <div className={style.auth_inputs}>
          <FormFill
            text="Login"
            className={style.input}
            value={email}
            onChange={setEmail}
            rules={rules}
            setIsValid={setEmailIsValid}
          />
          <FormFill
            text="Password"
            className={style.input}
            value={password}
            onChange={setPassword}
            rules={rules}
            setIsValid={setPasswordIsValid}
          />
        </div>
        <div className={style.footer}>
          <div className={style.footer_btn}>
            <Button
              // userStore.signIn("john@mail.com", "changeme")
              onClick={() =>signIn({email:"john@mail.com", password:"changeme"})
                // signInWithPopUp({
                //   email: "john@mail.com",
                //   password: "changeme",
                // })
              }
              className={style.btn_logIn}
              disabled={!(emailIsValid && passwordIsValid)}
            >
              Log in
            </Button>
          </div>
          <Link to={SIGN_UP} className={style.footer_link}>
            <Text
              className={style.link}
              weight="medium"
              color="secondary"
              tag="span"
            >
              Create an account
            </Text>
          </Link>
        </div>
      </div>
    </Layout>
  );
});

export default SignIn;
