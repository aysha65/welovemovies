const reviewsService = require("./reviews.service");

function exists(req, res, next) {
  reviewsService
    .read(req.params.reviewId)
    .then((review) => {
      if (review) {
        res.locals.review = review;
        return next();
      } else next({ status: 404, message: `Review cannot be found.` });
    })
    .catch(next);
}

function destroy(req, res, next) {
   reviewsService
    .destroy(req.params.reviewId)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function update(req, res, next) {
  const updatedReview = {
    //...res.locals.review,
    ...req.body.data
    // review_id: Number(req.params.reviewId),
  };
  // console.log(updatedReview);
  reviewsService
    .update(updatedReview, req.params.reviewId)
    .then((data) => res.json({ data }))
    // .then(() => res.json({ updatedReview }))
    // .then(() => console.log(res.body))
    // .catch(console.log)
    .catch(next);
}

module.exports = {
  destroy: [
    exists,
    destroy
  ],
  update: [
    exists,
    update,
  ],
};