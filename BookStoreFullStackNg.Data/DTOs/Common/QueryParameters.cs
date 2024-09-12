namespace BookStoreFullStackNg.Data.DTOs.Common;

public class QueryParameters
{
    private int _pageSize = 10;
    private int _pageNumber = 1;

    private string? _sortBy;
    private string? _sortOrder;
    private const int MaxPageSize = 50;

    private string? _searchTerm;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }

    public int PageNumber
    {
        get => _pageNumber;
        set => _pageNumber = (value <= 0) ? 1 : value;
    }

    public string? SortBy
    {
        get => _sortBy;
        set
        {
            if (value == null)
            {
                _sortBy = value;
            }
            else
            {
                _sortBy = value.ToLower();
            }
        }
    }
    public string? SortOrder
    {
        get => _sortOrder;
        set
        {
            if (!string.IsNullOrWhiteSpace(value) && (value != "asc" || value != "desc"))
            {
                throw new ArgumentException("SortOrder must be `asc` or `desc`");
            }
            _sortOrder = value;
        }
    }

    // Filtering
    public string? SearchTerm
    {
        get => _searchTerm;
        set
        {
            if (value == null)
            {
                _searchTerm = value;
            }
            else
            {
                _searchTerm = value.ToLower();
            }
        }
    }
}
