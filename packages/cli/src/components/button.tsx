import clsx from 'clsx'

type ButtonProps = {
  text: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

export default function Button({
  onClick,
  disabled,
  className,
  text,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'bg-sky-200 border disabled:bg-slate-200 border-sky-400 hover:bg-sky-300 transition-colors cursor-pointer disabled:cursor-default rounded p-2 w-full text-sky-800',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
