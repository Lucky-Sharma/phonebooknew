import React, { useEffect, useState } from "react";
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
  Alert,
  AlertTitle,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  updateForm,
  resetForm,
  setsubmittedAllert,
} from "../Redux/Slices/CreateSlice";
import type { RootState } from "../Redux/Store";
import { uploadToCloudinary } from "../cloudinary/uploadToCloudinary";

interface CreateProps {
  open: boolean;
  onClose: () => void;
}

export const CreateCard: React.FC<CreateProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(
    (state: RootState) => state.ContactReducer.Contacts
  );
  const formData = useSelector((state: RootState) => state.ContactReducer.form);

  const [errors, setErrors] = useState({
    name: "",
    phoneno: "",
    address: "",
    category: "",
  });

  useEffect(() => {
    if (open) {
      dispatch(resetForm());
      setErrors({
        name: "",
        phoneno: "",
        address: "",
        category: "",
      });
    }
  }, [open, dispatch]);

  const getNextId = () => {
    if (contacts.length === 0) return 1;
    return Math.max(...contacts.map((c) => c.id)) + 1;
  };

  const validate = () => {
    const newErrors = {
      name: "",
      phoneno: "",
      address: "",
      category: "",
    };

    let isValid = true;

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    const phoneStr = formData.phoneno?.toString() || "";

    if (phoneStr.length !== 10 || !validator.isMobilePhone(phoneStr)) {
      newErrors.phoneno = "Phone number must be valid and exactly 10 digits.";
      isValid = false;
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (formData.category.trim() === "") {
      newErrors.category = "Category is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    dispatch(setsubmittedAllert(true));

    dispatch(
      addContact({
        id: getNextId(),
        name: formData.name.trim(),
        Phoneno: Number(formData.phoneno),
        Address: formData.address.trim(),
        Label: formData.category,
        image: formData.image || "",
      })
    );

    dispatch(resetForm());
    onClose();
  };

  const hasErrors = errors.name =="" ||errors.address==""||errors.category==""||errors.phoneno=="";

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(resetForm());
        onClose();
      }}
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
        {!hasErrors ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Validation Error</AlertTitle>
            Please fill the details correctly .
          </Alert>
        ):null}

        <Box display="flex" justifyContent="center" mb={2}>
          {formData.image ? (
            <Avatar src={formData.image} sx={{ width: 80, height: 80 }} />
          ) : (
            <Avatar sx={{ width: 80, height: 80 }}>
              {formData.name?.[0] || "?"}
            </Avatar>
          )}
        </Box>

        <Box display="flex" justifyContent="center" mb={2}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
          >
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const cloudUrl = await uploadToCloudinary(file);
                    dispatch(updateForm({ image: cloudUrl }));
                  } catch (err) {

                    alert("Image upload failed.");
                  }
                }
              }}
            />
          </Button>
        </Box>

        <TextField
          required
          label="Name"
          fullWidth
          margin="dense"
          error={!!errors.name}
          helperText={errors.name}
          value={formData.name}
          onChange={(e) => dispatch(updateForm({ name: e.target.value }))}
        />

        <TextField
          required
          label="Phone Number"
          fullWidth
          margin="dense"
          error={!!errors.phoneno}
          helperText={errors.phoneno}
          value={formData.phoneno}
          onChange={(e) => dispatch(updateForm({ phoneno: e.target.value }))}
        />

        <TextField
          required
          label="Address"
          fullWidth
          margin="dense"
          error={!!errors.address}
          helperText={errors.address}
          value={formData.address}
          onChange={(e) => dispatch(updateForm({ address: e.target.value }))}
        />
        
        <FormControl
          required
          fullWidth
          margin="dense"
          error={!!errors.category}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            label="Category"
            onChange={(e) => dispatch(updateForm({ category: e.target.value }))}
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
        </FormControl>
        {errors.category ? (
          <Typography
            sx={{
              color: "#d32f2f",
              fontSize: "0.75rem",
              marginTop: "3px",
              marginLeft: "14px",
            }}
          >
            {errors.category}
          </Typography>
        ) : null}
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
