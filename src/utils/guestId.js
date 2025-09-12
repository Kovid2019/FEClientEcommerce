export const getOrCreateGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    // guestId = crypto.randomUUID();
    guestId = window.crypto.randomUUID();

    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};
