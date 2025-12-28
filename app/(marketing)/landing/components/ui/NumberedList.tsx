interface NumberedListProps {
  items: string[];
  className?: string;
}

export default function NumberedList({ items, className = "" }: NumberedListProps) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {items.map((item, index) => (
        <p key={index} className="text-body">
          {index + 1}. {item}
        </p>
      ))}
    </div>
  );
}
