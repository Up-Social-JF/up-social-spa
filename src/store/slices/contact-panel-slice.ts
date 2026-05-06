import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export interface ContactPanelState {
  isOpen: boolean;
  subject: string | null;
}

const initialState: ContactPanelState = {
  isOpen: false,
  subject: null,
};

export const { actions, reducer } = createSlice({
  name: 'contactPanel',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<{ subject?: string } | undefined>) => {
      state.isOpen = true;
      state.subject = action.payload?.subject ?? null;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
      if (!state.isOpen) state.subject = null;
    },
  },
});

export const selectors = {
  selectIsOpen: (state: RootState) => state.contactPanel.isOpen,
  selectSubject: (state: RootState) => state.contactPanel.subject,
};
