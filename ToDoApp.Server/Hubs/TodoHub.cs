using Microsoft.AspNetCore.SignalR;

namespace ToDoApp.Server.Hubs
{
    public class TodoHub : Hub
    {
        public async Task NotifyTodosChanged()
        {
            await Clients.All.SendAsync("ReceiveTodoUpdate");
        }
    }
}
