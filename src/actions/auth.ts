"use server";

import { redirect, RedirectType } from "next/navigation";

export const redirectToUrl = async (url: string, type?: RedirectType) => {
  redirect(url, type);
};
