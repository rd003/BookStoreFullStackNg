using System;
using BookStoreFullStackNg.Data.DTOs.Author;

namespace BookStoreFullStackNg.Data.DTOs.Book;

public class BookReadDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public double Price { get; set; }
    public DateTime PublishedDate { get; set; }

    public List<AuthorReadDTO> Authors { get; set; } = [];
    public List<GenreReadDto> Genres { get; set; } = [];
}