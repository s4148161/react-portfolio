import { signOut } from 'next-auth/react'
import Image from 'next/image'

const Navbar = (imgSrc) => {
    return (
        <nav className='py-10 mb-12 flex justify-between'>
          <h1 className='text-xl'>
            Will is a bum
          </h1>
          <div className='flex '>
            <ul className='flex items-center'>
              <li><button className='bg-gray-600 text-white px-4 py-2 rounded-md ml-8' onClick={() => (signOut())}>Log Out</button></li>
            </ul>
            <Image className="mx-2 h-10 w-10 rounded-full" width="40" height="40" alt="profile picture" src={imgSrc.imgSrc} />
          </div>
          
        </nav>
    )
}

export default Navbar;