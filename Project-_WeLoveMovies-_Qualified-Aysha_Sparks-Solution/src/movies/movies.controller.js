const moviesService = require("./movies.service");

function list(req, res, next) {
  moviesService
    .list(req.query.is_showing)
    // .then(data => data.filter(m => (req.query.is_showing ? (m.is_showing == 1) : true)))
    // .list(req.query)
    .then((data) => res.json({ data }))
    .catch(next);
}

function exists(req, res, next) {
  moviesService
    .read(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
    })
    .catch(next);
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

function listTheaters(req, res, next) {
  moviesService
    .listTheaters(req.params.movieId)
    .then((data) => res.json({ data }))
    .catch(next);
}

function listReviews(req, res, next) {
  moviesService
    .listReviews(req.params.movieId)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
  read: [exists, read],
  listTheaters,
  listReviews
};