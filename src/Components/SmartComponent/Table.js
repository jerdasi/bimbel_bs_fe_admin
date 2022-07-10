import React, { useState, useEffect } from "react";
import _, { sum } from "lodash";
import propTypes from "prop-types";
import PreviewPhoto from "./PreviewPhoto";

const pageSize = 5;
export default function Table({ sumber, search_field = "" }) {
    const [filtered, setFiltered] = useState(sumber);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [showPhoto, setShowPhoto] = useState(false);

    return <h1>{search_field}</h1>;

    // useEffect(() => {
    //     // console.log(sumber);
    //     // setFiltered(sumber);
    //     // console.log(filtered);
    //     // // setFiltered("Kedua Kali");
    //     // setFiltered(sumber.map((item) => item));
    //     // console.log(sumber);
    //     // setFiltered(sumber);
    //     // console.log(filtered);
    //     // console.log(sumber); //ini props
    //     // setFiltered(sumber); // ini setState
    //     // console.log(filtered); //ini hasilnya []
    //     // // console.log(sumber);
    //     // setFiltered(
    //     //     _(sumber)
    //     //         .slice((currentPage - 1) * pageSize)
    //     //         .take(pageSize)
    //     //         .value()
    //     // );
    //     // setPageCount(sumber ? Math.ceil(sumber.length / pageSize) : 0);
    //     // console.log("Use Effect jalan");
    //     // // console.log();
    //     // console.log(search_field);
    //     // console.log(sumber);
    //     // console.log(filtered, "R");
    //     // console.log(sumber.map((item) => Object.values(item)));
    // }, []);

    // const convertFiltered = () => {
    //     return _(sumber)
    //         .slice((currentPage - 1) * pageSize)
    //         .take(pageSize)
    //         .value();
    // };

    // const handleChangePage = (page) => {
    //     setCurrentPage(page + 1);
    //     setFiltered(
    //         _(sumber)
    //             .slice(page * pageSize)
    //             .take(pageSize)
    //             .value()
    //     );
    // };

    // const handleSearch = (searchKey) => {
    //     // console.log(sumber[0][search_field]);
    //     let value = searchKey.target.value;
    //     let siswa;
    //     console.log(value);
    //     if (!value) {
    //         setFiltered(
    //             _(sumber)
    //                 .slice(0 * pageSize)
    //                 .take(pageSize)
    //                 .value()
    //         );
    //         setPageCount(sumber ? Math.ceil(sumber.length / pageSize) : 0);
    //     } else {
    //         siswa = sumber.filter(
    //             (item) =>
    //                 item[search_field]
    //                     .toLowerCase()
    //                     .indexOf(value.toLowerCase()) !== -1
    //         );
    //         setFiltered(
    //             _(siswa)
    //                 .slice(0 * pageSize)
    //                 .take(pageSize)
    //                 .value()
    //         );
    //         setPageCount(siswa ? Math.ceil(siswa.length / pageSize) : 0);
    //     }

    //     console.log(siswa);
    // };

    // // setPageCount(sumber ? Math.ceil(sumber.length / pageSize) : 0);
    // const pages = _.range(1, pageCount + 1);
    // // setFiltered(sumber);
    // return (
    //     <>
    //         {/* {console.log(sumber, search_field)} */}
    //         <div className="search-box sticky top-0 flex-none flex flex-col md:flex-row gap-2 md:gap-0 justify-between w-full my-2 h-fit md:h-12 bg-white py-1">
    //             <ul className="pagination flex gap-1">
    //                 {pages.map((page, index) => (
    //                     <li
    //                         onClick={() => {
    //                             handleChangePage(index);
    //                         }}
    //                         key={index}
    //                         className={[
    //                             "px-3 py-2 border border-abu-bs rounded-md hover:bg-merah-bs hover:text-white hover:cursor-pointer hover:border-black",
    //                             index + 1 == currentPage
    //                                 ? "bg-merah-bs text-white"
    //                                 : "",
    //                         ].join(" ")}
    //                     >
    //                         {page}
    //                     </li>
    //                 ))}
    //             </ul>
    //             <div className="w-full md:w-1/3 flex gap-2">
    //                 <input
    //                     type="text"
    //                     name=""
    //                     id=""
    //                     className="w-3/4 p-2 md:p-4 border border-abu-bs rounded-md target:border-merah-bs"
    //                     placeholder="Cari Peserta Didik"
    //                     onChange={handleSearch}
    //                 />
    //                 <button className="w-1/4 border border-merah-bs hover:bg-merah-bs hover:text-white rounded-md">
    //                     Search
    //                 </button>
    //             </div>
    //         </div>
    //         <div className="overflow-x-auto">
    //             {convertFiltered().map((item) => {
    //                 Object.values(item).map((item) => <h1>{item}</h1>);
    //             })}
    //             {console.log(convertFiltered())}
    //             <table className="w-full h-full basis-full border-collapse overflow-y-auto">
    //                 <thead>
    //                     <tr className="h-12">
    //                         <th className="border border-biru-bs">No</th>
    //                         {_.keys(_.head(sumber)).map((item) => {
    //                             if (item !== "id") {
    //                                 return (
    //                                     <th className="border border-biru-bs">
    //                                         {item}
    //                                     </th>
    //                                 );
    //                             }
    //                         })}
    //                         {/* {judulTabel.map((item) => (
    //                             <th className="border border-biru-bs">
    //                                 {item}
    //                             </th>
    //                         ))} */}
    //                         <th className="border border-biru-bs">Aksi</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>{/* {console.log(convertFiltered())} */}</tbody>
    //             </table>
    //         </div>
    //         <PreviewPhoto stateChanger={setShowPhoto} status={showPhoto} />
    //     </>
    // );
}

// Table.propTypes = {
//     sumber: propTypes.array.isRequired,
//     search_field: propTypes.string.isRequired,

//     // judulTabel: propTypes.array.isRequired,
// };
