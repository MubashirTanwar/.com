import React from "react";
import StackHome from "./Carousel";
import Links from "./Links";
function Stack() {
  return (
    <div className="lg:grid lg:grid-cols-4 pt-4 rounded-3xl gap-4 space-y-4 lg:space-y-0">
      <div className="col-span-4  rounded-3xl border border-[#242424] bg-[#141414] lg:col-span-3">
        <div className="p-6">
          <h1 className="mt-3 text-3xl text-white">Stack I Use</h1>
          <StackHome />
        </div>
      </div>
      <Links />
    </div>
  );
}

export default Stack;
