import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    return response.status(200).json(place);
  } else if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      return response.status(201).json({ status: "Place created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });

    }
  } else if (request.method === "PATCH") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ status: "Not Found" });
      }


      const updatedPlace = request.body;
      console.log("updated:", updatedPlace);
      place.set(updatedPlace);
      await place.save();

    response.status(200).json({ place });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} successfully deleted.` });
  }

  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = db_comments.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // );


      return response.status(200).json({ status: "Place updated" });
    } catch (error) {
      return response.status(500).json({ status: "Internal Server Error" });
    }
  } else {
    return response.status(405).end();
  }
}
