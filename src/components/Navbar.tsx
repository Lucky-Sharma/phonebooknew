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
  Divider,
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
      <AppBar position="static" elevation={0} sx={{ padding: 0, minHeight: "auto" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "white",
            px: 2,
            py: 1,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
         
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                border: "solid 1px",
                borderRadius: "100%",
                backgroundColor: "#4169E1",
                color: "white",
                p: "6px",
              }}
            >
              <PersonIcon />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: "black", display: { xs: "none", sm: "block" } }}
            >
              PhoneBook
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
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
                boxShadow: 3,
                width: "100%",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Select
              value={selectedFilter}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ "aria-label": "Filter contacts by label" }}
              variant="standard"
              startAdornment={<FilterAltIcon sx={{ mr: 1 }} />}
              sx={{ color: "black", minWidth: 120 }}
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
                borderRadius: "20px",
                background: "white",
                color: "black",
                whiteSpace: "nowrap",
              }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateOpen}
            >
              Create Contact
            </Button>
          </Box>
        </Toolbar>

        <Divider component="li" style={{ backgroundColor: "white" }} />

        <Box
          sx={{
            backgroundColor: "white",
            color: "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 1,
          }}
        >
          <Typography sx={{ flex: 1, marginRight:5, marginLeft:14}} >Name</Typography>
          <Typography sx={{ flex: 1, textAlign: "right", marginRight:17}}>Phone Number</Typography>
          <Typography sx={{ flex: 1, textAlign: "right", marginRight:10}}>Actions</Typography>

        </Box>
      </AppBar>

      {/* Create Modal */}
      <Create open={createOpen} onClose={handleCreateClose} />
    </Box>
  );
}
