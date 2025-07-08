import React from 'react'
import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react'
import Link from 'next/link';
function Links() {
    const Links = [
        {
            name: 'Github',
            url: 'https://github.com/MubashirTanwar',
            icon: <Github />,
            hover: 'bg-[#333]'
        },
        {
            name: 'Linkedin',
            url: 'https://www.linkedin.com/in/mubashir-tanwar/',
            icon: <Linkedin />,
            hover: 'bg-[#0077b5]'
        },
        {
            name: 'Resume',
            url: '/resume',
            icon: <FileText />,
            hover: 'bg-[#1da1f2]'
        },
        {
            name: 'Mail',
            url: 'mailto:me@mubashirtanwar.com',
            icon: <Mail />,
            hover: 'bg-[#c71610]'
        }

    ]
  return (
       <div className=" rounded-3xl lg:col-span-1">
        <div className="flex lg:flex-col gap-4  h-full text-[#1f1f1f] dark:text-[#cccccc]">
          <div className="flex  min-h-24 w-1/2 lg:w-full flex-row gap-4 h-1/2">
            {
              [0,1].map((i) => (
                <Link href={Links[i].url} key={i} className="rounded-3xl bg-white dark:bg-[#141414]  border border-[#d9dbde] dark:border-[#242424] w-full flex items-center justify-center hover:bg-opacity-50">
                  {Links[i].icon}
                </Link>
              ))
            }
          </div>
          <div className="flex  min-h-24 w-1/2 lg:w-full flex-row gap-4 h-1/2">
           {
              [2,3].map((i) => (
                <Link href={Links[i].url} key={i} className="rounded-3xl bg-white dark:bg-[#141414]  border border-[#d9dbde] dark:border-[#242424] w-full flex items-center justify-center hover:bg-opacity-50">
                  {Links[i].icon}
                </Link>
              ))
            }
          </div>
          
        </div>
      </div>
  );
}

export default Links

//    <div className="hidden lg:block rounded-3xl lg:col-span-1">
//         <div className="flex-col  h-full text-[#1f1f1f] dark:text-[#cccccc]">
//           <div className="flex pb-2 flex-row gap-4 h-1/2">
//             <div className="rounded-3xl bg-white dark:bg-[#141414]  border border-[#d9dbde] dark:border-[#242424] w-full flex items-center justify-center">
//                 <Github size={24} />
//             </div>
//             <div className="rounded-3xl bg-white dark:bg-[#141414]  border border-[#d9dbde] dark:border-[#242424] w-full flex items-center justify-center"> 
//                 <Linkedin size={24} />
//             </div>
//           </div>
//           <div className="flex pt-2 flex-row gap-4 h-1/2">
//             <div className="rounded-3xl bg-white dark:bg-[#141414]  border border-[#d9dbde] dark:border-[#242424] w-full flex items-center justify-center">
//               <Mail size={24} />
//             </div>
//             <div className="rounded-3xl bg-white dark:bg-[#141414]  border border-[#d9dbde] dark:border-[#242424] w-full flex items-center justify-center">
//               <Twitter size={24} />
//             </div>
//           </div>
          
//         </div>
//       </div>
