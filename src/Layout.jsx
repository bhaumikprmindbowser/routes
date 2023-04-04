import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div class="grid-container">
      <div class="item1">Header</div>
      <div class="item2">Menu</div>
      <div class="item3">
        <Outlet />
      </div>
      <div class="item4">Right</div>
      <div class="item5">Footer</div>
    </div>
  );
}

export default Layout;
