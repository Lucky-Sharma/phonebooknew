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
  updateForm,
  resetForm,
  setsubmittedAllert,
} from "../Redux/Slices/CreateSlice";
import type { AppDispatch, RootState } from "../Redux/Store";

interface CreateProps {
  open: boolean;
  onClose: () => void;
}

export const CreateCard: React.FC<CreateProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
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
      setErrors({ name: "", phoneno: "", address: "", category: "" });
      
    }
  }, [open, dispatch]);

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

  const handleImageUpload = async (file: File) => {
    const form = new FormData();
    form.append("image", file);

    try {
      const response = await fetch("/api/uploadToCloudinary", {
        method: "POST",
        body: form,
      });
      
      const data = await response.json();
      if (!data.imageUrl) throw new Error("No image URL returned");

      dispatch(updateForm({ image: data.imageUrl })); 
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    dispatch(setsubmittedAllert(true));

    try {
      const contactPayload = {
        name: formData.name.trim(),
        phoneno: formData.phoneno,
        address: formData.address.trim(),
        label: formData.category,
        imgsrc: formData.image, 
      };

      const response = await fetch("/api/createContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create contact");
      }

      const data = await response.json();
      console.log("Created contact:", data);

      dispatch(resetForm());
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to create contact");
    }
  };

  const hasErrors =
    errors.name || errors.address || errors.category || errors.phoneno;

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(resetForm());
        onClose();
      }}
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: "down", in: open, appear: true } }}
    >
      <DialogTitle>Create Contact</DialogTitle>
      <DialogContent>
        {hasErrors && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Validation Error</AlertTitle>
            Please fill the details correctly.
          </Alert>
        )}

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
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageUpload(file); 
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
            onChange={(e) =>
              dispatch(updateForm({ category: e.target.value }))
            }
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
        </FormControl>

        {errors.category && (
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
        )}
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
