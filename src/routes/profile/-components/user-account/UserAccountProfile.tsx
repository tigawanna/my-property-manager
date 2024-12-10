import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";

interface UserAccountProfileProps {

}

export function UserAccountProfile({}:UserAccountProfileProps){
const {userQuery,logoutMutation} = useViewer()
const [editing, setEditing] = useState(false);
const user = userQuery?.data?.record
const [input, setInput] = useState(user);
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>

   <div className="flex h-full w-full flex-col items-center justify-center">
     <button onClick={() => logoutMutation.mutate()}>Logout</button>
   </div>
   
 </div>
);
}
