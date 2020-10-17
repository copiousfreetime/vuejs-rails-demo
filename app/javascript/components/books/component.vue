<template>
  <div>
    <ul v-for="(book, index) in books">
      <li>{{ index }}</li>
      <li><strong>Title</strong> : {{ book.title }}</li>
      <li><strong>Author</strong> : {{ book.author }}</li>
      <li><strong>Publisher</strong> : {{ book.publisher }}</li>
      <li><strong>Genre</strong> : {{ book.genre }}</li>
    </ul>
  </div>
</template>

<script src="./component.js"></script>

<style src="./component.css"></style>
