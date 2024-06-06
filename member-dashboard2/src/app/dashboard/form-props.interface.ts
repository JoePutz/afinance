type FormProp = {
  mask?: string,
  dropSpecialCharacters?: boolean,
  errorMessages?: { [errorName: string]: string }
}
export type FormProps = {
  [controlName: string]: FormProp
};
