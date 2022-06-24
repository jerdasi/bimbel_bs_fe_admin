import React, { useState, useEffect } from "react";
import _ from "lodash";
import propTypes from "prop-types";

const pageSize = 5;
export default function Table({ sumber = [], judulTabel = [] }) {
    const [filtered, setFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        setFiltered(
            _(sumber)
                .slice((currentPage - 1) * pageSize)
                .take(pageSize)
                .value()
        );
        setPageCount(sumber ? Math.ceil(sumber.length / pageSize) : 0);
        console.log("Use Effect jalan");
    }, [sumber]);

    const handleChangePage = (page) => {
        setCurrentPage(page + 1);
        setFiltered(
            _(sumber)
                .slice(page * pageSize)
                .take(pageSize)
                .value()
        );
    };

    const handleSearch = (searchKey) => {
        let value = searchKey.target.value;
        let siswa;
        console.log(value);
        if (!value) {
            setFiltered(
                _(sumber)
                    .slice(0 * pageSize)
                    .take(pageSize)
                    .value()
            );
            setPageCount(sumber ? Math.ceil(sumber.length / pageSize) : 0);
        } else {
            siswa = sumber.filter(
                (item) =>
                    item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setFiltered(
                _(siswa)
                    .slice(0 * pageSize)
                    .take(pageSize)
                    .value()
            );
            setPageCount(siswa ? Math.ceil(siswa.length / pageSize) : 0);
        }

        console.log(siswa);
    };

    // setPageCount(sumber ? Math.ceil(sumber.length / pageSize) : 0);
    const pages = _.range(1, pageCount + 1);

    return (
        <>
            <div className="search-box sticky top-0 flex-none flex flex-col md:flex-row gap-2 md:gap-0 justify-between w-full my-2 h-fit md:h-12 bg-white py-1">
                <ul className="pagination flex gap-1">
                    {pages.map((page, index) => (
                        <li
                            onClick={() => {
                                handleChangePage(index);
                            }}
                            key={index}
                            className={[
                                "px-3 py-2 border border-abu-bs rounded-md hover:bg-merah-bs hover:text-white hover:cursor-pointer hover:border-black",
                                index + 1 == currentPage
                                    ? "bg-merah-bs text-white"
                                    : "",
                            ].join(" ")}
                        >
                            {page}
                        </li>
                    ))}
                </ul>
                <div className="w-full md:w-1/3 flex gap-2">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="w-3/4 p-2 md:p-4 border border-abu-bs rounded-md target:border-merah-bs"
                        placeholder="Cari Peserta Didik"
                        onChange={handleSearch}
                    />
                    <button className="w-1/4 border border-merah-bs hover:bg-merah-bs hover:text-white rounded-md">
                        Search
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full h-full basis-full border-collapse overflow-y-auto">
                    <thead>
                        <tr className="h-16">
                            {judulTabel.map((item) => (
                                <th>{item}</th>
                            ))}
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((item, index) => (
                            <tr
                                key={index}
                                className="h-10 border-y border-biru-bs hover:bg-biru-bs"
                            >
                                <td className="text-center w-full px-8 md:w-[5%]">
                                    {index + 1 + (currentPage - 1) * pageSize}
                                </td>
                                <td className="w-full px-8 md:w-[20%]">
                                    {item.name}
                                </td>
                                <td className="w-full px-8 md:w-[20%]">
                                    {item.username}
                                </td>
                                <td className="w-full px-8 md:w-[20%]">
                                    {item.email}
                                </td>
                                <td className="w-full px-8 md:w-[20%]">
                                    {item.website}
                                </td>
                                <td className="w-[15%]">
                                    <div className="w-full h-full flex justify-center gap-3">
                                        <button className="p-2 border border-black rounded-md w-fit">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button className="p-2 bg-merah-bs text-white rounded-md border border-merah-bs w-fit">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

Table.propTypes = {
    sumber: propTypes.array.isRequired,
    judulTabel: propTypes.array.isRequired,
};
