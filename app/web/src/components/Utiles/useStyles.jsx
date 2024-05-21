/**
 * Generates styles based on window state and other parameters.
 * @param {string} windowType - The type of window. 
 * @param {boolean} isLogged - Indicates whether the user is logged in.
 * @param {boolean} isGameTableVisible - Indicates whether the game table is visible.
 * @param {boolean} isWindowOpen - Indicates whether any window is open.
 * @param {boolean} showWaitingMessage - Indicates whether a waiting message should be shown.
 * @param {boolean} isSpectator - Indicates whether the user is a spectator.
 * @returns {object} An object containing CSS classes for different components based on the provided parameters.
 */
export function getStyles(
  windowType,
  isLogged,
  isGameTableVisible,
  isWindowOpen,
  showWaitingMessage,
  isSpectator
) {
  // Utiliser 'accueil' comme fallback si windowType est vide et isGameTableVisible est false
  const effectiveWindowType =
    windowType || (!isGameTableVisible ? "accueil" : "");

  return {
    //Table Placement
    compTable: `comp-table
      ${isGameTableVisible && !isWindowOpen && "comp-table-inGame"}
      ${effectiveWindowType ? `comp-table-${effectiveWindowType}` : ""}
      ${
        (showWaitingMessage || isSpectator) &&
        isGameTableVisible &&
        !isWindowOpen &&
        "comp-table-waitingMessage"
      }
      `,

    //Table itself
    containerTable: `
      container-table
      ${isLogged ? "table-isLogged" : "table-notLogged"}
      ${effectiveWindowType ? `container-${effectiveWindowType}` : ""}
      ${isGameTableVisible && !isWindowOpen && "container-inGame"}
      `,

    //Logo
    logoComponent: `
      logo-main
      logo-${windowType}
      ${isGameTableVisible && !isWindowOpen && "disappear"}
    `,
  };
}
