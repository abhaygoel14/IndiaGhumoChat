import discord


from discord.ext import commands

#this will inherit from commands.cogs
class Example(commands.Cog):
    
    def __init__(self,client):            #creating init function passing client as reference created in the main file bot.py into the cog
        self.client=client

    #events
    #@commands.Cogs.listener()
    #async def on_ready(self):
     #   @commands.change_presence(status=discord.Status.idle,activity=discord.Game("Hello There!!"))
        #changed the status of the bot to idle,etc and an activity to be a game known as hello there
       # print("Bot is  online and ready!!")

    #commands
    @commands.command(aliases=['Hi','chao','HI'])
    async def hi(self,ctx):
    #await ctx.send(f'Hi!!{round(client.latency*1000)}ms') in this command client.latency wil show the latency of the bot converted in ms.
        await ctx.send('Helloo!!')

    @commands.command()
    async def ping(self,ctx):
        await ctx.send("Pong!")
      
    @commands.command()
    async def details(self,ctx):
        await ctx.send("Enter your budget & city\nInput format- \n\t\tbudget 10000\n\t\tcity kolkata")

    
         
    
    @commands.command(aliases=['Cityname' , 'cityname'])
    async def city(self,ctx ,*,input):
     if(input) == ("kolkata"):
       await ctx.send("Join the #kolkata channel to meet new people")
     elif(input) == ("goa"):
       await ctx.send("Join the #Goa channel to meet new people")
     elif(input) == ("manali"):
       await ctx.send("Join the #manali channel to meet new people")
     elif(input) == ("delhi"):
       await ctx.send("Join the #Delhi channel to meet new people")
     elif(input) == ("mumbai"):
       await ctx.send("Join the #Mumbai  channel to meet new people")
     else:
        await ctx.send("No server available for this city right now\nSorry for the inconvience")

#setup function  to connect this cog to the bot        
def setup(client):
    client.add_cog(Example(client))