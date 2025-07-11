import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slide,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditOpen,
  changeData,
  updateForm,
  resetForm,
} from "../Redux/Slices/CreateSlice";
import type { RootState } from "../Redux/Store";

export const Editcard: React.FC = () => {
  const dispatch = useDispatch();

  const open = useSelector(
    (state: RootState) => state.ContectReducer.UI.editOpen
  );
  const contact = useSelector(
    (state: RootState) => state.ContectReducer.UI.selectedContact
  );
  const formData = useSelector((state: RootState) => state.ContectReducer.form);

  useEffect(() => {
    if (contact) {
      dispatch(
        updateForm({
          name: contact.name,
          phoneno: contact.Phoneno.toString(),
          address: contact.Address,
          category: contact.Label,
        })
      );
    }
  }, [contact, dispatch]);

  const handleUpdate = () => {
    if (!contact) return;

    dispatch(
      changeData({
        id: contact.id,
        name: formData.name,
        Phoneno: formData.phoneno,
        Address: formData.address,
        Label: formData.category,
      })
    );
    dispatch(setEditOpen(false));
    dispatch(resetForm());
  };

  const handleClose = () => {
    dispatch(setEditOpen(false));
    dispatch(resetForm());
  };

  return (
    <Dialog open={open} onClose={handleClose}
    slots={{ transition:Slide }}
          slotProps={{
            transition: {
              direction:"up",
              in: open,
              appear: true,
            },
          }}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="dense"
          value={formData.name}
          error={formData.name.trim() === ""}
          onChange={(e) => dispatch(updateForm({ name: e.target.value }))}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="dense"
          value={formData.phoneno}
          error={formData.phoneno.length<10}
          onChange={(e) => dispatch(updateForm({ phoneno: e.target.value }))}
        />
        <TextField
          label="Address"
          fullWidth
          margin="dense"
          value={formData.address}
          error={formData.address.trim()==""}
          onChange={(e) => dispatch(updateForm({ address: e.target.value }))}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            error={formData.category==""}
            onChange={(e) =>
              dispatch(updateForm({ category: e.target.value }))
            }
            label="Category"
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
