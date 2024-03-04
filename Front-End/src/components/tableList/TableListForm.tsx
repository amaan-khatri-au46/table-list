import React from "react";
import { Formik, Form, Field } from "formik";
import { Drawer, TextField, Button, Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addTableItem,
  editTableItem,
  setOpenFrom,
} from "../../store/slices/tableListSlice";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

export const TableListForm = () => {
  const dispatch = useAppDispatch();
  const { openForm, editRow } = useAppSelector((state) => state.tableList);
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleDrawerClose = () => {
    dispatch(setOpenFrom(false));
  };

  return (
    <Box>
      <Drawer open={openForm} onClose={handleDrawerClose} anchor="right">
        <Typography
          sx={{ marginTop: "20px" }}
          variant="h5"
          display={"flex"}
          marginLeft={2}
          gutterBottom
        >
          <b>{editRow.length > 0 ? "Edit Table Data" : "Add Table Data"}</b>
        </Typography>
        <Box marginTop={2} padding={2}>
          <Formik
            initialValues={{
              firstName: editRow ? editRow?.firstName : "",
              lastName: editRow ? editRow?.lastName : "",
              age: editRow ? editRow.age : null,
              email: editRow ? editRow.email : "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values: any, { resetForm }: any) => {
              const response = editRow?._id
                ? await dispatch(
                    editTableItem({ item: values, id: editRow._id })
                  )
                : await dispatch(addTableItem(values));
              if (response.meta.requestStatus === "fulfilled") {
                enqueueSnackbar(
                  editRow?._id
                    ? "Data Editted Successfully"
                    : "Data Added Successfully",
                  { variant: "success", autoHideDuration: 2000 }
                );
              }
              await dispatch(setOpenFrom(false));
            }}
          >
            {({ errors }: any) => (
              <Form>
                <Box marginTop={2}>
                  <Field
                    as={TextField}
                    name="firstName"
                    size="small"
                    fullWidth
                    id="outlined-none"
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Box>
                <Box marginTop={2}>
                  <Field
                    as={TextField}
                    name="lastName"
                    size="small"
                    fullWidth
                    id="outlined-none"
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Box>
                <Box marginTop={2}>
                  <Field
                    as={TextField}
                    name="age"
                    type="number"
                    size="small"
                    fullWidth
                    id="outlined-none"
                    label="Age"
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                </Box>
                <Box marginTop={2}>
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
                </Box>
                <Box marginTop={2} display={"flex"}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      variant="outlined"
                      type="button"
                      onClick={() => {
                        dispatch(setOpenFrom(false));
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </div>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Drawer>
    </Box>
  );
};
