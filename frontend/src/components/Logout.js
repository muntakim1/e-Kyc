import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

export default function LogOut() {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("access_token");

    history.push("/login");
  });
  return <div>Logout</div>;
}
