import { ParsedQs } from "qs";

function isValidObject(
    search: string | ParsedQs | string[] | ParsedQs[] | undefined
): search is Record<string, string> {
  return (
      typeof search === "object" &&
      search !== null &&
      !Array.isArray(search) &&
      Object.values(search).every(value => typeof value === "string")
  );
}

export default isValidObject;
