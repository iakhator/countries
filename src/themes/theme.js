const $white = "#ffffff"
const $offBlack = "#111517"
const $gray = "#F2F2F2"
const $bluish_gray = "#202C36"
const $darkBackground = "#2B3844"

export const themes = {
  light: {
    color: $offBlack,
    background: $gray,
    minHeight: "100vh",
    height: "auto",
    selectHeight: '56px',
    selectWidth: '500px',
    header: {
      background: $white,
      color: $offBlack,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.0562443)",
    },
    brand: {
      color: $offBlack
    },
    card: {
      background: $white,
      boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)"
    },
    search: {
      background: $white,
      boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.0532439)",
      color: "#848484"
    },
    input: {
      color: "#848484",
      background: "inherit"
    },
    button: {
      boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)",
      background: $white,
      color: $offBlack,
    },
    borderButton: {
      boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.104931)",
      fontSize: "12px",
      textAlign: "center",
      width: "96px",
      height: "28px",
      borderRadius: "2px"
    },
    select: {
      backgroundColor: $white,
      color: $offBlack,
      width: '200px',
      height: '56px',
      border: 'none',
      boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.0532439)",
      menu: {
        backgroundColor: $white,
        color: $offBlack,
      },
      singleValue:{
        color: $offBlack,
      },
      options: (state) => ({
        background: state.isSelected ? $gray : 'inherit',
        color: state.isSelected ? $offBlack : 'inherit',
        '&:hover': { 
          background: $gray,
          color: $offBlack
        }
      })
    }
  },

  dark: {
    color: $white,
    backgroundColor: $bluish_gray,
    minHeight: "100vh",
    height: "auto",
    header: {
      backgroundColor: $darkBackground,
    },
    brand: {
      color: $white
    },
    card: {
      backgroundColor: $darkBackground,
      boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)"
    },
    search: {
      background: $darkBackground,
      boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.0532439)"
    },
    input: {
      backgroundColor: "inherit",
      color: $white
    },
    button: {
      boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)",
      backgroundColor: $darkBackground,
      color: $white
    },
    borderButton: {
      boxShadow: "0px 0px 4px 1px rgba(17, 21, 23, 0.252406)",
      backgroundColor: $darkBackground,
      color: $white,
      fontSize: "12px",
      textAlign: "center",
      width: "96px",
      height: "28px",
      borderRadius: "2px"
    },
    select: {
      color: $white,
      backgroundColor: $darkBackground,
      width: '200px',
      height: '56px',
      border: 'none',
      boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.0532439)",
      menu: {
        backgroundColor: $darkBackground,
        color: $white,
      },
      singleValue:{
        color: $white,
      },
      options:(state) => ({
        background: state.isSelected ? $bluish_gray : 'inherit',
        '&:hover': { 
          background: $bluish_gray,
        }
      })
    }
  },
  // lightSearch: {
  //   background: $white,
  //   boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.0532439)",
  //   color: "#848484"
  // },
};
