export default {
  props: {
    books: {
      type: String,
      default: "[]",
      required: true
    },
  },

  computed: {
    parsedBooks: function() {
      console.log("parsing ", this.books)
      return JSON.parse(this.books)
    }
  }
}
