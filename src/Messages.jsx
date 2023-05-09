import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';

function Messages() {
    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200">
                <div>
                    <Link to="/" className="flex items-center text-gray-800">
                        <BsChevronLeft className="w-6 h-6" />
                        <span className="ml-2 font-bold text-lg">Back</span>
                    </Link>
                </div>
                <div>
                    <h1 className="text-white font-bold text-2xl">Messages</h1>
                </div>
                <div></div>
            </div>

            <div className="py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden my-4">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
                            <div className="flex items-center">
                                <img
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                    src="https://picsum.photos/id/237/200/300"
                                    alt="Profile"
                                />
                                <h3 className="text-white font-medium">mudit</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque iste repellat nostrum eum amet porro quae hic reiciendis, odio reprehenderit sapiente explicabo! Magni, minus nostrum dicta dolores commodi consequuntur.</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden my-4">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
                            <div className="flex items-center">
                                <img
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                    src="https://picsum.photos/id/237/200/300"
                                    alt="Profile"
                                />
                                <h3 className="text-white font-medium">mudit</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque iste repellat nostrum eum amet porro quae hic reiciendis, odio reprehenderit sapiente explicabo! Magni, minus nostrum dicta dolores commodi consequuntur.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;