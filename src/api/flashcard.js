import axios from "../config/axios";

export const createSetCard = (token) =>
  axios
    .post("/setCard", {
      headers: {
        // eslint-disable-next-line prefer-template
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);

export const updateSetCard = (token, createPostPayload) =>
  axios
    .put("/setCard", createPostPayload, {
      headers: {
        // eslint-disable-next-line prefer-template
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
