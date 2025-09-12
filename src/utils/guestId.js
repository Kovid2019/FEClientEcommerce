// export const getOrCreateGuestId = () => {
//   let guestId = localStorage.getItem("guestId");
//   if (!guestId) {
//     // guestId = crypto.randomUUID();
//     guestId = window.crypto.randomUUID();

//     localStorage.setItem("guestId", guestId);
//   }
//   return guestId;
// };

export const getOrCreateGuestId = () => {
  let guestId = localStorage.getItem("guestId");

  if (!guestId) {
    if (typeof crypto.randomUUID === "function") {
      guestId = crypto.randomUUID();
    } else {
      // Polyfill UUID v4 if randomUUID is not available
      guestId = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }

    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};
