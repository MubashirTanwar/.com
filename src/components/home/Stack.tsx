import React from "react";
import StackHome from "./Carousel";


function Stack() {
  return (
    <div className="grid grid-cols-3 pt-4 rounded-3xl">
      <div className="col-span-1  rounded-3xl border border-[#242424] bg-[#141414] md:col-span-2">
        <div className="p-6">
          <h1 className="mt-3 text-3xl text-white">Stack I Use</h1>
          <StackHome />
        </div>
      </div>
    </div>
  );
}

export default Stack;
