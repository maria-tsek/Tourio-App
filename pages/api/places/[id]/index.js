import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/place";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json({ place });
  }

  if (request.method === "POST") {
    try {
      const commentData = request.body;
      const newComment = await Comment.create(commentData);
      await Place.findByIdAndUpdate(
        id,
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      response.status(201).json({ status: "Comment created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} successfully deleted.` });
  }
}

//   const comment = place?.comments;
//   const allCommentIds = comment?.map((comment) => comment.$oid) || [];
//   const comments = db_comments.filter((comment) =>
//     allCommentIds.includes(comment._id.$oid)
//   );

//     if (!place) {
//       return response.status(404).json({ status: "Not found" });
//     }

//     response.status(200).json({ place: place, comments: comments });
// }
