interface TaskItemProps {
  title: string;
  buttonText?: string;
  imageUrl?: string;
}

function TaskItems({ title, buttonText = 'Realizar', imageUrl = ''}: TaskItemProps) {
  return (
    <div className="flex items-center justify-between max-w-200 max-h-100 p-4 border-l-6 border-[#0072C6] shadow-lg">
      <div className="flex items-center gap-4">
        <div className="max-w-12 max-h-12 bg-gray-200 rounded-full">
          {imageUrl && <img src={imageUrl} alt="Task" className="w-full h-full rounded-full" />}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <button className="px-4 py-2 bg-[#0072C6] min-w-25 text-white rounded-lg hover:bg-[#005999] cursor-pointer">
      {buttonText}
      </button>
    </div>
  )
}

export default TaskItems