import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(updatedPlace) {
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlace),
      });

      if (response.ok) {
        console.log("Place updated successfully.");
        router.push(`/places/${id}`);
      } else {
        console.error("Failed to update place.");
      }
    } catch (error) {
      console.error("Error updating place:", error);
    }
  }

  if (!isReady || isLoading || error) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`}>
        <StyledLink justifySelf="start">Back</StyledLink>
      </Link>
      {place ? (
        <Form onSubmit={editPlace} formName="edit-place" defaultData={place} />
      ) : (
        <p>Place not found</p>
      )}
    </>
  );
}
