export function getStyles(windowType, isLogged, isGameTableVisible) {
  return {
    compTable: `comp-table ${
      ["login", "register", "forgot", "reset"].includes(windowType)
        ? "comp-table-login"
        : ""
    } ${windowType === "settings" && "comp-table-login"}
      ${windowType === "tutorial" && "comp-table-tutorial"}
      ${windowType === "" && isLogged && "comp-table-inGame"}`,

    logoComponent: `logo-acceuil logo-${windowType}
      ${windowType === "" && isGameTableVisible && "disappear"}
      ${
        ["login", "register", "forgot", "reset"].includes(windowType)
          ? "logo-login"
          : ""
      }
      ${windowType === "list_table" ? "logo-profile" : ""}
      ${windowType === "create_table" ? "logo-create_table" : ""}`,

    containerTable: `container-table 
    ${
      isLogged ? "table-isLogged" : "table-notLogged"
    } 
    ${isGameTableVisible && "container-inGame"}
     
      container-${windowType}  
      ${windowType === "" && !isGameTableVisible && "container-acceuil"}
      ${
        ["login", "register", "forgot", "reset"].includes(windowType) &&
        !isLogged
          ? "container-logIn"
          : ""
      }
      ${
        windowType === "list_table" && !isGameTableVisible
          ? "container-list_table"
          : ""
      }
      ${windowType === "create_table" && "container-create_table"}
      `,
  };
}
