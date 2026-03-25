import { PageContext } from "vike/types";

export async function onCreatePageContext(pageContext: PageContext) {
  return {
    ...pageContext,
  };
}
