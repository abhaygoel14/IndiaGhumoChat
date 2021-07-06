import discord
import random
import os
import asyncio
import logging
from discord import channel
from discord import user
from discord.ext import commands
from discord.ext import tasks
from itertools  import cycle
from discord.ext.commands import Bot

client = commands.Bot(command_prefix = '')
status = cycle(['Online' ,'idle'])


@client.event
async def on_ready():
    await client.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name='Over This server'))
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('-----')
    
    
@client.event
async def on_member_join(member):
    print(f"{member.name} joined a server")
   
@client.event
async def on_member_remove(member):
    print(f"{member.name} has left...")  



 #await channel.send(f'Welcome to the server {member.mention}! :partying_face:') #welcome the member on the server
 #await member.send(f'Welcome to the {guild.name} server, {member.name}! :partying_face:')#welcome the member on a dm
 #await channel.send(f'To Join the server of your place enter your cityname\n Message format- city <cityname>\nExample-city kolkata')

#magicball
@client.command(aliases=['8ball', 'test']) 
async def magicball(ctx, *, question):
        responses= ['Mountains are magnifiscent!!',
                'Lets have a bonfire',
                'Dont forget your sunscreen...',
                'Lets get drunk on the beach today!!',
                'Not so good idea',
                'Yes definitely',
                'It is possible']
        await ctx.send(f"Question: {question}\n Answer: {random.choice(responses)}")

@client.command()
async def budget(ctx,*,money):
    if(money>='5000' and money<='10000'):
        await ctx.send("Join the server #Silver_package")
    elif(money>'10000' and money<='50000'):
        await ctx.send("Join the server #Gold_package")
    elif(money>'50000') and (money<='100000'):
        await ctx.send("Join the server #Platinium_package")
    else:
        await ctx.send("sorry no packages avaliable in this range ")
#background tasks

#within the parenthesis specify how long in between iteration of the loop
#function to change the status of the bot after every 20s
#@tasks.loop(seconds=20)
#async def change_status():
 #   await client.change_presence(acivity=discord.Game(next(status)))

#Commands
#to clear msgs
@client.command()
async def clear(ctx, amount=7):
    await ctx.channel.purge(limit=amount)

# to make custom check method that will allow to run a command to a specific user
#def is_it_me(ctx):
#     return ctx.author.id == #id of the test account
#@client.command()
#@commands.check(is_it_me)
#   await ctx.send(f"Hi I am {ctx.author}")

# kick/ban/unban
@client.command()
@commands.has_permissions(manage_messages=True)
async def kick(ctx, member : discord.Member , *,reason=None):
    await member.kick(reason=reason)
    await ctx.send(f"{member.mention} kicked out")

@client.command()
async def ban(ctx, member : discord.Member , *,reason=None):
    await member.ban(reason=reason)
    await ctx.send(f"Banned {member.mention}")

@client.command()
async def unban( ctx , *,member):
    banned_users = await ctx.guild.bans()
    member_name, member_discriminator = member.split('#')
   
    for ban_entry in banned_users:
        user = ban_entry.user
       
        if(user.member , user.discriminator) == (member_name , member_discriminator):
            await ctx.guild.unban(user)
            ##await ctx,send(f"Unbanned {user.name}#{user.discriminator}")instead  of user.name and user.discriminator user.mention can alos be used
            await ctx.send(f"Unbanned {user.mention}")
            return  
            #this return will allow only the single found user to unban not multiple users

@client.event
async def on_command_error(ctx, error):
    pass #it will pass the error to clear if we write .clear 

@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send('Invalid command used.') #invalid command if used then print this

@clear.error
async def clear_error(ctx,error): #if clear command is invalid then it will get run
       if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send('please specify an amount of messages to delete.')

class DurationConverter(commands.Converter): #how much long you want to ban a user
    async def convert(self, ctx, argument):
        amount=argument[:-1]
        unit= argument[-1]

        if amount.isdigit() and unit in ['s','m']: #time of ban
            return (int(amount), unit)

        raise commands.BadArgument(message='Not a valid duration')

@client.command() #temporary ban commands
async def tempban(ctx, member: commands.MemberConverter, duration: DurationConverter):
    multiplier={'s': 1, 'm': 60}
    amount, unit=duration
    await ctx.guild.ban(member)
    await ctx.send(f'{member} has been banned for {amount}{unit}.')
    await asyncio.sleep(amount * multiplier[unit])
    await ctx.guild.unban(member)

#for permanent ban
#@client.command()
#async def ban(ctx, member: commands.MemberConverter):
 #   await ctx.guild.ban(member)
  #  await ctx.send(f'{member} has been banned.')

#Cogs
#load method
@client.command()
async def load(ctx, extension):
    client.load_extension(f'cogs.{extension}')
    await ctx.send("Extension loaded")

#unload method
@client.command()
async def unload(ctx, extension):
    client.unload_extension(f'cogs.{extension}')
    await ctx.send("Extension Unloaded")

#reload method
@client.command()
async def reload(ctx, extension):
    client.unload_extension(f'cogs.{extension}')
    client.load_extension(f'cogs.{extension}')
    await ctx.send("Extension Reloaded")


# 'listdir' will list out all the files in a given dir
# ./ stands for the current dir and ./cogs  will access to  the files in the cogs folder
for filename in os.listdir('./cogs'):
    if filename.endswith('.py'):
        #[:-3] we sliced the last the character i.e .py as to load cogs.filename not with the extension .py
        client.load_extension(f'cogs.{filename[:-3]}') 

client.run('ODYwNTQzMDkwMDIzOTg5Mjc4.YN8xNA.WQyVIPOZgF-BuXZl7oIy01LBx6k')

