export const getInitials = (firstName, lastName) => {
  return {
    first: firstName.slice(0, 1),
    last: lastName.slice(0, 1),
  };
};
