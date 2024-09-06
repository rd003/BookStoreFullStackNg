
namespace BookStoreFullStackNg.Data.Domain;

public class Cart
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public ICollection<CartItem> CartItems { get; set; } = [];
}
