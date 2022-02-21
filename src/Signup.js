import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import * as yup from "yup";

export function Signup() {
  const History = useHistory();
  const[fetcherror,setfetcherror]=useState("");
  const formvalidationSchema = yup.object({
    name: yup
      .string()
      .min(6, "Name must be at least 6 characters")
      .max(14, "Name must be at less then 14 characters")
      .required("Name is required"),
    username: yup
      .string()
      .min(6, "Username must be at least 6 characters")
      .max(12, "Username must be at less then 12 characters")
      .required("Username is required"),

    password: yup
      .string()
      .min(8, "Password is too Small")
      .max(14, "Password is to Big")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!%&])/g,
        "Pattern is not matched"
      )
      .required("Password is required"),
  });
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik(
    {
      initialValues: { name: "", username: "", password: "", email: "" },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        fetch("http://localhost:9000/users/signup", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        })
          .then((responce) => responce.json())
          .then((data) => {
            if(data.acknowledged){
              History.push("/login");
              return;
            }
            setfetcherror(data);
            console.log(fetcherror.message);
          });
      },
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          color="primary"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name ? errors.name : ""}
        <Input
          placeholder="username"
          color="primary"
          id="username"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.username && errors.username ? errors.username : ""}
        <Input
          placeholder="email"
          color="primary"
          id="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? errors.email : ""}
        <Input
          placeholder="password"
          color="primary"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password ? errors.password : ""}
        <Button variant="contained" color="primary" type="submit">
          Sign up
        </Button>
        {fetcherror.message ? fetcherror.message : ""}
      </form>
    </div>
  );
}


