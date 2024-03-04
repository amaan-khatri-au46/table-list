import { Box, Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchTable,
  openDeleteDailog,
  setDeleteRow,
  setEditRow,
  setOpenFrom,
} from "../../store/slices/tableListSlice";
import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const TableListing = () => {
  const { data, loading } = useAppSelector((state) => state.tableList);
  console.log(loading, "Here Is the Loading Setted Successfully");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);

  const rowsWithIds = data.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",
      width: 220,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <button
              style={{
                border: "none",
                background: "none",
                padding: "0px",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(setEditRow(params.row));
                dispatch(setOpenFrom(true));
              }}
            >
              <EditNoteIcon style={{ color: "green" }} />
            </button>
          </div>
          <span>
            <button
              onClick={() => {
                dispatch(openDeleteDailog(true));
                dispatch(setDeleteRow(params.row));
              }}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              <DeleteOutlineIcon style={{ color: "red" }} />
            </button>
          </span>
        </div>
      ),
    },
  ];

  return (
    <Box padding={8} height="80vh">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ width: "100px" }}
          onClick={() => {
            dispatch(setOpenFrom(true));
            dispatch(setEditRow([]));
          }}
          variant="contained"
        >
          Add
        </Button>
      </Box>
      <Box marginTop={2} sx={{ height: "70vh", position: "relative" }}>
        {loading && (
          <CircularProgress
            size={50}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <DataGrid
          rows={rowsWithIds}
          columns={columns}
          pagination={true}
          loading={loading}
        />
      </Box>
    </Box>
  );
};
