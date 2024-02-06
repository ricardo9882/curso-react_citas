export const Error = ({children}) => {
    return (
        <>
            <div className="bg-red-800 text-white text-center uppercase font-bold p-3 mb-3">
                <p>
                    {children}
                </p>
            </div>
        </>
    )
}
