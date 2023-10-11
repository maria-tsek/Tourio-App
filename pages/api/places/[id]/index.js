import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      console.log("place:", place);
      if (!place) {
        return response.status(404).json({ error: "Place not found" });
      }

      return response.status(200).json(place);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  } else if (request.method === "POST") {
    try {
      const placeData = request.body;
      const createdPlace = await Place.create(placeData);
      return response
        .status(201)
        .json({ status: "Place created.", place: createdPlace });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "PATCH") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ error: "Place not found" });
      }

      const updatedPlace = request.body;
      place.set(updatedPlace);
      await place.save();

      return response.status(200).json({ status: "Place updated", place });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  } else if (request.method === "DELETE") {
    try {
      const deletedPlace = await Place.findByIdAndDelete(id);
      if (!deletedPlace) {
        return response.status(404).json({ error: "Place not found" });
      }

      return response
        .status(200)
        .json({ status: `Place ${id} successfully deleted.` });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return response.status(405).end();
  }

  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = db_comments.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // );
}
