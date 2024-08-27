import { FC } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  stars: number;
}

export const StarRating: FC<StarRatingProps> = ({ stars }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star 
          key={index} 
          size={24} 
          fill={index + 1 > stars ? '#A9AE9A' : '#fff'} 
          color={index + 1 > stars ? '#A9AE9A' : '#fff'} 
        />
      ))}
    </div>
  );
};
