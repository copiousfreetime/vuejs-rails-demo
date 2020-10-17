class BooksController < ApplicationController
  def index
    @books = (0..6).map do
      {
        title: ::Faker::Book.title,
        author: ::Faker::Book.author,
        publisher: ::Faker::Book.publisher,
        genre: ::Faker::Book.genre,
      }
    end 
  end
end
