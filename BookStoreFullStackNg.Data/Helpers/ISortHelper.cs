using System;

namespace BookStoreFullStackNg.Data.Helpers;

public interface ISortHelper<T>
{
    IQueryable<T> ApplySort(IQueryable<T> entities, string orderByQueryString);
}
