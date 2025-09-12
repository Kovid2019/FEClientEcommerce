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
    if (typeof window !== "undefined" && window.crypto?.randomUUID) {
      // ✅ Only call if it really exists
      guestId = window.crypto.randomUUID();
    } else if (
      typeof window !== "undefined" &&
      window.crypto?.getRandomValues
    ) {
      // ✅ Polyfill if randomUUID is missing
      guestId = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (window.crypto.getRandomValues(new Uint8Array(1))[0] &
            (15 >> (c / 4)))
        ).toString(16)
      );
    } else {
      // Last fallback: Math.random (not cryptographically strong)
      guestId =
        Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};
