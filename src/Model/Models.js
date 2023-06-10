class User{
    constructor(uid,usr,pwd,email,displayName,photoURL,rooms){
      let self = this
      this.uid = uid
      this.usr = usr
      this.pwd = pwd
      this.email = email
      this.displayName = displayName
      this.photoURL = photoURL
      this.rooms = Object.assign([],rooms)
      this.linkProfile = "https://www.facebook.com/berlin.03"
      this.nicknames = {}
      this.rooms.forEach((room)=>{
          self.nicknames[room.roomID] = self.displayName
      })
    }
  }
  
class Room{
    constructor(roomName, roomID, members, type,photoURL,lastMessage, linkProfile = 'https://www.facebook.com/berlin.03'){
      this.roomName = roomName
      this.roomID = roomID
      this.members = members
      this.type = type
      this.photoURL = photoURL
      this.lastMessage = lastMessage
      this.theme = '#0084ff'
      this.lastOnline = 'Active Now'
      this.linkProfile = linkProfile
      this.emoji = '👍'
      this.historyMessage = []
    }
    setTheme(theme){
      this.theme = theme
    }
    setLastOnline(){
  
    }
  }
  
class Message{
    constructor(chatContent,roomID,timeSend,senderID, type = 'message'){
      this.chatContent = chatContent
      this.roomID = roomID
      this.timeSend = timeSend
      this.senderID = senderID
      this.seen = false
      this.type = type
    }
  }
  
class MessagesList{
    constructor(){
      this.listMsg = []
    }
    push(msg){
      this.listMsg.push(msg)
    }
    getMessagesRoom(roomID){
      let res = this.listMsg.filter((message)=>{
          return message.roomID == roomID
      })
      return res
    }
  }

export {User, Room,Message, MessagesList}