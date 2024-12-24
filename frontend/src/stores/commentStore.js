import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comment: [],
    commentsForBook: [],
  }),
  actions: {
    async addNewComment(newComment) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/comments",
          newComment
        );
        this.comments.push(response.data.comments);
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
  },
});
