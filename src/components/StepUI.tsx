type StepUIProps = {
    count: number,
    title: string,
    level: number
  }
  
const StepUI = ({count, title, level}: StepUIProps) => {
    return (
      <div className="flex flex-row items-center my-6">
        <div className={`
          ${count < level ? 
            "bg-[#19B400]"
          : count === level ?
            "bg-gradient-to-b from-[#F3BC51] to-[#936100]" 
          : "border-[1px] border-[#2C2C5A] "
          } 
          w-7 h-7 rounded-full mr-4 ml-2 text-center`}>
          <div className="top-0.5 relative">{count}</div>
        </div>
        <h5 className="font-semibold">
          {title}
        </h5>
      </div>
    )
}

export default StepUI;