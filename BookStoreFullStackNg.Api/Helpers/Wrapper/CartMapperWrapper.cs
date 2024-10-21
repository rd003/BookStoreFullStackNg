﻿using BookStoreFullStackNg.Data.Domain;
using BookStoreFullStackNg.Data.DTOs.Cart;

namespace BookStoreFullStackNg.Api.Helpers.Wrapper;
public interface ICartItemMapper
{
    CartItemDto MapCartItemToCartItemDto(CartItem cartItem);
    IEnumerable<CartReadDto> MapCartsToCartReadDtos(IEnumerable<Cart> carts);
}

public class CartItemMapper : ICartItemMapper
{
    public CartItemDto MapCartItemToCartItemDto(CartItem cartItem)
    {
        return cartItem.MapCartItemToCartItemDto();
    }

    public IEnumerable<CartReadDto> MapCartsToCartReadDtos(IEnumerable<Cart> carts)
    {
        return carts.MapCartsToCartReadDtos();
    }
}
