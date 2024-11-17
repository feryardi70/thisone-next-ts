"use server";

import { auth } from "../auth";

const getSession = async () => {
  const session = await auth();
  //console.log(session);
  return session;
};

export default getSession;
