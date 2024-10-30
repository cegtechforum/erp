"use client"
import { useState,useEffect } from "react";
import  Image  from 'next/image';

export default function Dashboard(){
    
    return(
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center text-center" >
            <h1 className="p-5 w-[100vw] text-center text-3xl " >Dashboard</h1>
            <div className="w-[100vw] text-center mb-10">
                <input className="w-2/3 border border-sky-950 rounded-md text-center h-[2.25rem]"
                type="search"
                placeholder="seach your events"
                //value={searchEvents}
                />
            </div>
            {/* this is the card component*/}
            <div className=" flex flex-col flex-grow w-full justify-center items-center">
                <div className="flex flex-wrap gap-4 border border-teal-700 rounded-lg shadow-lg" >
                    <div className="p-4 flex flex-col items-center" >
                        <Image
                        className="rounded-lg"
                        src="/assets/placeholder.jpg"
                        alt="event name"
                        width={200}
                        height={200}
                        />
                        <div>
                            <h2>Codex</h2>
                            <p>this is event description</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}