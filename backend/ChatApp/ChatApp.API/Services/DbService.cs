using ChatApp.API.Models;
using System.Collections.Concurrent;

namespace ChatApp.API.DataService;

public class DbService
{
    private readonly ConcurrentDictionary<string, UserConnection> _connection = new();

    public ConcurrentDictionary<string, UserConnection> Connection => _connection;
}
