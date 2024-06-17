import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

const sendMessage = async (req, res) => {
    try {

        const { id: receiverId } = req.params
        const { message } = req.body
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [ senderId, receiverId ] }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [ senderId, receiverId ]
            })
        }

        const newMessage = await Message.create({
            message,
            senderId,
            receiverId
        })

        if(!newMessage){
            return res.status(500).json({error: "Can't send message"})
        }

        conversation.messages.push(newMessage._id)
        await conversation.save()

        // SOCKET functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        return res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        return res.status(500).json({error: "Internal serval error"})
    }
}

const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params
        const senderId = req.user._id
        
        let conversation = await Conversation.findOne({
            participants: { $all: [ senderId, userToChatId ] }
        }).populate("messages")

        if(!conversation){
            return res.status(200).json([])
        }

        return res.status(200).json(conversation.messages)
        
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        return res.status(500).json({error: "Internal serval error"})
    }
}

export {
    sendMessage,
    getMessages
}