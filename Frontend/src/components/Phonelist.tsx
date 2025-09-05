import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Redux/Store";
import {
  deleteContactsThunk,
  fetchContactsThunk,
  setBookmark,
  setEditOpen,
  setSelectedContact,
  setShowPersonCard,
} from "../Redux/Slices/CreateSlice";
import type { Contact } from "../Redux/Slices/CreateSlice";


export const useAppDispatch = () => useDispatch<AppDispatch>();

type Props = { contact: Contact };

export const PhoneList = ({ contact }: Props) => {
  const dispatch = useAppDispatch();

  const bookmarkState = useSelector(
    (state: RootState) =>
      state.ContactReducer.Contacts.find((c) => c.id === contact.id)?.bookmarked
  );
  const contacts = useSelector(
    (state: RootState) => state.ContactReducer.Contacts
  );

    const setbookmark = async(id:number)=>{
        const response = await fetch('/api/bookmark',{
          method:"PATCH",
          headers: {
    "Content-Type": "application/json"
  },
          body:JSON.stringify({id})
        })
        if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
         await response.json()
    }

  const handleBookmarkToggle = async() => {
    await setbookmark(contact.id);
    dispatch(setBookmark(contact.id))
    await dispatch(fetchContactsThunk());
  };

  const editHandler = (id: number) => {
    const contactToEdit = contacts.find((c) => c.id === id);
    if (contactToEdit) {
      dispatch(setSelectedContact(contactToEdit));
      dispatch(setEditOpen(true));
    }
  };

  let avatarContent;

  if (contact.image) {
    avatarContent = (
      <img
        src={contact.image}
        alt={contact.name}
        style={{ width: 60, height: 60, borderRadius: "50%" }}
      />
    );
  } else {
    avatarContent = (
      <Avatar sx={{ width: 60, height: 60 }}>{contact.name[0]}</Avatar>
    );
  }

  return (
    <Box
      onClick={() => {
        dispatch(setSelectedContact(contact));
        dispatch(setShowPersonCard(true));
      }}
      sx={{
        m: 1,
        px: 1.5,
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
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center", minWidth: "180px" }}>
        {avatarContent}
        <Typography sx={{ flex: 1, fontWeight: "medium", ml: 1 }}>
          {contact.name}
        </Typography>
      </div>

      <Box>
        <Typography
          sx={{ flexBasis: "140px", textAlign: "center", fontSize: "1rem" }}
        >
          {contact.phoneno}
        </Typography>
      </Box>

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
            dispatch(deleteContactsThunk(contact.id));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Box>
  );
};


