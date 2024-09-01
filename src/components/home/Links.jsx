import React from 'react'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
function Links() {
    const Links = [
        {
            name: 'Github',
            url: 'htttps://github.com/MubashirTanwar',
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
            name: 'Twitter',
            url: 'https://twitter.com/MubashirTanwar',
            icon: <Twitter />,
            hover: 'bg-[#1da1f2]'
        },
        {
            name: 'Mail',
            url: 'mailto:tanwar0210@gmail.com',
            icon: <Mail />,
            hover: 'bg-[#c71610]'
        }

    ]
  return (
       <div className=" rounded-3xl lg:col-span-1">
        <div className="flex lg:flex-col gap-4  h-full text-white">
          <div className="flex  min-h-24 w-1/2 lg:w-full flex-row gap-4 h-1/2">
            <div className="rounded-3xl  bg-[#141414]  border border-[#242424] w-full flex items-center justify-center hover:bg-[#333]">
                <Github size={24} />
            </div>
            <div className="rounded-3xl bg-[#141414]  border border-[#242424] w-full flex items-center justify-center hover:bg-[#0077b5]">
                <Linkedin size={24} />
            </div>
          </div>
          <div className="flex  min-h-24 w-1/2 lg:w-full flex-row gap-4 h-1/2">
            <div className="rounded-3xl bg-[#141414]  border border-[#242424] w-full flex items-center justify-center hover:bg-[#c71610]">
              <Mail size={24} />
            </div>
            <div className="rounded-3xl bg-[#141414]  border border-[#242424] w-full flex items-center justify-center hover:bg-[#1da1f2]">
              <Twitter size={24} />
            </div>
          </div>
          
        </div>
      </div>
  );
}

export default Links

//    <div className="hidden lg:block rounded-3xl lg:col-span-1">
//         <div className="flex-col  h-full text-white">
//           <div className="flex pb-2 flex-row gap-4 h-1/2">
//             <div className="rounded-3xl bg-[#141414]  border border-[#242424] w-full flex items-center justify-center">
//                 <Github size={24} />
//             </div>
//             <div className="rounded-3xl bg-[#141414]  border border-[#242424] w-full flex items-center justify-center"> 
//                 <Linkedin size={24} />
//             </div>
//           </div>
//           <div className="flex pt-2 flex-row gap-4 h-1/2">
//             <div className="rounded-3xl bg-[#141414]  border border-[#242424] w-full flex items-center justify-center">
//               <Mail size={24} />
//             </div>
//             <div className="rounded-3xl bg-[#141414]  border border-[#242424] w-full flex items-center justify-center">
//               <Twitter size={24} />
//             </div>
//           </div>
          
//         </div>
//       </div>
