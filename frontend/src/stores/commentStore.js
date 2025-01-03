import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comment: [],
    commentsForBook: [],
    commentsByUser: [],
  }),
  actions: {
    async fetchComments() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/comments"
        );

        console.log("response.data", response.data.comments);
        this.comments = response.data.comments;
      } catch (error) {
        console.log("error at fetchComments: ", error);
      }
    },
    async addNewComment(newComment) {
      try {
        await axios.post("http://localhost:3000/api/v1/comments", newComment);
        await this.fetchComments();
      } catch (error) {
        throw error.response.data;
      }
    },

    async fetchCommentsForBook(bookId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/book/${bookId}`
        );

        this.commentsForBook = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCommentsByUser(userID) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/user/${userID}`
        );

        this.commentsByUser = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
