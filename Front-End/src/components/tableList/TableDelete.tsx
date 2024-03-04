import { Button, Popover } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteTableItem,
  openDeleteDailog,
} from "../../store/slices/tableListSlice";
import { useSnackbar } from "notistack";

const TableDelete = () => {
  const { openDelete, deleteRow }: any = useAppSelector(
    (state) => state.tableList
  );
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const response: any = await dispatch(deleteTableItem(deleteRow._id));
    if (response.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Data Deleted Successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
    await dispatch(openDeleteDailog(false));
  };

  return (
    <div>
      <Popover
        open={openDelete}
        anchorEl={openDelete}
        onClose={() => {
          dispatch(openDeleteDailog(false));
        }}
      >
        <div style={{ padding: "20px", minWidth: "200px" }}>
          <p style={{ marginBottom: "10px" }}>
            Are you sure you want to delete this data?
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(openDeleteDailog(false));
              }}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDelete} color="error">
              Okay
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default TableDelete;
