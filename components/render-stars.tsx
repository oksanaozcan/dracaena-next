import { StarIcon } from "lucide-react";

interface RenderStarsProps {
  rating: number;
}

export const RenderStars = ({ rating }: RenderStarsProps) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const outlinedStars = totalStars - filledStars;

  return (
    <div className="flex">
      {Array(filledStars).fill(null).map((_, index) => (
        <StarIcon key={`filled-star-${index}`} className="text-yellow-500" />
      ))}
      {Array(outlinedStars).fill(null).map((_, index) => (
        <StarIcon key={`outlined-star-${index}`} className="text-gray-400" />
      ))}
    </div>
  );
};
