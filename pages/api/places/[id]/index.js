import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);
    console.log("place:", place);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json({ place });
  }

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
