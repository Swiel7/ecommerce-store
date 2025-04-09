import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { cn, formatDate } from "@/lib/utils";
import { TReview } from "@/types";

type Props = {
  review: TReview & {
    firstName: string;
    lastName: string;
    image: string | null;
  };
  className?: string;
};

const ReviewItem = ({ review, className }: Props) => {
  const { createdAt, description, rating, firstName, lastName, image } = review;

  return (
    <article
      className={cn(
        "bg-background flex flex-col gap-4 rounded-lg p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Rating initialRating={rating} disabled size={24} />
        <span className="text-sm group-first:hidden">
          {formatDate(createdAt)}
        </span>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <div className="mt-auto flex items-center gap-3">
        <Avatar className="size-10">
          {image && (
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
              alt={`${firstName} ${lastName} avatar`}
            />
          )}
          <AvatarFallback>
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-medium">
          {firstName} {lastName}
        </h3>
      </div>
    </article>
  );
};

export default ReviewItem;
