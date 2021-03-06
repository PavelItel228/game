import asyncio
import json
from .models import OnlineUser
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async


class ChatConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        await self.create_online_user(self.scope['user'])
        await self.channel_layer.group_add(
            'global',
            self.channel_name,
        )
        myresponse = {
            'user': self.scope['user'].username,
            'type': 'online'
        }
        resp = json.dumps(myresponse)
        await self.channel_layer.group_send(
            'global',
            {
                'type': 'online_message',
                'data':  resp,
                'sender_channel_name': self.channel_name
            }
        )

        await self.send({
            'type': 'websocket.accept'
        })

    async def websocket_receive(self, event):
        username = self.scope['user'].username
        if username == "":
            username = "AnonymusUser"
        myresponse = {
            'text': event.get('text'),
            'user': username,
            'type': 'chat'
        }
        resp = json.dumps(myresponse)
        await self.channel_layer.group_send(
            'global',
            {
                'type': 'chat_message',
                'text': resp,
            }
        )

    async def chat_message(self, event):
        print('send', event)
        await self.send({
            'type': 'websocket.send',
            'text': event['text'],
        }
        )

    async def websocket_disconnect(self, event):
        print('closed', event)
        await self.delete_online_user(self.scope['user'])
        myresponse = {
            'user': self.scope['user'].username,
            'type': 'offline'
        }
        resp = json.dumps(myresponse)
        await self.channel_layer.group_send(
            'global',
            {
                'type': 'chat_message',
                'text': resp,
            }
        )

    @database_sync_to_async
    def create_online_user(self, user):
        try:
            OnlineUser.objects.create(user=user)
        except:
            OnlineUser.objects.filter(user=user).delete()
            OnlineUser.objects.create(user=user)

    @database_sync_to_async
    def delete_online_user(self, user):
        OnlineUser.objects.filter(user=user).delete()

    async def online_message(self, event):
        if self.channel_name != event['sender_channel_name']:
            await self.send({
                'type': 'websocket.send',
                'text': event['data'],
            })
