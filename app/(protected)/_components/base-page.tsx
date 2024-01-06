import React from "react";

type PageHeaderProps = {
    title: string,
    children?: React.ReactNode,
    button?: React.JSX.Element
}
export const BasePage = ({title, children, button}: PageHeaderProps) => {
    return (
        <div className='w-full gap-5 flex flex-col'>
            <div className='px-6 pb-2 flex justify-between items-center w-full border-b'>
                <h1 className='text-xl text-cyan-700'><span className=''>{`>`}</span>{title}</h1>
                {button}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
