export type FzfOptions = {
  /* required */
  list: Array<string>;

  /* optional (and defaults) */
  // filtering mode (user can change modes by pressing ctrl-s)
  mode: "fuzzy" | "normal";

  // prefill user input
  prefill: "";

  // text before each displayed line, list index supplied as arg
  prelinehook: (index: number) => string;

  // text after each displayed line, list index supplied as arg
  postlinehook: (index: number) => string;
};
