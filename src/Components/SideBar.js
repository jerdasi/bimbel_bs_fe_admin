import React from 'react'

export default function SideBar() {
  return (
    <div className='w-1/5 h-full border border-black'>
        <img src="images/logo-simbol.png" alt="logo-bimbel" className='h-16 w-auto m-4' />
        <ul className='main-menu'>
            <li className='item border-y border-black' id='menu'>
                <a href="#menu" className='block px-2 py-3 relative text-white bg-merah-bs'>
                    <i class='fas fa-tools text-lg mr-2'></i>Menu
                </a>
                <div className="overflow-hidden max-h-0 transition-[max-height] duration-500 overflow-y-auto">
                    <a href="#" className='px-2 py-3 block hover:bg-merah-bs'>
                        <i class="fas fa-chart-line text-lg mr-2"></i>Dashboard
                    </a>
                </div>
            </li>
            <li className='item border-y border-black' id='fitur'>
                <a href="#fitur" className='block px-2 py-3 relative text-white  bg-merah-bs'>
                    <i class='fas fa-tools text-lg mr-2'></i>Fitur
                </a>
                <div className="overflow-hidden max-h-0 transition-[max-height] duration-500 overflow-y-auto">
                    <a href="#" className='px-2 py-3 block hover:bg-merah-bs'>
                        <i class="fa-solid fa-graduation-cap text-lg mr-2"></i>Peserta Didik
                    </a>
                    <a href="#" className='px-2 py-3 block hover:bg-merah-bs'>
                        <i class="fas fa-chart-line text-lg mr-2"></i>Kelola Transaksi
                    </a>
                    <a href="#" className='px-2 py-3 block hover:bg-merah-bs'>
                        <i class="fa-solid fa-comment text-lg mr-2"></i>Kelola Testimoni
                    </a>
                    <a href="#" className='px-2 py-3 block hover:bg-merah-bs'>
                        <i class="fas fa-chalkboard-teacher text-lg mr-2"></i>Kelola Paket Bimbingan
                    </a>
                </div>
            </li>
            <li className="item border-y border-black">
                <a href="" className='block px-2 py-3 relative bg-merah-bs text-white'>
                    <i class="fa-solid fa-arrow-right-from-bracket text-lg mr-2"></i>Keluar
                </a>
            </li>
        </ul>
    </div>
  )
}
