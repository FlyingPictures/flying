import { NotFoundContent } from "@/components/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
      backHome="Go to Flying Pictures"
      homeHref="/en"
    />
  );
}
