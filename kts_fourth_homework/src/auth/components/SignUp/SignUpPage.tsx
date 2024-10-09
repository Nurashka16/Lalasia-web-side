import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "../Auth.module.css";
import FormFill from "../../../common/components/FormToFill/FormToFill";
import Layout from "../Layout";
import { observer } from "mobx-react-lite";
import AuthStore from "../../stores/auth-store";
import usePopUp from "../../../common/hooks/usePopUp";
import Button from "../../../common/components/Button";
import { HOME } from "../../../utils/const";
import Text from "../../../common/components/Text";

interface Array<T> {
  getBy<P extends keyof T>(prop: P, value: T[P]): T | null;
}

// Array.prototype.getBy = function <T, P extends keyof T>(
//    this: T[],
//    prop: P,
//    value: T[P]
// ): T | null {
//  return this.filter(item => item[prop] === value)[0] || null;
// };

// const numbers = [1,2,3,4];
// numbers.get

const SignUpPage = observer(() => {
  const { signUp } = AuthStore;
  const { decoratedAction: signUpWithPopUp } = usePopUp(
    signUp,
    "account created successfully",
    "user with this login already exists, enter another",
    "/"
  );

  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarIsValid, setAvatarIsValid] = useState(false);

  const minLetters = 5;
  const rules: IRule<string>[] = [
    {
      errorMessage: "Empty line",
      validate: (value) => !!value,
    },
    {
      errorMessage: "Minimum length: 5 letters",
      validate: (value) => value.length >= minLetters,
    },
  ];

  return (
    <Layout>
      <div className={style.auth_form}>
        <div className={style.auth_inputs}>
          <FormFill
            text="Name"
            className={style.input}
            value={name}
            onChange={setName}
            rules={rules}
            setIsValid={setNameIsValid}
          />
          <FormFill
            text="Email"
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
          <FormFill
            text="Avatar"
            className={style.input}
            value={avatar}
            onChange={setAvatar}
            rules={rules}
            setIsValid={setAvatarIsValid}
          />
        </div>
        <div className={style.footer}>
          <div className={style.footer_btn}>
            <Button
              onClick={() => {
                signUpWithPopUp({
                  name: "Nicolas",
                  email: "nico@gmail.com",
                  password: "1234",
                  avatar: "https://picsum.photos/800",
                });
              }}
              className={style.btn_logIn}
              disabled={
                !(
                  emailIsValid &&
                  passwordIsValid &&
                  avatarIsValid &&
                  nameIsValid
                )
              }
            >
              Create an account
            </Button>
          </div>
          <Link to={HOME} className={style.footer_link}>
            <Text
              className={style.link}
              weight="medium"
              color="secondary"
              tag="span"
            >
              Have an account
            </Text>
          </Link>
        </div>
      </div>
    </Layout>
  );
});

export default SignUpPage;
