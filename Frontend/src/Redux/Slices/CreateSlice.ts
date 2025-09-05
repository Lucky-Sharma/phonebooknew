import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
export interface Contact {
  id: number;
  name: string;
  image?: string;
  phoneno: number;
  address: string;
  label: string;
  bookmarked?: boolean;
}

export interface FormState {
  image: string;
  name: string;
  phoneno: string;
  address: string;
  category: string;
  imageFile?: File | null;
}
export interface UIState {
  searchTerm: string;
  selectedFilter: string;
  editOpen: boolean;
  selectedContact: Contact | null;
  showPersonCard: boolean;
  counter: number;
  submittedAllert: boolean;
  TotalPages: number;
}

export interface contactState {
  Contacts: Contact[];
  UI: UIState;
  form: FormState;
  pagination: {
    currentPage: number;
  };
  loading: boolean;
  error: string | null;
}

export const fetchContactsThunk = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await fetch("/api/allcontacts",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        token:localStorage.getItem("token: ")
      })
    });
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    console.log("token from fetch:",localStorage.getItem("token"))
    const res = await response.json();
    const fix = res.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      phoneno: Number(item.phoneno),
      address: item.address,
      label: item.label,
      image: item.imgsrc ?? item.image ?? undefined,
      bookmarked: item.bookmark,
    })) as Contact[];

    return fix;
  }
);

export const CreateContactThunk = createAsyncThunk<
  Contact,
  {
    name: string;
    phoneno: string;
    address: string;
    label: string;
    image?: string;
  }
>("contacts/CreateContact", async (contactData) => {
  try {
    const response = await fetch("/api/createContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const created = await response.json();
    return created as Contact;
  } catch (err: any) {
    return err;
  }
});

export const deleteContactsThunk = createAsyncThunk(
  "contacts/deleteContact",
  async (id: number) => {
    try {
      const response = await fetch("/api/deleteData", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      return id;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const editDataThunk = createAsyncThunk<
  Contact,
  {
    id: number;
    name?: string;
    phoneno?: string;
    address?: string;
    label?: string;
    image?: string;
  }
>("contacts/editData", async (contactData) => {
  const response = await fetch("/api/editData", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error("Failed to update contact");
  }

  const updatedContact: Contact = await response.json();
  return updatedContact;
});

const initialState: contactState = {
  Contacts: [
  
  ],
  UI: {
    searchTerm: "",
    selectedFilter: "",
    editOpen: false,
    selectedContact: null,
    showPersonCard: false,
    counter: 0,
    submittedAllert: false,
    TotalPages: 1,
  },
  form: {
    name: "",
    phoneno: "",
    address: "",
    category: "",
    image: "",
  },
  pagination: {
    currentPage: 1,
  },
  loading: false,
  error: null,
};

export const changeContacts = createSlice({
  name: "ChangeContacts",
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
        image: "",
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
          contact.phoneno = Number(action.payload.Phoneno);
        }
        if (action.payload.Address !== undefined) {
          contact.address = action.payload.Address;
        }
        if (action.payload.Label !== undefined) {
          contact.label = action.payload.Label;
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
    },
    setsubmittedAllert: (state, action: PayloadAction<boolean>) => {
      state.UI.submittedAllert = action.payload;
    },
    setAllData: (state, action: PayloadAction<Contact[]>) => {
      state.Contacts = action.payload || [];
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.UI.TotalPages = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      //getdata
      .addCase(fetchContactsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchContactsThunk.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.Contacts = action.payload;
        }
      )
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      })

      //delete
      .addCase(deleteContactsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteContactsThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.Contacts = state.Contacts.filter(
            (c) => c.id !== action.payload
          );
        }
      )
      .addCase(deleteContactsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.stringify(action.payload);
      })

      //create
      .addCase(CreateContactThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        CreateContactThunk.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.loading = false;
          state.Contacts.push(action.payload);
        }
      )
      .addCase(CreateContactThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.stringify(action.payload);
      })

      //update
      .addCase(editDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        editDataThunk.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.loading = false;
          state.error = JSON.stringify(action.payload);
        }
      )
      .addCase(editDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.stringify(action.payload);
      });
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
  setCounter,
  setsubmittedAllert,
  setAllData,
  setTotalPages,
} = changeContacts.actions;

export default changeContacts.reducer;
