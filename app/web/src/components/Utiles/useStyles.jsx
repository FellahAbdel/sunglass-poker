export function getStyles(
  windowType,
  isLogged,
  isGameTableVisible,
  isWindowOpen
) {
  // Utiliser 'accueil' comme fallback si windowType est vide et isGameTableVisible est false
  const effectiveWindowType = windowType || (!isGameTableVisible ? "accueil" : "");

  return {
    //Table Placement
    compTable: `comp-table
      ${isGameTableVisible && !isWindowOpen && "comp-table-inGame"}
      ${effectiveWindowType ? `comp-table-${effectiveWindowType}` : ""}
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
      ${effectiveWindowType ? `logo-${effectiveWindowType}` : ""}
      ${isGameTableVisible && !isWindowOpen && "disappear"}
    `,
  };
}
