"use client";

import StarRating from './StarRating';

interface ReviewCardProps {
    rating: number
    review: string
    author: string
    date: string
}

export default function ReviewCard({ rating, review, author, date }: ReviewCardProps) {
    return (
        <div className="bg-white p-8 rounded-lg border border-slate-100 flex flex-col flex-1 min-h-[300px]">
            <div className="mb-4">
                <StarRating rating={rating} size={16} />
            </div>
            <p className="text-body-subtitle mb-6 flex-grow text-left">
                {review}
            </p>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 gap-2 md:gap-0">
                <span className="text-body-subtitle !font-semibold text-left">{author}</span>
                <span className="text-body-subtitle text-left md:text-right">{date}</span>
            </div>
        </div>
    )
}
