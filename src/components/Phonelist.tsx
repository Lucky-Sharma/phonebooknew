import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box, Avatar, Typography, IconButton, Slide, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import {
  deleteContact,
  setBookmark,
  setEditOpen,
  setSelectedContact,
  setShowPersonCard,
} from "../Redux/Slices/CreateSlice";
import type { Contact } from "../Redux/Slices/CreateSlice";

type Props = {
  contact: Contact;
};

export const PhoneList = ({ contact }: Props) => {
  const dispatch = useDispatch();

  const bookmarkState = useSelector(
    (state: RootState) =>
      state.ContectReducer.Contacts.find((c) => c.id === contact.id)?.bookmarked
  );
  const Data = useSelector((state: RootState) => state.ContectReducer.Contacts);
  const handleBookmarkToggle = () => {
    dispatch(setBookmark(contact.id));
  };

  const editHandler = (id: number) => {
    const contactToEdit = Data.find((c) => c.id === id);
    if (contactToEdit) {
      dispatch(setSelectedContact(contactToEdit));
      dispatch(setEditOpen(true));
    }
  };

  return (
   <Slide in={true} direction="up">
  <Box
    onClick={() => {
      dispatch(setSelectedContact(contact));
      dispatch(setShowPersonCard(true));
    }}
    sx={{
      m: 1,
      px: 1.5,
      borderColor: "divider",
      borderRadius: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      gap: 30,
      maxHeight: "80px",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f0f0f0", 
        boxShadow: 1,                 
      }
    }}
  >
    <div style={{ display: "flex", alignItems: "center", minWidth: "170px" }} className="avtar_name">
      <Avatar
        src={contact.image || "not found"}
        alt={contact.name}
        sx={{ margin: "20px" }}
      />
      <Typography sx={{ flex: 1, fontWeight: "medium" }}>
        {contact.name}
      </Typography>
    </div>

    <div>
      <Typography
        sx={{ flexBasis: "140px", textAlign: "center", fontSize: "1rem" }}
      >
        {contact.Phoneno}
      </Typography>
    </div>

    <div>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleBookmarkToggle();
        }}
      >
        {bookmarkState ? (
          <BookmarkIcon style={{ color: "#0000CD" }} />
        ) : (
          <BookmarkBorderIcon style={{ color: "#4169E1" }} />
        )}
      </IconButton>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          editHandler(contact.id);
        }}
      >
        <ModeEditIcon style={{ color: "#003153" }} />
      </IconButton>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteContact(contact.id));
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  </Box>
</Slide>

  );
};
