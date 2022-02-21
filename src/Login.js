import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

export function Login() {
  const History = useHistory();

  const formvalidationSchema = yup.object({
    username: yup
      .string()
      .min(6, "Credentials must be at least 6 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(6, "Password is too Small")
      .max(16, "Password is too Big")
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!%&])/g,"Pattern is not matched")
      .required("Password is required"),
  });

  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues: { username: "", password: "" },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        fetch("http://localhost:9000/users/signin", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        })
          .then((responce) => responce.json())
          .then((data) => console.log(data));
      },
    }
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="username or email"
          color="primary"
          id="username"
          nmae="username"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched.username && errors.username ? errors.username : ""}
        <Input
          placeholder="password"
          color="primary"
          id="password"
          nmae="password"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched.password && errors.password ? errors.password : ""}
        <Button variant="contained" color="primary" type="submit">
          Log in
        </Button>
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={() => History.push("/Forgetpass")}
      >
        Forget password
      </Button>
    </div>
  );
}
