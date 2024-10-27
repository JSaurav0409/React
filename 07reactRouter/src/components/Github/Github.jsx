import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Github() {
    const profile = useLoaderData()
    // const [profile, setProfile] = useState({ avatar_url: '', followers: 0 })

    // useEffect(() => {
    //     fetch('https://api.github.com/users/JSaurav0409')
    //         .then((response) => response.json())
    //         .then((data) => setProfile(data))
    //         .catch((error) => console.error('Error fetching GitHub data:', error))
    // }, [])
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs m-auto mt-10 mb-10 border border-gray-300">
    <img
        src={profile.avatar_url}
        alt="GitHub profile"
        className="w-300 h-240 rounded-full mx-auto border-4 border-gray-400"
    />
    <h2 className="text-center text-2xl font-semibold mt-4 text-gray-600">GitHub Profile</h2>
      <div className="text-center text-gray-600 mt-2 space-y-2"> {/* Adds vertical space between items */}
        <p>
        Name : <span className="font-bold text-gray-800">{profile.name}</span>
        </p>
        <p>
        Followers : <span className="font-bold text-gray-800">{profile.followers}</span>
        </p>
      </div>
    </div>
)
}

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/JSaurav0409')
    return response.json()
}
