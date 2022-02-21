import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
export function Forgetpass() {
  const FormvalidationSchema = yup.object({
    resetusername: yup
      .string()
      .min(6, "Username must be at least 6 characters")
      .required("Username is required"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { resetusername: "" },
      validationSchema: FormvalidationSchema,
      onSubmit: (values) => {
        fetch("http://localhost:9000/users/forgetpass", {
          method: "post",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" },
        })
          .then((responce) => responce.json())
          .then((data) => console.log(data));
      },
    });

  //   const verifycode = () => {
  //     fetch("http://localhost:9000/users/checkresetcode", {
  //       method: "post",
  //       body: JSON.stringify({ resetusername: username, resetcode: resetcode }),
  //       headers: { "content-type": "application/json" },
  //     })
  //       .then((responce) => responce.json())
  //       .then((data) => console.log(data));
  //   };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="username"
          color="primary"
          id="resetusername"
          name="resetusername"
          values={values.resetusername}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.resetusername && errors.resetusername
          ? errors.resetusername
          : ""}
        <Button type="submit" variant="contained" color="primary">
          Send code
        </Button>
        {/* <Input
          placeholder="CODE"
          color="primary"
          onChange={(data) => setresetcode(data.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => verifycode()}
        >
          Send code
        </Button> */}
      </form>
    </div>
  );
}
