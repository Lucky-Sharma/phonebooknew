import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
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

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";


const cld = new Cloudinary({
  cloud: {
    cloudName: "dhlxgbvwb",
  },
});


const extractPublicId = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const filename = parts.pop()|| "";
    return filename.split(".")[0];
  } catch {
    return null;
  }
};

type Props = {
  contact: Contact;
};

export const PhoneList = ({ contact }: Props) => {
  const dispatch = useDispatch();

  const bookmarkState = useSelector(
    (state: RootState) =>
      state.ContactReducer.Contacts.find((c) => c.id === contact.id)?.bookmarked
  );

  const contacts = useSelector((state: RootState) => state.ContactReducer.Contacts);

  const handleBookmarkToggle = () => {
    dispatch(setBookmark(contact.id));
  };

  const editHandler = (id: number) => {
    const contactToEdit = contacts.find((c) => c.id === id);
    if (contactToEdit) {
      dispatch(setSelectedContact(contactToEdit));
      dispatch(setEditOpen(true));
    }
  };

  let avatarContent;
  const publicId = contact.image ? extractPublicId(contact.image) : null;

  if (publicId) {
    const cloudinaryImage = cld.image(publicId).resize(fill().width(60).height(60).gravity(autoGravity()));

    avatarContent = (
      <AdvancedImage
        cldImg={cloudinaryImage}
        style={{ borderRadius: "50%", width: 60, height: 60 }}
        alt={contact.name}
      />
    );
  } else {
    avatarContent = <Avatar sx={{ width: 60, height: 60 }}>{contact.name[0]}</Avatar>;
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
        },
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", minWidth: "180px" }}
        className="avatar_name"
      >
        {avatarContent}
        <Typography sx={{ flex: 1, fontWeight: "medium", marginLeft: 1 }}>
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
  );
};
