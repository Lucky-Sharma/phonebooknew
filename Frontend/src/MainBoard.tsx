import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./Redux/Store";
import type { AppDispatch } from "./Redux/Store";
import { Navbar } from "./components/Navbar";
import { PhoneList } from "./components/Phonelist";
import { Editcard } from "./components/Editcard";
import { useEffect, useMemo, useState } from "react";
import { setAllData } from "./Redux/Slices/CreateSlice";

import {
  setCounter,
  setPagination,
  setsubmittedAllert,
  setTotalPages,
} from "./Redux/Slices/CreateSlice";
import { Alert, Button, Snackbar } from "@mui/material";
import { PersonCard } from "./components/PersonCard";
import { Counter } from "./components/Counter";
import DoneIcon from "@mui/icons-material/Done";

const pageLength = 5;

export const MainBoard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentPage = useSelector(
    (state: RootState) => state.ContactReducer.pagination.currentPage
  );
  const Data = useSelector((state: RootState) => state.ContactReducer.Contacts);
  const searchTerm = useSelector(
    (state: RootState) => state.ContactReducer.UI.searchTerm
  );

  const selectedFilter = useSelector(
    (state: RootState) => state.ContactReducer.UI.selectedFilter
  );
  const allertStatus = useSelector(
    (state: RootState) => state.ContactReducer.UI.submittedAllert
  );
  const totalPages = useSelector(
    (state: RootState) => state.ContactReducer.UI.TotalPages
  );
  const bookmark = useSelector(
    (state:RootState) => state.ContactReducer.Contacts.map(c=> c.bookmarked)
  )

    const mbookmark = useMemo(()=>bookmark,[JSON.stringify(bookmark)]);
  const filteredContacts = async () => {
    try {
      const q = new URLSearchParams();

      if (searchTerm) q.append("name", searchTerm);
      if (selectedFilter) q.append("filter", selectedFilter);

      q.append("page", currentPage.toString());
      q.append("limit", pageLength.toString());

      const response = await fetch(`/api/searchdata?${q.toString()}`,{
        method:'GET',
        headers:{
          Authorization:localStorage.getItem("token") || ""}
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data, total } = json;

      const sorted = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        phoneno: Number(item.phoneno),
        address: item.address,
        label: item.label,
        image: item.imgsrc ?? item.image ?? "",
        bookmarked: item.bookmark,
      }));

      dispatch(setTotalPages(Math.ceil(total / pageLength)));
      console.log("sortdata........: ", sorted);
      dispatch(setAllData(sorted));
      dispatch(setCounter(total));
    } catch (error) {
      console.error("Error fetching filtered contacts:", error);
    }
  };
  useEffect(() => {
    filteredContacts();
  }, []);

  useEffect(() => {
    dispatch(setPagination(1));
  }, [searchTerm, selectedFilter]);

  useEffect(() => {
    filteredContacts();
  }, [searchTerm, selectedFilter, currentPage,mbookmark]);

  const paginatedContacts = Data;

  return (
    <div>
      <Navbar />
      <Counter />
      {paginatedContacts.map((contact) => (
        <PhoneList key={contact.id} contact={contact} />
      ))}

      <div style={{ marginTop: "60px", display: "flex" }}>
        <Button
          disabled={currentPage === 1}
          onClick={() => dispatch(setPagination(currentPage - 1))}
          variant="outlined"
          style={{ fontWeight: "bold", fontFamily: "system-ui" }}
        >
          Prev
        </Button>

        <span
          style={{ margin: "0 10px", fontWeight: "bold", paddingTop: "8px" }}
        >
          Page {currentPage} of {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => dispatch(setPagination(currentPage + 1))}
          variant="outlined"
          style={{ fontWeight: "bold" }}
        >
          Next
        </Button>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={allertStatus}
        autoHideDuration={4000}
        onClose={() => dispatch(setsubmittedAllert(false))}
      >
        <Alert
          onClose={() => dispatch(setsubmittedAllert(false))}
          severity="success"
          icon={<DoneIcon />}
          sx={{
            width: "100%",
            backgroundColor: "#d4edda",
            color: "#155724",
            fontWeight: 500,
          }}
        >
          Phone Number has been added successfully!
        </Alert>
      </Snackbar>
      <Editcard />
      <PersonCard />
    </div>
  );
};
