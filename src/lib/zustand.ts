import { createWithEqualityFn as create } from "zustand/traditional";

export interface IsChangeForTabProps {
  isChangeForTab: boolean;
}

export interface SetIsChangeForTabProps {
  setIsChangeForTab: (val: boolean) => void;
}

export const useCheckChangeForTab = create<
  IsChangeForTabProps & SetIsChangeForTabProps
>((set) => ({
  isChangeForTab: false,
  setIsChangeForTab: (val) =>
    set(() => ({
      isChangeForTab: val,
    })),
}));

export interface IsTabOpenProps {
  isTabOpen: boolean;
}

export interface SetIsTabOpenProps {
  setIsTabOpen: (val: boolean) => void;
}

export const useCheckTabOpen = create<IsTabOpenProps & SetIsTabOpenProps>(
  (set) => ({
    isTabOpen: false,
    setIsTabOpen: (val) =>
      set(() => ({
        isTabOpen: val,
      })),
  }),
);

export interface tabsProps {
  tabs: "edit" | "view";
}

export interface setTabsProps {
  setTabs: (val: tabsProps["tabs"]) => void;
}

export const useChangeTab = create<tabsProps & setTabsProps>((set) => ({
  tabs: "edit",
  setTabs: (val) =>
    set(() => ({
      tabs: val,
    })),
}));

export interface formSubmitMsgProps {
  formSubmitMsg: null | string;
}

export interface setFormSubmitMsgProps {
  setFormSubmitMsg: (val: formSubmitMsgProps["formSubmitMsg"]) => void;
}

export const useFormSubmitMsg = create<
  formSubmitMsgProps & setFormSubmitMsgProps
>((set) => ({
  formSubmitMsg: null,
  setFormSubmitMsg: (val) =>
    set(() => ({
      formSubmitMsg: val,
    })),
}));

export interface deleteProfile {
  deleteProfile: boolean;
}
export interface deleteProfileAction {
  deleteProfileAction: (value: deleteProfile["deleteProfile"]) => void;
}
export const useDeleteProfile = create<deleteProfile & deleteProfileAction>(
  (set) => ({
    deleteProfile: false,
    deleteProfileAction: (value) =>
      set(() => ({
        deleteProfile: value,
      })),
  }),
);

export interface deleteUserState {
  deleteUser: boolean;
}

export interface deleteUserAction {
  deleteUserAction: (value: deleteUserState["deleteUser"]) => void;
}

export const useDeleteUser = create<deleteUserState & deleteUserAction>(
  (set) => ({
    deleteUser: false,
    deleteUserAction: (value) =>
      set(() => ({
        deleteUser: value,
      })),
  }),
);
