export const truncate = function (
  fullStr: string | null | undefined,
  strLen: number = 12,
  separator: string = "..."
) {
  if (fullStr === null || fullStr === undefined) return;
  if (fullStr.length <= strLen) return fullStr;

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
};
