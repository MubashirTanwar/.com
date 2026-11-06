'use client'
import React from "react";



const row2 = [
  'typescript.png',
  'javascript.png',
  'python.png',
  'go.png',
  'u-react.png',
  'u-reactnext.png',
  'tanstack-query.png',
  'u-tailwind.png',
  'u-uredux.png',
  'v-anodejs.png',
  'v-bexpress.png',
  'fastapi.png',
  'socketio.png',
  'prisma.png',
  'v-postgresql.png',
  'v-mongodb.png',
  'redis.png',
  'neo4j.png',
  'langchain.png',
  'claude.png',
  'docker.png',
  'aws.png',
  'vercel.png',
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
                  alt={el.replace(/\.png$/, "")}
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
                  alt=""
                  className="object-contain w-full h-full rounded-lg object-center"
                />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}