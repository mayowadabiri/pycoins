import { getInitials } from "./../utils/getInitials";

const appReducer = (state, action) => {
  switch (action.type) {
    case "CHECK_REGISTER":
      return {
        ...state,
        register: true,
      };
    case "SAVE_USER":
      const firstname = action.payload.user.firstName;
      const lastname = action.payload.user.lastName;
      const initial = getInitials(firstname, lastname);

      return {
        ...state,
        profile: action.payload,
        initials: `${initial.first}${initial.last}`,
        fullname: `${firstname} ${lastname}`,
      };
    case "SAVE_API_KEYS":
      return {
        ...state,
        apiKeys: action.payload,
      };
    case "SWITCH_TO_BUSINESS":
      return {
        ...state,
        profile: {
          ...state.profile,
          user: {
            ...state.profile.user,
            userType: "business",
          },
        },
      };

    case "LOGOUT_USER":
      return {
        ...state,
        register: false,
        profile: {},
        initials: null,
        fullname: "",
      };

    case "SAVE_ENVIRONMENT":
      return {
        ...state,
        environment: action.payload,
      };

    case "SAVE_SETLLEMENT":
      return {
        ...state,
        settlements: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
