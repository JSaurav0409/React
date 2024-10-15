import React from 'react';

function Card({ username, imgSrc, btnText = 'Visit Me', price }) {
    { /*  btnText = 'Visit Me' is a default value if someone forget to pass the props */}
    return (
        <div
            className="flex flex-col rounded-xl p-4 m-8 border border-gray-300"
            style={{
                backdropFilter: 'saturate(180%) blur(14px)',
                background: 'rgba(255, 255, 255, 0.1)',
            }}
        >
            <div className="flex justify-center items-center">
                <img
                    src={imgSrc}
                    alt={`${username}'s NFT`}
                    width="400"
                    height="400"
                    className="rounded-xl"
                />
            </div>

            <div className="flex flex-col rounded-b-xl py-4 text-center">
                <h1 className="font-bold text-xl mb-2">{username}</h1>
                
                <div className="flex justify-between items-center font-mono">
                    <p>#345</p>
                    <p>{price}</p>
                </div>
                
                <button className="bg-blue-500 text-white font-mono px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition">
                    {btnText}
                </button>
            </div>
        </div>
    );
}

export default Card;
