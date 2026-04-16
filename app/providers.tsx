"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import { generateAdminToken } from "@/lib/firebase-messaging";
import axios from "axios";
import { useEffect } from "react";


export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  return <Provider store={store}>{children}</Provider>;
}