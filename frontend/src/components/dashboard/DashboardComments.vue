<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Book</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody v-for="comment in commentsByUser && paginatedComments " :key="comment._id">
          <tr>
            <td>{{ comment.content }}</td>
            <td>{{ comment.book.title }}</td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['far', 'pen-to-square']"
                class="text-warning"
                style="cursor: pointer"
              />
            </td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="text-danger"
                style="cursor: pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <PaginationWidget
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="updatePage"
    />
  </div>
</template>

<script>
import { useCommentStore } from "@/stores/commentStore";
import { useAuthStore } from "@/stores/authStore";
import { mapActions, mapState } from "pinia";
import PaginationWidget from "@/components/widgets/PaginationWidget.vue";

export default {
  name: "DashboardComments",
  components: {
    PaginationWidget,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  methods: {
    ...mapActions(useCommentStore, ["fetchCommentsByUser"]),
    updatePage(page) {
      this.currentPage = page;
    },
  },

  computed: {
    ...mapState(useCommentStore, ["commentsByUser"]),
    ...mapState(useAuthStore, ["user"]),
    totalPages() {
      return Math.ceil(this.userComments.length / this.itemsPerPage);
    },
    paginatedComments() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.userComments.slice(startIndex, endIndex);
    },
    userComments() {
      return this.commentsByUser
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  created() {
    this.fetchCommentsByUser(this.user._id);
  },
};
</script>

<style lang="scss" scoped></style>
