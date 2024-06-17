import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from './../../zustand/useConversation';

const SearchInput = () => {

	const [ search, setSearch ] = useState("")
	const { setSelectedConversation } = useConversation()
	const { conversations } = useGetConversations()

	const handleSubmit = (e) => {
		e.preventDefault()
		if(!search) return
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

		if(conversation){
			setSelectedConversation(conversation)
			setSearch("")
		} else{
			toast.error("No user found!")
		}
	}


	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' 
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-[#354A86] text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;