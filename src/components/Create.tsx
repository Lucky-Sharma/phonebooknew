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
import { addContact, updateForm, resetForm } from "../Redux/Slices/CreateSlice";
import type { RootState } from "../Redux/Store";
interface CreateProps {
  open: boolean;
  onClose: () => void;
}

export const Create: React.FC<CreateProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(
    (state: RootState) => state.ContectReducer.Contacts
  );
  const formData = useSelector((state: RootState) => state.ContectReducer.form);

  useEffect(() => {
    if (open) {
      dispatch(resetForm());
    }
  }, [open, dispatch]);

  const getNextId = () => {
    if (contacts.length === 0) return 1;
    return Math.max(...contacts.map((c) => c.id)) + 1;
  };

  const handleSubmit = () => {
    if (
      formData.name == "" ||
      formData.address == "" ||
      formData.category == "" ||
      formData.phoneno.length < 10 ||
      formData.phoneno.length > 10
    ) {
      alert("Please fill the data properly");
    } else {
      dispatch(
        addContact({
          id: getNextId(),
          name: formData.name,
          Phoneno: Number(formData.phoneno),
          Address: formData.address,
          Label: formData.category,
          image: "",
        })
      );
      dispatch(resetForm());
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{ transition: Slide }}
      slotProps={{
        transition: {
          direction: "down",
          in: open,
          appear: true,
        },
      }}
    >
      <DialogTitle>Create Contact</DialogTitle>
      <DialogContent>
        <TextField
          error={formData.name.trim() === ""}
          required
          label="Name"
          fullWidth
          margin="dense"
          value={formData.name}
          onChange={(e) => dispatch(updateForm({ name: e.target.value }))}
        />
        <TextField
          error={formData.phoneno.length < 10 || formData.phoneno.length > 10}
          required
          label="Phone Number"
          fullWidth
          margin="dense"
          value={formData.phoneno}
          onChange={(e) => dispatch(updateForm({ phoneno: e.target.value }))}
        />
        <TextField
          error={formData.address.trim() === ""}
          required
          label="Address"
          fullWidth
          margin="dense"
          value={formData.address}
          onChange={(e) => dispatch(updateForm({ address: e.target.value }))}
        />
        <FormControl required fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            error={formData.category.trim() === ""}
            value={formData.category}
            onChange={(e) => dispatch(updateForm({ category: e.target.value }))}
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
        <Button
          onClick={() => {
            dispatch(resetForm());
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
