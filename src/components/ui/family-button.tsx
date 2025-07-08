"use client"

import { FC, ReactNode, useState } from "react"
import { PlusIcon, XIcon } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const CONTAINER_SIZE = 250

interface FamilyButtonProps {
  children: React.ReactNode
}

const FamilyButton: FC<FamilyButtonProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div
      className={cn(
        "rounded-[24px] border shadow-sm",
        "border-[#d9dbde] dark:border-[#242424]",
        "bg-[#f4f5f6] dark:bg-[#141414]",
        isExpanded ? "w-[204px]" : "w-auto"
      )}
    >
      <div className="rounded-[23px] border border-transparent">
        <div className="rounded-[22px] border border-transparent">
          <div className="rounded-[21px] border border-transparent flex items-center justify-center">
            <FamilyButtonContainer isExpanded={isExpanded} toggleExpand={toggleExpand}>
              {isExpanded && (
                <motion.div
                className="flex flex-col items-center justify-center p-4 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                >
                  {children}
                </motion.div>
              )}
            </FamilyButtonContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FamilyButtonContainerProps {
  isExpanded: boolean
  toggleExpand: () => void
  children: ReactNode
}

const FamilyButtonContainer: FC<FamilyButtonContainerProps> = ({
  isExpanded,
  toggleExpand,
  children,
}) => {
  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center text-[#1f1f1f] dark:text-[#cccccc] cursor-pointer z-10",
        "border border-[#d9dbde] dark:border-[#242424]",
        " rounded-3xl shadow-md"
      )}
      layoutRoot
      layout
      initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
      animate={
        isExpanded
          ? {
              borderRadius: 20,
              width: CONTAINER_SIZE,
              height: CONTAINER_SIZE + 50,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 400,
                when: "beforeChildren",
              },
            }
          : {
              borderRadius: 21,
              width: "4rem",
              height: "4rem",
            }
      }
    >
      {children}

      <motion.div
        className="absolute"
        initial={{ x: "-50%" }}
        animate={{
          x: isExpanded ? "0%" : "-50%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        style={{ left: isExpanded ? "" : "50%", bottom: 6 }}
      >
        {isExpanded ? (
          <motion.div
            className="p-[10px] group border border-[#d9dbde] dark:border-[#242424] bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full shadow-2xl"
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={false}
            animate={{
              rotate: -360,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <XIcon className="h-7 w-7 text-[#1f1f1f] dark:text-[#cccccc]" />
          </motion.div>
        ) : (
          <motion.div
            className="p-[10px] group border border-[#d9dbde] dark:border-[#242424] bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full shadow-2xl"
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{
              rotate: -180,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <PlusIcon className="h-7 w-7 text-[#1f1f1f] dark:text-[#cccccc]" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export { FamilyButton }
export default FamilyButton
