interface FeatureBadgeProps {
  text: string;
  className?: string;
}

export default function FeatureBadge({ text, className = "" }: FeatureBadgeProps) {
  return (
    <p className={`text-[20px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2] bg-white border border-[#3a76a5] rounded-lg px-6 py-3 md:px-8 md:py-4 ${className}`}>
      {text}
    </p>
  );
}
