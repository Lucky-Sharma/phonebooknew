import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./Redux/Store";
import { Navbar } from "./components/Navbar";
import { PhoneList } from "./components/Phonelist";
import { Editcard } from "./components/Editcard";
import { useEffect } from "react";
import {
  setCounter,
  setPagination,
  setsubmittedAllert,
} from "./Redux/Slices/CreateSlice";
import { Alert, Button, Snackbar } from "@mui/material";
import { PersonCard } from "./components/PersonCard";
import { Counter } from "./components/Counter";
import DoneIcon from '@mui/icons-material/Done';
const page_Length = 5;

export const Board = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.ContectReducer.pagination.currentPage
  );
  const Data = useSelector((state: RootState) => state.ContectReducer.Contacts);
  const searchTerm = useSelector(
    (state: RootState) => state.ContectReducer.UI.searchTerm
  );
  const selectedFilter = useSelector(
    (state: RootState) => state.ContectReducer.UI.selectedFilter
  );
  const allertStatus = useSelector(
    (state: RootState) => state.ContectReducer.UI.submittedAllert
  );
  const filteredContacts = Data.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter
      ? contact.Label.toLowerCase() === selectedFilter.toLowerCase()
      : true;
    return matchesSearch && matchesFilter;
  });

  const sortedFilteredContacts = [...filteredContacts].sort((a, b) => {
    if (a.bookmarked === b.bookmarked) {
      return a.name.localeCompare(b.name);
    }
    return b.bookmarked ? 1 : -1;
  });

  const startIndex = (currentPage - 1) * page_Length;
  const endIndex = currentPage * page_Length;
  const paginatedContacts = sortedFilteredContacts.slice(startIndex, endIndex);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / page_Length)
  );

  useEffect(() => {
    dispatch(setPagination(1));
  }, [searchTerm, selectedFilter]);

  useEffect(() => {
    dispatch(setCounter(sortedFilteredContacts.length));
  }, [sortedFilteredContacts]);

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
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  open={allertStatus}
  autoHideDuration={4000}
  onClose={() => dispatch(setsubmittedAllert(false))}
>
  <Alert
    onClose={() => dispatch(setsubmittedAllert(false))}
    severity="success"
    icon={<DoneIcon/>}
    sx={{
      width: '100%',
      backgroundColor: '#d4edda', 
      color: '#155724',           
      fontWeight: 500
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
