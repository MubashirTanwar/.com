'use client'
import React from "react";



const row2 = [
  'cp.png',
  'go.png',
  'python.png',
  'javascript.png',
  'typescript.png',
  'u-react.png',
  'u-reactnext.png',
  'u-tailwind.png',
  'u-uredux.png',
  'v-anodejs.png',
  'v-bexpress.png',
  'v-django.png',
  'fastapi.png',
  'v-mongodb.png',
  'v-mysql.png',
  'v-postgresql.png',
  'docker.png',
  'v-wnpm.png',
]

export default function StackHome() {
  return (
    <div className="flex items-center justify-center mb-6">


        <div
          className="flex overflow-hidden mt-8 md:mt-9"
          style={{
            width: "calc(100vw - 50px)",
            maskImage:
              "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0))",
          }}
        >
          <div className="flex animate-marquee">
            {row2.map((el, index) => (
              <div
                key={index}
                className="flex w-12 h-12 lg:w-20 lg:h-20 mx-4 bg-black/10 dark:bg-white/10 p-2 rounded-xl justify-center items-center px-1"
              >
                <img
                  src={`/langs/${el}`}
                  alt="langs logo"
                  className="object-contain w-full h-full rounded-lg object-center"
                />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee">
            {row2.map((el, index) => (
              <div
                key={index}
                className="flex w-12 h-12 lg:w-20 lg:h-20 mx-4 bg-black/10 dark:bg-white/10 p-2 rounded-xl justify-center items-center px-1"
              >
                <img
                  src={`/langs/${el}`}
                  alt="company logo"
                  className="object-contain w-full h-full rounded-lg object-center"
                />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}