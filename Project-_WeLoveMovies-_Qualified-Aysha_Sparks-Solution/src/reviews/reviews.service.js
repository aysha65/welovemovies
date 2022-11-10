const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(id) {
  return knex("reviews").select("*").where({ review_id: id }).first();
}

function destroy(id) {
  return knex("reviews").where({ review_id: id }).del();
}

const addCritic = mapProperties({
  // critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  // created_at: "critic.created_at",
  // updated_at: "critic.updated_at",
});

function listReviews(id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": id })
    .then((data) => data.map(r => addCritic(r)))
    // .first();
}

function update (updatedReview, review_id) {
  return knex("reviews")
    .select("*")
    .where({review_id})
    .update(updatedReview)
    // for whatever reason the update above is returning 1 so hacking the solution slightly
    .then(() => listReviews(review_id))
    .then(updatedRecords => updatedRecords[0])
}

module.exports = {
  read,
  destroy,
  update,
};