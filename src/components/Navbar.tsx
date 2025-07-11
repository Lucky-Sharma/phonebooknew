import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { Create } from "./Create";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSelectedFilter } from "../Redux/Slices/CreateSlice";
import type { RootState } from "../Redux/Store";
import Divider from "@mui/material/Divider";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function Navbar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(
    (state: RootState) => state.ContectReducer.UI.searchTerm
  );
  const selectedFilter = useSelector(
    (state: RootState) => state.ContectReducer.UI.selectedFilter
  );

  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    dispatch(setSelectedFilter(event.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{ display: "flex", alignItems: "center", background: "white" }}
        >
          <Box
            sx={{
              padding: "5px",
              margin: "5px",
              border: "solid 1px",
              borderRadius: "200%",
              backgroundColor: "#4169E1",
              color: "white",
            }}
          >
            <PersonIcon />
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
            >
              PhoneBook
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "black" }} />
                </InputAdornment>
              }
              sx={{
                backgroundColor: "white",
                color: "black",
                px: 1,
                borderRadius: 1,
                flex: 1,
                boxShadow: 3,
                maxWidth: 250,
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }} />
          <div>
            <Select
              value={selectedFilter}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ "aria-label": "Filter contacts by label" }}
              sx={{ color: "black", ml: 2, minWidth: 20 }}
              variant="standard"
              startAdornment={<FilterAltIcon sx={{ mr: 1 }} />}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Friend">Friend</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
              <MenuItem value="school">School</MenuItem>
            </Select>

            <Button
              sx={{
                m: 3,
                borderRadius: "20px",
                background: "white",
                color: "black",
              }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateOpen}
            >
              Create Contact
            </Button>
          </div>
        </Toolbar>
        <Divider component="li" style={{ backgroundColor: "white" }} />
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "10px",
          }}
        >
          <span
            style={{
              marginRight: "20px",
              marginLeft: "200px",
              marginBottom: "10px",
            }}
          >
            Name
          </span>
          <span style={{ marginRight: "480px", marginLeft: "00px" }}>
            Phone Number
          </span>
        </div>
      </AppBar>

      <Create open={createOpen} onClose={handleCreateClose} />
    </Box>
  );
}
