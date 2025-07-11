import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import logo from "../../assets/react.svg";

export interface Contact {
  id: number;
  name: string;
  image?: string;
  Phoneno: number;
  Address: string;
  Label: string;
  bookmarked?: boolean;
}

export interface FormState {
  name: string;
  phoneno: string;
  address: string;
  category: string;
}
export interface UIState {
  searchTerm: string;
  selectedFilter: string;
  editOpen: boolean;
  selectedContact: Contact | null;
  showPersonCard: boolean;
  counter: number;
}

export interface CounterState {
  Contacts: Contact[];
  UI: UIState;
  form: FormState;
  pagination: {
    currentPage: number;
  };
}

const initialState: CounterState = {
  Contacts: [
    {
      id: 1,
      name: "Alice Johnson",
      image: logo,
      Phoneno: 9876543210,
      Address: "123 Maple Street, New York, NY",
      Label: "Friend",
    },
    {
      id: 2,
      name: "Bob Smith",
      Phoneno: 9123456789,
      Address: "456 Oak Avenue, Los Angeles, CA",
      Label: "Work",
    },
    {
      id: 3,
      name: "Carol Taylor",
      Phoneno: 9988776655,
      Address: "789 Pine Lane, Chicago, IL",
      Label: "Family",
    },
    {
      id: 4,
      name: "David Lee",
      Phoneno: 9871234567,
      Address: "321 Elm Blvd, Austin, TX",
      Label: "Gym",
    },
    {
      id: 5,
      name: "Emma Davis",
      Phoneno: 9812345670,
      Address: "135 Willow Road, Seattle, WA",
      Label: "Friend",
    },
    {
      id: 6,
      name: "Frank Wilson",
      Phoneno: 9765432109,
      Address: "246 Cedar Drive, Miami, FL",
      Label: "Colleague",
    },
    {
      id: 7,
      name: "Grace Miller",
      Phoneno: 9654321098,
      Address: "357 Birch Street, Denver, CO",
      Label: "Neighbor",
    },
    {
      id: 8,
      name: "Henry Clark",
      Phoneno: 9543210987,
      Address: "468 Spruce Way, Boston, MA",
      Label: "Work",
    },
    {
      id: 9,
      name: "Isabella Lewis",
      Phoneno: 9432109876,
      Address: "579 Aspen Circle, Portland, OR",
      Label: "Family",
    },
    {
      id: 10,
      name: "Jack Walker",
      Phoneno: 9321098765,
      Address: "680 Redwood Ave, San Diego, CA",
      Label: "Friend",
    },
  ],
  UI: {
    searchTerm: "",
    selectedFilter: "",
    editOpen: false,
    selectedContact: null,
    showPersonCard: false,
    counter: 0,
  },
  form: {
    name: "",
    phoneno: "",
    address: "",
    category: "",
  },
  pagination: {
    currentPage: 1,
  },
};

export const changeContacts = createSlice({
  name: "Changecontects",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.Contacts.push(action.payload);
    },

    deleteContact: (state, action: PayloadAction<number>) => {
      state.Contacts = state.Contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },

    setBookmark: (state, action: PayloadAction<number>) => {
      const contact = state.Contacts.find((c) => c.id === action.payload);
      if (contact) {
        contact.bookmarked = !contact.bookmarked;
      }
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.UI.searchTerm = action.payload;
    },

    setSelectedFilter: (state, action: PayloadAction<string>) => {
      state.UI.selectedFilter = action.payload;
    },

    setEditOpen: (state, action: PayloadAction<boolean>) => {
      state.UI.editOpen = action.payload;
    },

    setSelectedContact: (state, action: PayloadAction<Contact | null>) => {
      state.UI.selectedContact = action.payload;
    },

    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      state.form = { ...state.form, ...action.payload };
    },

    resetForm: (state) => {
      state.form = {
        name: "",
        phoneno: "",
        address: "",
        category: "",
      };
    },

    changeData: (
      state,
      action: PayloadAction<{
        id: number;
        name?: string;
        image?: string;
        Phoneno?: string;
        Address?: string;
        Label?: string;
      }>
    ) => {
      const contact = state.Contacts.find((c) => c.id === action.payload.id);
      if (contact) {
        if (action.payload.name !== undefined) {
          contact.name = action.payload.name;
        }
        if (action.payload.image !== undefined) {
          contact.image = action.payload.image;
        }
        if (action.payload.Phoneno !== undefined) {
          contact.Phoneno = Number(action.payload.Phoneno);
        }
        if (action.payload.Address !== undefined) {
          contact.Address = action.payload.Address;
        }
        if (action.payload.Label !== undefined) {
          contact.Label = action.payload.Label;
        }
      }
    },
    setPagination: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setShowPersonCard: (state, action: PayloadAction<boolean>) => {
      state.UI.showPersonCard = action.payload;
    },
    setCounter: (state, action) => {
  state.UI.counter = action.payload;
}
  },
});

export const {
  addContact,
  deleteContact,
  setBookmark,
  setSearchTerm,
  setSelectedFilter,
  setEditOpen,
  setSelectedContact,
  changeData,
  updateForm,
  resetForm,
  setPagination,
  setShowPersonCard,
  setCounter
} = changeContacts.actions;

export default changeContacts.reducer;
