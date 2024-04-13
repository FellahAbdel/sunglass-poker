export function getStyles(
  windowType,
  isLogged,
  isGameTableVisible,
  isWindowOpen
) {
  return {
    //Table Placement
    compTable: `comp-table
      ${isGameTableVisible && !isWindowOpen && "comp-table-inGame"}
      comp-table-${windowType} 
      `,

    //Table itself
    containerTable: `
      container-table 
      ${isLogged ? "table-isLogged" : "table-notLogged"} 
      container-${windowType}
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
