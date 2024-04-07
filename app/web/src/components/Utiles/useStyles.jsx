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
      ${windowType === "validation" && !isGameTableVisible && "logo-success"}
      ${
        ["login", "register", "forgot", "reset"].includes(windowType)
          ? "logo-login"
          : ""
      }
      ${windowType === "create_table" ? "logo-create_table" : ""}`,

    containerTable: `container-table 
    ${
      isLogged ? "table-isLogged" : "table-notLogged"
    } 
    ${isGameTableVisible && "container-inGame"}
     
      container-${windowType}  
      ${windowType === "" && !isGameTableVisible && "container-acceuil"}
      ${windowType === "validation" && !isGameTableVisible && "container-success"}

      ${
        ["login", "register", "forgot", "reset"].includes(windowType) &&
        !isLogged
          ? "container-logIn"
          : ""
      }
      ${windowType === "create_table" && "container-create_table"}
      `,
  };
}
