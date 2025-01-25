const $white = "#ffffff"
const $offBlack = "#111517"
const $darkBackground = "#2B3844"

export const themes = {
  light: {
    color: $offBlack,
    background: "#F2F2F2",
    minHeight: "100vh",
    height: "auto",
    selectHeight: '56px',
    selectWidth: '500px',
  },
  lightSearch: {
    background: $white,
    boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.0532439)",
    color: "#848484"
  },
  lightSelect: {
    color: $offBlack,
    background: $white,
    height: '56px',
    width: '200px',
  },
  lightInput: {
    color: "#848484",
    background: "inherit"
  },
  lightHeader: {
    background: $white,
    color: $offBlack,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.0562443)",
  },
  lightBrand: {
    color: $offBlack
  },
  lightCard: {
    background: $white,
    boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)"
  },
  lightButton: {
    boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)",
    background: $white,
    color: $offBlack,
  },
  lightButtonBorder: {
    boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.104931)",
    fontSize: "12px",
    textAlign: "center",
    width: "96px",
    height: "28px",
    borderRadius: "2px"
  },
  dark: {
    color: $white,
    background: "#202C36",
    minHeight: "100vh",
    height: "auto"
  },
  darkHeader: {
    background: $darkBackground,
  },
  darkSearch: {
    background: $darkBackground,
    boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.0532439)"
  },
  darkInput: {
    background: "inherit",
    color: $white
  },
  darkBrand: {
    color: $white
  },
  darkCard: {
    background: $darkBackground,
    boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)"
  },
   darkButton: {
    boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.0294384)",
    background: $darkBackground,
    color: $white
  },
   darkButtonBorder: {
    boxShadow: "0px 0px 4px 1px rgba(17, 21, 23, 0.252406)",
    background: $darkBackground,
    color: $white,
    fontSize: "12px",
    textAlign: "center",
    width: "96px",
    height: "28px",
    borderRadius: "2px"
  },
};
