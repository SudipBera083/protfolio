export function Container({ children, className = "" }) {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`
          w-full
          max-w-[1200px]
          px-6
          md:px-10
          lg:px-16
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  )
}