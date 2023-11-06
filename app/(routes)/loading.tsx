import BillboardSkeleton from "@/components/loading-ui/billboard-skeleton";
import Container from "@/components/ui/container";

export default function Loading() {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillboardSkeleton/>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-40 bg-gray-300 rounded-md"/>
        </div>
      </div>
    </Container>
  )
}