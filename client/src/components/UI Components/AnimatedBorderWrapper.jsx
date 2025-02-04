import React from 'react'


const AnimatedBorderWrapper = ({ children }) => {
    return (
        <div className="relative flex flex-col">
            <div className="flex items-center justify-center">
                <div className="w-full relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl p-[0.2rem]">
                    <div className="absolute inset-0 h-full w-full animate-rotate rounded-full bg-[conic-gradient(#fff_20deg,transparent_120deg)]"></div>
                    {/* <div className="absolute inset-0 h-full w-full animate-rotate rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div> */}
                    <div className="relative z-20 flex w-full rounded-[0.60rem] bg-black p-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimatedBorderWrapper