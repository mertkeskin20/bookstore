<template>
    <section>
      <div class="container">
        <SectionHeader title="Books" text="Books text" />
        <BookList :books="paginatedBooks" />
        <PaginationWidget
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-changed="updatePage"
        />
      </div>
    </section>
  </template>
  
  <script>
  import SectionHeader from "@/components/SectionHeader.vue";
  import BookList from "@/components/BookList.vue";
  import PaginationWidget from "@/components/widgets/PaginationWidget.vue";
  import { useBookStore } from "@/stores/bookStore";
  import { mapState } from "pinia";
  
  export default {
    name: "BooksView",
    components: {
      SectionHeader,
      BookList,
      PaginationWidget,
    },
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 8,
      };
    },
    computed: {
      ...mapState(useBookStore, ["books"]),
      totalPages() {
        return Math.ceil(this.books.length / this.itemsPerPage);
      },
      paginatedBooks() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.books.slice(startIndex, endIndex);
      },
    },
    methods: {
      updatePage(page) {
        this.currentPage = page;
      },
    },
  };
  </script>
  
  <style scoped></style>
  