import dbConnect from "../../../../db/connect";

import Place from "../../../../db/models/place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PATCH") {
    try {
      const place = await Place.findById(id);

      if (!place) {
        return response.status(404).json({ status: "Not Found" });
      }

      const updatedPlace = JSON.parse(request.body);
      place.set(updatedPlace);
      await place.save();

      return response.status(200).json({ status: "Place updated" });
    } catch (error) {
      return response.status(500).json({ status: "Internal Server Error" });
    }
  }

  response.status(405).end();

  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = db_comments.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // );

  //   if (!place) {
  //     return response.status(404).json({ status: "Not found" });
  //   }

  //   response.status(200).json({ place: place, comments: comments });
}
