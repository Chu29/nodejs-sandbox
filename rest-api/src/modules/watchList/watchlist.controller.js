import { prisma } from "../../config/db.js";

const addToWatchList = async (req, res) => {
  const { movieId, userId, notes, rating, status } = req.body;
  // check if movie exists
  const movie = await prisma.movies.findUnique({ where: { id: movieId } });

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // check if movie has already been added
  const existingEntry = await prisma.watchlistItems.findUnique({
    where: { userId_movieId: { userId: userId, movieId: movieId } },
  });

  if (existingEntry) {
    return res.status(400).json({ message: "Movie already in watchlist" });
  }

  // create watchlist item
  const watchlistItem = await prisma.watchlistItems.create({
    data: {
      userId,
      movieId,
      notes,
      rating,
      status: status || "PLANNED",
    },
  });

  res.status(201).json({
    status: "success",
    data: { watchlistItem },
  });
};

export { addToWatchList };
