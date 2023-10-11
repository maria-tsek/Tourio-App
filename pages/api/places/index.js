import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();
    response.status(200).json(places);
  } else {
    response.status(404).json({ error: "Not Found" });
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "Place created." });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
  // if (request.method === "DELETE") {
  //   console.log(request.body);
  //   const response = await Place.findOne(id);
  //   console.log(response);
  // }
}
