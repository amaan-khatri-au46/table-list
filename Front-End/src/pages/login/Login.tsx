import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/slices/tableListSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter your username"),
  password: Yup.string().min(6).max(50).required("Please enter your password"),
});

export const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tableList);
  const { enqueueSnackbar } = useSnackbar();
  //   const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center"
      style={{
        height: "100vh",

        backgroundSize: "cover",
        objectFit: "cover",
        backgroundPosition: "center",
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const res: any = await dispatch(loginUser(values));
          if (res.meta.requestStatus === "fulfilled") {
            localStorage.setItem(
              "userDetails",
              JSON.stringify({
                email: res.payload.details.email,
                username: res.payload.details.username,
              })
            );
            enqueueSnackbar("You Are Logged in successfully", {
              variant: "success",
              autoHideDuration: 2000,
            });
            // navigate("/");
          } else {
            enqueueSnackbar("Please enter correct username and Password", {
              variant: "error",
              autoHideDuration: 2000,
            });
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form
            className="w-96 mt-8 mb-14 mr-24 ml-24"
            style={{ minHeight: "500px" }}
          >
            <Field
              as={TextField}
              name="email"
              size="small"
              fullWidth
              id="outlined-none"
              label="Email"
              error={!!errors.email}
              helperText={errors.email}
            />
            <Field
              as={TextField}
              name="password"
              size="small"
              fullWidth
              id="outlined-none"
              label="Password"
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button variant="outlined" type="submit">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            {/* <div className="mt-6 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};
