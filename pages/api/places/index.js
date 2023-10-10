import dbConnect from "../../../db/connect";
import Place from "../../../db/models/place";
export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();
    console.log(places);
    return response.status(200).json(places);
  } else {
    return response.status(404).json({ error: "Not Found" });
  }
}
