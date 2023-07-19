using Microsoft.AspNetCore.SignalR;

namespace WebSocket_SignalR.Hubs
{
	public class ChatHub : Hub
	{
		public async Task AddToGroupAsync(string group)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, group);
		}

		public async Task RemoveFromGroupAsync(string group)
		{
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
		}

		public async Task SendMessage(string username,string group , string message)
		{
			await Clients.Group(group).SendAsync("ReceiveMessage", username, message);
		}
	}
}
