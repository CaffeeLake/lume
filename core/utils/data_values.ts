import type { Data } from "../file.ts";

/**
 * Get the value of a page data
 * For example, if the value is "=title", it returns the value of the page data "title"
 * If the value is "$.title", it will return the value of the element with the selector ".title"
 */
export function getDataValue(data: Partial<Data>, value?: unknown) {
  // Get the value from the page data
  if (typeof value === "string") {
    if (value.startsWith("=")) {
      const key = value.slice(1);

      if (!key.includes(".")) {
        return data[key];
      }

      const keys = key.split(".");
      let val = data;
      for (const key of keys) {
        val = val?.[key];
      }
      return val;
    }

    if (value.startsWith("$")) {
      const document = data.page?.document;
      const query = value.slice(1);
      const element = document?.querySelector(query);
      return element?.innerHTML;
    }
  }

  if (typeof value === "function") {
    return value(data);
  }

  return value;
}
