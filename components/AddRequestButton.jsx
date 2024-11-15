"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { DialogFooter } from "@/components/ui/dialog";
  import {Button} from '@mui/material'
import axios from "axios";
import toast from "react-hot-toast";

const RequestedItems = 
  {
"items":
[{
    "eventId":1,
    "itemName":"111",
    "count":11,
    "approvedCount":0,
    "category":"c1"
},
{
    "eventId":1,
    "itemName":"222",
    "count":5,
    "approvedCount":0,
    "category":"c1"
}
],
"eventName":"vyuha",
"domain":"events"
}

  const handleRequest=()=>{
    try{
      const response = axios.post("/api/lists",RequestedItems)
    }catch(error){
      toast.error(error.message || "Error occured")
    }
  }

  export default function AddRequestButton (){
    return (
      <div className="bg-slate-200 rounded-lg max-w-md mx-auto" >
        <Dialog >
        <DialogTrigger asChild>
          <Button variant="outline"  >Add Request</Button>
        </DialogTrigger>
        <DialogContent className=" p-6 w-full bg-[#f6f4f4] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg sm:p-6 mx-auto  ">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3 bg-white" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleRequest} >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    )
  }
  