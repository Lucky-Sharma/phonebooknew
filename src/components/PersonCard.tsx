import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/Store";
import {
  setSelectedContact,
  setShowPersonCard,
} from "../Redux/Slices/CreateSlice";

export const PersonCard: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector(
    (state: RootState) => state.ContectReducer.UI.showPersonCard
  );
  const contact = useSelector(
    (state: RootState) => state.ContectReducer.UI.selectedContact
  );

  const handleClose = () => {
    dispatch(setShowPersonCard(false));
    dispatch(setSelectedContact(null));
  };

  if (!contact) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          bgcolor: "#f5f5f5",
          borderBottom: "1px solid #ccc",
        }}
      >
        Contact Details
      </DialogTitle>

      <DialogContent>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
          }}
        >
          <Avatar
            src={contact.image || ""}
            alt={contact.name}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {contact.name}
          </Typography>
          <Divider sx={{ width: "100%", my: 1 }} />

          <Box width="100%">
            <Typography variant="subtitle1" color="textSecondary">
              Phone
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {contact.Phoneno}
            </Typography>

            <Typography variant="subtitle1" color="textSecondary">
              Address
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {contact.Address}
            </Typography>

            <Typography variant="subtitle1" color="textSecondary">
              Category
            </Typography>
            <Typography variant="body1">{contact.Label}</Typography>
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="contained" fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
